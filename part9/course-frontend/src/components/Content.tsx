import { CoursePart } from "../types";
import { Part } from "./Part";

export const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </div>
  );
};
