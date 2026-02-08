import asyncio
import os
import queue
import time
from typing import Optional, List
from groq import AsyncGroq
from .database import Database

# Try to import the rust module. If not built/available, define a Mock.
try:
    import rust_producer
except ImportError:
    print("WARNING: rust_producer module not found. Using MockProducer.")
    class MockProducer:
        def __init__(self):
            self.running = False
            self.throttled = False
        def start(self, callback):
            self.running = True
            import threading
            import random
            def _loop():
                bases = "ACGT"
                while self.running:
                    if self.throttled:
                        time.sleep(0.1)
                        continue
                    seq = "".join(random.choice(bases) for _ in range(random.randint(50, 200)))
                    try:
                        callback(seq)
                    except Exception as e:
                        print(f"Callback error: {e}")
                    time.sleep(0.01)
            threading.Thread(target=_loop, daemon=True).start()
        def stop(self):
            self.running = False
        def set_throttle(self, throttle: bool):
            self.throttled = throttle
    rust_producer = type("rust_producer", (), {"Producer": MockProducer})

class AntigravityOrchestrator:
    def __init__(self):
        self.queue = queue.Queue()
        self.producer = rust_producer.Producer()
        self.db = Database()
        self.groq_client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))
        self.running = False
        
        # Metrics
        self.ingestion_count = 0
        self.processing_count = 0
        self.start_time = time.time()

    def _producer_callback(self, sequence: str):
        """Callback from Rust/Mock producer."""
        self.queue.put(sequence)
        self.ingestion_count += 1
        
        # Backpressure Check
        qargs = self.queue.qsize()
        if qargs > 500:
            self.producer.set_throttle(True)
        elif qargs < 100:
            self.producer.set_throttle(False)

    async def start(self):
        self.running = True
        await self.db.connect()
        self.producer.start(self._producer_callback)
        print("Orchestrator started. Producer running...")
        
        # Start consumer loop
        asyncio.create_task(self._consumer_loop())

    async def _consumer_loop(self):
        """Consumes sequences from queue and analyses them."""
        while self.running:
            try:
                # Batch processing could be implemented here for efficiency
                # For now, process one by one to demonstrate individual analysis
                if self.queue.empty():
                    await asyncio.sleep(0.1)
                    continue
                
                sequence = self.queue.get_nowait()
                await self.analyze_sequence(sequence)
                self.processing_count += 1
                
            except Exception as e:
                print(f"Error in consumer loop: {e}")
                await asyncio.sleep(1)

    async def analyze_sequence(self, sequence: str):
        """Calls Groq API to analyze DNA sequence."""
        try:
            chat_completion = await self.groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": f"Analyze this DNA sequence: {sequence}. Return 'MUTATION' if anomalies exist, or 'CLEAN' if normal. Brief reason only.",
                    }
                ],
                model="llama3-8b-8192",
            )
            result = chat_completion.choices[0].message.content
            mutation_detected = "MUTATION" in result.upper()
            
            # Persist
            await self.db.insert_analysis(sequence, mutation_detected, result)
            
            # For demo purposes, print if mutation found
            if mutation_detected:
                print(f"ALARM: Mutation detected! {result}")
                
        except Exception as e:
            print(f"Groq API Error: {e}")

    async def stop(self):
        self.running = False
        self.producer.stop()
        await self.db.close()
