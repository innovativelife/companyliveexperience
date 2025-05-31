import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import "./PostList.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

//Data
import { Post } from "../../features/posts/postSlice";
import {
  employeeSelector,
  fetchEmployee,
} from "../../features/employees/employeeSlice";
import { selectNormalTextFontSize } from "../../features/uiConfig/uiSelectors";

type ContactListProps = {
  post: Post;
  shade: string;
};

const SinglePost = ({ post, shade }: ContactListProps) => {
  //Get imported data
  const normalTextFontSize = useSelector(selectNormalTextFontSize);

  const dispatch = useAppDispatch();
  const sender = useAppSelector(employeeSelector).singleEmployee[0];
  useEffect(() => {
    dispatch(fetchEmployee(post.employeeUID));
  }, [dispatch]);

  const root = document.documentElement;
  root.style.setProperty("(--size-normalText", normalTextFontSize);
  if (sender) {
    return (
      <article className={"message " + shade}>
        <div className="avatarContainer">
          <div className="circleAvatar">
            {sender.firstName[0]}
            {sender.lastName[0]}
          </div>
        </div>
        <div className="postMessage">
          <p>{post.message}</p>
        </div>
      </article>
    );
  } else {
    return (
      <article className={"message " + shade}>
        <div className="avatarContainer">
          <div className="circleAvatar">...</div>
        </div>
        <div className="postMessage">
          <p>{post.message}</p>
        </div>
      </article>
    );
  }
};

export default SinglePost;
