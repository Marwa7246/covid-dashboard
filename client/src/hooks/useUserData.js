import React, { useState, useEffect } from "react";
import Application from "../components/Application/Application";
import Login from "../views/Login";
import Signup from "../views/Signup";
import axios from "axios";

export default function useUserData() {
  const [user, setUser] = useState({});
  // const [form, setForm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`/auto_login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          console.log("response after auto login : ", res);
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  // const handleFormSwitch = (input) => {
  //   setForm(input);
  // };

  // const handleAuthClick = () => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get(`/user_is_authed`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((data) => console.log(data));
  // };

  // console.log("USER is >>>>>>>>>>>>", user);

  // const renderForm = () => {
  //   switch (form) {
  //     case "Login":
  //       return <Login handleLogin={handleLogin} />;
  //       break;
  //     default:
  //       return <Signup handleLogin={handleLogin} />;
  //   }
  // };

  // return (
  //   <div>
  //     <Application />
  //     {renderForm()}
  //     <button onClick={handleAuthClick}>Access Authorized Route</button>
  //   </div>
  // );
}
