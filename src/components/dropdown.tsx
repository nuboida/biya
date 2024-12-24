import React, { useEffect, useState } from 'react';
import { DropdownProps } from './models/dropdown.models';

export const Dropdown = ({
  options,
  required = false,
  name,
  register,
  label,
  onChange = () => {},
  initialValue = options[0].value || '',
  flat = false,
  error = '',
} : DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  useEffect(() => {
      // if (onChange) {
          onChange({ target: { value: selectedOption } } as React.ChangeEvent<HTMLSelectElement>);
      // }
  }, [selectedOption]);

  // useMemo(() => {
  //     setSelectedOption(initialValue);
  // }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      setSelectedOption(e.target.value);
  };


  return (
      <div className={`flex flex-col relative ${flat ? 'pb-0' : 'pb-3'}`}>
          {label && <label className='text-xs text-black mb-3' htmlFor={name}>{label}</label>}
          <select
              className='py-2 pr-5 pl-2 text-base bg-white border border-solid border-grey rounded-md transition-all duration-300 focus:outline-1 focus:outline-purple-700 focus-within:outline-1 focus-within::outline-purple-700 focus-visible:outline-1 focus-visible:outline-purple-700'
              // value={selectedOption}
              name={name}
              required={required}
              onChange={handleChange}
              {...register}
          >
              {options.map((option) => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
              ))}
          </select>
          {error && <p className=''>{error}</p>}
      </div>
  );
};
