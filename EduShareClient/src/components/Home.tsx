// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   TextField,
// } from "@mui/material";
// import { Download, Star, Search } from "@mui/icons-material";

// const Home = () => {
//   return (
//     <div>
//       {/* Header */}
//       <AppBar position="sticky" sx={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)" }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             EduShare
//           </Typography>
//           <Button color="inherit">Log In</Button>
//           <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
//             Sign Up
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container>
//         {/* Hero Section */}
//         <div style={{ padding: "80px 0", textAlign: "center", position: "relative" }}>
//           <Typography variant="h3" sx={{ marginBottom: 2 }}>
//             Share, Discover, Teach Better
//           </Typography>
//           <Typography variant="body1" sx={{ marginBottom: 4 }}>
//             One platform to share, manage, and discover quality teaching materials.
//           </Typography>
//           <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
//             Get Started
//           </Button>
//           <Button variant="outlined" color="primary">
//             Learn More
//           </Button>
//         </div>

//         {/* Stats Section */}
//         <Grid container spacing={2} sx={{ marginTop: 4 }}>
//           {[
//             { title: "10,000+", subtitle: "Educators" },
//             { title: "25,000+", subtitle: "Resources" },
//             { title: "500+", subtitle: "Schools" },
//             { title: "50,000+", subtitle: "Downloads" },
//           ].map((stat, index) => (
//             <Grid item xs={6} md={3} key={index}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{stat.title}</Typography>
//                   <Typography variant="body2">{stat.subtitle}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Popular Materials Section */}
//         <Typography variant="h4" sx={{ marginTop: 4, textAlign: "center" }}>
//           Trending Teaching Resources
//         </Typography>
//         <Grid container spacing={2} sx={{ marginTop: 2 }}>
//           {[
//             {
//               title: "Math Lesson Plan - Grade 4",
//               downloads: 234,
//               rating: 4.8,
//               image: "/placeholder.svg",
//             },
//             {
//               title: "English Worksheets - Grade 6",
//               downloads: 187,
//               rating: 4.6,
//               image: "/placeholder.svg",
//             },
//             {
//               title: "Science Presentation - Middle School",
//               downloads: 156,
//               rating: 4.7,
//               image: "/placeholder.svg",
//             },
//           ].map((material, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card>
//                 <CardMedia component="img" height="140" image={material.image} alt={material.title} />
//                 <CardContent>
//                   <Typography variant="h6">{material.title}</Typography>
//                   <Typography variant="body2">
//                     <Download /> {material.downloads} Downloads
//                   </Typography>
//                   <Typography variant="body2">
//                     <Star /> {material.rating}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" color="primary">
//                     Download
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Search Section */}
//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <TextField
//             label="Search for teaching materials..."
//             variant="outlined"
//             fullWidth
//             sx={{ maxWidth: 600 }}
//           />
//           <Button variant="contained" color="primary" sx={{ marginLeft: 1 }}>
//             <Search />
//           </Button>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Home;
