import React, { useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import LoadingStatus from "../components/LoadingStatus";
import Results from "../components/Results";
import CustomModal from "../components/CustomModal";

import { createPayload, fetchWithRetry } from "../utils/api";

// This is the new Home Page component
export default function HomePage() {
  const [imageData, setImageData] = useState(null);
  const [mimeType, setMimeType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [modal, setModal] = useState({ visible: false, title: "", message: "" });

  const showModal = (title, message) => {
    setModal({ visible: true, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  const startAnalysis = async () => {
    if (!imageData) {
      showModal("Missing Image", "Please upload a food image to start the analysis.");
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const payload = createPayload(imageData, mimeType);
      const response = await fetchWithRetry(payload);

      const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) throw new Error("AI returned no valid response.");

      const json = JSON.parse(responseText);
      setResults(json);

    } catch (err) {
      showModal("Analysis Failed", err.message);
    }

    setLoading(false);
  };

  return (
    // The main container structure remains here
    <div className="min-h-screen flex justify-center items-start bg-gray-100 p-4 md:p-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10 mx-auto">
        
        <Header />

        <ImageUpload 
          setImageData={setImageData} 
          setMimeType={setMimeType}
          showModal={showModal}
          startAnalysis={startAnalysis} 
        />

        {loading && <LoadingStatus />}

        {results && <Results data={results} />}

        {modal.visible && (
          <CustomModal 
            title={modal.title} 
            message={modal.message} 
            closeModal={closeModal} 
          />
        )}
      </div>
    </div>
  );
}