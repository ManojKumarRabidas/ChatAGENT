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

open another terminal 
move to project root directory 
execute - uvicorn main:app --reload

onep another terminal 
move to ui folder fromroot directory
execute - npm i
execute - npm run dev
