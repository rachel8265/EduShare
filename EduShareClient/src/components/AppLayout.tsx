import { Outlet } from "react-router"
import { Box } from "@mui/material"
import Header from "./layout/Header"
import Footer from "./layout/Footer"

export default () => {
    return (
        <>
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}