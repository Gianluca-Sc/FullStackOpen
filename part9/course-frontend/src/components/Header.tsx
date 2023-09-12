import { HeaderProps } from "../types";

export const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};
