import Button from "./Button";

interface CardProps {
  children: any;
  title?: string;
  headerBtn?: headerBtn;
  customHeader?: any;
}

interface headerBtn {
  icon?: any;
  text: string;
  bg?: string;
  to?: string;
}

export default function Card(props: CardProps) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg border border-gray-200">
        <div className="py-4 card-header px-6 border border-gray-200">
          {props.customHeader ? (
            props.customHeader
          ) : (
            <div className="flex justify-between">
              <div className="font-bold text-xl mb-2">{props.title}</div>
              <Button icon={props.headerBtn?.icon} text={props.headerBtn?.text ?? ""} bg={props.headerBtn?.bg} to={props.headerBtn?.to} />
            </div>
          )}
        </div>
        <div>{props.children}</div>
      </div>
    </>
  );
}
