import { createBrowserRouter, Navigate, redirect } from "react-router-dom"
import AppLayuot from "./components/AppLayout"
import HomePage from "./components/pages/HomePage"
import MaterialsPage from "./components/pages/MaterialsPage"
import MyFilesPage from "./components/pages/MyFiles"
import AboutPage from "./components/pages/AboutPage"
import CommunityPage from "./components/pages/CommunityPage"
// import SharedFilesPage from "./components/pages/SharedFilesPage"
import UnauthorizedPage from "./components/UnauthorizedPage"
import RegisterPage from "./components/register/RegisterPage"
import LoginPage from "./components/login/LoginPage"
import store from "./components/store/Store"
import SharedFilesByTopic from "./components/pages/SharedFilesPage"
import ProtectedRoute from "./ProtectedRoute"

// // פונקציית בדיקת הרשאות שתשמש כ-loader
// const requireAuth = () => {
//   // בדיקת מצב ההתחברות מה-Redux store
//   const state = store.getState()
//   const isAuthenticated = state.user.isAuthenticated
//   const user = state.user.user

//   // אם המשתמש לא מחובר או אין לו מזהה, הפנה לדף ההתחברות
//   // if (!isAuthenticated || !user?.id) {
//   //   return redirect("/login")
//   // }

//   // אם המשתמש מחובר, המשך לדף המבוקש
//   return null
// }

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayuot />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "/materials",
//         element: <MaterialsPage />,
//       },
//       {
//         path: "/my-files",
//         element: <MyFilesPage />,
//         // הוספת loader שיבדוק הרשאות לפני טעינת הדף
//         loader: requireAuth,
//       },
//       // {
//       //   path: "/shared-files",
//       //   element: <SharedFilesPage />,
//       //   // הוספת loader שיבדוק הרשאות לפני טעינת הדף
//       //   loader: requireAuth,
//       // },
//       {
//         path: "/community",
//         element: <CommunityPage />,
//       },
//       {
//         path: "/about",
//         element: <AboutPage />,
//       },
//       {
//         path: "/unauthorized",
//         element: <UnauthorizedPage />,
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "/login",
//         element: <LoginPage />,
//       },
//       // נתיב כללי שיתפוס כל URL לא קיים ויפנה לדף הבית
//       {
//         path: "*",
//         element: <Navigate to="/" replace />,
//       },
//     ],
//   },
// ])

// export function requireAuth() {
//   const state = store.getState()
//   const isAuthenticated = state.user.isAuthenticated
//   if (!isAuthenticated) {
//     return redirect("/login")
//   }
//   return null
// }

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayuot />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "/materials",
//         element: <MaterialsPage />,
//       },
//       {
//         path: "/my-files",
//         element: <MyFilesPage />,
//         // loader: requireAuth, // שים לב לכאן
//       },
//       {
//         path: "/community",
//         element: <CommunityPage />,
//       },
//       {
//         path: "/about",
//         element: <AboutPage />,
//       },
//       {
//         path: "/unauthorized",
//         element: <UnauthorizedPage />,
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "/login",
//         element: <LoginPage />,
//       },{
//       path:"/shared-files",
//        element:<SharedFilesByTopic  />
//       },
//       {
//         path: "*",
//         element: <Navigate to="/" replace />,
//       },
//     ],
//   },
// ]);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayuot />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/materials", element: <MaterialsPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,   // עטוף את הנתיבים המוגנים
        children: [
          { path: "/my-files", element: <MyFilesPage /> },
          { path: "/shared-files", element: <SharedFilesByTopic /> },
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
])