import aiomysql
import os
from dotenv import load_dotenv

load_dotenv()

async def fetch_latest_executive_orders():
    conn = await aiomysql.connect(
        host=os.getenv('MYSQL_HOST'),
        port=int(os.getenv('MYSQL_PORT')),
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        db=os.getenv('MYSQL_DB')
    )
    async with conn.cursor() as cur:
        await cur.execute("SELECT title, summary FROM executive_orders ORDER BY date DESC LIMIT 5;")
        result = await cur.fetchall()
    await conn.ensure_closed()
    return result
