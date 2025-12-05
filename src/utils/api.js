import { sleep } from "./helpers";


const API_KEY = import.meta.env.VITE_GEMINI_KEY; 
const MODEL = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;


export function createPayload(imageBase64, mimeType = "image/jpeg") {
  const userQuery = `Analyze the food item in the image. I need a structured JSON output only. Provide a balanced report covering nutritional value, primary benefits, and long-term risks associated with consuming this food type.

The JSON must contain three main sections:
1. 'nutritionalAnalysis': A detailed analysis including the food's name, primary ingredients, and estimated macronutrients/calories per typical serving.
2. 'healthBenefits': A list of 2-3 primary health benefits derived from the nutrients in this food (e.g., fiber, vitamins, healthy fats).
3. 'healthRisks': A list of 2-3 major health risks or issues linked to the excessive, long-term consumption of this specific food type, particularly if it's high in fat, sugar, or salt.

Structure the output as a single JSON object conforming to the provided schema. Do not include any text outside the JSON block.`;

  const systemPrompt = "You are an expert nutritional analyst and wellness advisor. Your goal is to provide accurate, balanced, and critical information about any food item based on an image input. You must respond strictly in the requested JSON format.";

  const schema = {
    type: "OBJECT",
    properties: {
      nutritionalAnalysis: {
        type: "OBJECT",
        description: "Detailed analysis of the food item in the image.",
        properties: {
          foodName: { type: "STRING", description: "The most likely name of the food item (e.g., 'Grilled Salmon with Asparagus')." },
          description: { type: "STRING", description: "A summary of ingredients and estimated nutritional value." },
          estimatedServing: { type: "STRING", description: "Estimated nutritional information per serving (e.g., '450-550 kcal, High Protein, Low Carb')." }
        },
        propertyOrdering: ["foodName", "description", "estimatedServing"]
      },
      healthBenefits: {
        type: "ARRAY",
        description: "A list of primary health benefits of this food.",
        items: {
          type: "OBJECT",
          properties: {
            benefit: { type: "STRING", description: "The name of the health benefit (e.g., 'Improved Heart Health')." },
            explanation: { type: "STRING", description: "The mechanism linking the food to the benefit (1-2 sentences)." }
          },
          propertyOrdering: ["benefit", "explanation"]
        }
      },
      healthRisks: {
        type: "ARRAY",
        description: "A list of diseases or health issues linked to excessive consumption of this food type.",
        items: {
          type: "OBJECT",
          properties: {
            risk: { type: "STRING", description: "The name of the health risk (e.g., 'Type 2 Diabetes')." },
            explanation: { type: "STRING", description: "The mechanism linking the food to the risk (1-2 sentences)." }
          },
          propertyOrdering: ["risk", "explanation"]
        }
      }
    },
    propertyOrdering: ["nutritionalAnalysis", "healthBenefits", "healthRisks"]
  };

  return {
    contents: [{
      parts: [
        { text: userQuery },
        { inlineData: { mimeType, data: imageBase64 } }
      ]
    }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  };
}


export async function fetchWithRetry(payload, maxRetries = 5, initialDelay = 1000) {
  let delay = initialDelay;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (resp.status === 429) {
        
        await sleep(delay);
        delay *= 2;
        continue;
      }

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        throw new Error(`API call failed with status ${resp.status}: ${body.error?.message || resp.statusText}`);
      }

      return await resp.json();
    } catch (err) {
      if (attempt === maxRetries - 1) {
        throw err;
      }
      await sleep(delay);
      delay *= 2;
    }
  }

  throw new Error("Failed to fetch after retries.");
}
