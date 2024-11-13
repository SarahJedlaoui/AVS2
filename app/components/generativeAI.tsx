"use client";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the types for each state
type BotType = "Claude" | "Gemini" | "Chatgpt" | "";
type RoleType = "Doctor" | "Nurse" | "Wellness Coach" | "";
type InfoType = "Appointment" | "Medications" | "To-dos" | "Recommendations";
type ToneType = "Technical" | "Simple" | "Encouraging" | "Neutral" | "";
type SourceType = "Only my medical documents" | "Internet" | "";

// Define the props for the toggle functions
type ToggleSelectionFn<T> = (value: T, setter: React.Dispatch<React.SetStateAction<T>>, state: T) => void;
type ToggleMultiSelectionFn<T> = (value: T, setter: React.Dispatch<React.SetStateAction<T[]>>, state: T[]) => void;

const ReportPersonalization = () => {
  const router = useRouter();
  // State variables with type annotations
  const [selectedBot, setSelectedBot] = useState<BotType>("");
  const [selectedRole, setSelectedRole] = useState<RoleType>("");
  const [selectedInfo, setSelectedInfo] = useState<InfoType[]>([]);
  const [selectedTone, setSelectedTone] = useState<ToneType>("");
  const [selectedSource, setSelectedSource] = useState<SourceType>("");
  // Map icons to each bot name
  const botIcons: Record<BotType, string> = {
    Claude: 'Claude.png',
    Gemini: 'Gemini.png',
    Chatgpt: 'ChatGPT.png',
    "": "", // For the default empty state
  };
  // Helper functions with explicit types
  const toggleSelection: ToggleSelectionFn<any> = (value, setter, state) => {
    if (state === value) {
      setter("");
    } else {
      setter(value);
    }
  };

  const toggleMultiSelection: ToggleMultiSelectionFn<any> = (value, setter, state) => {
    if (state.includes(value)) {
      setter(state.filter((item) => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  // Function to generate the summary phrase
  const generatePhrase = () => {
    return `Hi ${selectedBot}, pretend to be a ${selectedRole} and extract these infos: ${selectedInfo.join(", ")}. Try to be ${selectedTone}. Please use ${selectedSource}.`;
  };

  // Function to handle submission and send data to the backend
  const handleSubmit = async () => {
    const data = {
      selectedBot,
      selectedRole,
      selectedInfo,
      selectedTone,
      selectedSource,
      phrase: generatePhrase(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/personalize", data);

      // Check if the response contains the saved data's ID
      console.log('response.data',response.data.data)
      console.log('response.data.id ',response.data.data._id)
      if (response.data.data && response.data.data._id) {
        const savedDataId = response.data.data._id;
        // Redirect to /chat page with the savedDataId as a query parameter
        router.push(`/chat?id=${savedDataId}`);
      } else {
        alert("Data saved, but no ID returned.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EF] p-8 font-poppins  flex flex-col justify-between">
      <Typography variant="h5" className="text-black font-bold mb-4">
        Personalize Your Report
      </Typography>

      {/* Section 1: Bot Selection */}
      <Typography variant="subtitle1" className="mb-2 text-gray-700">
        Hi, I want
      </Typography>
      <div className="flex space-x-4 mb-6">
        {["Claude", "Gemini", "Chatgpt"].map((bot) => (
          <Button
            key={bot}
            onClick={() => toggleSelection(bot as BotType, setSelectedBot, selectedBot)}
            className={`border-[1.5px] px-4 py-2 font-medium capitalize transition-colors duration-150 ${selectedBot === bot
                ? "bg-[#41B5AC] text-white border-transparent"
                : "border-[#E58E73] text-black"
              }`}
            style={{
              borderRadius: "8px",
              boxShadow: selectedBot === bot ? "none" : "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img src={botIcons[bot as BotType]} alt={`${bot} icon`} width={16} height={16} className="mr-2" />
            {selectedBot === bot}
            {bot}
          </Button>
        ))}
      </div>

      {/* Section 2: Role Selection */}
      <Typography variant="subtitle1" className="mb-2 text-gray-700">
        Pretend to be a
      </Typography>
      <div className="flex space-x-4 mb-6">
        {["Doctor", "Nurse", "Wellness Coach"].map((role) => (
          <Button
            key={role}
            onClick={() => toggleSelection(role as RoleType, setSelectedRole, selectedRole)}
            className={`border-[1.5px] px-4 py-2 font-medium capitalize transition-colors duration-150 ${selectedRole === role
                ? "bg-[#41B5AC] text-white border-transparent"
                : "border-[#E58E73] text-black"
              }`}
            style={{
              borderRadius: "8px",
              boxShadow: selectedRole === role ? "none" : "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {selectedRole === role && <CheckIcon className="mr-1" fontSize="small" />}
            {role}
          </Button>
        ))}
      </div>

      {/* Section 3: Information Extraction */}
      <Typography variant="subtitle1" className="mb-2 text-gray-700">
        And extract these infos
      </Typography>
      <div className="flex flex-wrap gap-4 mb-6">
        {["Appointment", "Medications", "To-dos", "Recommendations"].map((info) => (
          <Button
            key={info}
            onClick={() => toggleMultiSelection(info as InfoType, setSelectedInfo, selectedInfo)}
            className={`border-[1.5px] px-4 py-2 font-medium capitalize transition-colors duration-150 ${selectedInfo.includes(info as InfoType)
                ? "bg-[#41B5AC] text-white border-transparent"
                : "border-[#E58E73] text-black"
              }`}
            style={{
              borderRadius: "8px",
              boxShadow: selectedInfo.includes(info as InfoType)
                ? "none"
                : "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {selectedInfo.includes(info as InfoType) && <CheckIcon className="mr-1" fontSize="small" />}
            {info}
          </Button>
        ))}
      </div>

      {/* Section 4: Tone Selection */}
      <Typography variant="subtitle1" className="mb-2 text-gray-700">
        Try to be
      </Typography>
      <div className="flex space-x-4 mb-6">
        {["Technical", "Simple", "Encouraging", "Neutral"].map((tone) => (
          <Button
            key={tone}
            onClick={() => toggleSelection(tone as ToneType, setSelectedTone, selectedTone)}
            className={`border-[1.5px] px-4 py-2 font-medium capitalize transition-colors duration-150 ${selectedTone === tone
                ? "bg-[#41B5AC] text-white border-transparent"
                : "border-[#E58E73] text-black"
              }`}
            style={{
              borderRadius: "8px",
              boxShadow: selectedTone === tone ? "none" : "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {selectedTone === tone && <CheckIcon className="mr-1" fontSize="small" />}
            {tone}
          </Button>
        ))}
      </div>

      {/* Section 5: Source Selection */}
      <Typography variant="subtitle1" className="mb-2 text-gray-700">
        Please use
      </Typography>
      <div className="flex space-x-4 mb-8">
        {["Only my medical documents", "Internet"].map((source) => (
          <Button
            key={source}
            onClick={() => toggleSelection(source as SourceType, setSelectedSource, selectedSource)}
            className={`border-[1.5px] px-4 py-2 font-medium capitalize transition-colors duration-150 ${selectedSource === source
                ? "bg-[#41B5AC] text-white border-transparent"
                : "border-[#E58E73] text-black"
              }`}
            style={{
              borderRadius: "8px",
              boxShadow: selectedSource === source ? "none" : "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {selectedSource === source && <CheckIcon className="mr-1" fontSize="small" />}
            {source}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={handleSubmit}
        variant="contained"
        style={{
          backgroundColor: "#41B5AC",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "1rem",
          textTransform: "none",
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default ReportPersonalization;
