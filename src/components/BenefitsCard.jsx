import React from "react";

export default function BenefitsCard({ benefits }) {
  let benefitsHtml;
  if (!benefits || benefits.length === 0) {
    benefitsHtml = <p className="text-gray-500">Could not determine specific primary benefits for this food type.</p>;
  } else {
    benefitsHtml = benefits.map((item, idx) => (
      <div key={idx} className="mb-3 p-3 bg-green-100 rounded-lg">
        <p className="font-semibold text-green-800">{item.benefit}</p>
        <p className="text-xs text-green-700 mt-0.5">{item.explanation}</p>
      </div>
    ));
  }

  return (
    <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md mb-6">
      <h3 className="text-xl font-semibold text-green-700 mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 mr-2 text-green-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Primary Health Benefits
      </h3>
      <div id="healthBenefits" className="prose max-w-none text-gray-700 text-sm">
        {benefitsHtml}
      </div>
    </div>
  );
}
