import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};

const Title = ({ children }: props) => {
  return (
    <div className="font-baskinBold text-xl md:text-2xl lg:text-3xl font-bold">{children}</div>
  );
};

export default Title;
