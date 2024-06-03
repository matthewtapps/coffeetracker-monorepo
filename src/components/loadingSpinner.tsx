import React from "react";

const Spinner: React.FC = () => {
  const spinnerContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const spinnerStyle: React.CSSProperties = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#22a6b3",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
