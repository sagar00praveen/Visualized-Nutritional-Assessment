import React from "react";
import NutritionalCard from "./NutritionalCard";
import BenefitsCard from "./BenefitsCard";
import RisksCard from "./RisksCard";


export default function Results({ data }) {
  if (!data) return null;

  return (
    <div id="results" className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Nutrition Analysis</h2>

      <div className="bg-gray-50 p-4 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 mr-2 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.875a6 6 0 017.5 7.5l-2.25 2.25l-2.25-2.25a6 6 0 01-10.5 0l-2.25-2.25l2.25-2.25a6 6 0 017.5 7.5zM12 21.75l-4.5-4.5"></path>
          </svg>
          Macronutrient Breakdown
        </h3>
        <div id="nutritionalInfo" className="prose max-w-none text-gray-600 text-sm">
          <NutritionalCard nutritional={data.nutritionalAnalysis} />
        </div>
      </div>

      <BenefitsCard benefits={data.healthBenefits} />

      <RisksCard risks={data.healthRisks} />
    </div>
  );
}
