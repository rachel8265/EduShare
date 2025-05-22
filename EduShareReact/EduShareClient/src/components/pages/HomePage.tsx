import { Box } from "@mui/material"
import HeroSection from "../sections/HeroSection"
import StatsSection from "../sections/StatsSection"
import FeaturesSection from "../sections/FeaturesSection"
import PopularMaterialsSection from "../sections/PopularMaterialsSection"
import HowItWorksSection from "../sections/HowItWorksSection"
import TestimonialsSection from "../sections/TestimonialsSection"
import CTASection from "../sections/CTASection"
import SearchSection from "../sections/SearchSection"

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PopularMaterialsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <SearchSection />
    </Box>
  )
}

export default HomePage
