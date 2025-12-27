import React, { useState } from "react";

const characters = [
  {
    id: 1,
    name: "Explorer",
    image: "/characters/explorer.png",
    desc: "Curious, brave, always moving forward"
  },
  {
    id: 2,
    name: "Thinker",
    image: "/characters/thinker.png",
    desc: "Logical, calm, strategic mind"
  },
  {
    id: 3,
    name: "Creator",
    image: "assets/creator.png",
    desc: "Imaginative, expressive, artistic"
  },
  {
    id: 4,
    name: "Guardian",
    image: "assets/guardian.jpg",
    desc: "Protective, strong, reliable"
  }
];

export default function ChooseCharacter() {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <section className="min-h-screen bg-black text-white px-6 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 opacity-30 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-semibold mb-3">Choose Your Character</h1>
        <p className="text-white/60">
          Select a character and attach your message
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => setSelected(char)}
            className={`cursor-pointer rounded-3xl p-5 bg-gradient-to-b from-[#0d1016] to-[#07090d]
              border transition-all duration-300
              ${
                selected?.id === char.id
                  ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)] scale-105"
                  : "border-white/10 hover:border-white/30"
              }`}
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-56 object-contain mb-4"
            />

            <h3 className="text-xl font-medium mb-1">{char.name}</h3>
            <p className="text-sm text-white/60">{char.desc}</p>
          </div>
        ))}
      </div>

      {/* Message Card */}
      {selected && (
        <div className="relative z-10 max-w-xl mx-auto mt-16">
          <div className="rounded-3xl bg-gradient-to-b from-[#0d1016] to-[#07090d] border border-purple-500/40 shadow-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="text-lg font-semibold">{selected.name}</h4>
                <p className="text-xs text-white/60">
                  Add a message for this character
                </p>
              </div>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={4}
              className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
            />

            <button
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 transition"
            >
              Save Message
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
