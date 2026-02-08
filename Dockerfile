FROM python:3.9-slim

# Install system dependencies for Rust and Postgres
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libssl-dev \
    pkg-config \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir \
    streamlit \
    asyncpg \
    groq \
    pandas \
    sqlalchemy \
    psycopg2-binary \
    maturin

# Build Rust extension
WORKDIR /app/backend/rust_producer
RUN maturin build --release -o ../../dist
RUN pip install ../../dist/*.whl

WORKDIR /app

# Expose Streamlit port
EXPOSE 8501

# Run Streamlit
CMD ["streamlit", "run", "frontend/dashboard.py", "--server.address=0.0.0.0"]
