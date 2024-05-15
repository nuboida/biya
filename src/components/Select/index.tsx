import React, { ForwardedRef, useState } from "react";
import { InputProps } from "../models/Input.models";
import { SelectProps } from "./select.model";

/**
 * Primary input component
 */

export const BiyaSelect = ({
  required = false,
  size = 'regular',
  name,
  label,
  register,
  error,
  flat = false,
  children,
  forwardRef,
  options,
  initialValue = '',
  onChange,
  ...props
}: SelectProps,  ref: ForwardedRef<HTMLInputElement>) => {
  const [selectedOption, setSelectedOption] = useState('')
  return (
    <div className="col-span-3 flex flex-col pb-5 relative">
      {label && <label htmlFor={name} className="text-xs mb-[12px] font-bold">{label}</label>}
      <select className="p-[10px] text-base bg-white border-2 border-gray-300 rounded" defaultValue={initialValue} value={selectedOption} onChange={(e) => {
        setSelectedOption(e.target.value);
      }}>
        {options?.map((option, i) =>(
          <option key={i} value={option}>{option}</option>
        ))}
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
