// Summary.tsx
"use client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react"; // Import useEffect to handle logging
import { slideIn } from "../styles/animations";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { MdCalendarToday,MdAutoAwesome } from "react-icons/md"; // Updated icon
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";

const Summary: React.FC = () => {
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  // Log the received data
  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data); // Parse the stringified data
      console.log("Data received on Summary page:", parsedData);
      // Additional handling of parsedData if needed
    }
  }, [data]);

  return (
    <section className="flex flex-col items-center justify-center h-full px-6 py-8 space-y-6 ">
     
      {/* Title Section */}
      <motion.div
        className="flex justify-between w-full max-w-md"
        variants={slideIn("top", "tween", 0.2, 1.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 className="font-semibold text-lg text-gray-800">After Visit Summary</h1>
        <div className="text-gray-600">
          <p>Report: 10/31/24</p>
          <p>Dr. Crotty</p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <p className="text-sm text-gray-700 mb-1">1 of 7 steps completed</p>
        <LinearProgress
          variant="determinate"
          value={14} // Sample progress, replace with dynamic calculation if needed
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#e0e0de",
            "& .MuiLinearProgress-bar": { backgroundColor: "#1e90ff" },
          }}
        />
      </div>

      {/* Summary Cards as a Swiper Slider */}
      <Swiper
        spaceBetween={10}
        slidesPerView={2} // Shows one full card and half of the next for a peek effect
        className="w-full max-w-md"
      >
        <SwiperSlide>
          <SummaryCard title="About sinus infection" description="Causes, risks, treatments, diagnosis, and general instructions." />
        </SwiperSlide>
        <SwiperSlide>
          <SummaryCard title="Symptoms to watch out for" description="List symptoms that would require immediate contact with a provider or emergency care." />
        </SwiperSlide>
        <SwiperSlide>
          <SummaryCard title="Treatment options" description="Recommended treatments and therapies for managing your symptoms." />
        </SwiperSlide>
      </Swiper>

      {/* To-Do List */}
      <div className="w-full max-w-md">
        <h2 className="font-semibold text-gray-800 mb-3">To-dos</h2>
        <ToDoItem text="Pick up medication at Walgreens" />
        <ToDoItem text="Read new medication instructions" />
      </div>

      {/* Next Appointment Section */}
      <NextAppointment />

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium"
          onClick={() => router.push("/")} // Navigate to homepage on click
        >
          Previous
        </button>
     
      </div>
    </section>
  );
};

// Summary Card Component
const SummaryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div
    className="bg-white rounded-lg p-4 shadow-lg w-44 text-left relative flex flex-col justify-between"
    style={{ height: "180px" }} // Adjust the height as needed
  >
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-2 overflow-hidden text-ellipsis" style={{ maxHeight: "60px" }}>
        {description}
      </p>
    </div>
    <button className="absolute bottom-3 right-3 bg-blue-200 p-2 rounded-full text-gray-800">
      <MdAutoAwesome />
    </button>
  </div>
);
// To-Do Item Component
const ToDoItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-blue-200 rounded-lg p-3 mb-3 flex items-center">
    <input type="checkbox" className="mr-3" />
    <p className="text-gray-800">{text}</p>
  </div>
);

// Next Appointment Component
const NextAppointment: React.FC = () => (
  <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-md mt-6">
    <h2 className="font-semibold text-gray-800">Next appointment</h2>
    <p className="text-sm text-gray-700 mt-2">
      <strong>Date:</strong> Friday, January at 8:30 AM
    </p>
    <p className="text-sm text-gray-700">
      <strong>Location:</strong> Springdale Health Center, 21700 Intertech Dr, Brookfield, WI 53045
    </p>
    <p className="text-sm text-gray-700">
      <strong>Phone Number:</strong> 202-502-8700
    </p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium mt-4 flex items-center justify-center w-full">
      <MdCalendarToday className="mr-2" /> Reschedule
    </button>
  </div>
);

export default Summary;
