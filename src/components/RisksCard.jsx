import React from "react";

export default function RisksCard({ risks }) {
  let risksHtml;
  if (!risks || risks.length === 0) {
    risksHtml = <p className="text-gray-500">Could not determine specific long-term risks for this food type, or risks are low with moderate consumption.</p>;
  } else {
    risksHtml = risks.map((item, idx) => (
      <div key={idx} className="mb-3 p-3 bg-yellow-100 rounded-lg">
        <p className="font-semibold text-yellow-800">{item.risk}</p>
        <p className="text-xs text-yellow-700 mt-0.5">{item.explanation}</p>
      </div>
    ));
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-yellow-800 mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 mr-2 text-yellow-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.375a33.52 33.52 0 010-6.75l3.394-1.583a4.5 4.5 0 014.5 0l3.394 1.583a33.52 33.52 0 010 6.75l-3.394 1.583a4.5 4.5 0 01-4.5 0l-3.394-1.583zM14.25 10.5l-4.5 4.5"></path>
        </svg>
        Risks of Excessive/Long-Term Intake
      </h3>
      <div id="healthRisks" className="prose max-w-none text-gray-700 text-sm">
        {risksHtml}
      </div>
    </div>
  );
}
