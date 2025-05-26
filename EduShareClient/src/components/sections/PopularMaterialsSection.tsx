import { Box, Typography, Container, Grid, Card, CardMedia, Button, Chip } from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import StarIcon from "@mui/icons-material/Star"

const PopularMaterialsSection = () => {
  const materials = [
    {
      title: "Math Lesson Plan - Grade 4",
      category: "Mathematics",
      downloads: 234,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=400",
      author: "Sarah Johnson",
    },
    {
      title: "English Worksheets - Grade 6",
      category: "English",
      downloads: 187,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=400",
      author: "Michael Brown",
    },
    {
      title: "Science Presentation - Middle School",
      category: "Science",
      downloads: 156,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=400",
      author: "Emily Davis",
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
            Trending Teaching Resources
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            Discover what other educators are using to enhance their teaching
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {materials.map((material, index) => (
            <Grid size={{xs:12, md:4}} key={index}>
              <Card
                sx={{
                  height: "100%",
                  border: 0,
                  boxShadow: 2,
                  overflow: "hidden",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="192"
                    image={material.image}
                    alt={material.title}
                    sx={{
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  <Chip
                    label={material.category}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      color: "#0f766e",
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1.125rem",
                          fontWeight: "bold",
                          "&:hover": {
                            color: "#0d9488",
                          },
                        }}
                      >
                        {material.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        By {material.author}
                      </Typography>
                    </Box>
                    <Button
                      sx={{
                        minWidth: "auto",
                        p: 1,
                        borderRadius: "50%",
                        bgcolor: "#f0fdfa",
                        color: "#0f766e",
                        "&:hover": {
                          bgcolor: "#ccfbf1",
                        },
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    px: 2,
                    py: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <DownloadIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {material.downloads}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    <Typography variant="body2" fontWeight="medium">
                      {material.rating}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 50,
              borderColor: "#99f6e4",
              color: "text.primary",
              "&:hover": {
                borderColor: "#5eead4",
                bgcolor: "#f0fdfa",
              },
            }}
          >
            Browse All Resources
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default PopularMaterialsSection
