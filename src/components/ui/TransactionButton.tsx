import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  icon?: any;
  text: string;
  bg?: string;
  className?: string;
  to?: string;
  action?: any;
}

export default function TransactionButton(props: ButtonProps) {
  const navigate = useNavigate();

  return (
    <>
      <button
        className={`rounded-full py-1 px-3 text-white text-sm btn-${props.bg} ${props.className}`}
        onClick={() => (props.to ? navigate(props.to) : props.action() ?? null)}
      >
        <FontAwesomeIcon icon={props.icon} fixedWidth />
        {props.text}
      </button>
    </>
  );
}
