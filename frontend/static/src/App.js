import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserLogin from "./components/Login/UserLogin";


function App() {
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));
  const [user, setUser] = useState("");

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
      setAuth(false);
    }
  };

  return (
    <>
      
      <section className="app">
        <div className="main">
          <UserLogin setAuth={setAuth} setUser={setUser} />
        </div>
      </section>
    </>
  );
}

export default App;
