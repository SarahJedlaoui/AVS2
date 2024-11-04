// ReportPage.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { slideIn } from "../styles/animations";
import { MdAutoAwesome } from "react-icons/md";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

const ReportPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve selected items and the ID from query parameters
  const items = JSON.parse(searchParams.get("selectedItems") || "[]");
  const id = searchParams.get("id");

  useEffect(() => {
    // Redirect to summary page after showing the report page for a few seconds
    const timer = setTimeout(() => {
      if (id) {
        router.push(`/summary?id=${id}`);
      }
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [router, id]);

  return (
    <section className="flex flex-col items-center justify-center h-screen px-4 mt--500">
      <motion.div
        className="flex flex-col items-center text-center mt-2"
        variants={slideIn("top", "tween", 0.2, 1.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 className="font-poppins font-semibold text-2xl text-black mb-1 flex items-center">
          <MdAutoAwesome className="text-black-400 text-2xl mr-1" /> Analyzing...
        </h1>
      </motion.div>

      <div className="w-full max-w-md mt-4">
        <LinearProgress
          color="primary"
          sx={{
            height: 8,
            borderRadius: 4,
          }}
        />
      </div>

      <div className="mt-6 flex flex-col space-y-4 w-full max-w-md">
        {/* Display selected items */}
        {items.map((item: string, index: number) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl p-4 shadow-lg flex items-start gap-4"
            variants={slideIn("bottom", "tween", 0.2 * (index + 1), 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <MdAutoAwesome className="text-gray-400 text-2xl" />
            <p className="text-gray-700 font-medium text-left">{item}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium"
          onClick={() => router.push("/")}
        >
          Previous
        </button>
        <button
          className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center justify-center"
          disabled
        >
          Generating Report
          <CircularProgress color="inherit" size={20} className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default ReportPage;
