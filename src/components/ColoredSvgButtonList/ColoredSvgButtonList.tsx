//Css
import "./ColoredSvgButtonList.css";

//Components
import ColoredSvgButton from "../ColoredSvgButton/ColoredSvgButton";

export interface uploadOptionsType {
  svg: string;
  label: string;
}

type ColoredSvgButtonListProps = { uploadOptions: uploadOptionsType[] };

const ColoredSvgButtonList = ({ uploadOptions }: ColoredSvgButtonListProps) => {
  //All post Data
  return (
    <div className="coloredSvgButtonList">
      {uploadOptions.map((option) => (
        <ColoredSvgButton
          key={option.label}
          imgSrc={option.svg}
          label={option.label}
        />
      ))}
    </div>
  );
};

export default ColoredSvgButtonList;
