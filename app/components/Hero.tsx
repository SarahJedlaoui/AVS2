// Hero.tsx
"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { slideIn } from "../styles/animations";
import { saveAs } from "file-saver";
import SwipeableCard from "./SwipeableCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdAutoAwesome } from 'react-icons/md';
import CircularProgress from "@mui/material/CircularProgress";

const PDFCarousel = dynamic(() => import("./PDFCarousel"), { ssr: false });

const Hero: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

  const handleSelectedOptions = (options: string[]) => {
    setSelectedOptions(options);
  };

  const handleSubmit = async () => {
    if (!pdfFile || selectedOptions.length === 0) {
      alert("Please select options before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("options", JSON.stringify(selectedOptions));

    setLoading(true);

    try {
      const response = await fetch("https://aftervisit-0b4087b58b8e.herokuapp.com/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { id } = await response.json();

        // Pass selected options and ID to the report page
        const queryString = new URLSearchParams({
          id,
          selectedItems: JSON.stringify(selectedOptions),
        }).toString();

        router.push(`/report?${queryString}`);
      } else {
        alert("Error processing the report");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading data");
    } finally {
      setLoading(false);
    }
  };
  const handleNavigation = () => {
    router.push("/generativeAI");
  };

  return (
    <section id="home" className="flex md:flex-col flex-col paddingY">
      <section className="flex-1 flexStart flex-col xl:px-0 paddingX" >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[100.8px] leading-[75px]">
            Hi there! <br className="sm:block hidden" />
          </h1>
        </div>
        <p className="paragraph max-w-[470px] mt-5">Your after-visit summary is ready</p>
      </section>

      <section
        className="flex-1 flexCenter md:my-0 my-10 relative" >
        <PDFCarousel />
      </section>

      <div className="flexCenter">
        <button
          onClick={handleNavigation}
          className="bg-customblue text-white px-4 py-2 rounded-full"
        >
          Ask Generative AI 
        </button>
      </div>

      {/* Add SwipeableCard component with callback for selected options */}
      <SwipeableCard onSelectOptions={handleSelectedOptions} />

      <div className="flexCenter mt-7">
        <button
          className={`rounded-full px-6 py-3 flex items-center justify-center ${
            loading ? "bg-customblue" : "bg-customblue"
          } text-white`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} className="mr-2" />
          ) : (
            <MdAutoAwesome className="mr-2 text-white" />
          )}
          Submit {"  "}
         
        </button>
      </div>
    </section>
  );
};

export default Hero;
