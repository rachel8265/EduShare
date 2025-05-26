"use client"
import { Box, Grid, Typography, Paper, useTheme, alpha } from "@mui/material"
import { School, Lightbulb, Public, Diversity3 } from "@mui/icons-material"

const AboutMission = () => {
  const theme = useTheme()

  const values = [
    {
      icon: <School sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Education First",
      description:
        "We believe in the transformative power of education and its ability to change lives and communities.",
    },
    {
      icon: <Lightbulb sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Innovation",
      description: "We constantly seek new ways to improve teaching methods and educational resources.",
    },
    {
      icon: <Diversity3 sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Collaboration",
      description: "We foster a community where educators can share ideas, resources, and support each other.",
    },
    {
      icon: <Public sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Accessibility",
      description:
        "We strive to make quality educational resources accessible to all educators regardless of location.",
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
          Our Mission
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
          EduShare was founded with a simple yet powerful mission: to create a platform where educators can easily share
          and discover high-quality teaching materials, collaborate with peers, and ultimately enhance the educational
          experience for students worldwide.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {values.map((value, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  mb: 3,
                  mx: "auto",
                }}
              >
                {value.icon}
              </Box>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: 600 }}>
                {value.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                {value.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AboutMission
