import React, { TextareaHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Label from "@Components/atoms/Label";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  className?: string;
}

const TextAreaField = ({
  name,
  label,
  className,
  ...rest
}: TextAreaFieldProps): JSX.Element => {
  const methods = useFormContext();
  return (
    <div className={className}>
      <Label htmlFor={name} text={label} />
      <Controller
        name={name}
        control={methods.control}
        render={({ field: { value, onChange } }) => {
          return (
            <textarea
              id={name}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={value}
              onChange={onChange}
              {...rest}
            />
          );
        }}
      />
    </div>
  );
};

export default TextAreaField;
