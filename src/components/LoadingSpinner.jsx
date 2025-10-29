import React from "react";
import dhanovaLogo from "../assets/dhanova_logo.png"; // adjust path if needed

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <img
        src={dhanovaLogo}
        alt="Loading..."
        style={{
          width: "80px",
          height: "80px",
          animation: "spin 2s linear infinite",
        }}
      />

      {/* Inline keyframes for spin */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
