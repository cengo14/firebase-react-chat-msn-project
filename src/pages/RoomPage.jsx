import React, { Suspense } from "react";
import background from "../assets/background.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    signOut(auth);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target[0].value.toUpperCase();
    setRoom(room);
  };
  return (
    <div>
      <img className="background-wrap" src={background} alt="" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="room-container">
          <form onSubmit={handleSubmit} className="form">
            <img src={logo} alt="" />
            <p id="heading">MAKSAT MUHABBET</p>
            <p className="heading-title">
              Girmek istediğiniz kanalın isimin yazınız
            </p>
            <div className="field">
              <input
                required
                autocomplete="off"
                placeholder="örn: Goygoy"
                className="input-field"
                type="text"
              />
            </div>

            <div className="btn">
              <button type="submit" className="button2">
                Kanala gir
              </button>

              <button type="button" onClick={logOut} className="button3">
                Hesaptan çıkış yap
              </button>
            </div>
          </form>
        </div>
      </Suspense>
    </div>
  );
};
export default RoomPage;
