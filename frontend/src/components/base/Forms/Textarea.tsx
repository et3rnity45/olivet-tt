/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  className?: string;
}

const Textarea: FC<TextareaProps> = ({
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
      <div className="mt-1">
        <textarea
          id={name}
          rows={12}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          {...register(name)}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Textarea;
