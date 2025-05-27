// "use client"

// import { useState } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Menu,
//   MenuItem,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material"
// import { Link } from "react-router-dom"
// import MenuIcon from "@mui/icons-material/Menu"
// import FolderIcon from "@mui/icons-material/Folder"
// import FolderSharedIcon from "@mui/icons-material/FolderShared"

// const Header = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

//   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <AppBar
//       position="sticky"
//       color="default"
//       elevation={0}
//       sx={{
//         bgcolor: "background.paper",
//         borderBottom: "1px solid",
//         borderColor: "divider",
//       }}
//     >
//       <Container>
//         <Toolbar disableGutters sx={{ height: 64, justifyContent: "space-between" }}>
//           {/* Logo and Brand */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box sx={{ width: 32, height: 32 }}>
//               <img src="/logo.png" alt="EduShare Logo" style={{ width: "100%", height: "100%" }} />
//             </Box>
//             <Typography
//               variant="h6"
//               sx={{
//                 background: "linear-gradient(to right, #0d9488, #10b981)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontWeight: "bold",
//               }}
//             >
//               EduShare
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           {!isMobile && (
//             <Box sx={{ display: "flex", gap: 4 }}>
//               <Button color="inherit" component={Link} to="/">
//                 Home
//               </Button>
//               <Button color="inherit" component={Link} to="/materials">
//                 Materials
//               </Button>
//               <Button color="inherit" component={Link} to="/my-files" startIcon={<FolderIcon />}>
//                 My Files
//               </Button>
//               {/* <Button color="inherit" component={Link} to="/shared-files" startIcon={<FolderSharedIcon />}>
//                 Shared Files
//               </Button> */}
//               <Button color="inherit" component={Link} to="/community">
//                 Community
//               </Button>
//               <Button color="inherit" component={Link} to="/about">
//                 About
//               </Button>
//             </Box>
//           )}

//           {/* Mobile Menu Button */}
//           {isMobile && (
//             <IconButton color="inherit" aria-label="menu" onClick={handleMenuOpen}>
//               <MenuIcon />
//             </IconButton>
//           )}

//           {/* Mobile Menu */}
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/">
//               Home
//             </MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/materials">
//               Materials
//             </MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/my-files">
//               <FolderIcon fontSize="small" sx={{ mr: 1 }} />
//               My Files
//             </MenuItem>
//             {/* <MenuItem onClick={handleMenuClose} component={Link} to="/shared-files">
//               <FolderSharedIcon fontSize="small" sx={{ mr: 1 }} />
//               Shared Files
//             </MenuItem> */}
//             <MenuItem onClick={handleMenuClose} component={Link} to="/community">
//               Community
//             </MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/about">
//               About
//             </MenuItem>
//           </Menu>

//           {/* Auth Buttons */}
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button variant="outlined" size="small" >
//               Log In
//             </Button>
//             <Button
//               variant="contained"
//               size="small"
//               sx={{
//                 background: "linear-gradient(to right, #0d9488, #10b981)",
//                 "&:hover": {
//                   background: "linear-gradient(to right, #0f766e, #047857)",
//                 },
//               }}
//             >
//               Sign Up
//             </Button>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   )
// }

// export default Header
"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Folder as FolderIcon,
  Share as ShareIcon,
  People as PeopleIcon,
  Info as InfoIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from "@mui/icons-material"
import { useAppDispatch } from "../store/Hooks"
import { logoutUser } from "../store/UserSlice"
import { RootStore } from "../store/Store"
import { useSelector } from "react-redux"
// import { useAppDispatch, useAppSelector } from "../../redux/hooks"
// import { logoutUser, selectUser } from "../../redux/slices/userSlice"

const pages = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "My Files", path: "/my-files", icon: <FolderIcon />, auth: true },
  { name: "Shared Files", path: "/shared-files", icon: <ShareIcon />, auth: true },
  { name: "Community", path: "/community", icon: <PeopleIcon /> },
  { name: "About", path: "/about", icon: <InfoIcon /> },
]

const Header = () => {
  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { user, isAuthenticated } =  useSelector((state: RootStore) => state.user)
  const navigate = useNavigate()

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget)
  // }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null)
  // }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    handleCloseUserMenu()
    navigate("/login")
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/assets/logo.png" alt="EduShare Logo" style={{ width: 32, height: 32, marginRight: 8 }} />
        <Typography
          variant="h6"
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
      <Divider />
      <List>
        {pages.map(
          (page) =>
            (!page.auth || (page.auth && isAuthenticated)) && (
              <ListItem key={page.name} disablePadding>
                <ListItemButton component={Link} to={page.path} sx={{ textAlign: "center" }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            ),
        )}
      </List>
    </Box>
  )

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2, alignItems: "center" }}>
            <img src="/assets/logo.png" alt="EduShare Logo" style={{ width: 32, height: 32, marginRight: 8 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                background: "linear-gradient(to right, #0d9488, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              EduShare
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <img src="/assets/logo.png" alt="EduShare Logo" style={{ width: 32, height: 32, marginRight: 8 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                background: "linear-gradient(to right, #0d9488, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              EduShare
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}>
            {pages.map(
              (page) =>
                (!page.auth || (page.auth && isAuthenticated)) && (
                 <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "text.primary", display: "block", mx: 1 }}
                  > 
                    {page.name}
                  </Button>
                ),
            )}
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fullName} src="/assets/avatar-placeholder.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/settings">
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Settings</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/help">
                    <ListItemIcon>
                      <HelpIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Help</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            // ) : (
            //   <Button
            //     component={Link}
            //     to="/login"
            //     variant="contained"
            //     startIcon={<LoginIcon />}
            //     sx={{
            //       borderRadius: 50,
            //       px: 3,
            //       py: 1,
            //       background: "linear-gradient(to right, #0d9488, #10b981)",
            //       "&:hover": {
            //         background: "linear-gradient(to right, #0f766e, #047857)",
            //       },
            //       boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
            //     }}
            //   >
            //     Sign In
            //   </Button>
            // )}
            ) : (
    <>
      <Button
        component={Link}
        to="/register"
        variant="outlined"
        sx={{
          borderRadius: 50,
          px: 3,
          py: 1,
          mr: 2,
          color: "#0d9488",
          borderColor: "#10b981",
          fontWeight: 600,
          background: "white",
          "&:hover": {
            borderColor: "#0f766e",
            color: "#047857"
          }
        }}
      >
        Sign Up
      </Button>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        startIcon={<LoginIcon />}
        sx={{
          borderRadius: 50,
          px: 3,
          py: 1,
          background: "linear-gradient(to right, #0d9488, #10b981)",
          "&:hover": {
            background: "linear-gradient(to right, #0f766e, #047857)",
          },
          boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
        }}
      >
        Sign In
      </Button>

    </>
          )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
  )
}

export default Header

