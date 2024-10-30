// PDFCarousel.tsx
"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFCarousel: React.FC = () => {
  // Initialize scroll mode plugin to enable single page scrolling
  const scrollModePluginInstance = scrollModePlugin();

  return (
    <div style={{ height: "350px", width: "80%", borderRadius: "15px", overflow: "hidden", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <Viewer
          fileUrl="/pdf.pdf"
          plugins={[scrollModePluginInstance]} // Enable scrolling mode
          theme="light" // Optional: Ensures a light theme
         
        />
      </Worker>
    </div>
  );
};

export default PDFCarousel;
