import { FC } from "react";
import { Cell } from "./buttonInterface";
import "./Button.css";

interface ButtonProps extends Cell {
  key: number;
  buttonClicked: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      className="Button"
      value={props.x + " " + props.y}
      onClick={props.buttonClicked}
    >
      {props.value}
    </button>
  );
};

export default Button;
