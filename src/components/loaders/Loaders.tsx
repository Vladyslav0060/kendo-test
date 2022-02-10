import { Loader } from "@progress/kendo-react-indicators";

export const LoaderSmall = () => {
  return (
    <div className="spinner-centered">
      <Loader size="small" type="converging-spinner" />
    </div>
  );
};
export const LoaderMedium = () => {
  return (
    <div className="spinner-centered">
      <Loader size="medium" type="converging-spinner" />
    </div>
  );
};
