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
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';
import Button from '@mui/material/Button';

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

  const filters = ["All", "Next Steps", "Appointments", "Symptoms", "Medication Updates"];

  const isSectionVisible = (section: string) => {
    switch (section) {
      case "Next Steps":
        return selectedItems.includes("Next Steps") && parsedData?.todos;
      case "Appointments":
        return selectedItems.includes("Appointments") && parsedData?.appointments;
      case "Symptoms":
        return selectedItems.includes("Symptoms to Watch") && parsedData?.symptoms;
      case "Medication Updates":
        return selectedItems.includes("Medication Updates") && parsedData?.medications;
      default:
        return false;
    }
  };

  const handleAddSection = (section: string) => {
    setSelectedItems((prevItems) => [...prevItems, section]);
  };

  return (
    <section
      className="flex flex-col items-center min-h-screen px-6 py-8 space-y-6"
      style={{ backgroundColor: "#F8F5EE" }}
    >
      {/* Content Container */}
      <div className="w-full max-w-md" style={{ backgroundColor: "transparent" }}>
        {/* Title Section */}
        <motion.div
          className="flex justify-between w-full"
          variants={slideIn("top", "tween", 0.2, 1.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h1 className="font-bold text-2xl text-gray-800 mb-4">My Health Report</h1>

        </motion.div>

        {/* Progress Bar */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: "10px 16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            maxWidth: "w-full",
          }}
        >
          <p className="text-md text-gray-500 font-bold">Your progress</p>
          <p className="text-md text-[#41B5AC] font-bold">
            {selectedItems.length} of {filters.length} tasks completed
          </p>
          <LinearProgress
            variant="determinate"
            value={(selectedItems.length / filters.length) * 100}
            sx={{
              height: 12,
              borderRadius: 4,
              marginTop: 1,
              backgroundColor: "#e0e0de",
              "& .MuiLinearProgress-bar": { backgroundColor: "#41B5AC" },
            }}
          />
        </div>


        {/* Filter Buttons */}
        <div className="flex w-full space-x-2 overflow-auto py-2 mb-4 mt-4">
          {filters.map((section) => (
            <button
              key={section}
              className={clsx(
                "px-4 py-2 rounded-full text-md font-medium whitespace-nowrap",
                filter === section ? "bg-[#41B5AC] text-white" : "bg-[#F5F7FB] text-[#41B5AC]"
              )}
              onClick={() => setFilter(section)}
              style={{
                boxShadow: filter === section ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                border: filter === section ? "none" : "1px solid #E0E0E0",
              }}
            >
              {filter === section && <CheckIcon sx={{ fontSize: 16, color: "white", marginRight: 1 }} />}
              {section}
            </button>
          ))}
        </div>

        <h2 className="font-bold text-xl text-gray-800 mb-3">Things you need to know</h2>
        {/* Conditionally Rendered Sections */}
        {(filter === "All" || filter === "Symptoms") && isSectionVisible("Symptoms") ? (
          <div className="w-full mt-4">
            <Swiper spaceBetween={10} slidesPerView={1}>
              {parsedData?.symptoms?.map((symptom, index) => (
                <SwiperSlide key={index}>
                  <SummaryCard title={symptom.title} description={symptom.description || "No description available"} />
                </SwiperSlide>
              ))}
            </Swiper>


          </div>
        ) : filter === "Symptoms" && (
          <button onClick={() => handleAddSection("Symptoms to Watch")} className="bg-customblue text-white px-4 py-2 rounded-full  mt-4">
            Add this section
          </button>
        )}



        {(filter === "All" || filter === "Appointments") && isSectionVisible("Appointments") ? (
          <div className="w-full mt-4">
            <h2 className="font-bold text-xl text-gray-800 mb-3">Next Appointments</h2>
            {parsedData?.appointments?.map((appointment, index) => (
              <NextAppointment key={index} appointment={appointment} />
            ))}

            <div className="w-full mt-4">
              <LabVisitCard />
            </div>
          </div>


        ) : filter === "Appointments" && (
          <button onClick={() => handleAddSection("Appointments")} className="bg-customblue text-white px-4 py-2 rounded-full  mt-4">
            Add this section
          </button>
        )}

        {(filter === "All" || filter === "Next Steps") && isSectionVisible("Next Steps") ? (
          <div className="w-full mt-4">
            <h2 className="font-bold text-xl text-gray-800 mb-3">To-dos</h2>
            {parsedData?.todos?.map((todo, index) => (
              <ToDoItem key={index} text={todo} />
            ))}
          </div>
        ) : filter === "Next Steps" && (
          <button onClick={() => handleAddSection("Next Steps")} className="bg-customblue text-white px-4 py-2 rounded-full mt-4">
            Add this section
          </button>
        )}

        {(filter === "All" || filter === "Medication Updates") && isSectionVisible("Medication Updates") ? (
          <div className="w-full mt-4">
            <h2 className="font-bold text-xl text-gray-800 mb-3">Medications</h2>
            {parsedData?.medications?.map((medication, index) => (
              <MedicationCard key={index} medication={medication} />
            ))}
          </div>
        ) : filter === "Medication Updates" && (
          <button onClick={() => handleAddSection("Medication Updates")} className="bg-customblue text-white px-4 py-2 rounded-full mt-4">
            Add this section
          </button>
        )}
      </div>
    </section>
  );
};

