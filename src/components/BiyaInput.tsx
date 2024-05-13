import React from "react";
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
  initialValue = '',
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className="col-span-3 flex flex-col pb-5 relative">
      {label && <label htmlFor={name} className="text-xs mb-[12px] font-bold">{label}</label>}
      <input
        name={name}
        required={required}
        type={type}
        defaultValue={initialValue}
        onChange={onChange}
        {...register}
        {...props}
        className={`p-[10px] text-base bg-white border-2 rounded ${error ? "border-rose-600" : "border-gray-300"} focus:outline-sky-200`}
      />
      {error && typeof error === "string" && (
        <span role="status" className="mt-[6px] text-xs text-rose-600 absolute top-[76px]">
          {error}
        </span>
      )}
      {children}
    </div>
  )
}
