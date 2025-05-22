// import React, { useState } from 'react';
// import axios from 'axios';

// const AuthComponent = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [fullName, setFullName] = useState('');
//     const [isLogin, setIsLogin] = useState(true); // מצב לבדוק אם מדובר בהתחברות או בהרשמה

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:5066/api/user/login', {
//                 email,
//                 password
//             });
//             console.log('Login successful:', response.data);
//             // כאן תוכל לשמור את ה-token או לעבור לדף אחר
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     const handleRegister = async () => {
//         try {
//             const response = await axios.post('http://localhost:5066/api/user/register', {
//                 email,
//                 password,
//                 fullName,
//                 role: 'User' // ניתן לשנות את ה-role לפי הצורך
//             });
//             console.log('Registration successful:', response.data);
//             // כאן תוכל לעבור לדף התחברות או להציג הודעה
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>{isLogin ? 'Login' : 'Register'}</h2>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             {!isLogin && (
//                 <input
//                     type="text"
//                     placeholder="Full Name"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                 />
//             )}
//             <div>
//                 <button onClick={isLogin ? handleLogin : handleRegister}>
//                     {isLogin ? 'Login' : 'Register'}
//                 </button>
//                 <button onClick={() => setIsLogin(!isLogin)}>
//                     {isLogin ? 'Switch to Register' : 'Switch to Login'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AuthComponent;
