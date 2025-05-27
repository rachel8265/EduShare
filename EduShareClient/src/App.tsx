
import './App.css'
import { Provider } from 'react-redux';
import store from './components/store/Store'
import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { AuthInitializer } from './AuthInitializer'
import reactLogo from './assets/reactLogo.svg';
const theme = createTheme({
  palette: {
    primary: {
      main: "#14b8a6", // teal-500
      light: "#5eead4", // teal-300
      dark: "#0f766e", // teal-700
    },
    secondary: {
      main: "#10b981", // emerald-500
      light: "#6ee7b7", // emerald-300
      dark: "#047857", // emerald-700
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
})
function App() {


  return (
    <>
   
    <ThemeProvider theme={theme}>
    <Provider store={store}>
       <AuthInitializer />
<Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
  <img src={reactLogo} alt="EduShare Logo" style={{ height: 60 }} />

        <RouterProvider router={router} />

      </Box>
</Provider>
</ThemeProvider>

    </>
  )
}

export default App
