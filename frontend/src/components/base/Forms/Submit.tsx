import React, { FC } from "react";

type SubmitProps = {
  text: string;
  className?: string;
};

const Submit: FC<SubmitProps> = ({ text, className }) => {
  return (
    <>
      <button
        type="submit"
        className={`${className} inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
        text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {text}
      </button>
    </>
  );
};

export default Submit;
