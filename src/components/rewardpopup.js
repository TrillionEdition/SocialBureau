function RewardPopup({ reward, onClose }) {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className={`relative p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${reward.color} text-white w-[320px] animate-scaleIn`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">{reward.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{reward.title}</h2>
          <p className="text-sm opacity-90">{reward.description}</p>

          <div className="mt-6 px-4 py-2 bg-white/20 rounded-full text-sm">
            🎉 Reward Unlocked!
          </div>
        </div>
      </div>
    </div>
  );
}
