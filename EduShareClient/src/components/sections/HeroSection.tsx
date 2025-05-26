import { Box, Typography, Button, Container } from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: 10,
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom right, #f0fdfa, #ffffff, #ecfdf5)",
          opacity: 0.8,
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
        }}
      />

      <Container sx={{ position: "relative", textAlign: "center" }}>
        {/* Badge */}
        <Box
          sx={{
            display: "inline-block",
            mb: 3,
            p: 1,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              background: "linear-gradient(to right, #f0fdfa, #ecfdf5)",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontWeight: 500,
                color: "#0f766e",
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 12 }} /> The Teacher's Resource Hub
            </Typography>
          </Box>
        </Box>

        {/* Heading */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: "bold",
            background: "linear-gradient(to right, #115e59, #0d9488, #065f46)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
          }}
        >
          Share, Discover, Teach Better
        </Typography>

        {/* Subheading */}
        <Typography
          variant="body1"
          sx={{
            maxWidth: 900,
            mx: "auto",
            mb: 5,
            color: "text.secondary",
            fontSize: "1.125rem",
          }}
        >
          One platform to share, manage, and discover quality teaching materials. Save time, share ideas, and create
          together with fellow educators.
        </Typography>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
            mb: 8,
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 50,
              background: "linear-gradient(to right, #0d9488, #10b981)",
              "&:hover": {
                background: "linear-gradient(to right, #0f766e, #047857)",
              },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 50,
              borderColor: "#ccfbf1",
              color: "text.primary",
              "&:hover": {
                borderColor: "#5eead4",
                bgcolor: "#f0fdfa",
              },
            }}
          >
            Learn More
          </Button>
        </Box>

        {/* Platform Preview */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, white, transparent, transparent)",
              zIndex: 1,
              pointerEvents: "none",
              height: "100%",
            }}
          />
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              border: "1px solid #ccfbf1",
            }}
          >
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="EduShare Platform Preview"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
