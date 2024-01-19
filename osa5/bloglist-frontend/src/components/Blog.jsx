import { useState, useImperativeHandle, forwardRef } from "react";

const Blog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const blog = props.blog;
  const [likes, setLikes] = useState(blog.likes);

  const normalStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  };

  const hiddenStyle = {
    display: "none",
  };

  const hideWhenBig = visible ? hiddenStyle : normalStyle;
  const showWhenBig = visible ? normalStyle : hiddenStyle;

  const toggleSize = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleSize,
    };
  });

  const like = () => {
    props.like(blog);
    setLikes(likes + 1);
  };

  return (
    <div>
      <div style={hideWhenBig}>
        {blog.title} by {blog.author}
        <button onClick={toggleSize}>view</button>
      </div>

      <div style={showWhenBig}>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleSize}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {likes} <button onClick={like}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
});

/*
const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} by {blog.author}
    </div>
  );
};
*/
export default Blog;
