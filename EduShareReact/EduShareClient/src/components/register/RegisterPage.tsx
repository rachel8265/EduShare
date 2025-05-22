"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../store/Hooks"
import { clearError, registerUser, selectUser } from "../store/UserSlice"


export default function RegisterPage() {
  const location = useLocation()
  const emailFromLogin = location.state?.email || ""

  const [activeStep, setActiveStep] = useState(0)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState(emailFromLogin)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [school, setSchool] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    school?: string
    terms?: string
  }>({})

  const dispatch = useAppDispatch()
  const { loading, error, isAuthenticated } = useAppSelector(selectUser)
  const navigate = useNavigate()

  const steps = ["Account Information", "School Information", "Review & Submit"]

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/my-files")
    }
  }, [isAuthenticated, navigate])

  const validateStep1 = () => {
    const newErrors: { fullName?: string; email?: string; password?: string; confirmPassword?: string } = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: { school?: string } = {}

    if (!school.trim()) {
      newErrors.school = "School name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: { terms?: string } = {}

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    if (activeStep === 0) {
      isValid = validateStep1()
    } else if (activeStep === 1) {
      isValid = validateStep2()
    }

    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep3()) return

    dispatch(
      registerUser({
        fullName,
        email,
        password,
      }),
    )
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
          </>
        )
      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="School or Institution"
              variant="outlined"
              margin="normal"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              error={!!errors.school}
              helperText={errors.school}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This platform is designed exclusively for teachers and educators. By registering, you confirm that you are
              a teaching professional.
            </Typography>
          </>
        )
      case 2:
        return (
          <>
            <Box sx={{ mb: 4, p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Account Summary
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Full Name:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {fullName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  School:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {school}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Role:
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  Teacher
                </Typography>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} color="primary" />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link to="/terms" style={{ textDecoration: "none", color: "#10b981" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" style={{ textDecoration: "none", color: "#10b981" }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mb: 1 }}
            />

            {errors.terms && (
              <Typography variant="caption" color="error" sx={{ display: "block", mb: 2 }}>
                {errors.terms}
              </Typography>
            )}
          </>
        )
      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #f0fdfa, #ffffff, #ecfdf5)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left side - Form */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 50%" },
              p: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 6, display: "flex", alignItems: "center" }}>
              <img src="/assets/logo.png" alt="EduShare Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                EduShare
              </Typography>
            </Box>

            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Join our community of educators and start sharing resources today.
            </Typography>

          {error && (
  <Alert severity="error" sx={{ mb: 3 }}>
    {typeof error === 'string' ? error : 'שגיאה לא ידועה'}
  </Alert>
)}


            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStepContent()}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    visibility: activeStep === 0 ? "hidden" : "visible",
                  }}
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Complete Registration"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
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
                    Continue
                  </Button>
                )}
              </Box>

              {activeStep === 0 && (
                <>
                  <Divider sx={{ my: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>

                  <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      sx={{
                        py: 1.2,
                        borderRadius: 50,
                        borderColor: "#ddd",
                        color: "text.secondary",
                        "&:hover": {
                          borderColor: "#ccc",
                          backgroundColor: "rgba(0, 0, 0, 0.01)",
                        },
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<FacebookIcon />}
                      sx={{
                        py: 1.2,
                        borderRadius: 50,
                        borderColor: "#ddd",
                        color: "text.secondary",
                        "&:hover": {
                          borderColor: "#ccc",
                          backgroundColor: "rgba(0, 0, 0, 0.01)",
                        },
                      }}
                    >
                      Facebook
                    </Button>
                  </Box>
                </>
              )}

              <Box sx={{ textAlign: "center", mt: activeStep === 0 ? 0 : 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: "medium",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>

          {/* Right side - Image */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 50%" },
              bgcolor: "#f0fdfa",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 8,
              position: "relative",
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: -96,
                right: -96,
                width: 384,
                height: 384,
                bgcolor: "#99f6e4",
                borderRadius: "50%",
                mixBlendMode: "multiply",
                filter: "blur(64px)",
                opacity: 0.3,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -96,
                left: -96,
                width: 384,
                height: 384,
                bgcolor: "#a7f3d0",
                borderRadius: "50%",
                mixBlendMode: "multiply",
                filter: "blur(64px)",
                opacity: 0.3,
              }}
            />

            <Box sx={{ position: "relative", width: "100%", maxWidth: 400, zIndex: 1 }}>
              <img
                src="/assets/teachers-collaborating.png"
                alt="Teachers collaborating"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                mt: 4,
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: 400,
                zIndex: 1,
              }}
            >
              Join Our Community of Educators
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center", maxWidth: 400, zIndex: 1 }}
            >
              Create, share, and discover high-quality teaching resources with educators from around the world.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
