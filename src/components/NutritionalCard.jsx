import React from "react";

export default function NutritionalCard({ nutritional }) {
  if (!nutritional) {
    return <p className="text-gray-500">Nutritional information not available.</p>;
  }

  return (
    <>
      <p className="font-bold text-lg mb-1">{nutritional.foodName}</p>
      <p className="text-sm italic mb-2">Estimated Serving: <span className="text-green-600 font-semibold">{nutritional.estimatedServing}</span></p>
      <p>{nutritional.description}</p>
    </>
  );
}
