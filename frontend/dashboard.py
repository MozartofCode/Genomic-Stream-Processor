import streamlit as st
import asyncio
import threading
import time
import sys
import os
import pandas as pd

# Add parent directory to path to import backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.antigravity.orchestrator import AntigravityOrchestrator

st.set_page_config(page_title="Helix-Throttle Dashboard", layout="wide", page_icon="🧬")

# Initialize Orchestrator in Session State
if 'orchestrator' not in st.session_state:
    st.session_state.orchestrator = AntigravityOrchestrator()
    st.session_state.running = False

def start_orchestrator():
    if not st.session_state.running:
        st.session_state.running = True
        
        def run_async_loop():
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            loop.run_until_complete(st.session_state.orchestrator.start())
            
        threading.Thread(target=run_async_loop, daemon=True).start()

st.title("🧬 Helix-Throttle Dashboard")

# Metrics
col1, col2, col3 = st.columns(3)
ingestion_placeholder = col1.empty()
processing_placeholder = col2.empty()
throttle_placeholder = col3.empty()

# Control Panel
if st.button("Start Helix Engine"):
    start_orchestrator()

if st.button("Simulate Data Spike"):
    # Directly manipulate producer throttle for simulation if possible, 
    # or just let the natural production ramp up.
    # For POC, we'll just log it.
    st.toast("Simulating Data Spike! (Not fully implemented in POC logic yet)")

# Real-time Feed
st.subheader("Helix Feed")
feed_placeholder = st.empty()

# Mutation Log
st.subheader("Mutation Alert Log")
log_placeholder = st.empty()


# Auto-refresh loop
if st.session_state.running:
    # Update metrics
    orch = st.session_state.orchestrator
    
    ingestion_placeholder.metric("Ingestion Rate", f"{orch.ingestion_count} seqs")
    processing_placeholder.metric("Processing Count", f"{orch.processing_count} seqs")
    
    q_size = orch.queue.qsize()
    throttle_placeholder.metric("Queue Size (Backpressure)", f"{q_size}")
    
    if q_size > 400:
        st.error("⚠️ HIGH BACKPRESSURE - THROTTLING ACTIVE")

    # Show last few sequences
    # Note: In a real app we'd read from a buffer, here we just show what's in queue or recent processing
    # Since queue is consumed, we can't show it easily without peeking.
    # Let's rely on what's in the DB or just a simple text for now.
    feed_placeholder.text(f"Processing... Queue Size: {q_size}")

    # Show Mutations from DB (Mocking the query for now as we can't await in main thread easily without run_async)
    # Ideally we'd have a separate thread fetching this or use st.cache_data
    
    time.sleep(1) # Refresh rate
    st.rerun()
