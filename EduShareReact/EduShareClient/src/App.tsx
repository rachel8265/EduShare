import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserReducer from './components/store/UserReducer'
// import FileUpload from './components/FileUpload'
// import ShowFolder from './components/ShowFolders'
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './components/store/Store'
// import FileManager from './components/new/FileManager'
// import HomePage from './components/newlogin/HomePagge'
// import Header from './components/newlogin/Header'

import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import FileManager from './components/fileManager/FileManager'
// import Home from './components/Home'
import Header from './components/layout/Header'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { fetchUserWithToken, loginUser } from './components/store/UserSlice'
import { AuthInitializer } from './AuthInitializer'
// import Header from './components/Header'
// import FileManager from './components/new/likeInEmail/FileManager'
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
{/* <UserReducer/> */}
{/* <FileUpload/> */}
{/* <Header/> */}
{/* <ShowFolder/> */}
{/* <HomePage/> */}
{/* <FileManager/> */}
{/* <Header/> */}
<Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
  <img src="./logo.svg" alt="EduShare Logo" style={{ height: 60 }} />

        <RouterProvider router={router} />

      </Box>
</Provider>
</ThemeProvider>

    </>
  )
}

export default App
