"use client"
import { Box, Container } from "@mui/material"
import AboutHero from "../about/AboutHero"
import AboutMission from "../about/AboutMission"
import AboutTeam from "../about/AboutTeam"
import AboutStats from "../about/AboutStats"
import AboutFAQ from "../about/AboutFAQ"
import AboutContact from "../about/AboutContact"

const AboutPage = () => {
  // const theme = useTheme()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f0fdfa, #ffffff)",
      }}
    >
      <AboutHero />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <AboutMission />
        <AboutStats />
        <AboutTeam />
        <AboutFAQ />
        <AboutContact />
      </Container>
    </Box>
  )
}

export default AboutPage
