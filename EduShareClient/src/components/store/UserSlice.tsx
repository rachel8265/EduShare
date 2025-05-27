
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootStore } from "./Store";
// import { LoginUser, UserType } from "../../models/UserType";

// // פעולה אסינכרונית להבאת משתמש
// export const fetchUser = createAsyncThunk('user/fetch', async (userId: string, thunkAPI) => {
//     try {
//         const res = await axios.get(`http://localhost:5066/api/users/${userId}`);
//         return res.data; // הנחה שהנתונים הם אובייקט משתמש
//     } catch (e) {
//         return thunkAPI.rejectWithValue(e);
//     }
// });

// // פעולה אסינכרונית להתחברות
// export const loginUser = createAsyncThunk('user/login', async (credentials:  LoginUser , thunkAPI) => {

//     try {
//         const response = await axios.post('http://localhost:5066/api/user/login', credentials);
//         return response.data; // הנחה שהתגובה מכילה את פרטי המשתמש
//     } catch (e) {
//         const message = axios.isAxiosError(e) && e.response ? e.response.data : 'שגיאה לא ידועה';
//         return thunkAPI.rejectWithValue(message);
//     }
// });

// // פעולה אסינכרונית לרישום
// export const registerUser = createAsyncThunk('user/register', async (userData: { email: string; password: string; fullName: string , role: 'Admin' | 'User'}, thunkAPI) => {
//     try {
//         const response = await axios.post('http://localhost:5066/api/user/register', userData);

//         // localStorage.setItem("userId", response.data.id);
//         // localStorage.setItem("token", response.data.token);
//         return response.data; // הנחה שהתגובה מכילה את פרטי המשתמש
//     } catch (e) {
//         const message = axios.isAxiosError(e) && e.response ? e.response.data.message : 'שגיאה לא ידועה';
//         return thunkAPI.rejectWithValue(message);
//     }
// });

// // יצירת ה-slice
// const userSlice = createSlice({
//     name: 'user',
//     initialState: { user: {} as UserType, loading: false, error: null as string | null }, // שיניתי את המערך לאובייקט
//     reducers: {
//         // logout: (state) => {
//         //     state.user = null; // ניקוי פרטי המשתמש
//         // }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
//                 state.loading = false;
//                 state.user = action.payload; // עדכון פרטי המשתמש
//             })
//             .addCase(fetchUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserType & { token: string }>) => {
//                 state.loading = false;
//                 state.user = action.payload; // עדכון פרטי המשתמש
//                  sessionStorage.setItem('token', action.payload.token);
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.log("error", action);

//             })
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserType & { token: string }>) => {
//                 state.loading = false;
//                 state.user = action.payload; // עדכון פרטי המשתמש
//                  sessionStorage.setItem('token', action.payload.token);
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     }
// });

// // export const { logout } = userSlice.actions;

// export const selectUser = (state: RootStore) => state.user; // תוקן למפתח הנכון

// export default userSlice.reducer; // ייצוא ה-reducer

// import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import axios from "axios"

// import type { LoginUser, UserType } from "../../models/UserType"
// import { RootStore } from "./Store"

// // פעולה אסינכרונית להבאת משתמש
// export const fetchUser = createAsyncThunk("user/fetch", async (userId: string, thunkAPI) => {
//   try {
//     const res = await axios.get(`http://localhost:5066/api/users/${userId}`)
//     return res.data // הנחה שהנתונים הם אובייקט משתמש
//   } catch (e) {
//     return thunkAPI.rejectWithValue(e)
//   }
// })

// // פעולה אסינכרונית להתחברות
// export const loginUser = createAsyncThunk("user/login", async (credentials: LoginUser, thunkAPI) => {
//   try {
//     const response = await axios.post("http://localhost:5066/api/user/login", credentials)
//     return response.data // הנחה שהתגובה מכילה את פרטי המשתמש
//   } catch (e) {
//     const message = axios.isAxiosError(e) && e.response ? e.response.data : "שגיאה לא ידועה"
//     return thunkAPI.rejectWithValue(message)
//   }
// })

// // פעולה אסינכרונית לרישום
// // export const registerUser = createAsyncThunk(
// //   "user/register",
// //   async (
// //     userData: {
// //       email: string
// //       password: string
// //       fullName: string
// //       role: "Admin"|"User"// | "Teacher" | "SchoolAdmin" | "Student" | "User"
// //     },
// //     thunkAPI,

// //   ) => {
// //     try {

// //       const response = await axios.post("http://localhost:5066/api/user/register", userData)
// //       return response.data // הנחה שהתגובה מכילה את פרטי המשתמש
// //     } catch (e) {
// //       const message = axios.isAxiosError(e) && e.response ? e.response.data.message : "שגיאה לא ידועה"
// //       return thunkAPI.rejectWithValue(message)
// //     }
// //   },
// // )
// // // פעולה אסינכרונית לרישום
// export const registerUser = createAsyncThunk('user/register', async (userData: { email: string; fullName: string; password: string }, thunkAPI) => {
//     try {
//         const response = await axios.post('http://localhost:5066/api/user/register', userData);

