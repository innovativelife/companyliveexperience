import ActionItem from "../ActionItem/ActionItem";
import { svgs } from "../../assets/svgs";
import { useReaction } from "../../hooks/useReaction";

import { useGetReactionsQuery } from "../../features/reactions/reactionsAPI";
import { Reaction } from "../../features/reactions/reactionsType";
import { ReactionOptions } from "../../assets/reactions";

import { useParams } from "react-router-dom";

type ReactionsProps = {
  reactionFunction: (postId: string) => void;
  postId: string;
};

const Reactions = ({ reactionFunction, postId }: ReactionsProps) => {
  const { tenantId } = useParams<{ tenantId?: string }>();

  const {
    data: reactionData,
    // isLoading: postsIsLoading,
    // isFetching: postsIsFetching,
    // isError: postsIsError,
    // refetch: postsRefetch,
  } = useGetReactionsQuery(
    { tenantId: tenantId ?? "", postId: postId ?? "" },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  // Gets the count for each reaction (TODO maybe store the counts in the backend?)
  function getReactionCounts(reaction: Reaction[] | undefined) {
    if (reaction) {
      return reaction.reduce<Record<string, number>>((counts, r) => {
        counts[r.reaction] = (counts[r.reaction] || 0) + 1;
        return counts;
      }, {});
    }
    return {};
  }

  // Get the counts for each reaction
  const allReactions = getReactionCounts(reactionData);
  // Check that their are reactions
  const hasReactions = Object.values(allReactions).some((count) => count > 0);
  const handleReaction = useReaction();

  return (
    <div className="flex gap-5">
      {/* Map throught the top 4 reactions that have been made */}
      {allReactions &&
        hasReactions &&
        ReactionOptions.sort(
          (a, b) => allReactions[b.label] - allReactions[a.label]
        )
          .slice(0, 4)
          .filter((reaction) => allReactions[reaction.label] > 0)
          .map((reaction) => (
            <ActionItem
              key={reaction.label}
              emojiIcon={reaction.icon}
              count={allReactions[reaction.label]}
              handleClick={() => handleReaction(reaction.label, postId)}
            />
          ))}
      {/* Always allow a new reaction */}
      <ActionItem
        svgIcon={svgs.addReaction}
        count={0}
        handleClick={() => reactionFunction(postId)}
      />
    </div>
  );
};

export default Reactions;
