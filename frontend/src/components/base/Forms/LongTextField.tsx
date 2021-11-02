/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface LongTextFiledProps {
  name: string;
  label: string;
  forms: UseFormReturn<any>;
  className?: string;
}

export const LongTextField: FC<LongTextFiledProps> = ({
  name,
  label,
  forms,
  className,
}) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        ["link", "clean"],
      ],
    }),
    []
  );

  const onEditorStateChange = useCallback(
    (editorState) => {
      forms.setValue(name, editorState, { shouldValidate: true });
    },
    [forms, name]
  );

  useEffect(() => {
    forms.register(name, { required: true, minLength: 11 });
  }, [forms, name]);

  const editorContent = forms.watch(name);

  return (
    <div id="longTextField" className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <ReactQuill
          theme="snow"
          bounds="#longTextField"
          modules={modules}
          value={editorContent}
          onChange={onEditorStateChange}
        />
      </div>
    </div>
  );
};

export default LongTextField;
