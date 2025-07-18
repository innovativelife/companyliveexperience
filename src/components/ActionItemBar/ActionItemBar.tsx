//Components
import ActionItem from "../ActionItem/ActionItem";

//Data
import { svgs } from "../../assets/svgs";

//Data Types
type ActionItemBarProps = {
  likeFunction: () => void;
  repliesFunction: () => void;
  repliesShown: boolean;
};

const ActionItemBar = ({
  likeFunction,
  repliesFunction,
  repliesShown,
}: ActionItemBarProps) => {
  //Action Item Functions

  const repliesSvg = repliesShown ? svgs.downCaret : svgs.chat;

  return (
    <div className="flex flex-wrap justify-between gap-4 pl-[20px] pr-[20px] pb-[18px] pt-[6px]">
      <ActionItem
        icon={svgs.addReaction}
        count={23}
        handleClick={likeFunction}
      />

      <ActionItem icon={repliesSvg} count={5} handleClick={repliesFunction} />
    </div>
  );
};

export default ActionItemBar;
