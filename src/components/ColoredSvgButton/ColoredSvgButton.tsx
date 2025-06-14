import "./ColoredSvgButton.css";

type ColoredSvgButtonProps = {
  imgSrc: string;
  label: string;
};

const ColoredSvgButtonProps = ({ imgSrc, label }: ColoredSvgButtonProps) => {
  return (
    <div className="coloredSvgButton">
      <div className="background">
        <div
          className="iconContainer"
          data-icon="Image"
          data-size="20px"
          data-weight="regular"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d={imgSrc}></path>
          </svg>
        </div>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default ColoredSvgButtonProps;
