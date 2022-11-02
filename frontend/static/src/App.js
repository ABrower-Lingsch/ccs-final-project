import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Format from "./components/PageFormat/Format";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";

const INITIAL_STATE = {
  auth: false,
  admin: false,
  userID: null,
};

function App() {
  const [userState, setUserState] = useState(INITIAL_STATE);

  const newState = JSON.parse(window.localStorage.getItem("userState"));

  useEffect(() => {
    window.localStorage.setItem("userState", JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        console.log("this", response.ok);
      } else {
        setUserState(newState);
      }
    };
    checkAuth();
  }, []);

  const handleError = (err) => {
    console.warn(err);
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      Cookies.remove("Authorization");
      window.localStorage.removeItem("userState");
      setUserState(INITIAL_STATE);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Format userState={userState} logoutUser={logoutUser} />}
          >
            <Route
            path="login"
            element={
              <LoginForm userState={userState} setUserState={setUserState} />
            }
          />
          <Route
            path="register"
            element={
              <RegisterForm userState={userState} setUserState={setUserState} />
            }
          />
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
