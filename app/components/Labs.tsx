// LabsPage.tsx
"use client";
import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton, Card, Button, Slider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


interface Lab {
    name: string;
    location: string;
    distance: number; // Changed distance to number type for comparison
    opensAt: string;
}

const labs: Lab[] = [
    { name: "Wisconsin Laboratories", location: "Milwaukee, WI", distance: 1, opensAt: "09:00 AM" },
    { name: "American Laboratories", location: "Madison, WI", distance: 2, opensAt: "08:00 AM" },
    { name: "Aurora Health Care", location: "Madison, WI", distance: 4, opensAt: "07:00 AM" },
    { name: "North Shore Medical Labs", location: "Green Bay, WI", distance: 5, opensAt: "10:00 AM" },
    { name: "Lakeview Diagnostic Center", location: "Waukesha, WI", distance: 7, opensAt: "08:30 AM" },
    { name: "Prime Health Labs", location: "Kenosha, WI", distance: 3, opensAt: "09:30 AM" },
    { name: "Advanced Medical Labs", location: "Appleton, WI", distance: 8, opensAt: "11:00 AM" },
    { name: "Rapid Testing Center", location: "Oshkosh, WI", distance: 6, opensAt: "07:30 AM" },
    { name: "Downtown Labs", location: "Milwaukee, WI", distance: 2, opensAt: "08:00 AM" },
    { name: "Health Solutions Lab", location: "West Allis, WI", distance: 9, opensAt: "06:30 AM" },
];

const LabsPage: React.FC = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [distance, setDistance] = useState(5); // Initial max distance for slider

    // Filter labs based on search query and distance
    const filteredLabs = labs.filter(
        (lab) =>
            lab.name.toLowerCase().includes(search.toLowerCase()) &&
            lab.distance <= distance // Only include labs within the selected distance
    );

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
            <Box display="flex" alignItems="center" sx={{ width: "100%", mb: 2 }}>
             
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1A1A1A", alignSelf: "flex-start" }}>
                Labs Around you
                </Typography>
            </Box>


            {/* Search Bar */}
            <TextField
                variant="outlined"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "30px",
                    maxWidth: "600px",
                    mb: 3,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <FilterListIcon color="primary" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {/* Distance Slider */}
            <Box sx={{ width: "100%", maxWidth: "600px", mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1A1A1A", mb: 1 }}>
                    Distance Radius
                </Typography>
                <Slider
                    value={distance}
                    onChange={(e, newValue) => setDistance(newValue as number)}
                    min={0}
                    max={10}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{
                        color: "#1C4FA0",
                        "& .MuiSlider-thumb": { backgroundColor: "#1C4FA0" },
                        "& .MuiSlider-track": { backgroundColor: "#1C4FA0" },
                        "& .MuiSlider-rail": { backgroundColor: "#B0C4DE" },
                    }}
                />
            </Box>

            {/* Lab Cards */}
            {filteredLabs.length > 0 ? (
                filteredLabs.map((lab, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: "100%",
                            maxWidth: "600px",
                            mb: 2,
                            padding: 2,
                            backgroundColor: "#FFFFFF",
                            borderRadius: "16px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A1A1A" }}>
                                {lab.name}
                            </Typography>
                            <Box display="flex" alignItems="center" color="#6C757D">
                                <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant="body2">{lab.location}</Typography>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {lab.distance} KM
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" color="#6C757D" mt={1}>
                                <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant="body2">Opens at {lab.opensAt}</Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#1C4FA0",
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                textTransform: "none",
                                borderRadius: "20px",
                                padding: "6px 16px",
                            }}
                            onClick={() => router.push("/appointment")} // Navigate back to /labs
                        >
                            Book
                        </Button>
                    </Card>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
                    No labs found matching your criteria.
                </Typography>
            )}
        </Box>
    );
};

export default LabsPage;
