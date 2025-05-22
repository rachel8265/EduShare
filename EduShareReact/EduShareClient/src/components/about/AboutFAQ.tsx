"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme, alpha, Paper } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"

const AboutFAQ = () => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const faqs = [
    {
      question: "What is EduShare?",
      answer:
        "EduShare is a platform designed for educators to share, discover, and collaborate on teaching materials. Our goal is to save teachers time and improve educational outcomes by facilitating resource sharing and professional collaboration.",
    },
    {
      question: "Is EduShare free to use?",
      answer:
        "EduShare offers both free and premium tiers. The free tier provides access to basic features including browsing and downloading a limited number of resources. Our premium subscription offers unlimited downloads, advanced search features, and collaboration tools.",
    },
    {
      question: "How do I share my teaching materials?",
      answer:
        "After creating an account, you can upload your teaching materials through our user-friendly interface. You can categorize your resources, add descriptions, and specify grade levels to help other educators find your materials.",
    },
    {
      question: "Are the teaching materials quality-checked?",
      answer:
        "Yes, all materials undergo a review process before being published on the platform. Our content team checks for educational value, accuracy, and appropriateness. Additionally, our community rating system helps highlight the most valuable resources.",
    },
    {
      question: "Can I collaborate with other teachers on resources?",
      answer:
        "EduShare offers collaboration features that allow multiple educators to work together on resources. You can invite colleagues to edit your materials or join existing collaborative projects.",
    },
    {
      question: "How does EduShare protect intellectual property?",
      answer:
        "We take intellectual property rights seriously. When uploading materials, you maintain ownership while granting EduShare a license to distribute it on the platform. You can choose different sharing options, from fully public to restricted access.",
    },
  ]

  return (
    <Box sx={{ mb: 12 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: 800,
            mx: "auto",
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          Find answers to common questions about EduShare and how it can help you as an educator.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            disableGutters
            elevation={0}
            sx={{
              borderBottom: index < faqs.length - 1 ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}` : "none",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}
              sx={{
                px: 4,
                py: 2,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4, py: 2, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Box>
  )
}

export default AboutFAQ
