import React from "react";

const MacroChart = ({ macros }) => {
    const { protein = 0, carbs = 0, fats = 0 } = macros || {};

    // Safe defaults if AI fails to return numbers
    const p = protein || 0;
    const c = carbs || 0;
    const f = fats || 0;
    const total = p + c + f || 1;

    // Normalize to 100%
    const pPct = (p / total) * 100;
    const cPct = (c / total) * 100;
    // fPct is remainder

    return (
        <div className="flex flex-col items-center">
            <h4 className="text-sm font-semibold text-gray-600 mb-3">Macronutrients</h4>
            <div className="flex w-full h-4 rounded-full overflow-hidden mb-2 bg-gray-200">
                <div style={{ width: `${pPct}%` }} className="h-full bg-blue-500" title={`Protein: ${p}%`}></div>
                <div style={{ width: `${cPct}%` }} className="h-full bg-green-500" title={`Carbs: ${c}%`}></div>
                <div style={{ flex: 1 }} className="h-full bg-yellow-500" title={`Fats: ${f}%`}></div>
            </div>
            <div className="flex justify-between w-full text-xs text-gray-500 px-1">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Protein ({p}%)</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Carbs ({c}%)</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Fats ({f}%)</div>
            </div>
        </div>
    );
};

export default MacroChart;
