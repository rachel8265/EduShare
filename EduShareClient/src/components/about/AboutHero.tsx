"use client"
import { Box, Container, Typography } from "@mui/material"

const AboutHero = () => {
  // const theme = useTheme()

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom right, #f0fdfa, #ffffff, #ecfdf5)",
          opacity: 0.8,
          zIndex: -2,
        }}
      />

      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -96,
          right: -96,
          width: 384,
          height: 384,
          bgcolor: "#99f6e4",
          borderRadius: "50%",
          mixBlendMode: "multiply",
          filter: "blur(64px)",
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -96,
          left: -96,
          width: 384,
          height: 384,
          bgcolor: "#a7f3d0",
          borderRadius: "50%",
          mixBlendMode: "multiply",
          filter: "blur(64px)",
          opacity: 0.3,
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: 800,
            mb: 3,
            background: "linear-gradient(to right, #115e59, #0d9488, #065f46)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About EduShare
        </Typography>

        <Typography
          variant="h5"
          sx={{
            maxWidth: 800,
            mx: "auto",
            color: "text.secondary",
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          Empowering educators to share knowledge, collaborate, and create exceptional learning experiences
        </Typography>

        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            height: 6,
            mx: "auto",
            background: "linear-gradient(to right, #0d9488, #10b981)",
            borderRadius: 3,
          }}
        />
      </Container>
    </Box>
  )
}

export default AboutHero
