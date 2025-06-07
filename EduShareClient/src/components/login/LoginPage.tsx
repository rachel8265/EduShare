// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useNavigate, useLocation, Link } from "react-router-dom"
// import {
//   Box,
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Divider,
//   InputAdornment,
//   IconButton,
//   Alert,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Visibility,
//   VisibilityOff,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Google as GoogleIcon,
//   Facebook as FacebookIcon,
//   PersonAdd as PersonAddIcon,
// } from "@mui/icons-material"
// import { useAppDispatch, useAppSelector } from "../store/Hooks"
// import { clearError, loginUser, resetLoginFailed, selectUser } from "../store/UserSlice"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

//   const dispatch = useAppDispatch()
//   const { loading, error, isAuthenticated, loginFailed } = useAppSelector(selectUser)

//   const navigate = useNavigate()
//   const location = useLocation()

//   // Get the return URL from location state or default to home page
//   const from = (location.state as any)?.from?.pathname || "/my-files"

//   // Clear errors when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearError())
//       dispatch(resetLoginFailed())
//     }
//   }, [dispatch])

//   // Redirect if already authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(from)
//     }
//   }, [isAuthenticated, navigate, from])

//   const validateForm = () => {
//     const newErrors: { email?: string; password?: string } = {}

//     if (!email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!password) {
//       newErrors.password = "Password is required"
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     dispatch(loginUser({ email, password }))

//     navigate("/my-files")

//   }

//   const handleDemoLogin = async () => {
//     dispatch(loginUser({ email: "teacher@example.com", password: "password123" }))
//   }

//   const handleRegisterRedirect = () => {
//     navigate("/register", { state: { email } })
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         background: "linear-gradient(to bottom right, #f0fdfa, #ffffff, #ecfdf5)",
//         py: 8,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Paper
//           elevation={0}
//           sx={{
//             display: "flex",
//             borderRadius: 4,
//             overflow: "hidden",
//             boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
//             flexDirection: { xs: "column", md: "row" },
//           }}
//         >
//           {/* Left side - Form */}
//           <Box
//             sx={{
//               flex: { xs: "1", md: "0 0 50%" },
//               p: { xs: 4, md: 8 },
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Box sx={{ mb: 6, display: "flex", alignItems: "center" }}>
//               <img src="/assets/logo.png" alt="EduShare Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: "bold",
//                   background: "linear-gradient(to right, #0d9488, #10b981)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 EduShare
//               </Typography>
//             </Box>

//             <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
//               Welcome Back
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//               Sign in to access your teaching resources and connect with other educators.
//             </Typography>

//             {error && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {error}
//               </Alert>
//             )}

//             {loginFailed && (
//               <Alert severity="warning" sx={{ mb: 3 }}>
//                 Login failed. If you don't have an account yet, please register.
//                 <Button
//                   variant="text"
//                   color="inherit"
//                   onClick={handleRegisterRedirect}
//                   startIcon={<PersonAddIcon />}
//                   sx={{ mt: 1, fontWeight: "bold" }}
//                 >
//                   Register Now
//                 </Button>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 variant="outlined"
//                 margin="normal"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={!!errors.email}
//                 helperText={errors.email}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ mb: 3 }}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 variant="outlined"
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={!!errors.password}
//                 helperText={errors.password}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="action" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ mb: 2 }}
//               />

//               <Box sx={{ textAlign: "right", mb: 3 }}>
//                 <Link to="/forgot-password" style={{ textDecoration: "none" }}>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "primary.main",
//                       "&:hover": { textDecoration: "underline" },
//                     }}
//                   >
//                     Forgot password?
//                   </Typography>
//                 </Link>
//               </Box>

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   py: 1.5,
//                   borderRadius: 50,
//                   background: "linear-gradient(to right, #0d9488, #10b981)",
//                   "&:hover": {
//                     background: "linear-gradient(to right, #0f766e, #047857)",
//                   },
//                   boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
//                   mb: 2,
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
//               </Button>

//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={handleDemoLogin}
//                 disabled={loading}
//                 sx={{
//                   py: 1.5,
//                   borderRadius: 50,
//                   borderColor: "#10b981",
//                   color: "#10b981",
//                   "&:hover": {
//                     borderColor: "#047857",
//                     backgroundColor: "rgba(16, 185, 129, 0.05)",
//                   },
//                   mb: 3,
//                 }}
//               >
//                 Demo Login
//               </Button>

//               <Divider sx={{ my: 3 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   OR
//                 </Typography>
//               </Divider>

//               <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<GoogleIcon />}
//                   sx={{
//                     py: 1.2,
//                     borderRadius: 50,
//                     borderColor: "#ddd",
//                     color: "text.secondary",
//                     "&:hover": {
//                       borderColor: "#ccc",
//                       backgroundColor: "rgba(0, 0, 0, 0.01)",
//                     },
//                   }}
//                 >
//                   Google
//                 </Button>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<FacebookIcon />}
//                   sx={{
//                     py: 1.2,
//                     borderRadius: 50,
//                     borderColor: "#ddd",
//                     color: "text.secondary",
//                     "&:hover": {
//                       borderColor: "#ccc",
//                       backgroundColor: "rgba(0, 0, 0, 0.01)",
//                     },
//                   }}
//                 >
//                   Facebook
//                 </Button>
//               </Box>

