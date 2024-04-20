"use client";
import React, { useContext, useEffect, useState } from "react";
import ToastContext from "@/context/toastContext";
import { BiyaIcon } from "../Icon";

interface ToastProps {
  higher?: boolean;
}

export const Toast = ({higher}: ToastProps) => {
  const { clear, type, message } = useContext(ToastContext);
  const [ show, setShow ] = useState(false);

  const handleClick = () =>  {
    clear();
    setShow(false);
  }

  useEffect(() => {
    if(message) {
      setShow(true);
    }

    const timer = setTimeout(() => {
      clear();
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, clear])

  return (
    <div className={`absolute top-8 left-0 right-0 z-50 ml-8 mr-5 ${!show ? 'opacity-0 translate-y-[-50%]' : 'block opacity-100 translate-y-0' } transition-all`}>
      <div className={`w-full flex items-center justify-between p-5 text-black text-lg font-semibold rounded-sm ${type === 'success' ? 'bg-[#DCF0DC]' : (type === 'error' ? 'bg-[#F4D5D5]' : " ")}`}>
        <p className="m-0">{message}</p>
        <button className="bg-transparent border-0" onClick={handleClick}>
          <BiyaIcon name="close" />
        </button>
      </div>
    </div>
  )
}
