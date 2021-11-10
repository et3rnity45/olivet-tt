/* eslint-disable @typescript-eslint/no-explicit-any */
import RichTextEditor from "@Components/atoms/RichTextEditor";
import { Controller, useFormContext } from "react-hook-form";
import Label from "@Components/atoms/Label";

type LongTextFiledProps = {
  name: string;
  label: string;
  className?: string;
};

export const LongTextField = ({
  name,
  label,
  className,
}: LongTextFiledProps): JSX.Element => {
  const methods = useFormContext();
  return (
    <div className={className}>
      <Label htmlFor={name} text={label} />
      <div className="mt-1 border border-gray-300 shadow-sm">
        <Controller
          name={name}
          control={methods.control}
          render={({ field }) => {
            return (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            );
          }}
        />
      </div>
    </div>
  );
};

export default LongTextField;
