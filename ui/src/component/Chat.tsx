import React, { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: data.response || "No response" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "Oops! Something went wrong." },
      ]);
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container my-2 d-flex align-items-center justify-content-center" style={{ minWidth: "100vw" }}>
      <div className="card shadow-sm" style={{ width: "90vw", height: "96vh" }}>
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center">
            <img style={{maxWidth: "2rem"}} src="./public/ChatAGENT-icon.png" alt="" />
            <h4 className="mb-0 mx-2">ChatAGENT for your assistance</h4>
          </span>
          <a style={{color: "white"}} target="_blank" href="https://manojkumarrabidas.github.io/portfolio/">Visit My portfolio</a>
        </div>
        <div
          className="card-body"
          style={{ height: "400px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
        >
          {messages.map(({ id, sender, text }) => (
            <div
              key={id}
              className={`d-flex mb-3 ${
                sender === "user" ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className={`p-3 rounded ${
                  sender === "user" ? "bg-primary text-white" : "bg-light text-dark"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="card-footer bg-white d-flex align-items-end">
          <textarea className="form-control me-2" rows={2} placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={loading} />
          <button style={{maxHeight: "fit-content"}} className="btn btn-primary ms-2 w-20 d-flex align-items-center justify-content-center" onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? ( <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" ></span> Loading... </> ) : ( "Send" )}
          </button>
        </div>
      </div>
    </div>
  );
}
