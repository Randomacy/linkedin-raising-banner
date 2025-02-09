"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setImage(null); // Reset image when closing modal
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (imageContainerRef.current) {
      const canvas = await html2canvas(imageContainerRef.current, {
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "profile_with_overlay.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Section */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          #Raising frame
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
          upload profile pic
        </button>
      </div>

      {/* Bottom Section (Images) */}
      <div className="max-w-lg mx-auto">
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] overflow-y-auto flex flex-col bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              1. Upload Profile Picture
            </h3>

            {/* Upload Section */}
            {!image ? (
              <div
                className="bg-gray-100 p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
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
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4M12 3v12"
                  />
                </svg>
                <p className="text-gray-600 mt-2">
                  Drag and drop your profile picture here, or click to upload
                </p>
              </div>
            ) : (
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
            )}

            {/* Download Button */}
            {image && (
              <button
                onClick={downloadImage}
                className="w-full mt-4 bg-gray-900 text-white py-3 rounded-md font-bold hover:bg-gray-800 transition"
              >
                Download Image
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
