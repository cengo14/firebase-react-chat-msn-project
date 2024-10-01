import React from "react";

const Modal = ({ isOpen, setIsOpen, img }) => {
  return (
    <div onClick={() => setIsOpen(false)}>
      {isOpen && (
        <div className="modal">
          <img src={img} alt="photo" />
        </div>
      )}
    </div>
  );
};

export default Modal;
