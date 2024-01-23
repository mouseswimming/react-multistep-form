import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-4xl text-center mt-4 mb-10">{title}</h2>
      <div className="grid gap-4 grid-cols-[auto_minmax(auto,400px)] items-center">
        {children}
      </div>
    </>
  );
}
