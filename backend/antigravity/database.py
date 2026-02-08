import os
import asyncpg
from typing import Optional

class Database:
    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None

    async def connect(self):
        url = os.getenv("DATABASE_URL")
        if not url:
            raise ValueError("DATABASE_URL not set")
        self.pool = await asyncpg.create_pool(url)
        await self.init_schema()

    async def init_schema(self):
        async with self.pool.acquire() as conn:
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS sequences (
                    id SERIAL PRIMARY KEY,
                    sequence_fragment TEXT NOT NULL,
                    mutation_detected BOOLEAN,
                    analysis_result TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)

    async def insert_analysis(self, sequence: str, mutation_detected: bool, result: str):
        if not self.pool:
            return
        async with self.pool.acquire() as conn:
            await conn.execute("""
                INSERT INTO sequences (sequence_fragment, mutation_detected, analysis_result)
                VALUES ($1, $2, $3)
            """, sequence, mutation_detected, result)

    async def close(self):
        if self.pool:
            await self.pool.close()
