import React, { useState } from "react";

const themeColorsStyles = {
  PINK: {
    gradient: "from-[#f6539d]/10 to-[#f6539d]",
    text: "text-[#f6539d]",
    background: "bg-[#f6539d]/10",
  },
  ORANGE: {
    gradient: "from-[#ff3e00]/10 to-[#ff3e00]",
    text: "text-[#ff3e00]",
    background: "bg-[#ff3e00]/10",
  },
  GREEN: {
    gradient: "from-[#5ce65c]/10 to-[#5ce65c]",
    text: "text-[#5ce65c]",
    background: "bg-[#5ce65c]/10",
  },
  YELLOW: {
    gradient: "from-[#ffde21]/10 to-[#ffde21]",
    text: "text-[#ffde21]",
    background: "bg-[#ffde21]/10",
  },
} as const;

const AnimatedButton = ({
  theme = "PINK",
  children,
}: {
  theme?: keyof typeof themeColorsStyles;
  children: React.ReactNode;
}) => {
  const [effectPosition, setEffectPosition] = useState({
    left: "0",
    top: "0",
    opacity: 0,
  });

  const moveEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setEffectPosition({
      left: `${mouseX}px`,
      top: `${mouseY}px`,
      opacity: 1,
    });
  };

  const hideEffect = () => {
    setEffectPosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <button
      className="relative overflow-hidden rounded-xl p-2 w-60 bg-white/10 shadow-lg transition-all hover:cursor-pointer"
      onMouseMove={moveEffect}
      onMouseLeave={hideEffect}
    >
      {/* Underlay */}
      <div className="absolute inset-[1px] bg-[#131517] rounded-xl pointer-events-none" />

      {/* Glow Effect */}
      <div
        className="absolute inset-[-10px] transition-opacity duration-300 saturate-200 pointer-events-none"
        style={{
          opacity: effectPosition.opacity,
          maskImage: `radial-gradient(160px at ${effectPosition.left} ${effectPosition.top}, rgb(255, 255, 255), rgba(255, 255, 255, 0))`,
        }}
      >
        <div
          className={`absolute inset-[-10px] bg-gradient-to-r ${themeColorsStyles[theme].gradient}`}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-[1px] bg-[#222425]/80 rounded-xl pointer-events-none" />

      {/* Content */}
      <div className="relative flex items-center gap-3 transition-all duration-300 pointer-events-none">
        {children}
      </div>
    </button>
  );
};

export { themeColorsStyles };
export default AnimatedButton;
