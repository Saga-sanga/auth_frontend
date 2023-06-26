import React from "react";

type ModalProps = {
  show: boolean;
  children: React.ReactNode
}

function Modal({ show, children}: ModalProps) {
  return (
    <>
      {show && 
        <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/70">
          {children}
        </div>}
    </>
  );
}

export default Modal;