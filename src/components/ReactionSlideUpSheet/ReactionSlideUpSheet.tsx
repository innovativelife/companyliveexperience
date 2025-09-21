import { useState, useEffect } from "react";
import { useReaction } from "../../hooks/useReaction";
import { ReactionType } from "../../features/reactions/reactionsType";

import EmojiItem from "../EmojiItem/EmojiItem";
import LargeButton from "../LargeButton/LargeButton";

import { ReactionOptions, Reaction } from "../../assets/reactions";

type ReactionSlideUpSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
};

const ReactionSlideUpSheet = ({
  isOpen,
  onClose,
  postId,
}: ReactionSlideUpSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleReaction = useReaction();

  const handleReactionClick = (label: ReactionType) => {
    handleReaction(label, postId);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end transition-all duration-300 ease-in-out ${
        isOpen ? "bg-black/50" : "bg-black/0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`w-full bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 py-3 border-b border-gray-100">
          <h1>Choose a reaction</h1>
        </div>

        {/* Reactions Grid */}
        <div className="p-6 pb-8">
          <div className="flex flex-wrap gap-4 items-center">
            {ReactionOptions.map(({ icon, label }: Reaction) => (
              <EmojiItem
                emoji={icon}
                label={label}
                key={label}
                onClick={handleReactionClick}
              />
            ))}
          </div>
        </div>

        <LargeButton onClick={onClose} label="Cancel" />
      </div>
    </div>
  );
};

export default ReactionSlideUpSheet;
