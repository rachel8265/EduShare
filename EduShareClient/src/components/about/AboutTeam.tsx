"use client"
import { Box, Grid, Typography, Card, CardContent, CardMedia, useTheme, alpha, IconButton } from "@mui/material"
import { LinkedIn, Twitter, Email } from "@mui/icons-material"

const AboutTeam = () => {
  const theme = useTheme()

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former high school teacher with 15 years of experience. Sarah founded EduShare to solve the resource sharing challenges she experienced firsthand.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech industry veteran with a passion for education. Michael leads our engineering team to build intuitive and powerful tools for educators.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      bio: "Curriculum development specialist with experience in K-12 education. Emily ensures the quality and relevance of resources on our platform.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Kim",
      role: "Head of Community",
      bio: "Former school principal with a passion for teacher collaboration. David builds and nurtures our growing educator community.",
      image: "/placeholder.svg?height=300&width=300",
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
          Our Team
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
          Meet the passionate educators and technologists behind EduShare who are dedicated to empowering teachers
          worldwide.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {team.map((member, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}  key={index}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={member.image}
                alt={member.name}
                sx={{
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                >
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {member.bio}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": { color: "#0077B5" },
                    }}
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": { color: "#1DA1F2" },
                    }}
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  >
                    <Email fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AboutTeam
