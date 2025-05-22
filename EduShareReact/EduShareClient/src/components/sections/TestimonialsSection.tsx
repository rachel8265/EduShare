import { Box, Typography, Container, Grid, Card, CardContent, Avatar } from "@mui/material"

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "EduShare has saved me countless hours of preparation time. The resources are high-quality and the community is incredibly supportive.",
      name: "Jessica Williams",
      role: "5th Grade Teacher",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a new teacher, finding quality materials was challenging until I discovered EduShare. It's been an invaluable resource for my professional development.",
      name: "David Chen",
      role: "High School Math Teacher",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The collaborative features have transformed how our department works together. We're more efficient and our students benefit from better materials.",
      name: "Maria Rodriguez",
      role: "Science Department Head",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(to bottom right, #f0fdfa, #ecfdf5)",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            What Teachers Say
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            Hear from educators who have transformed their teaching with EduShare
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{xs:12, md:4}}  key={index}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "white",
                  border: 0,
                  boxShadow: 2,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 48, height: 48 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                    "{testimonial.quote}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default TestimonialsSection
