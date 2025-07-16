import { useNavigate } from "react-router-dom";

//Components
import ActionItem from "../ActionItem/ActionItem";

//Data
import { svgs } from "../../assets/svgs";

//Data Types
type ActionItemBarProps = { postId: string };

const ActionItemBar = ({ postId }: ActionItemBarProps) => {
  //Action Item Functions
  function likeFunction() {
    console.log("You liked a post");
  }

  const navigate = useNavigate();
  function repliesFunction() {
    navigate(`post/${postId}`);
  }

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
