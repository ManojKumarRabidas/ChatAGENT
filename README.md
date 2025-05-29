# ChatAGENT
Prerequisite 
• Install Python, virtualenv
• Install MySQL (or Dockerized)
• Install Ollama (local LLM)

move to C:\Users\username\project-name using cd C:\Users\username\project-name
execute - .venv\Scripts\activate.bat
execute - ollama serve
in case error showing ' ' ' Error: listen tcp 127.0.0.1:11434: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted. ' ' ' 
  execute - ollama list 
    if a list with some model showing then move forword else download a model first using ' ' ' ollama pull <model-name> ' ' '
  execute - curl http://localhost:11434 (to check the ollama is running or not)

# [N.B: You don't need to start the ollema every time. It runs in background with minimum resources in windows every time ever after shut down. But if you want to turn it off manually you can turn it off from cmd (no specific directory required) by executing - taskkill /F /IM ollama.exe]

open new terminal 
move to project root directory [cd C:\Users\username\project-name]
execute - uvicorn main:app --reload [to start the server]

open new terminal 
move to ui folder from root directory [cd ui]
execute - npm i
execute - npm run dev [to run the react-vite client]

# .env file content
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=qwen2.5:0.5b
OLLAMA_API_URL=http://localhost:11434


MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=rootpass123
MYSQL_DB=rag_data
