export interface dropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: dropdownOption[];
  /**
   * Name of the input
   */
  name: string;
  /**
  * Label of the input
  */
  label?: string;
  error?: string;
  /**
   * Is this this input required?
   */
  required?: boolean;
  flat?: boolean;
  /**
   * How large should the input be?
   */
  size?: 'small' | 'regular';
  /**
   * The object to add an input to react-hook-forms
   */
  register?: object;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  initialValue?: string;
}
