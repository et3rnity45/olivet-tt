import classNames from "@Utils/classNames";
import React, { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  outline?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
};

const Button = ({
  text,
  type,
  onClick = undefined,
  outline = false,
  className = "",
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md",
        "transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700",
        outline
          ? "text-indigo-600 border-indigo-600 hover:text-white"
          : "text-white bg-indigo-600",
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
