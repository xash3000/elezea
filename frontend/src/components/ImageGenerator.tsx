import { useEffect, useState } from "react";

export default function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Enhanced fallback images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=400&fit=crop",
  ];

  const getRandomImage = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Use direct image URLs instead of the random endpoint
      const randomId = Math.floor(Math.random() * 1000);
      const topics = ["nature", "city", "people", "technology", "animals"];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const unsplashUrl = `https://source.unsplash.com/random/600x400/?${randomTopic}&sig=${randomId}`;

      // Verify image loads
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = unsplashUrl;
      });

      setImageUrl(unsplashUrl);
    } catch (err) {
      console.error("Error loading random image:", err);
      const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
      setImageUrl(randomFallback);
      setError("Using fallback image");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRandomImage();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-600 font-medium">Finding inspiration...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg bg-gray-100">
      {/* Using regular img tag instead of Next.js Image */}
      <img
        src={imageUrl}
        alt="Random scene for writing inspiration"
        className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
        onError={() => {
          const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
          setImageUrl(randomFallback);
        }}
      />
      {error && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
