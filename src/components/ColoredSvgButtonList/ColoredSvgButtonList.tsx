//Css
// import "./ColoredSvgButtonList.css";

//Components
import ColoredSvgButton from "../ColoredSvgButton/ColoredSvgButton";

export interface uploadOptionsType {
  svg: string;
  label: string;
}

type ColoredSvgButtonListProps = { uploadOptions: uploadOptionsType[] };

const ColoredSvgButtonList = ({ uploadOptions }: ColoredSvgButtonListProps) => {
  return (
    <div
      className="flex flex-wrap justify-start gap-2 px-4"
      data-oid="colored-svg-button-list-container"
    >
      {uploadOptions.map((option) => (
        <ColoredSvgButton
          key={option.label}
          imgSrc={option.svg}
          label={option.label}
          data-oid="colored-svg-button-list-item"
        />
      ))}
    </div>
  );
};

export default ColoredSvgButtonList;
