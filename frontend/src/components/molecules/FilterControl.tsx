import React from "react";
import FilterButton from "@Components/atoms/FilterButton";
import classNames from "@Utils/classNames";

type FilterControlProps = {
  filter: string | undefined;
  setFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  options: string[];
  className: string;
};

const FilterControl = ({
  filter,
  setFilter,
  options,
  className = "",
}: FilterControlProps): JSX.Element => {
  return (
    <div className={classNames("flex mb-8", className)}>
      <div className="border-r border-darkGray border-opacity-40">
        <FilterButton
          text="Tous"
          active={filter === undefined}
          onClick={() => setFilter(undefined)}
        />
      </div>
      <ul className="flex">
        {options.map((option: string) => {
          const isActive = option === filter;
          return (
            <li key={option}>
              <FilterButton
                text={option}
                active={isActive}
                onClick={() => setFilter(option)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterControl;