//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Don't have an account?{" "}
//                   <Link to="/register" style={{ textDecoration: "none" }}>
//                     <Typography
//                       component="span"
//                       variant="body2"
//                       sx={{
//                         color: "primary.main",
//                         fontWeight: "medium",
//                         "&:hover": { textDecoration: "underline" },
//                       }}
//                     >
//                       Sign up
//                     </Typography>
//                   </Link>
//                 </Typography>
//               </Box>
//             </form>
//           </Box>

//           {/* Right side - Image */}
//           <Box
//             sx={{
//               flex: { xs: "1", md: "0 0 50%" },
//               bgcolor: "#f0fdfa",
//               display: { xs: "none", md: "flex" },
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               p: 8,
//               position: "relative",
//             }}
//           >
//             {/* Decorative elements */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: -96,
//                 right: -96,
//                 width: 384,
//                 height: 384,
//                 bgcolor: "#99f6e4",
//                 borderRadius: "50%",
//                 mixBlendMode: "multiply",
//                 filter: "blur(64px)",
//                 opacity: 0.3,
//               }}
//             />
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: -96,
//                 left: -96,
//                 width: 384,
//                 height: 384,
//                 bgcolor: "#a7f3d0",
//                 borderRadius: "50%",
//                 mixBlendMode: "multiply",
//                 filter: "blur(64px)",
//                 opacity: 0.3,
//               }}
//             />

//             <Box sx={{ position: "relative", width: "100%", maxWidth: 400, zIndex: 1 }}>
//               <img
//                 src="/assets/teachers-collaborating.png"
//                 alt="Teachers collaborating"
//                 style={{ width: "100%", height: "auto" }}
//               />
//             </Box>
//             <Typography
//               variant="h5"
//               sx={{
//                 mt: 4,
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 maxWidth: 400,
//                 zIndex: 1,
//               }}
//             >
//               Connect, Share, and Grow with Fellow Educators
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ mt: 2, textAlign: "center", maxWidth: 400, zIndex: 1 }}
//             >
//               Join thousands of teachers who are already saving time and improving their teaching with EduShare.
//             </Typography>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
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
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material"
import { useAppDispatch } from "../store/Hooks"
import { clearError, fetchUserWithToken, loginUser, resetLoginFailed } from "../store/UserSlice"
import { useSelector } from "react-redux"
import { RootStore } from "../store/Store"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const dispatch = useAppDispatch()
  const userState = useSelector((state: RootStore) => state.user)
  // console.log("userState", userState);


  // const { loading, error, isAuthenticated, loginFailed } = useAppSelector(selectUser)

  const navigate = useNavigate()
  // const location = useLocation()

  // Get the return URL from location state or default to home page
  // const from = (location.state as any)?.from?.pathname || "/my-files"

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError())
      dispatch(resetLoginFailed())
    }
  }, [dispatch])
const { isAuthenticated } = useSelector((state: RootStore) => state.user);


useEffect(() => {
  if (isAuthenticated) {
    navigate("/my-files");
  }
}, [isAuthenticated, navigate]);
  // Redirect if already authenticated
  // useEffect(() => {
  //   if (userState.isAuthenticated ) {
  //     navigate("/my-files")
  //   }
  // }, [userState.isAuthenticated , navigate])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // dispatch(loginUser({ email, password }))
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      await dispatch(fetchUserWithToken())
      navigate("/my-files")
    }
  }

  const handleDemoLogin = async () => {
    dispatch(loginUser({ email: "teacher@example.com", password: "password123" }))
  }

  const handleRegisterRedirect = () => {
    navigate("/register", { state: { email } })
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
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Sign in to access your teaching resources and connect with other educators.
            </Typography>


            {/* {error && (
  <Alert severity="error" sx={{ mb: 3 }}>
    {typeof error === 'string' ? error : 'An unexpected error occurred.'}
  </Alert>
)} */}


            {userState.loginFailed && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                Login failed. If you don't have an account yet, please register.
                <Button
                  variant="text"
                  color="inherit"
                  onClick={handleRegisterRedirect}
                  startIcon={<PersonAddIcon />}
                  sx={{ mt: 1, fontWeight: "bold" }}
                >
                  Register Now
                </Button>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
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
                sx={{ mb: 2 }}
              />

              <Box sx={{ textAlign: "right", mb: 3 }}>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={userState.loading}
                sx={{
                  py: 1.5,
                  borderRadius: 50,
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  "&:hover": {
                    background: "linear-gradient(to right, #0f766e, #047857)",
                  },
                  boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                  mb: 2,
                }}
              >
                {userState.loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleDemoLogin}
                disabled={userState.loading}
                sx={{
                  py: 1.5,
                  borderRadius: 50,
                  borderColor: "#10b981",
                  color: "#10b981",
                  "&:hover": {
                    borderColor: "#047857",
                    backgroundColor: "rgba(16, 185, 129, 0.05)",
                  },
                  mb: 3,
                }}
              >
                Demo Login
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: "medium",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign up
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
              Connect, Share, and Grow with Fellow Educators
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center", maxWidth: 400, zIndex: 1 }}
            >
              Join thousands of teachers who are already saving time and improving their teaching with EduShare.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

