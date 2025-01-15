"use client";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

const MasteringAIPage: React.FC = () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>("panel1"); // Keep the first item open by default

  const handleBackClick = () => {
    router.push("/prompt-training");
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div
      style={{
        backgroundColor: "#F8F5EE",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      {/* Header */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <IconButton
          onClick={handleBackClick}
          edge="start"
          color="inherit"
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          style={{ marginLeft: "8px", color: "#000" }}
        >
          Mastering AI Prompts
        </Typography>
      </div>
      <Typography
        style={{ color: "#6B7280", fontSize: "14px", marginBottom: "24px" }}
      >
        To get the best results from an AI, you need to ask the right questions.
        A well-structured prompt helps the AI understand what you need and
        delivers more accurate, helpful responses.
      </Typography>

      {/* Accordion List */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{ borderRadius: "8px", marginBottom: "8px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="bold">What Makes a Good Prompt?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Key Elements of a Strong Prompt</strong>
            <ul>
              <li>
                <strong>Be Specific:</strong> Avoid vague language. A precise
                question leads to a better response.
                <ul>
                  <li>
                    Example: Instead of “Tell me about diabetes,” ask, “What are
                    the early symptoms of type 2 diabetes in someone over 40?”
                  </li>
                </ul>
              </li>
              <li>
                <strong>Provide Context:</strong> Include relevant details like
                age, gender, or health history to tailor the response.
                <ul>
                  <li>
                    Example: “What dietary changes should a 45-year-old woman
                    with high cholesterol make?”
                  </li>
                </ul>
              </li>
              <li>
                <strong>Ask One Thing at a Time:</strong> Break your prompt into
                single, clear questions.
                <ul>
                  <li>
                    Example: Instead of asking, “What are the symptoms and
                    treatments for diabetes?” ask, “What are the common symptoms
                    of diabetes?” and then, “What treatments are recommended for
                    type 2 diabetes?”
                  </li>
                </ul>
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{ borderRadius: "8px", marginBottom: "8px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography fontWeight="bold">Bad vs. Good Prompts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Content about the difference between bad and good prompts goes here.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        style={{ borderRadius: "8px", marginBottom: "8px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography fontWeight="bold">Common Mistakes to Avoid</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Content about common mistakes to avoid when writing prompts.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        style={{ borderRadius: "8px", marginBottom: "8px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography fontWeight="bold">The Role of Tone and Clarity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Content about the importance of tone and clarity in prompts.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MasteringAIPage;
