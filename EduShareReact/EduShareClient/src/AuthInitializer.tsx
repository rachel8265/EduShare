import { useDispatch } from "react-redux";
import { fetchUserWithToken } from "./components/store/UserSlice";
import { useEffect } from "react";
import { AppDispatch } from "./components/store/Store";

export function AuthInitializer() {
   const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchUserWithToken());
    }
  }, [dispatch]);
  return null;
}