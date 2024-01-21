import { useState, useImperativeHandle, forwardRef } from "react";

const Blog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const blog = props.blog;
  const [likes, setLikes] = useState(blog.likes);
  const [show, setShow] = useState(true);

  const normalStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  };

  const hiddenStyle = {
    display: "none",
  };

  const showAll = { display: show ? "" : "none" };

  const hideWhenBig = visible ? hiddenStyle : normalStyle;
  const showWhenBig = visible ? normalStyle : hiddenStyle;
  let showDelete;

  if (blog.user.username === props.user.username) {
    showDelete = {
      display: "",
    };
  } else {
    showDelete = hiddenStyle;
  }

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

  const remove = () => {
    if (window.confirm(`Do you really want to remove ${blog.title}?`)) {
      props.remove(blog);
      setShow(false);
    }
  };

  return (
    <div style={showAll}>
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
        <button style={showDelete} onClick={remove}>
          remove
        </button>
      </div>
    </div>
  );
});

Blog.displayName = "BlogBlock";

export default Blog;
