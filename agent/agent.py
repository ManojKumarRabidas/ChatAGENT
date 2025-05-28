import os
import json
import aiohttp
from dotenv import load_dotenv
from agent.tools import fetch_latest_executive_orders

load_dotenv()

OLLAMA_API = os.getenv('OLLAMA_BASE_URL')
MODEL = os.getenv('OLLAMA_MODEL')

tool_schema = {
    "name": "fetch_latest_executive_orders",
    "description": "Get latest 5 executive orders",
    "parameters": {
        "type": "object",
        "properties": {}
    }
}

tools = {
    "fetch_latest_executive_orders": fetch_latest_executive_orders,
}

async def ask_agent(query: str):
    headers = {"Content-Type": "application/json"}
    body = {
        "model": MODEL,
        "messages": [{"role": "user", "content": query}],
        "tools": [tool_schema],
        "tool_choice": "auto",
        "stream": False
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(f"{OLLAMA_API}/chat/completions", json=body, headers=headers) as resp:
            response = await resp.json()

    msg = response['choices'][0]['message']
    
    if 'tool_calls' in msg:
        tool_call = msg['tool_calls'][0]
        tool_name = tool_call['function']['name']
        tool_func = tools.get(tool_name)
        if tool_func:
            tool_result = await tool_func()
            body["messages"].append(msg)
            body["messages"].append({
                "role": "tool",
                "tool_call_id": tool_call["id"],
                "name": tool_name,
                "content": str(tool_result)
            })

            async with aiohttp.ClientSession() as session:
                async with session.post(f"{OLLAMA_API}/chat/completions", json=body, headers=headers) as resp:
                    final = await resp.json()

            return final['choices'][0]['message']['content']

    return msg.get('content', 'No tool used.')
