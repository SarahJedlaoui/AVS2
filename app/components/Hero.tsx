"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import CircularProgress from "@mui/material/CircularProgress";

const PDFCarousel = dynamic(() => import("./PDFCarousel"), { ssr: false });

const Hero: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const loadPdfFile = async () => {
      const response = await fetch("/pdf.pdf");
      const blob = await response.blob();
      const file = new File([blob], "AfterVisitSummary.pdf", { type: "application/pdf" });
      setPdfFile(file);
    };
    loadPdfFile();
  }, []);

  const handleDownload = () => {
    const url = "/pdf.pdf";
    saveAs(url, "AfterVisitSummary.pdf");
  };

  const handleNavigation = () => {
    router.push("/generativeAI");
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-[#FBF6EF] flex flex-col items-center p-6 font-sans"
    
    >
      {/* Title Section */}
      <h1 className="text-2xl font-semibold ss:text-[72px] text-[52px]  text-black mb-2 text-center mt-20">
        Hi there!
      </h1>
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center mt-5">
      Your after-visit summary is ready
      </h2>

      {/* PDF Preview Section */}
      <div className="w-full max-w-md mb-10 flex justify-center">
        <PDFCarousel />
      </div>

      {/* Download PDF Button */}
      <button
        onClick={handleDownload}
        className="w-full max-w-md bg-white border border-[#4EBE9D] text-[#4EBE9D] rounded-lg py-3 text-center mb-4 font-medium hover:shadow-lg"
      >
        Download PDF
      </button>

      {/* Ask Generative AI Button */}
      <button
        className="w-full max-w-md bg-[#4EBE9D] text-white rounded-lg py-3 text-center font-medium flex items-center justify-center hover:shadow-lg"
        onClick={handleNavigation}
      >
          <>
            <span className="mr-2">Ask Generative AI</span>
          </>
      
      </button>
    </section>
  );
};

export default Hero;
