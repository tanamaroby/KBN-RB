import * as React from "react";

interface TitleProps extends React.PropsWithChildren {}

const Title: React.FC<TitleProps> = (props) => {
  const { children } = props;
  return <p className="text-2xl font-bold tracking-wide">{children}</p>;
};

export default Title;
