import { useForm } from "react-hook-form";

export default function (props: any) {
  return (
    <>
      <form className=" mx-4 my-2">{props.children}</form>
    </>
  );
}
