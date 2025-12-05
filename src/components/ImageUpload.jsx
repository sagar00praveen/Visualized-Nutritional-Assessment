import React, { useRef, useState } from "react";


export default function ImageUpload({ setImageData, setMimeType, showModal, startAnalysis }) {
  const inputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearPreview();
      return;
    }

    if (file.size > 15 * 1024 * 1024) { 
      showModal("File Too Large", "Please select an image smaller than 15MB.");
      inputRef.current.value = "";
      clearPreview();
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setPreviewSrc(dataUrl);
      const [header, data] = dataUrl.split(',');
      const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
      setImageData(data);
      setMimeType(mime);
      setButtonDisabled(false);
    };
    reader.readAsDataURL(file);
  };

  const clearPreview = () => {
    setPreviewSrc("");
    setImageData(null);
    setMimeType(null);
    setButtonDisabled(true);
  };

  return (
    <>
      <div className="mb-6">
        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">1. Upload Food Image</label>
        <input
          ref={inputRef}
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
        />
        <div id="imagePreviewContainer" className={`${previewSrc ? "mt-4 border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50" : "hidden"}`}>
          <img id="imagePreview" src={previewSrc} alt="Image Preview" className="w-full h-48 object-contain rounded-lg" />
        </div>
      </div>

      <button
        id="analyzeButton"
        onClick={() => startAnalysis && startAnalysis()}
        disabled={buttonDisabled}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg transition duration-200 hover:bg-green-600 disabled:bg-green-300"
        aria-disabled={buttonDisabled}
      >
        Generate Full Health Report
      </button>
    </>
  );
}
