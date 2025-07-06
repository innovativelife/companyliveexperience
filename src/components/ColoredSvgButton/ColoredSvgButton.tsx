// import "./ColoredSvgButton.css";

type ColoredSvgButtonProps = {
  imgSrc: string;
  label: string;
};

const ColoredSvgButtonProps = ({ imgSrc, label }: ColoredSvgButtonProps) => {
  return (
    <div
      className="flex flex-col items-center gap-2 bg-background py-2.5 w-20 text-center"
      data-oid="colored-svg-button-container"
    >
      <div
        className="bg-inputs rounded-full p-2.5 fill-secondary"
        data-oid="colored-svg-button-svg-container"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 256 256"
          data-oid="colored-svg-button-svg"
        >
          <path
            d={imgSrc}
            className="fill-text border-0"
            data-oid="colore-svg-button-svg-path"
          ></path>
        </svg>
      </div>
      <p data-oid="colored-svg-button-label">{label}</p>
    </div>
  );
};

export default ColoredSvgButtonProps;
