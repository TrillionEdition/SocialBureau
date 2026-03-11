import React, { useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';

const LLAMA_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch(LLAMA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_META_API_KEY}`
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-70b-instruct",
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botMsg = { role: "assistant", content: data.choices[0].message.content };
        setMessages((msgs) => [...msgs, botMsg]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: "Error: Unexpected API response structure." },
        ]);
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Only show icon if not open; full chat replaces icon when open
  return (
    <>
      {/* Floating Icon Button (disappears when chat is open) */}
      {!open && (
        <div 
          className="fixed top-4 right-4 z-50"
          style={{ cursor: "pointer" }}
          // onClick={() => setOpen(true)}
        >
          <div className="rounded-full shadow-lg flex items-center justify-center w-12 hover:scale-110 transition">
            <video 
  src="assets/bot.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{ width: "100%", height: "auto" }}
></video>
          </div>
        </div>
      )}
      
      {/* Chatbot Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={() => setOpen(false)}>
          <div
            className="mt-16 p-6 w-full max-w-xs sm:max-w-md relative rounded-2xl shadow-2xl"
            style={{
              fontFamily: "Montserrat, sans-serif",
              zIndex: 100,
              background: "radial-gradient(circle at 60% 40%, #ad1fffe2 0%, #6c0ba9e2 100%)",
              border: "1px solid rgba(172, 78, 235, 0.2)",
              boxShadow: "0 2px 32px 0 #ad1fff55",
              color: "#fff",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: 32,
                height: 32,
                border: "none"
              }}
              aria-label="Close chat"
            >
              ×
            </button>
            {/* Chatbot Title */}
            <div className="flex items-center gap-1 mb-2 bg-black rounded-full pl-3 py-1">
              <video 
  src="assets/bot.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{ width: "10%", height: "auto" }}
></video><span className="font-semibold text-lg" style={{ color: "#fff", letterSpacing: "1px" }}>SB Talks</span> 
            </div>
            <div className="rounded-md h-60 overflow-y-auto mb-3 px-2 py-2" style={{ background: "rgba(255,255,255,0.07)" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <span className={`px-3 py-2 rounded-2xl text-sm shadow-md`} style={{
                    background: msg.role === "user"
                      ? "linear-gradient(90deg, #e54fff77 0%, #ad1fff75 100%)"
                      : "#c96dffc3",
                    color: "#fff",
                    fontWeight: 500,
                    border: msg.role === "user"
                      ? "1px solid #ad1fff"
                      : "1px solid rgba(255,255,255,0.15)",
                    maxWidth: "85%",
                    wordBreak: "break-word"
                  }}>
                    <b>{msg.role === "user" ? "You" : "SB"}:</b> {msg.content}
                  </span>
                </div>
              ))}
              {loading && <div className="text-center py-2 text-white/80">Typing...</div>}
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full px-4 py-2 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid #ad1fff",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "1rem"
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-full shadow-md font-bold"
                style={{
                  background: loading
                    ? "rgba(255,255,255,0.08)"
                    : "linear-gradient(90deg, #4f6cffff 0%, #ad1fff 100%)",
                  color: loading ? "#bbb" : "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                  border: "none"
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
