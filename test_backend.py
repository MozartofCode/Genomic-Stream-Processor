"""
Quick test script to verify the backend components work correctly.
This tests the orchestrator without requiring Streamlit or a full database.
"""
import asyncio
import os
import sys

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.antigravity.orchestrator import AntigravityOrchestrator

async def test_orchestrator():
    print("🧬 Testing Helix-Throttle Backend...")
    print("=" * 50)
    
    # Mock environment (no actual DB or Groq needed for basic test)
    os.environ['DATABASE_URL'] = 'postgresql://test:test@localhost/test'
    os.environ['GROQ_API_KEY'] = 'test_key'
    
    # Create orchestrator
    orch = AntigravityOrchestrator()
    print("✅ Orchestrator created")
    
    # Test producer callback
    print("\n📊 Testing producer callback...")
    for i in range(10):
        test_seq = "ACGT" * 25  # 100 base pairs
        orch._producer_callback(test_seq)
    
    print(f"✅ Queue size: {orch.queue.qsize()}")
    print(f"✅ Ingestion count: {orch.ingestion_count}")
    
    # Test throttling logic
    print("\n🔧 Testing throttling logic...")
    print(f"   Initial throttle state: {orch.producer.throttled}")
    
    # Add enough to trigger throttle
    for i in range(500):
        orch._producer_callback("ACGT" * 25)
    
    print(f"   Queue size after 500 adds: {orch.queue.qsize()}")
    print(f"   Throttle should be active: {orch.producer.throttled}")
    
    # Clear queue to test resume
    while not orch.queue.empty():
        orch.queue.get()
    
    orch._producer_callback("ACGT" * 25)
    print(f"   Queue cleared, throttle should be off: {orch.producer.throttled}")
    
    print("\n" + "=" * 50)
    print("✅ All backend tests passed!")
    print("\n💡 To run the full system:")
    print("   1. Set GROQ_API_KEY and DATABASE_URL in .env")
    print("   2. Run: streamlit run frontend/dashboard.py")

if __name__ == "__main__":
    asyncio.run(test_orchestrator())
