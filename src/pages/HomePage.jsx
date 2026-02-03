import React, { useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import LoadingStatus from "../components/LoadingStatus";
// import Results from "../components/Results"; // Replaced by inline specific displays
import CustomModal from "../components/CustomModal";
import HumanBody from "../components/HumanBody";
import MacroChart from "../components/MacroChart";

import { createPayload, fetchWithRetry } from "../utils/api";

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

    // Safe accessors
    const nutritionalAnalysis = results?.nutritionalAnalysis || {};
    const healthScore = nutritionalAnalysis.healthScore || 0;
    const bodyParts = results?.targetBodyParts || [];
    const macros = results?.macronutrients || { protein: 0, carbs: 0, fats: 0 };

    const getHealthColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 50) return "text-yellow-600";
        return "text-red-500";
    };

    // Educational Data for Initial View
    const EDUCATIONAL_TIPS = [
        { part: "brain", label: "Walnuts & Berries", color: "bg-purple-50 text-purple-600" },
        { part: "eyes", label: "Carrots & Eggs", color: "bg-orange-50 text-orange-600" },
        { part: "heart", label: "Avocado & Salmon", color: "bg-red-50 text-red-600" },
        { part: "muscle", label: "Lean Meat & Beans", color: "bg-blue-50 text-blue-600" },
        { part: "bones", label: "Milk & Greens", color: "bg-stone-50 text-stone-600" },
        { part: "digestion", label: "Yogurt & Fiber", color: "bg-yellow-50 text-yellow-600" },
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-4 lg:p-12 font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* Navbar Minimalist */}
            <nav className="w-full max-w-7xl mx-auto flex justify-between items-center mb-8 px-2">
                <h1 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">NutriScan</h1>
                <div className="w-8 h-8 rounded-full bg-gray-200"></div> {/* Placeholder Profile/Icon */}
            </nav>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Panel: Controls - Span 4 (Sticky on Desktop) */}
                <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8 h-fit">
                    <div className="apple-card p-8 animate-fade-in shadow-sm">
                        <Header />
                        <ImageUpload
                            setImageData={setImageData}
                            setMimeType={setMimeType}
                            showModal={showModal}
                            startAnalysis={startAnalysis}
                        />
                        {loading && <LoadingStatus />}
                    </div>

                    {/* Quick Result Summary Card */}
                    {results && (
                        <div className="apple-card p-6 animate-fade-in border-l-[6px] border-[#34C759]">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">{nutritionalAnalysis.foodName}</h2>
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-[#86868B] rounded-full text-xs font-semibold uppercase tracking-wide mt-2">
                                        {nutritionalAnalysis.category || "General"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider mb-1">Health Score</span>
                                    <div className="relative flex items-center justify-center">
                                        <svg className="w-16 h-16 transform -rotate-90">
                                            <circle cx="32" cy="32" r="28" stroke="#E5E5EA" strokeWidth="6" fill="transparent" />
                                            <circle cx="32" cy="32" r="28" stroke={healthScore >= 80 ? '#34C759' : healthScore >= 50 ? '#FF9F0A' : '#FF3B30'} strokeWidth="6" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * healthScore) / 100} strokeLinecap="round" />
                                        </svg>
                                        <span className="absolute text-xl font-bold text-[#1D1D1F]">{healthScore}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[#1D1D1F] text-base mb-6 leading-relaxed opacity-90">{nutritionalAnalysis.description}</p>
                            <div className="bg-[#F5F5F7] rounded-xl p-4 mb-6">
                                <p className="text-xs font-bold text-[#86868B] uppercase tracking-wider mb-1">Serving Info</p>
                                <p className="text-sm font-medium text-[#1D1D1F]">{nutritionalAnalysis.estimatedServing}</p>
                            </div>
                            <MacroChart macros={macros} />
                        </div>
                    )}
                </div>

                {/* Center/Right Panel: Visualization - Span 8 */}
                <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                    {results ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

                            {/* Body Map Card (Order 2 Mobile, Order 1 Desktop - Front & Center) */}
                            <div className="apple-card p-8 flex flex-col items-center justify-between min-h-[500px] animate-fade-in relative overflow-hidden order-2 md:order-1">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400"></div>
                                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6 self-start">Body Impact</h3>
                                <div className="flex-1 w-full flex items-center justify-center relative">
                                    <HumanBody highlightedParts={bodyParts} />

                                    {/* Floating labels with Apple styling */}
                                    <div className="absolute top-0 right-0 flex flex-col gap-3">
                                        {bodyParts.map(part => (
                                            <div key={part} className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-xs font-semibold text-[#0071E3] border border-blue-100/50">
                                                {part.toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Benefits & Risks Card (Order 1 Mobile, Order 2 Desktop) */}
                            <div className="flex flex-col gap-6 order-1 md:order-2">
                                {/* Benefits */}
                                <div className="apple-card p-8 flex-1 animate-fade-in">
                                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">Health Benefits</h3>
                                    <ul className="space-y-4">
                                        {results.healthBenefits?.map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
                                                <div>
                                                    <p className="font-semibold text-[#1D1D1F] text-sm">{item.benefit}</p>
                                                    <p className="text-xs text-[#86868B] leading-snug mt-1">{item.explanation}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Risks */}
                                {results.healthRisks?.length > 0 && (
                                    <div className="apple-card p-8 flex-1 animate-fade-in border border-red-50 bg-[#FFF5F5]">
                                        <h3 className="text-lg font-semibold text-[#FF3B30] mb-4">Potential Risks</h3>
                                        <ul className="space-y-4">
                                            {results.healthRisks.map((item, i) => (
                                                <li key={i} className="flex gap-4 items-start">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-[#FF3B30] flex items-center justify-center text-white text-xs font-bold shrink-0">!</div>
                                                    <div>
                                                        <p className="font-semibold text-[#1D1D1F] text-sm">{item.risk}</p>
                                                        <p className="text-xs text-[#86868B] leading-snug mt-1">{item.explanation}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>
                    ) : (
                        /* Educational Mode */
                        <div className="h-full apple-card p-8 lg:p-12 flex flex-col md:flex-row items-center justify-center gap-10 animate-fade-in text-center md:text-left">
                            <div className="max-w-md">
                                <h2 className="text-4xl font-bold text-[#1D1D1F] mb-4 tracking-tight">Know Your Body.</h2>
                                <p className="text-lg text-[#86868B] mb-8 font-normal leading-relaxed">Discover how different foods fuel distinct parts of your system. Simple, visual, and backed by data.</p>
                            </div>

                            <div className="relative w-full md:w-auto flex justify-center">
                                <div className="w-64 md:w-80 h-[450px] relative">
                                    <HumanBody highlightedParts={EDUCATIONAL_TIPS.map(t => t.part)} />

                                    {/* Interactive Educational Labels */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        {EDUCATIONAL_TIPS.map((tip, idx) => (
                                            <div
                                                key={tip.part}
                                                className={`absolute ${idx % 2 === 0 ? 'left-0 -translate-x-4 md:-translate-x-12' : 'right-0 translate-x-4 md:translate-x-12'} 
                                                text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm bg-white/95 backdrop-blur-sm
                                                 text-[#1D1D1F] flex items-center gap-2 whitespace-nowrap animate-fade-in transition-transform hover:scale-105`}
                                                style={{ top: `${15 + idx * 13}%` }}
                                            >
                                                {tip.part.toUpperCase()}: <span className="text-[#86868B]">{tip.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {modal.visible && (
                <CustomModal
                    title={modal.title}
                    message={modal.message}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}