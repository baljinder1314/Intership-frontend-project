import { useDispatch } from "react-redux";
import "./App.css";
import AppRoter from "./routes/AppRoter";
import { useEffect } from "react";
import { addUser, removeUser } from "./slices/userSlice";
import api from "./api/api";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ← backend reads httpOnly cookie automatically
        const res = await api.get("/me");
        
        dispatch(addUser(res?.data)); // ← restore user in redux
      } catch (error) {
        dispatch(removeUser()); // ← cookie expired or invalid
      }
    };

    fetchUser();
  }, [dispatch]);
  return <AppRoter />;
}

export default App;
