# Backend Implementation: The Antigravity Engine

This file details the core logic connecting Rust data generation to Python-based Groq analysis.

## 1. The Rust Producer (The "Firehose")
- **Task:** Generate randomized DNA strings (A, C, G, T) at high frequency.
- **Logic:** Use a Rust worker thread to push sequences into an Antigravity-managed queue.
- **Optimization:** Use `tokio` for asynchronous streaming to prevent blocking the main thread.

## 2. The Antigravity Throttle (The "Brain")
- **Queue Management:** Monitor the `len()` of the processing queue.
- **Thresholds:** - If `queue > 500`: Send a "slow_down" signal to the Rust producer.
    - If `queue < 100`: Send a "speed_up" signal.
- **Groq Integration:** Map sequences to the Groq API using the following prompt:
    > "Analyze this DNA sequence: [SEQ]. Return 'MUTATION' if anomalies exist, or 'CLEAN' if normal. Brief reason only."

## 3. Data Persistence
- **Postgres Schema:** - `id`: UUID
    - `sequence_fragment`: TEXT
    - `analysis_result`: VARCHAR(20)
    - `processing_time_ms`: INT

## 4. Deployment
- Wrap the entire engine in a **Docker** container.
- Use an `.env` file for the `GROQ_API_KEY` and `DATABASE_URL`.
