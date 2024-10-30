"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { slideIn } from "../styles/animations";
import { MdAutoAwesome } from 'react-icons/md';

const ReportPage: React.FC = () => {
  const router = useRouter(); // Initialize the router

  return (
    <section className="flex md:flex-row flex-col items-center justify-center h-screen ">

      {/* Title Section */}
      <motion.div
        className="flex flex-col items-center text-center paddingX"
        variants={slideIn("top", "tween", 0.2, 1.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 className="font-poppins font-semibold text-2xl text-black mb-2 flex items-center ">
          <MdAutoAwesome className="text-balck-400 text-2xl" /> {" "}
          Analyzing...</h1>
        
      </motion.div>

      {/* Progress Bar */}
      
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "80%" }} // Adjust width based on progress
        ></div>
     

      {/* Report Cards */}
      <div className="mt-6 flex flex-col space-y-4 w-3/4">
        {["Found 2 Action Items", "Found 5 Questions", "Found 7 Resources", "Found 2 Medications"].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl p-4 shadow-lg flex items-center justify-between"
            variants={slideIn("bottom", "tween", 0.2 * (index + 1), 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <MdAutoAwesome className="text-gray-400 text-2xl" />
            <p className="text-gray-700 font-medium">{item}</p>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex space-x-4">
      <button
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium"
          onClick={() => router.push("/")} // Navigate to homepage on click
        >
          Previous
        </button>
        <button className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center">
          Generate Report
          <MdAutoAwesome className="ml-2 text-white" />
        </button>
      </div>
    </section>
  );
};

export default ReportPage;
