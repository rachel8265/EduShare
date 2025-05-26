import { Box, Typography, Container, Grid } from "@mui/material"

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up quickly and easily to start using the platform's features.",
    },
    {
      number: 2,
      title: "Upload Your Materials",
      description: "Upload and organize your teaching resources by subjects and categories.",
    },
    {
      number: 3,
      title: "Share and Discover",
      description: "Share your materials with others and discover new resources from colleagues.",
    },
  ]

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            How EduShare Works
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            Get started in three simple steps and transform your teaching experience
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, md: 4 }}  key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 40,
                      left: "50%",
                      width: "100%",
                      height: "7px",
                      background: "linear-gradient(to right, transparent, #99f6e4, transparent)",
                      display: { xs: "none", md: "block" },
                    }}
                  />
                )}
                <Box
                  sx={{
                    background: "linear-gradient(to bottom right, #ccfbf1, #a7f3d0)",
                    borderRadius: "50%",
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0f766e" }}>
                    {step.number}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default HowItWorksSection
