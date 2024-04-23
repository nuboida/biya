import React from "react";
import { BiyaIcon } from "./Icon";

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  description?: string;
  icon?: string;
}

export const RadioButton = ({
  label,
  value,
  checked = false,
  onChange,
  description = '',
  icon = '',
}: RadioButtonProps) => {
  return (
    <label className="flex items-center cursor-pointer mb-1 bg-[rgba(#2F96D7, 0.1)] p-11">
      {icon && <BiyaIcon name={icon} className="w-10 mr-6" />}
      <span className="block text-lg mt-0 mx-0 mb-2 font-bold">
        <span>{label}</span>
        {description && <p className="opacity-50 text-sm m-0">{description}</p>}
      </span>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="inline-block w-8 h-8 border-2 border-primary rounded-lg bg-white cursor-pointer ml-auto"
      />
      <span></span>
    </label>
  )
}
