"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    if (imageContainerRef.current) {
      const canvas = await html2canvas(imageContainerRef.current, {
        backgroundColor: null,
      });
      const imageData = canvas.toDataURL("image/png");
      sessionStorage.setItem("generatedImage", imageData);
      router.push("/success");
    }
  };

  const removeImage = () => setImage(null);

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          #Raising F(r)ame
        </h2>
        <p className="text-base sm:text-2xl text-gray-500 mb-8">
          let VCs know you're raising. close rounds faster.
        </p>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 transition shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-upload"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          Upload profile pic
        </button>
      </div>

      {/* <div className="max-w-lg mx-auto">
        <div className="flex flex-col gap-8">
          <img
            src="/jackie-raising-banner.png"
            alt="Jackie"
            className="w-[512px] h-[186px] object-cover rounded-lg"
          />
          <img
            src="/kenneth-raising-banner.png"
            alt="Kenneth"
            className="w-[512px] h-[186px] object-cover rounded-lg"
          />
        </div>
      </div> */}
      <div className="max-w-lg mx-auto sm:px-2">
        <div className="flex flex-col gap-8">
          <img
            src="/jackie-raising-banner.png"
            alt="Jackie"
            className="w-full max-w-[512px] h-auto object-cover rounded-lg mx-auto"
          />
          <img
            src="/kenneth-raising-banner.png"
            alt="Kenneth"
            className="w-full max-w-[512px] h-auto object-cover rounded-lg mx-auto"
          />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          onClick={closeModal}
        >
          <div
            className="max-h-[95vh] w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Upload Profile Picture
            </h3>

            {!image ? (
              <div
                className="bg-gray-100 h-60 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer transition hover:border-gray-400"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="text-gray-600 mt-2 text-sm">Browse to upload</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div
                  ref={imageContainerRef}
                  className="relative w-[512px] h-[512px] mx-auto"
                >
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <img
                    src="/raising-overlay.png"
                    alt="Overlay"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <button
                  onClick={removeImage}
                  className="mt-4 text-red-500 text-sm hover:text-red-700"
                >
                  ✖ Remove
                </button>
              </div>
            )}

            {image && (
              <button
                onClick={generateImage}
                className="w-full mt-6 bg-gray-900 text-white py-4 rounded-md font-bold hover:bg-gray-800 transition"
              >
                Generate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
