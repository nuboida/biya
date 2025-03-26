import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
  label?: string;
  name: string;
  add?: boolean;
  placeholder?: string;
  action?: () => void,
  defaultValue: number | string;
  options: {label: string, value: number | string}[]
}

const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, label, add, placeholder, name, action, defaultValue, options, ...props}, ref) => {
    return (
      <div className="col-span-3 flex flex-col relative">
        {label && <label htmlFor={name} className="text-xs mb-2">{label}{add && (<button className="text-green-400 text-xs ml-2" onClick={(e) => {
          e.preventDefault();
          if (action) {
            action()
          }
        }}>Add New</button>)}</label>}
        <select
          className={
            cn(
              "focus:shadow-soft-primary-outline text-lg leading-5.6 ease-soft block w-full rounded-sm border border-solid border-gray-300 bg-white bg-clip-padding px-3 2xl:py-3 lg:py-2 font-bold text-gray-700 transition-all focus:border-black focus:outline-none focus:transition-shadow",
              "disabled:text-slate-400",
              className
            )}
            name={name}
            ref={ref}
            {...props}
            value={defaultValue}
        >
          <option disabled value={0} className="text-slate-400">{placeholder ? placeholder : "--"}</option>
          {
            options.map((option, i) => (
              <option key={`${String(option.value) + i}`} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </select>
      </div>
    )
  }
)

Dropdown.displayName = "Dropdown"

export {Dropdown}
