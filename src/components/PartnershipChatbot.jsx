import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PARTNER_DATA = {
  "ranjit": { name: "Ranjit", email: "ranjit@socialbureau.com" },
  "sivaprasad": { name: "Siva Prasad", email: "sivaprasad@socialbureau.com" },
  "partner1": { name: "Our Partner", email: "partner1@gmail.com" },
  "partner-1": { name: "Our Partner", email: "partner1@gmail.com" },
  "johnsamuel": { name: "John Samuel", email: "johnsamuel@gmail.com" },
  "shailesh-sivan": { name: "Shailesh Sivan", email: "shaileshsivan@gmail.com" },
  "alen-jacob": { name: "Alen Jacob", email: "alenjacob@gmail.com" },
  "cheriyan": { name: "Cheriyan", email: "cheriyan@gmail.com" },
  "sakilan": { name: "Sakilan", email: "sakilan@gmail.com" },
  "default": { name: "Partnership Team", email: "partnerships@socialbureau.com" }
};

export default function PartnershipChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const pathPart = location.pathname.split("/").pop().toLowerCase();
  const currentPartner = PARTNER_DATA[pathPart] || PARTNER_DATA["default"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Initial bot message when component mounts
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Hi there! Welcome. Could you please tell me your name?",
        inputType: "text",
      },
    ]);

    return () => {};
  }, []);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    processUserInput(inputValue);
  };

  const processUserInput = (value) => {
    const newMessages = [
      ...messages,
      { id: Date.now(), sender: "user", text: value },
    ];
    setMessages(newMessages);
    setInputValue("");

    setTimeout(() => {
      if (step === 1) {
        setUserName(value);
        setStep(1.5);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Nice to meet you, ${value}! Could you also provide your email address?`,
            inputType: "text"
          },
        ]);
      } else if (step === 1.5) {
        setUserEmail(value);
        
        // Check if the user already has a meeting scheduled
        fetch(`${import.meta.env.VITE_API_URL}/partners/check-meeting?email=${value}`)
          .then(res => res.json())
          .then(data => {
            if (data.exists) {
              setStep(1.7);
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "bot",
                  text: `Welcome back! It looks like you already have a meeting scheduled for ${new Date(data.userDate).toLocaleString()}. Would you like to reschedule it?`,
                  options: ["Yes, reschedule", "No, keep current"],
                },
              ]);
            } else {
              setStep(2);
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "bot",
                  text: `Thanks! What type of service are you looking for?`,
                  options: [
                    "Social Media Marketing",
                    "Web Development",
                    "SEO & Paid Ads",
                    "Other",
                  ],
                },
              ]);
            }
          })
          .catch(() => {
            // Fallback: if check fails or endpoint doesn't exist, proceed normally
            setStep(2);
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: `Thanks! What type of service are you looking for?`,
                options: [
                  "Social Media Marketing",
                  "Web Development",
                  "SEO & Paid Ads",
                  "Other",
                ],
              },
            ]);
          });
      } else if (step === 3 && value) {
        setStep(4);
        
        const userDate = new Date(value).toISOString();
        
        // Attempting to send automatically via backend endpoint
        fetch(`${import.meta.env.VITE_API_URL}/partners/schedule-meeting`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName,
            userEmail,
            selectedService,
            userDate,
            partnerEmail: currentPartner.email,
            partnerName: currentPartner.name,
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.alreadyScheduled) {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: `Wait! It looks like you already have a meeting scheduled for ${new Date(data.data.userDate).toLocaleString()}. \n\nWe will send the official Google Meet link 12 hours before the meeting starts. Please check your email for the invite!`,
              },
            ]);
            return;
          }

          const displayDate = new Date(userDate).toLocaleString();
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: `Great, ${userName}! Your meeting with ${currentPartner.name} is registered for ${displayDate}. \n\nWe will send the official Google Meet link to your email (${userEmail}) 12 hours before the meeting starts. \n\nPlease check your email for the confirmation and calendar invite!`,
            },
          ]);
        })
        .catch(err => {
          console.error("Error scheduling meeting:", err);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: `Sorry, there was an error scheduling your meeting. Please try again later or contact us directly.`,
            },
          ]);
        });
      }
    }, 600);
  };

  const handleOptionSelect = (option) => {
    const newMessages = [
      ...messages,
      { id: Date.now(), sender: "user", text: option },
    ];
    setMessages(newMessages);

    setTimeout(() => {
      if (step === 1.7) {
        if (option === "Yes, reschedule") {
          setStep(3);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "No problem! Please select a new preferred date and time.",
              inputType: "datetime-local",
            },
          ]);
        } else {
          setStep(4);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "Sounds good! We'll see you at your scheduled time. Have a great day!",
            },
          ]);
        }
      } else if (step === 2) {
        setStep(3);
        setSelectedService(option);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Got it. You are interested in ${option}. Would you like to schedule a time to discuss further?`,
            options: ["Yes, schedule a time", "No, not right now"],
          },
        ]);
      } else if (step === 3) {
        if (option === "Yes, schedule a time") {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "Please select a preferred date and time.",
              inputType: "datetime-local",
            },
          ]);
        } else {
          setStep(4);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "No problem. We will reach out to you via email. Have a great day!",
            },
          ]);
        }
      }
    }, 600);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={styles.avatar}>SB</div>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>{currentPartner.name} Support</h4>
            </div>
            <button onClick={toggleChat} style={styles.closeBtn}>
              &times;
            </button>
          </div>
          
          <div style={styles.messagesContainer}>
            {messages.map((msg, idx) => (
              <div key={msg.id || idx} style={msg.sender === "bot" ? styles.botRow : styles.userRow}>
                {msg.sender === "bot" && <div style={{...styles.avatarSmall, marginRight: '8px'}}>SB</div>}
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '75%' }}>
                  <div style={msg.sender === "bot" ? styles.botMsg : styles.userMsg}>
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div style={styles.optionsContainer}>
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionSelect(opt)}
                          style={styles.optionBtn}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {!messages[messages.length - 1]?.options && step !== 4 && (
            <form onSubmit={handleSend} style={styles.inputArea}>
              {messages[messages.length - 1]?.inputType === "datetime-local" ? (
                <input
                  type="datetime-local"
                  style={styles.input}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
              ) : (
                <input
                  type="text"
                  placeholder="Type your message..."
                  style={styles.input}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
              )}
              <button type="submit" style={styles.sendBtn}>
                <i className="fa-solid fa-paper-plane" style={{ fontSize: '14px' }}></i>
              </button>
            </form>
          )}
        </div>
      )}

      {!isOpen && (
        <button onClick={toggleChat} style={styles.fab}>
          <i className="fa-regular fa-comments"></i>
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: 9999,
    fontFamily: "'Inter', sans-serif",
  },
  fab: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#161616",
    color: "#fff",
    border: "2px solid #555",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    transition: "transform 0.2s ease",
  },
  chatWindow: {
    width: "min(350px, calc(100vw - 60px))",
    height: "min(500px, calc(100vh - 100px))",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",

    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid #eaeaea",
  },
  header: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  avatarSmall: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "10px",
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  },
  messagesContainer: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  botRow: {
    display: "flex",
    justifyContent: "flex-start",
  },
  userRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  botMsg: {
    backgroundColor: "#e8e8e8",
    color: "#111",
    padding: "10px 14px",
    borderRadius: "14px 14px 14px 4px",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  userMsg: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "14px 14px 4px 14px",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
  optionBtn: {
    backgroundColor: "#fff",
    border: "1px solid #111",
    color: "#111",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
  },
  inputArea: {
    display: "flex",
    padding: "14px",
    borderTop: "1px solid #eaeaea",
    backgroundColor: "#fff",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    color: "#111",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  sendBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

