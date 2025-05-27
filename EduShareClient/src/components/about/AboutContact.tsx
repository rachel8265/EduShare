"use client"
import { Box, Grid, Typography, TextField, Button, Paper, useTheme, alpha, InputAdornment } from "@mui/material"
import { Person, Email, Message } from "@mui/icons-material"

const AboutContact = () => {
  const theme = useTheme()

  return (
    <Box sx={{ mb: 8 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Get In Touch
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
          Have questions or feedback? We'd love to hear from you. Our team is always ready to assist you.
        </Typography>
      </Box>

      <Grid container spacing={6} justifyContent="center">
        <Grid size={{xs: 12, md: 6}} >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <form>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                margin="normal"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Message color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 50,
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  "&:hover": {
                    background: "linear-gradient(to right, #0f766e, #047857)",
                  },
                  boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid size={{xs:12,md:1}} >
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Information
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Email
              </Typography>
              <Typography variant="body1" color="text.secondary">
                info@edushare.com
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Phone
              </Typography>
              <Typography variant="body1" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Address
              </Typography>
              <Typography variant="body1" color="text.secondary">
                123 Education Street
                <br />
                New York, NY 10001
                <br />
                United States
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutContact
