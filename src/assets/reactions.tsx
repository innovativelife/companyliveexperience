import { ReactionType } from "../features/reactions/reactionsType";

export interface Reaction {
  icon: string;
  label: ReactionType;
}

// export type ReactionLabel = "Like" | "Love" | "Laugh" | "Wow" | "Sad" | "Angry";

// export const allReactions: Record<ReactionType, number> = {
//   Like: 6,
//   Love: 8,
//   Laugh: 0,
//   Wow: 0,
//   Sad: 0,
//   Angry: 3,
// };

export const ReactionOptions: Reaction[] = [
  { icon: "👍", label: ReactionType.Like },
  { icon: "❤️", label: ReactionType.Love },
  { icon: "😂", label: ReactionType.Laugh },
  { icon: "😮", label: ReactionType.Wow },
  { icon: "😢", label: ReactionType.Sad },
  { icon: "😡", label: ReactionType.Angry },
];
