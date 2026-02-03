import React from "react";

const HumanBody = ({ highlightedParts = [] }) => {
    const parts = {
        head: false,
        brain: false,
        eyes: false,
        heart: false,
        lungs: false,
        liver: false,
        digestion: false,
        muscle: false,
        bones: false,
        skin: false,
        immunity: false
    };

    highlightedParts.forEach(part => {
        const p = part.toLowerCase();
        if (parts.hasOwnProperty(p)) parts[p] = true;
        if (p === 'stomach' || p === 'gut') parts.digestion = true;
        if (p === 'vision') parts.eyes = true;
        if (p === 'strength') parts.muscle = true;
    });

    const getFill = (isActive) => isActive ? "#4ade80" : "#cbd5e1";
    const getOpacity = (isActive) => isActive ? 1 : 0.3;
    const getFilter = (isActive) => isActive ? "url(#glow)" : "";

    return (
        <svg viewBox="0 0 300 600" className="w-full h-full max-h-[500px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Full Body Silhouette (Includes Arms & Hands) 
          Coordinates approximated for a standing figure with arms at sides.
      */}
            <path
                id="body-silhouette"
                d="M150,20 
           Q130,20 120,40 Q115,55 120,70 Q125,85 135,90 
           L110,100 Q90,105 80,130 
           L70,200 Q65,240 60,260 Q55,270 65,275 Q75,270 80,250 
           L90,160 Q95,140 100,140 
           L100,280 Q95,330 95,380 
           L90,500 Q85,550 110,560 Q130,570 145,550 
           L148,420 L152,420 
           L155,550 Q170,570 190,560 Q215,550 210,500 
           L205,380 Q205,330 200,280 
           L200,140 Q205,140 210,160 
           L220,250 Q225,270 235,275 Q245,270 240,260 Q235,240 230,200 
           L220,130 Q210,105 190,100 
           L165,90 Q175,85 180,70 Q185,55 180,40 Q170,20 150,20 Z"
                fill="#f1f5f9"
                stroke="#94a3b8"
                strokeWidth="2"
            />

            {/* Brain */}
            <g opacity={getOpacity(parts.brain)} filter={getFilter(parts.brain)}>
                <path d="M135 35 Q130 45 135 55 Q150 65 165 55 Q170 45 165 35 Q150 25 135 35 Z" fill={getFill(parts.brain)} />
            </g>

            {/* Eyes */}
            <g opacity={getOpacity(parts.eyes)} filter={getFilter(parts.eyes)}>
                <circle cx="142" cy="55" r="3" fill={getFill(parts.eyes)} />
                <circle cx="158" cy="55" r="3" fill={getFill(parts.eyes)} />
            </g>

            {/* Lungs */}
            <g opacity={getOpacity(parts.lungs)} filter={getFilter(parts.lungs)}>
                <path d="M115 130 C110 160 130 180 145 180 V 130 Z" fill={getFill(parts.lungs)} />
                <path d="M185 130 C190 160 170 180 155 180 V 130 Z" fill={getFill(parts.lungs)} />
            </g>

            {/* Heart */}
            <g opacity={getOpacity(parts.heart)} filter={getFilter(parts.heart)}>
                <path d="M150 145 C140 135 130 145 135 160 L150 175 L165 160 C170 145 160 135 150 145Z" fill="#ef4444" opacity={parts.heart ? 1 : 0.2} />
            </g>

            {/* Liver / Digestion */}
            <g opacity={getOpacity(parts.liver || parts.digestion)} filter={getFilter(parts.liver || parts.digestion)}>
                {/* Reformed as a simple stomach area */}
                <path d="M130 200 Q120 200 120 220 Q120 240 150 240 Q180 240 180 220 Q180 200 170 200 Q150 190 130 200 Z" fill={getFill(parts.liver || parts.digestion)} />
            </g>

            {/* Muscles (Overlay on Arms/Legs) */}
            <g opacity={getOpacity(parts.muscle)} filter={getFilter(parts.muscle)}>
                {/* Left Arm Muscle */}
                <path d="M110 100 Q90 105 80 130 L70 200 L80 250 L90 160 L100 140" fill={getFill(parts.muscle)} opacity="0.6" />
                {/* Right Arm Muscle */}
                <path d="M190 100 Q210 105 220 130 L230 200 L220 250 L210 160 L200 140" fill={getFill(parts.muscle)} opacity="0.6" />
                {/* Leg Muscles */}
                <path d="M100 280 L95 380 L90 500 L110 560 L145 550 L148 420 Z" fill={getFill(parts.muscle)} opacity="0.4" />
                <path d="M200 280 L205 380 L210 500 L190 560 L155 550 L152 420 Z" fill={getFill(parts.muscle)} opacity="0.4" />
            </g>

            {/* Bones (Skeleton Lines) */}
            {parts.bones && (
                <g stroke="#fff" strokeWidth="4" opacity="0.7">
                    <line x1="150" y1="90" x2="150" y2="280" /> {/* Spine */}
                    <line x1="110" y1="100" x2="190" y2="100" /> {/* Shoulders */}
                    <line x1="110" y1="100" x2="80" y2="250" /> {/* L Arm */}
                    <line x1="190" y1="100" x2="220" y2="250" /> {/* R Arm */}
                    <line x1="100" y1="280" x2="100" y2="550" /> {/* L Leg */}
                    <line x1="200" y1="280" x2="200" y2="550" /> {/* R Leg */}
                </g>
            )}

            {/* Skin (Outline Glow) */}
            {parts.skin && (
                <path
                    d="M150,20 Q130,20 120,40 Q115,55 120,70 Q125,85 135,90 L110,100 Q90,105 80,130 L70,200 Q65,240 60,260 Q55,270 65,275 Q75,270 80,250 L90,160 Q95,140 100,140 L100,280 Q95,330 95,380 L90,500 Q85,550 110,560 Q130,570 145,550 L148,420 L152,420 L155,550 Q170,570 190,560 Q215,550 210,500 L205,380 Q205,330 200,280 L200,140 Q205,140 210,160 L220,250 Q225,270 235,275 Q245,270 240,260 Q235,240 230,200 L220,130 Q210,105 190,100 L165,90 Q175,85 180,70 Q185,55 180,40 Q170,20 150,20 Z"
                    fill="none"
                    stroke="#f472b6"
                    strokeWidth="4"
                    filter="url(#glow)"
                    opacity="0.8"
                />
            )}

        </svg>
    );
};

export default HumanBody;
