import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "focus:shadow-soft-primary-outline text-lg leading-5.6 ease-soft block w-full appearance-none rounded-sm border border-solid border-gray-300 bg-white bg-clip-padding px-3 2xl:py-3 lg:py-2 font-bold text-gray-700 transition-all focus:border-black focus:outline-none focus:transition-shadow",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