// Summary Card Component
const SummaryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div
    className="bg-white rounded-lg p-4 shadow-md w-full text-left relative flex flex-col justify-between"
    style={{
      height: '210px',
      borderRadius: '12px',
    }}
  >
    <div>
      <h3 className="font-semibold text-[#41B5AC] text-xl mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mt-2 overflow-hidden text-ellipsis" style={{ maxHeight: "100px" }}>
        {description}
      </p>
    </div>
    <div className="flex justify-end mt-3 mb-5">
      <button className="p-2 rounded-md text-[#41B5AC] shadow-sm mb-2 " style={{ background: "#E0ECFF" }} >
        <ArrowForwardIcon fontSize="small" />
      </button>
    </div>
  </div>
);

// lab Card Component
const LabVisitCard: React.FC = () => {
  const router = useRouter();

  return (
  <div className="bg-white rounded-lg p-4 shadow-lg w-full text-left flex flex-col justify-between" style={{ height: "120px" }}>
    {/* Title and Test Name */}
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div
        className="flex items-center justify-center w-8 h-8 bg-[#E5E2D6] rounded-full"
      >
        <img src={"/lab2.png"} alt="Lab Icon" width={20} height={20} />
      </div>

      {/* Lab Visit Info */}
      <div>
        <h3 className="font-semibold text-gray-800">Upcoming Lab Visit</h3>
        <p className="text-gray-600 text-sm">Comprehensive Metabolic Panel (CMP)</p>
      </div>
    </div>

    {/* Divider Line */}
    <hr
      style={{
        width: '100%',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '8px',
        marginBottom: '8px',
      }}
    />

    {/* Date and Book Button */}
    <div className="flex items-center justify-between">
      {/* Date */}
      <div className="flex items-center text-sm text-gray-600">
        <CalendarTodayIcon fontSize="small" className="text-gray-600 mr-1" />
        <p>Before 25/12/25</p>
      </div>

      {/* Book Button */}
      <Button
        variant="contained"
        style={{
          backgroundColor: "#41B5AC",
          color: "#FFFFFF",
          borderRadius: "20px",
          textTransform: "none",
          padding: "5px 16px",
          fontSize: "0.875rem",
        }}
        onClick={() => router.push('/labs')} 
      >
        Book
      </Button>
    </div>
  </div>
 );
};


// To-Do Item Component
const ToDoItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-[#C1BA9D] rounded-lg p-3 mb-3 flex items-center">
    <input type="checkbox" className="mr-3" />
    <p className="text-gray-800">{text}</p>
  </div>
);

// Next Appointment Component
const NextAppointment: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
  <div
    className="bg-[#C1BA9D] flex rounded-xl p-4 shadow-lg w-full flex flex-col text-white"
    style={{ height: "150px" }}
  >
    {/* Doctor Information */}
    <div className="flex items-center justify-between mb-3 mt-2">
      <div className="flex items-center gap-4">
        {/* Doctor Image */}
        <div
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <Image src={"/doctor.png"} alt="Doctor" width={40} height={40} />
        </div>

        {/* Doctor Name and Specialty */}
        <div>
          <h2 className="font-semibold text-lg">Dr. John Watson</h2>
          <p className="text-sm text-white opacity-80">Cardiologist</p>
        </div>
      </div>

      {/* Arrow Icon */}
      <ArrowForwardIosIcon fontSize="small" className="text-white opacity-80" />
    </div>

    {/* Divider Line */}
    <hr
      style={{
        width: '100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
        marginTop: '8px',
        marginBottom: '8px',
      }}
    />

    {/* Appointment Date and Time */}
    <div className="flex items-center gap-2 mt-1">
      <CalendarTodayIcon fontSize="small" className="text-white opacity-80 " />
      <p className="text-sm opacity-80 mr-10">{appointment.date}</p>
      <AccessTimeIcon fontSize="small" className="text-white opacity-80" />
      <p className="text-sm opacity-80">{appointment.time}</p>
    </div>
  </div>
);



// Medication Card Component
const MedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => (
  <div className="bg-white rounded-lg p-4 shadow-lg w-full text-left mb-2">
    <h3 className="font-semibold text-[#41B5AC] text-xl mb-1">{medication.name}</h3>
    <p className="text-gray-600 text-sm mt-1">Quantity: {medication.quantity || "N/A"}</p>
    <p className="text-gray-600 text-sm mt-1">Instructions: {medication.usage_instructions || "No instructions provided"}</p>
  </div>
);


export default Summary;
