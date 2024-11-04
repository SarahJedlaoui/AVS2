"use client";
import { useRouter } from "next/navigation";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from "next/image";
import { useState } from "react";

const Boarding2: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/nextpage"); // Replace with the actual path
    }, 2000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1C4FA0", // Dark blue background for the top part
      }}
    >
      {/* Skip Button */}
      <Box sx={{ alignSelf: "flex-end", padding: 2 }}>
        <Typography
          sx={{ color: "#FFFFFF", cursor: "pointer", fontSize: "18px" }}
          onClick={() => router.push("/")}
        >
          Skip
        </Typography>
      </Box>

      {/* Robot Image inside White Circle */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "50%",
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src="/robot.png" alt="Robot" width={180} height={180} />
      </Box>

      {/* Lower White Section with Welcome Text, Benefits List, and Button */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          paddingY: 4,
          paddingX: 3,
          textAlign: "left",
          marginTop: -4, // To slightly overlap the white section over the blue
        }}
      >
        {/* Welcome Section in White Part */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1A1A1A", marginBottom: 2, marginTop: 3 }}>
          Your Privacy, Our Priority
        </Typography>
        <Typography variant="body2" sx={{ color: "#6C757D", marginBottom: 3 }}>
          Stay Informed About Data Privacy
        </Typography>

        {/* Benefits List */}
        {["Your data is stored securely", "you decide what to share", "Accuracy of Insights"].map(
          (text, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="left"
              justifyContent="left"
              sx={{ marginBottom: 2 }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 18, marginRight: 1, color: "#005E54" }} />
              
              <Typography variant="body2" sx={{ color: "#333333" }}>
                {text}
              </Typography>
            </Box>
          )
        )}

        {/* Progress Dots */}
        <Box display="flex" justifyContent="left" my={2}>
          
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
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: "#C0C0C0",
              borderRadius: "50%",
            }}
          />
        </Box>

        {/* Start Button */}
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height:"5vh",
            backgroundColor: "#1C4FA0",
            color: "#FFFFFF",
            borderRadius: "30px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#005bb5" },
          }}
          onClick={handleStartClick}
          startIcon={loading ? <CircularProgress size={30} color="inherit" /> : null}
          disabled={loading}
        >
          {loading ? "Loading..." : "Let's Start"}
        </Button>
      </Box>
    </Box>
  );
};

export default Boarding2;
