"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Radio, Button, FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Boarding3: React.FC = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleContinueClick = () => {
    if (selectedOption) {
      router.push("/home"); 
    } else {
      alert("Please select an option to continue.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#E0ECFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "lelf",
        padding: 3,
      }}
    >
      {/* Header */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A1A1A", marginBottom: 1, marginTop: 4 }}>
        Your Privacy, Your Control
      </Typography>
      <Typography variant="body2" sx={{ color: "#6C757D", marginBottom: 2 }}>
        Choose how our AI uses your data.
        <Typography
          component="span"
          sx={{ color: "#1A73E8", cursor: "pointer", marginLeft: 1 }}
          onClick={() => alert("Learn more about data usage")}
        >
          Learn More
        </Typography>
      </Typography>

      {/* Progress Dots */}
      <Box display="flex" justifyContent="left" my={4}>
          
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: "#C0C0C0",
              borderRadius: "50%",
              marginRight: 1,
            }}
          />
          
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: "#C0C0C0",
              borderRadius: "50%",
              marginRight: 1,
            }}
          />
          <Box
            sx={{
              width: 20,
              height: 8,
              backgroundColor: "#005E54",
              borderRadius: "30%",
              marginRight: 1,
            }}
          />
        </Box>

      {/* Consent Options */}
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {[
            { value: "noConsent", label: "Do Not Allow", description: "No consent for AI to use or store my data." },
            { value: "singleUse", label: "Single Use", description: "Consent for one-time data processing, no storage." },
            { value: "basicInsights", label: "Basic Insights", description: "Consent for basic insights with minimal data retention." },
            { value: "personalizedExperience", label: "Personalized Experience", description: "Consent for personalized insights with data stored for future interactions." },
            { value: "researchContribution", label: "Research Contribution", description: "Consent for anonymized data to be used for research and AI improvement." },
          ].map((option) => (
            <Box
              key={option.value}
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: 2,
                marginBottom: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                border: "1px solid #E0E0E0",
              }}
            >
              <FormControlLabel
                value={option.value}
                control={
                  <Radio
                    icon={<CircleIcon sx={{ color: "#C0C0C0" }} />}
                    checkedIcon={<CheckCircleIcon sx={{ color: "#1A73E8" }} />}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#1A1A1A" }}>{option.label}</Typography>
                    <Typography variant="body2" sx={{ color: "#6C757D" }}>{option.description}</Typography>
                  </Box>
                }
                sx={{ marginLeft: 0 }}
              />
            </Box>
          ))}
        </RadioGroup>
      </FormControl>

      {/* Continue Button */}
      <Button
        variant="contained"
        sx={{
          width: "100%",
          height:"5vh",
          backgroundColor: "#1C4FA0",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "30px",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { backgroundColor: "#005bb5" },
          marginTop: "auto",
          marginBottom: 3,
        }}
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </Box>
  );
};

export default Boarding3;
