import "./LargeButton.css";

type LargeButtonProps = {
  onClick: () => void;
  label: string;
};

const LargeButtonProps = ({ onClick, label }: LargeButtonProps) => {
  return (
    <>
      <div className="largeButton">
        <button onClick={onClick}>
          <h2 className="label">{label}</h2>
        </button>
      </div>
      <div className="spacer"></div>
    </>
  );
};

export default LargeButtonProps;
