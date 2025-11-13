const LoadingSpinner = () => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80`}>
      <img
        src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1763017537/Loading_rsrvhe.gif"
        alt="loading"
        width="128"
        height="128"
        className="object-contain animate-fade-in"
        style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.6))" }}
      />
    </div>
  );
};

export default LoadingSpinner;
