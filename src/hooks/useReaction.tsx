import { ReactionType } from "../features/reactions/reactionsType";
import { useCreateReactionMutation } from "../features/reactions/reactionsAPI";
import { useParams } from "react-router-dom";

export const useReaction = () => {
  const { tenantId } = useParams();
  const [createReaction] = useCreateReactionMutation();

  const handleReaction = async (reaction: ReactionType, postId: string) => {
    try {
      await createReaction({
        tenantId: tenantId ?? "",
        reaction,
        postId,
      }).unwrap(); // unwrap throws error if request fails
      console.log(`${reaction} Reaction added successfully!`);
    } catch (err) {
      console.error("Failed to add reaction:", err);
    }
  };

  return handleReaction;
};
