import React from "react";

export default function CustomModal({ title = "Error", message = "", closeModal }) {
  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="glass-card bg-white/90 rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message}</p>
          <button
            onClick={closeModal}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transition-transform active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
