"use client";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/navigation";

const AppointmentConfirmation: React.FC = () => {
    const router = useRouter();

    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#E0ECFF",
                padding: 3,
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
            }}
        >
            {/* Header */}
            <Box display="flex" alignItems="center" sx={{ width: "100%", mb: 2 }}>
                <ArrowBackIcon
                    sx={{ color: "#1A1A1A", cursor: "pointer", mr: 1 }}
                    onClick={() => router.push("/appointment")}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1A1A1A", alignSelf: "flex-start" }}>
                    Your Appointment
                </Typography>
            </Box>

            {/* Appointment Details Card */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "#1C4FA0",
                    borderRadius: 4,
                    padding: 2,
                    color: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box display="flex" alignItems="center" mb={1}>
                    {/* White circle background for the image */}
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: "#FFFFFF",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // optional shadow for effect
                        }}
                    >
                        <img
                            src={'/avs.png'}
                            alt="Lab Logo"
                            width={40}
                            height={40}
                            style={{ borderRadius: "8px" }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Wisconsin Laboratories
                        </Typography>
                        <Typography variant="body2">Milwaukee, WI</Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" mt={1}>
                    <CalendarTodayIcon sx={{ fontSize: 20, mr: 1 }} />
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        Tuesday, 14 June
                    </Typography>
                    <AccessTimeIcon sx={{ fontSize: 20, mr: 1 }} />
                    <Typography variant="body2">12:30 - 13:00 AM</Typography>
                </Box>
            </Box>

            {/* Insurance Details */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4,
                    padding: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    mb: 2,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Insurance
                    </Typography>
                    <InfoIcon sx={{ color: "#6C757D", fontSize: 18 }} />
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="textSecondary">
                        Out-of-pocket**
                    </Typography>
                    <Typography variant="body2">$0</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="textSecondary">
                        Your expected copay**
                    </Typography>
                    <Typography variant="body2">$30</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="textSecondary">
                        Total**
                    </Typography>
                    <Typography variant="body2">$30</Typography>
                </Box>
                <Typography
                    variant="caption"
                    display="block"
                    color="textSecondary"
                    mt={1}
                    textAlign="center"
                >
                    **based on data from your insurance and may change based on their policies
                </Typography>
            </Box>

            {/* Confirm and Edit Buttons */}
            <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column" }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#1C4FA0",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        borderRadius: 3,
                        textTransform: "none",
                        mb: 1,
                        "&:hover": { backgroundColor: "#163d80" },
                    }}
                    onClick={() => alert("Appointment Confirmed")}
                >
                    Confirm
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderColor: "#A1C0FF",
                        color: "#1C4FA0",
                        fontWeight: "bold",
                        borderRadius: 3,
                        textTransform: "none",
                        backgroundColor: "#A1C0FF33",
                        "&:hover": { backgroundColor: "#A1C0FF55" },
                    }}
                    onClick={() => router.push("/appointment")}
                >
                    Edit
                </Button>
            </Box>
        </Box>
    );
};

export default AppointmentConfirmation;
