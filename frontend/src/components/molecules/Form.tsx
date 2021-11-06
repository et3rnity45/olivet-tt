import React, { FormEventHandler, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const Form = ({ children, onSubmit }: FormProps): JSX.Element => {
  return (
    <form onSubmit={onSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">{children}</div>
    </form>
  );
};

Form.InputList = ({ children }: { children: ReactNode }) => (
  <div className="px-4 py-5 bg-white sm:p-6">
    <div className="grid grid-cols-6 gap-6">{children}</div>
  </div>
);

Form.ButtonList = ({ children }: { children: ReactNode }) => (
  <div className="px-4 py-3 bg-gray-50 text-right lg:px-6">{children}</div>
);

export default Form;
