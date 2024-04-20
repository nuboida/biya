import React, { ForwardedRef } from "react";
import { InputProps } from "./models/Input.models";

/**
 * Primary input component
 */

export const BiyaSelect = ({
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
    <div className="col-span-3 flex flex-col pb-5 relative">
      {label && <label htmlFor={name} className="text-xs mb-[12px] font-bold">{label}</label>}
      <select className="p-[10px] text-base bg-white border-2 border-gray-300 rounded" defaultValue={initialValue}>
        <option value="">Airtime</option>
      </select>
      {error && typeof error === "string" && (
        <span role="status" className="mt-[6px] text-xs text-red-600 absolute top-[76px]">
          {error}
        </span>
      )}
      {children}
    </div>
  )
}
