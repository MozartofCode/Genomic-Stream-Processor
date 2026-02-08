# 🧬 Helix-Throttle

A high-throughput genomic data processing pipeline demonstrating backpressure management and intelligent throttling.

## Overview

**Helix-Throttle** is a proof-of-concept system that:
- Generates high-speed DNA sequences using Rust
- Processes sequences through Groq's LLM for mutation detection
- Implements intelligent backpressure to prevent system overload
- Provides real-time monitoring via Streamlit dashboard

## Architecture

- **Rust Producer**: High-performance DNA sequence generator (PyO3 extension)
- **Antigravity Orchestrator**: Python-based queue management and throttling
- **Groq Integration**: LLM-powered mutation analysis
- **PostgreSQL**: Persistent storage for analysis results
- **Streamlit Dashboard**: Real-time monitoring and control

## Quick Start

### Prerequisites
- Python 3.9+
- Rust (cargo)
- PostgreSQL
- Groq API Key

### Setup

1. **Clone and navigate to the project**
```bash
cd Genomic-Stream-Processor
```

2. **Create environment file**
```bash
cp .env.example .env
# Edit .env with your GROQ_API_KEY and DATABASE_URL
```

3. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

4. **Build Rust extension**
```bash
cd backend/rust_producer
maturin develop --release
cd ../..
```

5. **Run the dashboard**
```bash
streamlit run frontend/dashboard.py
```

## Docker Deployment

```bash
docker build -t helix-throttle .
docker run -p 8501:8501 --env-file .env helix-throttle
```

## Features

- **Backpressure Management**: Automatically throttles data generation when processing queue exceeds 500 items
- **Real-time Metrics**: Live monitoring of ingestion rate, processing count, and queue size
- **Mutation Detection**: AI-powered analysis of DNA sequences
- **Persistent Storage**: All analysis results stored in PostgreSQL

## Project Structure

```
Genomic-Stream-Processor/
├── backend/
│   ├── rust_producer/       # Rust DNA sequence generator
│   └── antigravity/         # Python orchestrator
├── frontend/
│   └── dashboard.py         # Streamlit UI
├── Dockerfile
├── requirements.txt
└── .env.example
```

## License

MIT
