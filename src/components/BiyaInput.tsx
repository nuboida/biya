import React, { ForwardedRef } from "react";
import { InputProps } from "./models/Input.models";

/**
 * Primary input component
 */

export const BiyaInput = ({
  type = 'text',
  required = false,
  size = 'regular',
  name,
  label,
  register,
  error,
  flat = false,
  children,
  forwardRef,
  initialValue = '',
  onChange,
  ...props
}: InputProps,  ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="col-span-3 flex flex-col pb-[36px] relative">
      {label && <label htmlFor={name} className="text-xs text-gray-500 mb-[12px]">{label}</label>}
      <input
        name={name}
        required={required}
        ref={forwardRef || ref}
        type={type}
        defaultValue={initialValue}
        onChange={onChange}
        {...register}
        {...props}
        className="p-[10px] text-base bg-white border-2 border-gray-300 rounded-sm"
      />
      {error && typeof error === "string" && (
        <span role="status" className="mt-[6px] text-xs text-red-600 absolute top-[76px]">
          {error}
        </span>
      )}
      {children}
    </div>
  )
}
