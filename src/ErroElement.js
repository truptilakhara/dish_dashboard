import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return <h1>{err.data}Somthing went wrong </h1>;
};

export default Error;
