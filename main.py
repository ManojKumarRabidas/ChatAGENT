from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import os
from agent.tools import fetch_latest_executive_orders  # Import your custom DB tool
import json

app = FastAPI()

# Load Ollama API base URL
OLLAMA_API_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or use ["http://localhost:5173"] for more secure config
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.get("/executive-orders")
async def get_executive_orders():
    try:
        orders = await fetch_latest_executive_orders()
        print("Fetched executive orders:", orders)
        return {"data": orders}
    except Exception as e:
        return {"error": str(e)}

async def call_llm_agent(prompt: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{OLLAMA_API_URL}/api/generate",
            json={"model": "qwen:latest", "prompt": prompt}
        )
        response.raise_for_status()
        data = response.json()
        # Extract generated text, adjust keys as per Ollama's response format
        generated_text = data.get("results", [{}])[0].get("text", "")
        return generated_text

@app.post("/chat")
async def chat_with_qwen(request: Request):
    try:
        body = await request.json()
        prompt = body.get("prompt", "")

        if not prompt:
            return JSONResponse(status_code=400, content={"error": "Prompt is required"})

        generated_text = ""

        async with httpx.AsyncClient() as client:
            async with client.stream(
                "POST",
                f"{OLLAMA_API_URL}/api/generate",
                json={"model": "qwen2.5:0.5b", "prompt": prompt}
            ) as response:
                async for line in response.aiter_lines():
                    if line.strip():
                        try:
                            chunk = json.loads(line)
                            generated_text += chunk.get("response", "")
                        except json.JSONDecodeError:
                            continue

        return {"response": generated_text or "No response from model"}

    except Exception as e:
        print(f"❌ Backend error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

