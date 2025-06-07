import {  Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useRef, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "./store/UserSlice"; // ייבוא הפעולה
// import { UserContext } from "./store/UserReducer";
import { AxiosError } from "axios";
import { AppDispatch } from "./store/Store";
import { style } from "./style/Style";
import { LoginUser } from "../models/UserType";

const LoginModal = ({ sign, onError }: { sign: string, onError: () => void }) => {
    // const [user, userDispatch] = useContext(UserContext);
    const [modal, setModal] = useState(true);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);
    const dispatch = useDispatch<AppDispatch>(); // ציין את הסוג

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (sign === 'register') {
                const res = await dispatch(registerUser({
                    email: emailRef.current?.value || "",
                    password: passwordRef.current?.value || "",
                    fullName: fullNameRef.current?.value || "",
                    // role: roleRef.current?.value as 'Admin' | 'User'
                })).unwrap();
                // console.log(res);

                // userDispatch({
                //     type: "CREATE",
                //     data: {
                //         password: passwordRef.current?.value || "",
                //         email: emailRef.current?.value || "",
                //         fullName: res.fullName,
                //         role: res.role,
                //     },
                // });
            } else {
                try {
                    const res = await dispatch(loginUser({
                        email: emailRef.current?.value || "",
                        password: passwordRef.current?.value || "",
                    } as LoginUser)).unwrap();
                    // console.log(res);
                } catch (error:any) {
                    if(error==401)
                    if (error.status === 401) {
                        alert("You are not registered yet. Click register")
                    //  alert("Unauthorized access - please check your credentials.");
                        // כאן תוכל להוסיף קוד נוסף כמו להציג הודעה למשתמש
                    } else {
                       alert("An unexpected error occurred:"+ error);
                    }
                }
                // userDispatch({
                //     type: "CREATE",
                //     data: {
                //         password: passwordRef.current?.value || "",
                //         email: emailRef.current?.value || "",
                //         fullName: res.user.firstName,
                //         role: res.user.role,
                //     },
                // });
            }
            setModal(false);
        } catch (e: AxiosError | any) {
            if (e.response?.status === 400) {
                alert('User is already logged in');
                onError();
            }
            if (e.response?.status === 401) {
                alert("You must register");
                onError();
            }
        }
    }

    return (
        <>
            <Modal open={modal}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                        <TextField label='userPassword' variant="filled" margin="normal" fullWidth inputRef={passwordRef} required />
                        {sign === 'register' && (
                            <>
                                <TextField label='Full Name' variant="filled" margin="normal" fullWidth inputRef={fullNameRef} required />
                                <TextField label='Role' variant="filled" margin="normal" fullWidth select inputRef={roleRef} required>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
                                </TextField>

                            </>
                        )}
                        <Button sx={{ backgroundColor: '#26a69a', marginTop: '2px' }} color="info" fullWidth variant="contained" type="submit">
                            {sign === 'register' ? 'הרשמה' : 'התחברות'}
                        </Button>
                    </form>
                </Box>
            </Modal >
        </>
    );
}

export default LoginModal;
