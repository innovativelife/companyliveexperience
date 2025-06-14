//Css
import "./Padding.css";

type PaddingProps = { paddingSize?: string };

const Padding = ({ paddingSize }: PaddingProps) => {
  console.log(paddingSize);
  return <div className="bottomPadding"></div>;
};

export default Padding;
