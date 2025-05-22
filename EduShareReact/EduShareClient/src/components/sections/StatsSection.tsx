import { Box, Typography, Container, Grid } from "@mui/material"

const StatsSection = () => {
  const stats = [
    { value: "10,000+", label: "Educators" },
    { value: "25,000+", label: "Resources" },
    { value: "500+", label: "Schools" },
    { value: "50,000+", label: "Downloads" },
  ]

  return (
    <Box
      sx={{
        py: 6,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "#ccfbf1",
        background: "linear-gradient(to right, #f0fdfa, #ecfdf5)",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid size={{xs:6, md:3}}  key={index} sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0f766e" }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default StatsSection
