import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={` mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
};