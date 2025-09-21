// export type ReactionLabel = "Like" | "Love" | "Laugh" | "Wow" | "Sad" | "Angry";

export interface Reaction {
  tenantId: string;
  postId: string;
  timeSent: string;
  employeeUID: string;
  reaction: ReactionType;
}

export enum ReactionType {
  Like = 0,
  Love = 1,
  Laugh = 2,
  Wow = 3,
  Sad = 4,
  Angry = 5,
}
