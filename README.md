# ChatAGENT
# MERN AI Chatbot (FastAPI + Ollama + MySQL + React)

This is a full-stack AI chatbot application that integrates:
- ⚡ FastAPI backend with async tools
- 🧠 Local LLM via Ollama (e.g., Qwen, Mistral)
- 🗃️ MySQL database with aiomysql
- 🌐 React frontend (optional)

---

## 🔧 Backend Setup Guide (Windows)

### 1. Clone the Project

```bash
git clone https://github.com/your-username/mern-ai-project.git
cd mern-ai-project
```

### 2. Create Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

**CMD:**
```bash
.venv\Scripts\activate
```

**PowerShell (if error):**
```powershell
.venv\Scripts\Activate.ps1
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 5. Start FastAPI Server

```bash
uvicorn main:app --reload
```

---

## 🧠 Ollama (Local LLM)

### 1. Install Ollama

Download and install from: https://ollama.com/download

### 2. Pull a Model

```bash
ollama pull qwen:latest
```

### 3. Ollama Default Endpoint

Once installed, Ollama runs at:
```
http://localhost:11434
```

No extra steps needed unless changed.

---

## 🗃️ MySQL Database Setup

1. Install MySQL locally or via Docker
2. Create a new database (e.g. `ai_chat`)
3. Update DB credentials in your `.env` or `config.py`

---

## 🌐 React Frontend (Optional)

If you're using a frontend in `/client` folder:

```bash
cd client
npm install
npm run dev
```

---

## ⚙️ Common Commands

**Update dependencies after adding packages:**
```bash
pip freeze > requirements.txt
```

**Reactivate environment after re-clone:**
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

---

## 📁 Project Structure

```
mern-ai-project/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── agents/
│   └── ...
├── client/              # React frontend (optional)
├── .venv/               # Python virtual environment
├── requirements.txt
├── .gitignore
└── README.md
```

---

## ✅ Tips

- Never commit `.venv/` or `.env`
- Use `.gitignore` to avoid pushing unwanted files
- Document your API keys or configs using `.env.example`


# Each time to run the project

open new terminal 
move to project root directory [cd C:\Users\username\project-name]
execute - 1. .venv\Scripts\activate.bat [to activate the vertual environment]
          2. uvicorn main:app --reload [to start the server]

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


