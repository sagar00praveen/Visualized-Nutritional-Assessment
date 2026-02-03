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
      <div className="mb-8">
        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-3">1. Upload Food Image</label>

        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-48 border-2 border-dashed border-[#E5E5EA] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white relative overflow-hidden group"
        >
          {previewSrc ? (
            <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <span className="text-sm font-medium text-[#1D1D1F]">Click to Upload</span>
              <span className="text-xs text-[#86868B] mt-1">or drag and drop</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      </div>

      <button
        onClick={() => startAnalysis && startAnalysis()}
        disabled={buttonDisabled}
        className="w-full py-4 bg-[#0071E3] text-white font-semibold rounded-full shadow-md hover:bg-[#0077ED] active:scale-95 transition-all text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Health Analysis
      </button>
    </>
  );
}
