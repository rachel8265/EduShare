import { Link } from "react-router-dom"
import { Box, Container, Typography, Button, Paper } from "@mui/material"
import { LockOutlined as LockIcon, Home as HomeIcon } from "@mui/icons-material"

export default function UnauthorizedPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #f0fdfa, #ffffff, #ecfdf5)",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: "#ef4444" }} />
          </Box>

          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
            Access Denied
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
            You don't have permission to access this page. Please contact your administrator if you believe this is an
            error.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 50,
                background: "linear-gradient(to right, #0d9488, #10b981)",
                "&:hover": {
                  background: "linear-gradient(to right, #0f766e, #047857)",
                },
                boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
