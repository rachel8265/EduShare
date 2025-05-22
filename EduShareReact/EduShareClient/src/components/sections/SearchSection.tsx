import { Box, Typography, Container, InputBase, Button, Chip } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const SearchSection = () => {
  const tags = ["Mathematics", "English", "Science", "History", "Art", "Music"]

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 3 }}>
            Find Teaching Resources
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Easily search for materials by subject, grade level, or topic
          </Typography>
          <Box sx={{ position: "relative", maxWidth: 500, mx: "auto" }}>
            <InputBase
              placeholder="Search for teaching materials..."
              fullWidth
              sx={{
                height: 48,
                px: 2,
                py: 1,
                borderRadius: 50,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                pr: 6,
              }}
            />
            <Button
              sx={{
                position: "absolute",
                right: 4,
                top: 4,
                height: 40,
                minWidth: 40,
                borderRadius: 50,
                background: "linear-gradient(to right, #0d9488, #10b981)",
                "&:hover": {
                  background: "linear-gradient(to right, #0f766e, #047857)",
                },
                color: "white",
                p: 0,
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1, mt: 3 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  bgcolor: "#f0fdfa",
                  color: "#0f766e",
                  "&:hover": {
                    bgcolor: "#ccfbf1",
                  },
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SearchSection
