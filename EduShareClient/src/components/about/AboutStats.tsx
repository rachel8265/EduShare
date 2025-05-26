"use client"
import { Box, Grid, Typography, Paper, useTheme, alpha } from "@mui/material"
import { People, MenuBook, School, Download } from "@mui/icons-material"

const AboutStats = () => {
  const theme = useTheme()

  const stats = [
    {
      icon: <People sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      value: "10,000+",
      label: "Educators",
      description: "Active teachers using our platform",
    },
    {
      icon: <MenuBook sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      value: "25,000+",
      label: "Resources",
      description: "High-quality teaching materials",
    },
    {
      icon: <School sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      value: "500+",
      label: "Schools",
      description: "Educational institutions worldwide",
    },
    {
      icon: <Download sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      value: "50,000+",
      label: "Downloads",
      description: "Resources downloaded monthly",
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
          Our Impact
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
          Since our founding, EduShare has grown into a vibrant community of educators making a real difference in
          classrooms around the world.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                background: "linear-gradient(145deg, #ffffff, #f0fdfa)",
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  mb: 3,
                  mx: "auto",
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {stat.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AboutStats
