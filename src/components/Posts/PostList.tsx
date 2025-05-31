import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

//Css
import "./PostList.css";

//Components
import SinglePost from "./Post";

//Data
import { Post } from "../../features/posts/postSlice";
import {
  selectAlternatingColours,
  selectAvatarTextFontSize,
} from "../../features/uiConfig/uiSelectors";

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  //Get imported data
  const { widgets1Color, widgets2Color } = useSelector(
    selectAlternatingColours
  );
  const avatarTextFontSize = useSelector(selectAvatarTextFontSize);

  //Set tokens
  const root = document.documentElement;
  root.style.setProperty("--color-cardLight", widgets1Color);
  root.style.setProperty("--color-cardDark", widgets2Color);
  root.style.setProperty("--size-avatarText", avatarTextFontSize);

  //Start at bottom of messages
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to bottom on initial load and when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  return (
    <section id="posts">
      {posts.map((post, index) => {
        // Checks if the card is odd or even so that it can alternate between light and dark
        const shade = index % 2 ? "dark" : "light";
        return <SinglePost key={index} post={post} shade={shade} />;
      })}
      <div ref={bottomRef} />
    </section>
  );
};

export default PostList;
