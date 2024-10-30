// Hero.tsx
"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { slideIn } from "../styles/animations";
import { saveAs } from "file-saver";
import SwipeableCard from "./SwipeableCard"; 
import { MdAutoAwesome } from 'react-icons/md';
import { useRouter } from "next/navigation";

const PDFCarousel = dynamic(() => import("./PDFCarousel"), { ssr: false });

const Hero: React.FC = () => {
  const handleDownload = () => {
    const url = "/sample-pdf-file.pdf"; // Ensure this file is in the public directory
    saveAs(url, "AfterVisitSummary.pdf");
  };
  const router = useRouter(); // Initialize the router
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
          <div className="ss:flex hidden md:mr-4 mr-0">
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 rounded-3xl"
            >
              Download PDF
            </button>
          </div>
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

      <div className="ss:hidden flexCenter">
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Download PDF
        </button>
      </div>

      {/* Add SwipeableCard component */}
      <SwipeableCard />

      <div className="ss:hidden flexCenter mt-7">
      <button className="rounded-full px-6 py-3 flex items-center justify-center bg-blue-500 text-white"  onClick={() => router.push("/report")}>
    <MdAutoAwesome className="mr-2 text-white" /> {/* Left Spark Icon */}
    Submit
    <MdAutoAwesome className="ml-2 text-white" /> {/* Right Spark Icon */}
</button>
      </div>
    </section>
  );
};

export default Hero;
