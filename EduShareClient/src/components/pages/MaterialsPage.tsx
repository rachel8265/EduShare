import { Box, Typography, Container } from "@mui/material"

const MaterialsPage = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Materials
        </Typography>
        <Typography>Materials page content will go here.</Typography>
      </Container>
    </Box>
  )
}

export default MaterialsPage
