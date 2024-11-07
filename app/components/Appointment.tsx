// AppointmentDetails.tsx
"use client";
import { useState } from "react";
import { Box, Typography, Button, Card, Grid, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const AppointmentDetails: React.FC = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<number | null>(14);
    const [selectedTime, setSelectedTime] = useState<string | null>("12:30 PM");

    const dates = [
        { day: "Mon", date: 13 },
        { day: "Tue", date: 14 },
        { day: "Wed", date: 15 },
        { day: "Thur", date: 16 },
        { day: "Fri", date: 17 },
    ];

    const times = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM",
        "03:00 PM", "04:30 PM", "05:00 PM",
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#E0ECFF",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "600px", mb: 2 }}>
                <ArrowBackIcon
                    sx={{ color: "#1A1A1A", cursor: "pointer", mr: 1 }}
                    onClick={() => router.push("/labs")} // Navigate back to /labs
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A1A1A" }}>
                    Appointment Details
                </Typography>
            </Box>

            {/* Lab Card */}
            <Card
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    mb: 3,
                    padding: 2,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <img src={'/avs.png'} alt="Lab Logo" width={50} height={50} style={{ borderRadius: "8px" }} />
                    <Box ml={2}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A1A1A" }}>
                            Wisconsin Laboratories
                        </Typography>
                        <Box display="flex" alignItems="center" color="#6C757D">
                            <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            <Typography variant="body2">Milwaukee, WI</Typography>
                            <Typography variant="body2" sx={{ ml: 1 }}>1 KM</Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Offers a wide range of diagnostic tests, including blood work, cytology, microbiology, and drug testing. They work closely with healthcare providers and are known for their comprehensive testing and analysis capabilities.
                </Typography>
            </Card>

            {/* Date Selector */}
            <Box sx={{ width: "100%", maxWidth: "600px", mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1A1A1A", mb: 1, textAlign: "left" }}>
                    December, 2024
                </Typography>
                <Grid container spacing={1}>
                    {dates.map((item) => (
                        <Grid item xs={2.4} key={item.date}>
                            <Button
                                variant="contained"
                                onClick={() => setSelectedDate(item.date)}
                                sx={{
                                    width: "100%",
                                    color: selectedDate === item.date ? "#FFFFFF" : "#1A1A1A",
                                    backgroundColor: selectedDate === item.date ? "#1C4FA0" : "#FFFFFF",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    boxShadow: "none",
                                    borderRadius: "8px",
                                    padding: "8px 0",
                                    display: "flex",
                                    flexDirection: "column",
                                    "&:hover": { backgroundColor: selectedDate === item.date ? "#1C4FA0" : "#e0ecff" },
                                }}
                            >
                                <Typography variant="body2" sx={{ fontSize: "12px" }}>{item.day}</Typography>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "bold" }}>{item.date}</Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Time Selector */}
            <Box sx={{ width: "100%", maxWidth: "600px", mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1A1A1A", mb: 1, textAlign: "left" }}>
                    Available Time
                </Typography>
                <Grid container spacing={1}>
                    {times.map((time) => (
                        <Grid item xs={3} key={time}>
                            <Button
                                variant="contained"
                                onClick={() => setSelectedTime(time)}
                                sx={{
                                    width: "100%",
                                    color: selectedTime === time ? "#FFFFFF" : "#1A1A1A",
                                    backgroundColor: selectedTime === time ? "#1C4FA0" : "#FFFFFF",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    boxShadow: "none",
                                    borderRadius: "8px",
                                    padding: "8px 0",
                                    "&:hover": { backgroundColor: selectedTime === time ? "#1C4FA0" : "#e0ecff" },
                                }}
                            >
                                {time}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Test Details */}
            <Box sx={{ width: "100%", maxWidth: "600px", mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1A1A1A", mb: 1, textAlign: "left" }}>
                    Details
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    value="Comprehensive Metabolic Panel (CMP)"
                    sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                    }}
                    InputProps={{
                        style: { color: "#1A1A1A", fontWeight: "bold" },
                    }}
                />
            </Box>

            {/* Book Appointment Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: "#1C4FA0",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    borderRadius: "30px",
                    textTransform: "none",
                    maxWidth: "600px",
                    padding: "12px 0",
                    "&:hover": { backgroundColor: "#005bb5" },
                }}
                onClick={() => router.push("/appointment2")}
            >
                Book Appointment
            </Button>
        </Box>
    );
};

export default AppointmentDetails;
