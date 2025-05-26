import { Box, Typography, Container, Grid, Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "Materials", to: "/materials" },
    { name: "Community", to: "/community" },
    { name: "About", to: "/about" },
  ]

  const resources = [
    { name: "User Guide", to: "#" },
    { name: "FAQ", to: "#" },
    { name: "Technical Support", to: "#" },
    { name: "Blog", to: "#" },
  ]

  const contactInfo = ["info@edushare.com", "+1 (555) 123-4567", "123 Education St, New York, NY"]

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        py: 5,
        background: "linear-gradient(to bottom right, #f8fafc, #f0fdfa)",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }} >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ width: 32, height: 32 }}>
                <img src="/logo.png" alt="EduShare Logo" style={{ width: "100%", height: "100%" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                EduShare
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              The leading platform for sharing teaching resources among educators worldwide.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }} >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0 }}>
              {quickLinks.map((link, index) => (
                <Box component="li" key={index} sx={{ listStyle: "none", mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={link.to}
                    underline="hover"
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }} >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Resources
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0 }}>
              {resources.map((resource, index) => (
                <Box component="li" key={index} sx={{ listStyle: "none", mb: 1 }}>
                  <Link
                    href={resource.to}
                    underline="hover"
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {resource.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0 }}>
              {contactInfo.map((info, index) => (
                <Box component="li" key={index} sx={{ listStyle: "none", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {info}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 5, pt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} EduShare. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
