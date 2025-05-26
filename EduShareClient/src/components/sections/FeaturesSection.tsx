import { Box, Typography, Container, Grid, Card, CardContent, CardHeader, Button } from "@mui/material"
import FileTextIcon from "@mui/icons-material/Description"
import ShareIcon from "@mui/icons-material/Share"
import UsersIcon from "@mui/icons-material/People"
import ArrowRightIcon from "@mui/icons-material/ArrowForward"

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileTextIcon sx={{ width: 28, height: 28, color: "#0f766e" }} />,
      title: "Smart Resource Management",
      description: "Organize all your teaching materials in one accessible place",
      items: [
        "Categorize by subject, grade, and topic",
        "Track usage and popularity",
        "Version control for updated materials",
      ],
    },
    {
      icon: <ShareIcon sx={{ width: 28, height: 28, color: "#0f766e" }} />,
      title: "Effortless Sharing",
      description: "Share resources with colleagues quickly and easily",
      items: [
        "One-click sharing to individuals or groups",
        "Control privacy and access settings",
        "Receive valuable feedback from peers",
      ],
    },
    {
      icon: <UsersIcon sx={{ width: 28, height: 28, color: "#0f766e" }} />,
      title: "Supportive Community",
      description: "Connect with a network of passionate educators",
      items: [
        "Join subject-specific groups",
        "Collaborate on projects and lessons",
        "Participate in professional development",
      ],
    },
  ]

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Why Teachers Love EduShare
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            Our platform is designed by teachers, for teachers, to make your life easier and your teaching more
            effective.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{xs: 12, md: 4}}  key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: "linear-gradient(to bottom right, white, #f0fdfa)",
                  border: 0,
                  boxShadow: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: "linear-gradient(to bottom right, #99f6e4, #a7f3d0)",
                    borderBottomLeftRadius: 24,
                    opacity: 0.2,
                  }}
                />
                <CardHeader
                  title={feature.title}
                  subheader={feature.description}
                  titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
                  subheaderTypographyProps={{ variant: "body2", color: "text.secondary" }}
                  avatar={
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(to bottom right, #ccfbf1, #a7f3d0)",
                        borderRadius: 3,
                      }}
                    >
                      {feature.icon}
                    </Box>
                  }
                />
                <CardContent>
                  <Box component="ul" sx={{ pl: 0, mt: 1 }}>
                    {feature.items.map((item, itemIndex) => (
                      <Box
                        component="li"
                        key={itemIndex}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          listStyle: "none",
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "#14b8a6",
                          }}
                        />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    endIcon={<ArrowRightIcon />}
                    sx={{
                      mt: 2,
                      p: 0,
                      minWidth: "auto",
                      color: "#0d9488",
                      "&:hover": {
                        color: "#0f766e",
                        background: "transparent",
                      },
                    }}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default FeaturesSection
