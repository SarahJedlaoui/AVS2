"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Typography, TextField, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";

// Define the type for the chat data structure
interface ChatData {
    phrase?: string[]; // Make phrase optional
    response?: any[];
}
const ChatPage = () => {
    const [chatData, setChatData] = useState<ChatData | null>(null);
    const searchParams = useSearchParams();
    const chatId = searchParams.get("id");
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [loadingResponse, setLoadingResponse] = useState(false);

    // Fetch chat data by ID
    useEffect(() => {
        const fetchChatData = async () => {
            if (chatId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/personalize/${chatId}`);
                    setChatData(response.data);
                } catch (error) {
                    console.error("Error fetching chat data:", error);
                }
            }
        };
        fetchChatData();
    }, [chatId]);

    // Load the PDF file
    useEffect(() => {
        const loadPdfFile = async () => {
            const response = await fetch("/pdf.pdf");
            const blob = await response.blob();
            const file = new File([blob], "AfterVisitSummary.pdf", { type: "application/pdf" });
            setPdfFile(file);
        };
        loadPdfFile();
    }, []);

    // Automatically process PDF and prompt when both pdfFile and chatData are available
    useEffect(() => {
        const handleProcessPdf = async () => {
            if (!pdfFile || !chatData || !chatId) {
                console.error("PDF file, chat data, or chat ID is missing");
                return;
            }

            setLoadingResponse(true);

            // Prepare the form data
            const data = new FormData();
            data.append('pdf', pdfFile);
            data.append('chatId', chatId);
            data.append('prompt', chatData.phrase?.[chatData.phrase.length - 1] || ""); // Use the last phrase as the prompt

            try {
                const response = await axios.post("http://localhost:5000/api/upload/respond", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data && response.data.extractedData) {
                    setChatData(prevChatData => ({
                        ...prevChatData,
                        response: [...(prevChatData?.response || []), response.data.extractedData],
                    }));
                } else {
                    console.error("No extracted data received", response);
                }
            } catch (error) {
                console.error("Error processing PDF:", error); // Log full error here
            }

            setLoadingResponse(false);
        };

        if (pdfFile && chatData) {
            handleProcessPdf();
        }
    }, [pdfFile, chatData, chatId]); // Dependency array includes pdfFile, chatData, and chatId

    if (!chatData) return <Typography>Loading...</Typography>;

    return (
        <div className="min-h-screen bg-[#FBF6EF] p-4 font-sans flex flex-col justify-between">
            <header className="flex items-center space-x-2">
                <ChatBubbleOutlineIcon style={{ color: "#4A4A4A" }} />
                <Typography variant="h6" className="text-gray-800 font-semibold">
                    Let’s build your report
                </Typography>
            </header>

            {/* Conversation */}
            <div className="conversation flex-grow overflow-y-auto mt-4">
                {chatData.phrase?.map((phrase, index) => (
                    <div key={index}>
                        {/* User's Phrase */}
                        <div className="mt-4 bg-[#F1ECE4] p-4 rounded-md">
                            <Typography variant="body2" style={{ color: "#4A4A4A" }}>
                                {phrase}
                            </Typography>
                        </div>

                        {/* AI Response */}
                        {chatData.response && chatData.response[index] && (
                            <div className="mt-4 flex items-start space-x-2">
                                <div className="bg-[#4EBE9D] rounded-full w-8 h-8 flex items-center justify-center text-white">
                                    <Typography variant="h6" style={{ fontSize: "1.25rem" }}>
                                        Hi
                                    </Typography>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                                    <Typography
                                        variant="body2"
                                        className="text-gray-800 leading-relaxed"
                                        style={{ whiteSpace: "pre-line" }} // To render newlines correctly
                                    >
                                        {chatData.response[index]}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* View Report Button */}
            <button
                style={{
                    backgroundColor: "#4EBE9D",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "0.9rem",
                    textTransform: "none",
                    marginTop: "1.5rem",
                    cursor: "pointer",
                }}
                className="self-center w-full text-center mt-4"
            >
                View My Report
            </button>

            {/* Input Box */}
            <div className="mt-4 flex items-center  pt-2">
                <TextField
                    placeholder="Message"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        style: {
                            borderRadius: "25px",
                            padding: "5px 15px",
                        },
                    }}
                    sx={{ flex: 1 }}
                />
                <IconButton color="primary">
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default ChatPage;