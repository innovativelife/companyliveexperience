//Components
import ActionItem from "../ActionItem/ActionItem";

//Data
import { svgs } from "../../assets/svgs";

//Data Types
type ActionItemBarProps = {
  likeFunction: () => void;
  repliesFunction: () => void;
};

const ActionItemBar = ({
  likeFunction,
  repliesFunction,
}: ActionItemBarProps) => {
  //Action Item Functions

  return (
    <div className="flex flex-wrap justify-between gap-4 pl-[20px] pr-[20px] pb-[18px] pt-[6px]">
      <ActionItem
        icon={svgs.addReaction}
        count={23}
        handleClick={likeFunction}
      />

      <ActionItem icon={svgs.chat} count={5} handleClick={repliesFunction} />
    </div>
  );
};

export default ActionItemBar;
