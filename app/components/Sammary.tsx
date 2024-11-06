"use client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { slideIn } from "../styles/animations";
import LinearProgress from "@mui/material/LinearProgress";
import { MdCalendarToday, MdAutoAwesome } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import clsx from "clsx";

interface Appointment {
  date: string;
  location: string;
  phone: string;
  time?: string;
}

interface Medication {
  name: string;
  quantity: string | null;
  usage_instructions?: string;
}

interface Symptom {
  title: string;
  description: string | null;
}

interface BackendData {
  appointments?: Appointment[];
  medications?: Medication[];
  symptoms?: Symptom[];
  todos?: string[];
}

const Summary: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parsedData, setParsedData] = useState<BackendData | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("All"); // Filter state

  useEffect(() => {
    const id = searchParams.get("id");
    const items = searchParams.get("selectedItems");

    if (id) {
      axios
        .get(`https://aftervisit-0b4087b58b8e.herokuapp.com/api/data/${id}`)
        .then((response) => {
          setParsedData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching summary data:", error);
        });
    }

    if (items) {
      setSelectedItems(JSON.parse(items));
    }
  }, [searchParams]);

  if (!parsedData) {
    return <div>Loading...</div>;
  }

  const filters = ["All", "Next Steps", "Appointments", "Symptoms", "Medication Updates"];

  const isSectionVisible = (section: string) => {
    switch (section) {
      case "Next Steps":
        return selectedItems.includes("Next Steps") && parsedData.todos;
      case "Appointments":
        return selectedItems.includes("Appointments") && parsedData.appointments;
      case "Symptoms":
        return selectedItems.includes("Symptoms to Watch") && parsedData.symptoms;
      case "Medication Updates":
        return selectedItems.includes("Medication Updates") && parsedData.medications;
      default:
        return false;
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full px-6 py-8 space-y-6">
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
        <p className="text-sm text-gray-700 mb-1">
          Progress: {selectedItems.length} tasks completed
        </p>
        <LinearProgress
          variant="determinate"
          value={(selectedItems.length / filters.length) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#e0e0de",
            "& .MuiLinearProgress-bar": { backgroundColor: "#1e90ff" },
          }}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex w-full max-w-md space-x-2 overflow-auto py-4">
        {filters.map((section) => (
          <button
            key={section}
            className={clsx(
              "px-4 py-2 rounded-full font-medium",
              filter === section ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            )}
            onClick={() => setFilter(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Conditionally Rendered Sections */}
      {(filter === "All" || filter === "Symptoms") && isSectionVisible("Symptoms") ? (
        <div className="w-full max-w-md mt-4">
          <h2 className="font-semibold text-gray-800 mb-3">Symptoms</h2>
          <Swiper spaceBetween={10} slidesPerView={1} className="w-full max-w-md">
            {parsedData.symptoms?.map((symptom, index) => (
              <SwiperSlide key={index}>
                <SummaryCard title={symptom.title} description={symptom.description || "No description available"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}

      {(filter === "All" || filter === "Next Steps") && isSectionVisible("Next Steps") ? (
        <div className="w-full max-w-md">
          <h2 className="font-semibold text-gray-800 mb-3">To-dos</h2>
          {parsedData.todos?.map((todo, index) => (
            <ToDoItem key={index} text={todo} />
          ))}
        </div>
      ) : null}

      {(filter === "All" || filter === "Appointments") && isSectionVisible("Appointments") ? (
        <div className="w-full max-w-md">
          <h2 className="font-semibold text-gray-800 mb-3">Appointments</h2>
          {parsedData.appointments?.map((appointment, index) => (
            <NextAppointment key={index} appointment={appointment} />
          ))}
        </div>
      ) : null}

      {(filter === "All" || filter === "Medication Updates") && isSectionVisible("Medication Updates") ? (
        <div className="w-full max-w-md mt-6">
          <h2 className="font-semibold text-gray-800 mb-3">Medications</h2>
          {parsedData.medications?.map((medication, index) => (
            <MedicationCard key={index} medication={medication} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

// Summary Card Component
const SummaryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg w-full text-left relative flex flex-col justify-between" style={{ height: "200px" }}>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-2 overflow-hidden text-ellipsis" style={{ maxHeight: "100px" }}>
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
const NextAppointment: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-md mt-6">
    <h2 className="font-semibold text-gray-800">Next appointment</h2>
    <p className="text-sm text-gray-700 mt-2">
      <strong>Date:</strong> {appointment.date} at {appointment.time || "N/A"}
    </p>
    <p className="text-sm text-gray-700">
      <strong>Location:</strong> {appointment.location}
    </p>
    <p className="text-sm text-gray-700">
      <strong>Phone Number:</strong> {appointment.phone}
    </p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium mt-4 flex items-center justify-center w-full">
      <MdCalendarToday className="mr-2" /> Reschedule
    </button>
  </div>
);

// Medication Card Component
const MedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg w-full text-left mb-2">
    <h3 className="font-semibold text-gray-800">{medication.name}</h3>
    <p className="text-gray-600 text-sm mt-1">Quantity: {medication.quantity || "N/A"}</p>
    <p className="text-gray-600 text-sm mt-1">Instructions: {medication.usage_instructions || "No instructions provided"}</p>
  </div>
);

export default Summary;
