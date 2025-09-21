// import ActionItem from "../ActionItem/ActionItem";
// import { svgs } from "../../assets/svgs";
// import { Reaction, reactions, allReactions } from "../../assets/reactions";
// import { useReaction } from "../../hooks/useReaction";

// type ReactionsProps = {
//   reactionFunction: (postId: string) => void;
//   postId: string;
// };

// const Reactions = ({ reactionFunction, postId }: ReactionsProps) => {
//   const hasReactions = Object.values(allReactions).some((count) => count > 0);
//   const handleReaction = useReaction();

//   return (
//     <div className="flex gap-5">
//       {allReactions &&
//         hasReactions &&
//         reactions
//           .sort((a, b) => allReactions[b.label] - allReactions[a.label])
//           .slice(0, 4)
//           .filter(({ label }) => allReactions[label] > 0)
//           .map(({ icon, label }: Reaction) => (
//             <ActionItem
//               key={label}
//               emojiIcon={icon}
//               count={allReactions[label]}
//               handleClick={() => handleReaction(label, postId)}
//             />
//           ))}
//       <ActionItem
//         svgIcon={svgs.addReaction}
//         count={0}
//         handleClick={() => reactionFunction(postId)}
//       />
//     </div>
//   );
// };

// export default Reactions;
