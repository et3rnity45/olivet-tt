import React from "react";

type LabelProps = {
  htmlFor: string;
  text: string;
};

const Label = ({ htmlFor, text }: LabelProps): JSX.Element => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {text}
    </label>
  );
};

export default Label;
