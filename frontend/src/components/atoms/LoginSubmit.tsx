import React from "react";

type SubmitProps = {
  value: string;
  className?: string;
};

const LoginSubmit = ({ value, className }: SubmitProps): JSX.Element => {
  return (
    <input
      value={value.toLowerCase()}
      type="submit"
      placeholder="placeholder"
      className={`uppercase px-4 py-2 rounded bg-lightRed hover:bg-lighterRed text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lightRed focus:ring-opacity-80 cursor-pointer ${className}`}
    />
  );
};

export default LoginSubmit;
