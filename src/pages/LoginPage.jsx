import React, { Suspense } from "react";
import BokehText from "../components/BokehText";
import LoginButton from "../components/LoginButton";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import background from "../assets/background.svg";

const LoginPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setIsAuth(true);
        localStorage.setItem("token", res.user.refreshToken);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <img className="background-wrap" src={background} alt="" />

      <Suspense fallback={<div>Loading...</div>}>
        <BokehText bokehText="Maksat Muhabbet" />
        <div className="login-box">
          <LoginButton handleClick={handleClick} />
        </div>
      </Suspense>
    </div>
  );
};
export default LoginPage;
