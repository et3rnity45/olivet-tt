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
          {/* TODO : Prévisualiser (sous forme de tab ?) */}
          {/* <button
            type="button"
            className="inline-flex justify-center mr-4 py-2 px-4 border border-transparent shadow-sm 
            text-sm font-medium rounded-md text-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:text-white focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            Prévisualiser
          </button> */}
          <Submit text="Publier" />
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
