import React from "react";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Does the button have an icon?
   */
  icon?: boolean;
  loading?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'regular';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const BiyaButton = ({
  primary = true,
  icon = false,
  size = 'regular',
  label,
  loading = false,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button onClick={onClick}
    className="font-bold border-0 rounded-md inline-flex items-center justify-center text-white bg-primary py-[13px] px-[32px] gap-2 w-[165px] h-[43px]">
      { loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : label }
    </button>
  )
}
