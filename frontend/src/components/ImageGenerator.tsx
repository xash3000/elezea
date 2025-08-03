// ImageGenerator.tsx
import { useEffect, useState } from "react";

type Props = {
  onImageDataChange: (image: { id: number; url: string }) => void;
};

export default function ImageGenerator({ onImageDataChange }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const fallbackImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
  ];

  const getImageFromBackend = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch("https://localhost:7259/api/images/random");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      if (!data?.url || !data?.id) throw new Error("Invalid image data");

      setImageUrl(data.url);
      onImageDataChange({ id: data.id, url: data.url });
    } catch (err) {
      console.error("Fetch error:", err);
      if (retryCount < 2) {
        return getImageFromBackend(retryCount + 1);
      }
      const fallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
      setImageUrl(fallback);
      onImageDataChange({ id: -1, url: fallback }); // fallback image
      setError("Using fallback image after retries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImageFromBackend();
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
      <img
        src={imageUrl}
        alt="Random scene for writing inspiration"
        className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
        onError={() => {
          const fallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
          setImageUrl(fallback);
          onImageDataChange({ id: -1, url: fallback });
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
