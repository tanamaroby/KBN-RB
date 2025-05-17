import * as React from "react";

interface TitleProps extends React.PropsWithChildren {}

const Title: React.FC<TitleProps> = (props) => {
  const { children } = props;
  return <p className="text-xl">{children}</p>;
};

export default Title;
