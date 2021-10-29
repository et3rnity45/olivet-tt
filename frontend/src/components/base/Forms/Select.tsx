/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  children: JSX.Element[];
  className?: string;
}

const Select: FC<SelectProps> = ({
  name,
  label,
  register,
  children,
  className = "",
  ...rest
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        {...rest}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
