import React from "react";

type BadgeProps = {
  text: string;
};

const Badge = ({ text }: BadgeProps): JSX.Element => {
  return (
    <span className="inline-block py-1 px-2 rounded bg-lightRed text-white text-xs font-medium uppercase tracking-widest mb-4">
      {text}
    </span>
  );
};

export default Badge;
