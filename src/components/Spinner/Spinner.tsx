//Css
import "./Spinner.css";

type SpinnerProps = {};

const Spinner = ({}: SpinnerProps) => {
  return (
    <div className="spinnerContainer">
      <div className="spinner" />
    </div>
  );
};

export default Spinner;
