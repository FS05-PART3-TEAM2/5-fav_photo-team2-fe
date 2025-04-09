import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
};

const Title = ({ children }: props) => {
  return (
    <div className="font-BR-B text-[20px] md:text-[24px] lg:text-[30px] font-bold">{children}</div>
  );
};

export default Title;
