import { Outlet } from "react-router"
import { AppBar, Box, Toolbar } from "@mui/material"
// import LoginRegisterBtn from "./Login&registerBtn"
import Header from "./layout/Header"
import Footer from "./layout/Footer"

export default () => {
    return (
        <>
            {/* <AppBar sx={{ position:"sticky", height: '13vh', bgcolor: "#26a69a" }} > */}
               
                {/* <Toolbar sx={{ justifyContent: "space-between" }}>
                     <Grid2 container justifyContent="space-between"> */}
                        {/* <LoginRegisterBtn/> */}
                     {/* </Grid2> */}
                {/* </Toolbar> */}
               
            {/* </AppBar> */}
            {/* <Outlet/> */}
            <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
        </>
    )
}