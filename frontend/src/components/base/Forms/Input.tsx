/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  className?: string;
}

const Input: FC<InputProps> = ({
  name,
  label,
  register,
  className,
  ...rest
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        {...register(name)}
        {...rest}
      />
    </div>
  );
};

export default Input;
