//Components
import Reply from "../Reply/Reply";
import ReplyListSkeleton from "./ReplyListSkeleton";
import ReplyInput from "../ReplyInput/ReplyInput";
import { useGetRepliesQuery } from "../../features/replies/repliesAPI";
import Spinner from "../Spinner/Spinner";

//Data
import { Employee } from "../../features/employees/employeeTypes";

import { useParams } from "react-router-dom";

type ReplyListProps = {
  postId: string;
  employees?: Record<string, Employee>;
  employeeLoading: boolean;
};

const ReplyPanel = ({ postId, employees, employeeLoading }: ReplyListProps) => {
  // TODO: Findout where to get tenantId (probably in outer page)
  const { tenantId } = useParams();

  //Get reply data
  const {
    data: replies,
    isLoading: repliesIsLoading,
    isFetching: repliesIsFetching,
    isError: repliesIsError,
  } = useGetRepliesQuery(
    { tenantId: tenantId ?? "", postId: postId ?? "" },
    {
      pollingInterval: 30000000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  if (repliesIsLoading || employeeLoading) {
    return <ReplyListSkeleton />;
  } else if (repliesIsError) {
    {
      return (
        repliesIsError && <p className="errorMessage">Error fetching replies</p>
      );
    }
  } else if (replies?.length === 0) {
    return (
      <div>
        <h3 className="p-4 pt-0">No replies yet</h3>
        <ReplyInput postId={postId ?? ""} employeeLoading={employeeLoading} />
      </div>
    );
  } else {
    return (
      <div>
        {repliesIsFetching && <Spinner />}
        {Array.isArray(replies) &&
          replies.map((reply, index) => (
            <Reply
              key={index}
              reply={reply}
              replyLoading={repliesIsLoading}
              employee={employees?.[reply.employeeUID]}
              employeeLoading={employeeLoading}
            />
          ))}
        <ReplyInput postId={postId ?? ""} employeeLoading={employeeLoading} />
      </div>
    );
  }
};

export default ReplyPanel;
