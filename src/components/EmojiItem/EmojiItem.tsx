import { ReactionType } from "../../features/reactions/reactionsType";

type EmojiItemProps = {
  emoji: string;
  label: ReactionType;
  onClick: (label: ReactionType) => void;
};

const EmojiItem = ({ emoji, label, onClick }: EmojiItemProps) => {
  return (
    <div
      className="w-14 h-14 flex items-center justify-center rounded-full bg-primary"
      onClick={() => onClick(label)}
    >
      <span className="text-3xl mb-2">{emoji}</span>
    </div>
  );
};

export default EmojiItem;
