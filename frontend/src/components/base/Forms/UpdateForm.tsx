import React, { FC, FormEventHandler } from "react";
import Submit from "./Submit";

type UpdateFormProps = {
  children: JSX.Element[];
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const UpdateForm: FC<UpdateFormProps> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">{children}</div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right lg:px-6">
          <Submit text="Publier" />
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
