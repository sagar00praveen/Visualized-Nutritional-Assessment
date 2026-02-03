import React from "react";

export default function LoadingStatus() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center space-y-3">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <span className="text-sm font-semibold text-green-700 animate-pulse">Scanning Bio-Data...</span>
    </div>
  );
}
