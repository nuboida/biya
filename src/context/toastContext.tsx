"use client";

import React, { ReactNode, createContext, useState } from "react";


const ToastContext = createContext({
  type: '',
  message: '',
  clear: () => { },
  success: (text: string) => {},
  error: (text: string) => { },
});

interface Props {
  children: ReactNode
}

const ToastProvider = ({children}: Props) => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const success = (text: string) => {
    setMessage(text);
    setType('success');
  };

  const error = (text: string) => {
    setMessage(text);
    setType('error');
  };

  const clear = () => {
    setType('');
    setMessage('');
  };

  return (
    <ToastContext.Provider
      value={{
        type,
        message,
        clear,
        success,
        error,
      }}
    >
      {children}
    </ToastContext.Provider>
    );
};

export { ToastProvider };
export default ToastContext;
