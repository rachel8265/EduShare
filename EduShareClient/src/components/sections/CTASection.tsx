import { Box, Typography, Container, Button } from "@mui/material"

const CTASection = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(to right, #0d9488, #10b981)",
        color: "white",
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 3 }}>
            Ready to Join Our Teacher Community?
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, color: "#99f6e4", fontSize: "1.125rem" }}>
            Join thousands of educators already using EduShare to enhance their teaching and save time.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#0f766e",
                "&:hover": {
                  bgcolor: "#f0fdfa",
                },
                fontSize: "1.125rem",
                px: 4,
                py: 1.5,
                borderRadius: 50,
              }}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                },
                fontSize: "1.125rem",
                px: 4,
                py: 1.5,
                borderRadius: 50,
              }}
            >
              Schedule a Demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CTASection
