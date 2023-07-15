import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  icon?: any;
  text: string;
  bg?: string;
  className?: string;
  to?: string;
  delete?: any;
}

export default function Button(props: ButtonProps) {
  const navigate = useNavigate();
  const handleDelete = (id: any) => {
    props.delete.action(id);
  };

  return (
    <>
      <button
        className={`rounded-full py-1 px-3 text-white text-sm btn-${props.bg} ${props.className}`}
        onClick={() => (props.to ? navigate(props.to) : props.delete.action ? handleDelete(props.delete.id) : null)}
      >
        <FontAwesomeIcon icon={props.icon} fixedWidth />
        {props.text}
      </button>
    </>
  );
}
