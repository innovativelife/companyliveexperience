//Components
import ActionItem from "../ActionItem/ActionItem";
import Reactions from "../Reactions/Reactions";

//Data
import { svgs } from "../../assets/svgs";

//Data Types
type ActionItemBarProps = {
  repliesFunction: () => void;
  repliesShown: boolean;
  reactionFunction: (postId: string) => void;
  postId: string;
};

const ActionItemBar = ({
  repliesFunction,
  repliesShown,
  reactionFunction,
  postId,
}: ActionItemBarProps) => {
  //Action Item Functions
  const repliesSvg = repliesShown ? svgs.downCaret : svgs.chat;

  return (
    <div className="flex flex-wrap justify-between gap-4 pl-[20px] pr-[20px] pb-[18px] pt-[6px]">
      <Reactions reactionFunction={reactionFunction} postId={postId} />

      <ActionItem
        svgIcon={repliesSvg}
        count={5}
        handleClick={repliesFunction}
      />
    </div>
  );
};

export default ActionItemBar;
