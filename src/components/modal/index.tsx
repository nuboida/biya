import React from "react";
import { ModalProps } from './model';
import { BiyaIcon } from "../Icon";
import { BiyaButton } from "../BiyaButton";

const Modal = ({
  children,
  className,
  title,
  subtitle,
  action,
  onModalClose,
  size = 'regular',
  actionName = '',
  loading = false,
  ...props
}: ModalProps) => {
  const modalContentSize = {
    small: "w-[260px] py-10 max-lg:w-full",
    regular: "w-[460px] pt-[60px] px-0 pb-[45px] max-lg:w-full",
    large: "w-[720px] pt-[35px] px-0 pb-[45px] overflow-auto"
  };
  const modalHeaderSize = {
    large: "pt-0 pl-10 pb-10 pr-[60px]",
    small: "mt-0 mx-10 mb-[30px]",
    regular: "pt-0 pl-10 pb-10 pr-[44px]"
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex z-50" {...props}>
      <div className={`m-auto bg-white rounded-md max-h-[90vh] overflow-auto max-lg:max-h-[100vh] ${modalContentSize[size]}`}>
        <div className={`relative text-black ${modalHeaderSize[size]}`}>
          <button className="absolute top-0 right-9 cursor-pointer border-0 bg-transparent">
            <BiyaIcon name="close" />
          </button>
          <h3 className="m-0 text-2xl">{title}</h3>
          {subtitle && <p className="m-0 mt-3 text-base">{subtitle}</p>}
        </div>
        {children}
        <div className="mt-6 flex justify-end p-10">
          {action && <BiyaButton loading={loading} onClick={action} label={actionName} />}
        </div>
      </div>
    </div>
  )
}
