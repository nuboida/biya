import { ForwardedRef, ReactNode } from "react";

export interface InputProps {
   /**
     * Name of the input
     */
   name: string;
   /**
   * Label of the input
   */
   label?: string;
   /**
    * Is this this input required?
    */
   required?: boolean;
   /**
    * Is this this input flat?
    */
   flat?: boolean;
   /**
    * The object to add an input to react-hook-forms
    */
   register?: object;
   /**
    * What to display to the user when there's an error?
    */
   error?: string | undefined;
   /**
    * The type of input it is
    */
   type?: 'url' | 'text' | 'password' | 'tel' | 'search' | 'number' | 'email' | 'name' | 'date' | 'file'
   /**
    * How large should the input be?
    */
   size?: 'small' | 'regular';
   children?: ReactNode;
   forwardRef?: ForwardedRef<HTMLInputElement>;
   initialValue?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
