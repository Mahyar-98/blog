import { useState, useEffect, useMemo } from "react";
import "../styles/posts.css";
import PostInfo from "./PostInfo";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";

const Posts = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { posts, tags } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Create a map of tag names to tag IDs and vice versa
  const tagNamesToTagIds = useMemo(() => {
    return tags.reduce((map, tag) => {
      map[tag.name] = tag._id;
      return map;
    }, {});
  }, [tags]);

  const tagIdsToTagNames = useMemo(() => {
    return tags.reduce((map, tag) => {
      map[tag._id] = tag.name;
      return map;
    }, {});
  }, [tags]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedTagString = queryParams.get("tags") || "";
    if (selectedTagString) {
      const selectedTags = selectedTagString.split(" ");
      const selectedTagIds = selectedTags.map(
        (selectedTag) => tagNamesToTagIds[selectedTag],
      );
      setSelectedTags(selectedTagIds);
    }
  }, [location.search, tags, tagNamesToTagIds]);

  const blogPosts = posts
    .filter((post) =>
      selectedTags.every((selectedTag) => post.tags.includes(selectedTag)),
    )
    .map((post) => {
      return (
        <li key={post._id}>
          <PostInfo post={post} />
        </li>
      );
    });

  const toggleTag = (selectedTagId) => {
    const updatedTags = selectedTags.includes(selectedTagId)
      ? selectedTags.filter((tagId) => tagId !== selectedTagId)
      : [...selectedTags, selectedTagId];

    setSelectedTags(updatedTags);
    // Update query parameters in URL
    const tagsString = updatedTags
      .map((tagId) => tagIdsToTagNames[tagId])
      .join("+");
    navigate({ search: tagsString ? `?tags=${tagsString}` : "" });
  };

  const isActive = (tagId) => selectedTags.includes(tagId);

  const postTags = tags.map((tag) => {
    return (
      <li key={tag._id}>
        <button
          className={"tag btn " + (isActive(tag._id) ? " active" : "")}
          onClick={() => toggleTag(tag._id)}
        >
          {tag.name}
        </button>
      </li>
    );
  });
  return (
    <>
      <h3>Tags:</h3>
      <div className="tags">
        <ul>{postTags}</ul>
      </div>
      <div className="posts">
        <ul>{blogPosts.length > 0 ? blogPosts : <b>There are no posts!</b>}</ul>
      </div>
    </>
  );
};

export default Posts;
