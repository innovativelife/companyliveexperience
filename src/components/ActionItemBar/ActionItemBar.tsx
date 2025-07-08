import { useNavigate } from "react-router-dom";

//Css
// import "./ActionItemBar.css";

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

  //flex flex-wrap justify-between gap-4 py-2 px-4

  return (
    <div
      className="flex flex-wrap justify-between gap-4 pl-[20px] pr-[20px] pb-[18px] pt-[6px]"
      data-oid="tbkgi8h"
    >
      <ActionItem
        icon={svgs.addReaction}
        count={23}
        handleClick={likeFunction}
        data-oid="d5i_x6x"
      />

      <ActionItem
        icon={svgs.chat}
        count={5}
        handleClick={repliesFunction}
        data-oid="2c-t9pl"
      />
    </div>
  );
};

export default ActionItemBar;
