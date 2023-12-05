import React from "react";

interface NotFoundProps {
  header?: string;
  message?: string;
}

export default function NotFound({
  header = "Page Not Found",
  message = "Drop your phone and go get a fresh beer",
}: NotFoundProps) {

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Center vertically on the entire viewport height
    width: "100vw", // Center horizontally on the entire viewport width
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "50px",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    fontSize: "24px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{header}</h1>
      <p style={paragraphStyle}>{message}</p>
    </div>
  );
}
