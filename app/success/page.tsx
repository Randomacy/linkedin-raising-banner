"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedImage = sessionStorage.getItem("generatedImage");
    if (savedImage) {
      setGeneratedImage(savedImage);
    } else {
      router.push("/"); // Redirect to home if no image exists
    }
  }, [router]);

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "profile_with_overlay.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Success!</h2>
      <p className="text-gray-600 mb-6">May you be the next unicorn 🦄</p>

      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated"
          className="w-[300px] h-[300px] max-w-[300px] max-h-[300px] object-cover rounded-full mb-6"
        />
      )}

      <button
        onClick={downloadImage}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-800 transition-colors mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-download"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
        Download
      </button>
      <button onClick={() => router.push("/")} className="text-grey-900">
        Make another one
      </button>
    </div>
  );
}
