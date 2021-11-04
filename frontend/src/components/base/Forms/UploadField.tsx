/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, useCallback, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDropzone } from "react-dropzone";

interface UploadFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  forms: UseFormReturn<any>;
  className?: string;
}

const UploadField = ({
  name,
  label,
  forms,
  className,
  ...rest
}: UploadFieldProps): JSX.Element => {
  const files: File[] = forms.watch(name);
  const onDrop = useCallback(
    (droppedFiles) => {
      forms.setValue(name, droppedFiles, { shouldValidate: true });
    },
    [name, forms]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/png, image/jpg, image/jpeg, image/pdf",
  });

  useEffect(() => {
    forms.register(name);
  }, [forms, name]);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        {...getRootProps()}
        className={`mt-1 flex justify-center px-6 pt-16 pb-20 border-2 border-gray-300 border-dashed rounded-md ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex flex-col justify-center space-y-1 text-center">
          {!!files?.length ? (
            <img
              src={URL.createObjectURL(files[0])}
              alt={files[0].name}
              className="max-w-xs max-h-xs"
            />
          ) : (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Séléctionner un fichier</span>
              <input
                id={name}
                type="file"
                className="sr-only"
                {...getInputProps()}
                {...rest}
              />
            </label>
            <p className="pl-1">ou déposer un fichier</p>
          </div>
          <p className="text-xs text-gray-500">
            {files ? files[0].name : "PNG, JPG, JPEG jusqu'à 30MB"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadField;
