"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2800,
        style: {
          background: "#014958",
          color: "#F7F2EA",
          fontFamily: "var(--font-jost)",
          fontSize: "13px",
          letterSpacing: "0.05em",
          padding: "14px 20px",
          border: "1px solid #C6A46A",
        },
        success: {
          iconTheme: {
            primary: "#C6A46A",
            secondary: "#014958",
          },
        },
      }}
    />
  );
}
