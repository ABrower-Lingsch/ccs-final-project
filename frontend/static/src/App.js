import "./components/Styles/App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Format from "./components/PageFormat/Format";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";
import CreateClientProfile from "./components/Profile/ClientCreate";
import CreateStylistProfile from "./components/Profile/StylistCreate";
import StylistProfilePage from "./components/Profile/StylistProfilePage";

const INITIAL_STATE = {
  auth: false,
  admin: false,
  userID: null,
  is_stylist: false,
  is_client: false,
  stylist_avatar: null,
  client_avatar: null,
  stylist_profile: null,
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
                <RegisterForm
                  userState={userState}
                  setUserState={setUserState}
                />
              }
            />
            <Route
              path="create-client-profile"
              element={
                <CreateClientProfile
                  userState={userState}
                  setUserState={setUserState}
                />
              }
            />
            <Route
              path="create-stylist-profile"
              element={
                <CreateStylistProfile
                  userState={userState}
                  setUserState={setUserState}
                />
              }
            />
            <Route
              path="stylist/profile-page"
              element={
                <StylistProfilePage
                  userState={userState}
                  setUserState={setUserState}
                />
              }
            />
            <Route index element={<MainPage userState={userState} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
