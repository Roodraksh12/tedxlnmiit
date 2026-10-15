import React from "react";
import "./ShootingStars.css";

export default function ShootingStars({ count = 8 }) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const top = Math.random() * 80;    // anywhere in top 80%
    const left = Math.random() * 100;  // anywhere across the full width
    const delay = Math.random() * 6;   // random delay 0–6s
    const duration = 3 + Math.random() * 3; // random duration 3–6s

    return (
      <div
        key={i}
        className="shooting_star"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return <div className="night">{stars}</div>;
}
