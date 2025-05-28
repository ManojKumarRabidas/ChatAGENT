// import React, { useState } from "react";

// export default function Chat() {
//   const [prompt, setPrompt] = useState("");
//   type Message = { sender: "user" | "bot"; text: string };
//   const [messages, setMessages] = useState<Message[]>([]); // { sender: "user" | "bot", text: string }
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!prompt.trim()) return;
//     // Add user message
//     setMessages((msgs) => [...msgs, { sender: "user", text: prompt }]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       // Add bot response
//       setMessages((msgs) => [...msgs, { sender: "bot", text: data.response }]);
//     } catch (error) {
//       setMessages((msgs) => [
//         ...msgs,
//         { sender: "bot", text: "Error: Could not get response from server." },
//       ]);
//     } finally {
//       setLoading(false);
//       setPrompt("");
//     }
//   };

//   // Handle Enter key press in input
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
//       <h2>AI Chat</h2>
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: 10,
//           height: 400,
//           overflowY: "auto",
//           marginBottom: 10,
//           borderRadius: 5,
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               textAlign: msg.sender === "user" ? "right" : "left",
//               margin: "10px 0",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "8px 12px",
//                 borderRadius: 20,
//                 backgroundColor: msg.sender === "user" ? "#4caf50" : "#e0e0e0",
//                 color: msg.sender === "user" ? "white" : "black",
//                 maxWidth: "70%",
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//         {loading && <p>Loading...</p>}
//       </div>
//       <textarea
//         rows={3}
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Type your message..."
//         style={{ width: "100%", padding: 10, borderRadius: 5, resize: "none" }}
//         disabled={loading}
//       />
//       <button
//         onClick={sendMessage}
//         disabled={loading || !prompt.trim()}
//         style={{
//           marginTop: 10,
//           padding: "10px 20px",
//           borderRadius: 5,
//           backgroundColor: "#4caf50",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Send
//       </button>
//     </div>
//   );
// }

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
    <div className="container my-5 d-flex align-items-center justify-content-center" style={{ minWidth: "100vw" }}>
      <div className="card shadow-sm" style={{ maxWidth: "90vw" }}>
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">ChatBOT for your assitance</h4>
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
        <div className="card-footer bg-white">
          <textarea
            className="form-control"
            rows={2}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="btn btn-primary mt-2 w-100"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
