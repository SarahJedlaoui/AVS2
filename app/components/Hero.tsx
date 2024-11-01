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
const PDFCarousel = dynamic(() => import("./PDFCarousel"), { ssr: false });

const Hero: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();

  // Load the PDF file as a Blob and create a File object
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

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();

        // Pass selected options and AI data to the report page
        // Pass selected options and AI data to the report page
        const queryString = new URLSearchParams({
          items: JSON.stringify(selectedOptions),
          data: JSON.stringify(responseData),
        }).toString();

        router.push(`/report?${queryString}`);
      } else {
        alert("Error processing the report");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading data");
    }
  };





  return (
    <section id="home" className="flex md:flex-row flex-col paddingY">
      <motion.div
        className="flex-1 flexStart flex-col xl:px-0 paddingX"
        variants={slideIn("left", "tween", 0.2, 1.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[100.8px] leading-[75px]">
            Hi there! <br className="sm:block hidden" />
          </h1>
        </div>
        <p className="paragraph max-w-[470px] mt-5">Your after-visit summary is ready</p>
      </motion.div>

      <motion.div
        className="flex-1 flexCenter md:my-0 my-10 relative"
        variants={slideIn("right", "tween", 0.2, 1.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <PDFCarousel />
      </motion.div>

      <div className="flexCenter">
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Download PDF
        </button>
      </div>

      {/* Add SwipeableCard component with callback for selected options */}
      <SwipeableCard onSelectOptions={handleSelectedOptions} />

      <div className="flexCenter mt-7">
        <button className="rounded-full px-6 py-3 flex items-center justify-center bg-blue-500 text-white" onClick={handleSubmit}>
          <MdAutoAwesome className="mr-2 text-white" /> Submit <MdAutoAwesome className="ml-2 text-white" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
