import React from "react";

export default function CustomModal({ title = "Error", message = "", closeModal }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h3 className="text-xl font-bold mb-3 text-red-600">{title}</h3>
        <p className="text-gray-700 mb-4">{message}</p>
        <button onClick={closeModal} className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">Close</button>
      </div>
    </div>
  );
}
