/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  type: string;
  name: string;
  label: string;
  register: UseFormRegister<any>;
  className?: string;
};

const LoginInput: FC<InputProps> = ({
  type,
  name,
  label,
  register,
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        id={name}
        type={type}
        placeholder="placeholder"
        {...register(name)}
        className="peer h-10 w-full border-0 border-b-2 border-gray text-lightBlack placeholder-transparent focus:ring-0 focus:outline-none focus:border-darkBlue"
      />
      <label
        htmlFor={name}
        className="absolute left-0 -top-3.5 text-gray text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
};

export default LoginInput;
