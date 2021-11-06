import React, { MouseEventHandler } from "react";
import classNames from "@Utils/classNames";

type FilterButtonProps = {
  text: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const FilterButton = ({
  text,
  active,
  onClick,
}: FilterButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "uppercase text-xs md:text-sm cursor-pointer p-2 m-2",
        active ? "bg-lightRed text-white" : "hover:bg-lightGray"
      )}
    >
      {text}
    </button>
  );
};

export default FilterButton;