//         // localStorage.setItem("userId", response.data.id);
//         // localStorage.setItem("token", response.data.token);
//         return response.data; // הנחה שהתגובה מכילה את פרטי המשתמש
//     } catch (e) {
//         const message = axios.isAxiosError(e) && e.response ? e.response.data.message : 'שגיאה לא ידועה';
//         return thunkAPI.rejectWithValue(message);
//     }
// });
// // פעולה לניתוק משתמש
// export const logoutUser = createAsyncThunk("user/logout", async (_, thunkAPI) => {
//   try {
//     sessionStorage.removeItem("token")
//     return null
//   } catch (e) {
//     return thunkAPI.rejectWithValue("Failed to logout")
//   }
// })

// // יצירת ה-slice
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: {} as UserType,
//     loading: false,
//     error: null as string | null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
//         state.loading = false
//         state.user = action.payload
//         state.isAuthenticated = true
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//         state.isAuthenticated = false
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserType & { token: string }>) => {
//         state.loading = false
//         state.user = action.payload
//         state.isAuthenticated = true
//         sessionStorage.setItem("token", action.payload.token)

//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//         state.isAuthenticated = false
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserType & { token: string }>) => {
//         state.loading = false
//         state.user = action.payload
//         state.isAuthenticated = true
//         sessionStorage.setItem("token", action.payload.token)
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//         state.isAuthenticated = false
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = {} as UserType
//         state.isAuthenticated = false
//       })
//   },
// })

// export const { clearError } = userSlice.actions

// export const selectUser = (state: RootStore) => state.user

// export default userSlice.reducer

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { RootStore } from "../store/Store"
import type { LoginUser, UserType } from "../../models/UserType"
// import { Token } from "@mui/icons-material"
// פעולה אסינכרונית להבאת משתמש לפי token
export const fetchUserWithToken = createAsyncThunk(
  "user/fetchWithToken",
  async (_, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.get("http://localhost:5066/api/user/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // זה ה-UserDto
    } catch (e) {
      const message = axios.isAxiosError(e) && e.response ? e.response.data : "שגיאה לא ידועה";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// פעולה אסינכרונית להבאת משתמש
// export const fetchUser = createAsyncThunk("user/fetch", async (userId: string, thunkAPI) => {
//   try {
//     const res = await axios.get(`http://localhost:5066/api/users/${userId}`)
//     return res.data // הנחה שהנתונים הם אובייקט משתמש
//   } catch (e) {
//     return thunkAPI.rejectWithValue(e)
//   }
// })

// פעולה אסינכרונית להתחברות
export const loginUser = createAsyncThunk("user/login", async (credentials: LoginUser, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5066/api/user/login", credentials)

    return response.data // הנחה שהתגובה מכילה את פרטי המשתמש
  } catch (e) {
    const message = axios.isAxiosError(e) && e.response ? e.response.data : "שגיאה לא ידועה"
    return thunkAPI.rejectWithValue(message)
  }
})


// פעולה אסינכרונית לרישום
export const registerUser = createAsyncThunk(
  "user/register",
  async (
    userData: {
      email: string
      password: string
      fullName: string
    },
    thunkAPI,
  ) => {
    try {
      // הוספת תפקיד "Teacher" באופן קבוע מכיוון שהאתר מיועד רק למורים
      const dataWithRole = {
        ...userData,
        role: "Teacher",
      }

      const response = await axios.post("http://localhost:5066/api/user/register", dataWithRole)
      return response.data // הנחה שהתגובה מכילה את פרטי המשתמש
    } catch (e) {
      const message = axios.isAxiosError(e) && e.response ? e.response.data.message : "שגיאה לא ידועה"
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// פעולה לניתוק משתמש
export const logoutUser = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    sessionStorage.removeItem("token")
    return null
  } catch (e) {
    return thunkAPI.rejectWithValue("Failed to logout")
  }
})

// יצירת ה-slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as UserType,
    token: "",
    loading: false,
    error: null as string | null,
    isAuthenticated: false,
    loginFailed: false, // מצב חדש לסימון כישלון התחברות
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetLoginFailed: (state) => {
      state.loginFailed = false
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUser.pending, (state) => {
      //   state.loading = true
      //   state.error = null
      // })
      // .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      //   state.loading = false
      //   state.user = action.payload
      //   state.isAuthenticated = true
      //   state.loginFailed = false
      // })
      // .addCase(fetchUser.rejected, (state, action) => {
      //   state.loading = false
      //   state.error = action.payload as string
      //   state.isAuthenticated = false
      // })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.loginFailed = false
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserType & { token: { result: string } }>) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.loginFailed = false
        console.log("action.payload", action.payload.token);

        sessionStorage.setItem("token", action.payload.token.result)


      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.loginFailed = true // סימון שההתחברות נכשלה
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserType & { token: string }>) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.loginFailed = false
        sessionStorage.setItem("token", action.payload.token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {} as UserType
        state.isAuthenticated = false
      })
      .addCase(fetchUserWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserWithToken.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginFailed = false;
      })
      .addCase(fetchUserWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
  },
})

export const { clearError, resetLoginFailed } = userSlice.actions

// export const selectUser = (state: RootStore) => state.user.user
export const selectUser = (state: RootStore) => state.user


export default userSlice.reducer
