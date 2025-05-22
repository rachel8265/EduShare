// import { Box, Button, Grid2 } from "@mui/material";
// import { useState } from "react"
// import LoginRegisterModal from "./Login&registerModal";


// export const style = {
//    position: 'absolute',
//    top: '50%',
//    left: '50%',
//    transform: 'translate(-50%, -50%)',
//    width: 400,
//    bgcolor: 'background.paper',
//    border: '2px solid #000',
//    boxShadow: 24,
//    p: 4,
// };
// export const styleButton = {
//    backgroundColor: '#26a69a',
//    color: 'white',
//    padding: '8px 20px',
//    borderRadius: '10px',
//    fontSize: '16px',
//    fontWeight: 'bold',
//    '&:hover': {
//       backgroundColor: 'white',
//       color: '#26a69a'
//    },
// }
// export default()=>{

//    const [isLogin, setIsLogin] = useState(false);
//    const [sign, setSign] = useState("");

//    const handleClick = (signInOrUp: string) => {
//       setIsLogin(!isLogin);
//       setSign(signInOrUp);
//    }
//    return (
//       <>

//          {!isLogin ?

//             <Box display="flex" justifyContent="flex-start" marginTop={2} >
//                <Grid2 >
//                   <Button
//                      variant="contained"
//                      onClick={() => handleClick('login')}
//                      sx={{
//                         ...styleButton,
//                         marginRight: '4px'
//                      }
// }
//                   >sign in
//                   </Button>

//                   <Button
//                      variant="contained"
//                      onClick={() => handleClick('register')}
//                      sx={styleButton}>
//                      sign up
//                   </Button>
//                </Grid2>
//             </Box>
//             : <LoginRegisterModal sign={sign} onError={() => setIsLogin(false)} />}

//       </>
//    )

// }