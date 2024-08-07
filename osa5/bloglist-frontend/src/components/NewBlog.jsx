import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setnewTitle] = useState("");
  const [newAuthor, setnewAuthor] = useState("");
  const [newURL, setnewURL] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    });

    setnewTitle("");
    setnewAuthor("");
    setnewURL("");
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title{" "}
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={({ target }) => setnewTitle(target.value)}
            placeholder="type title here..."
            data-testid="title"
          />
        </div>

        <div>
          author{" "}
          <input
            type="text"
            name="author"
            value={newAuthor}
            onChange={({ target }) => setnewAuthor(target.value)}
            placeholder="author's name here"
            data-testid="author"
          />
        </div>

        <div>
          URL{" "}
          <input
            type="text"
            name="URL"
            value={newURL}
            onChange={({ target }) => setnewURL(target.value)}
            placeholder="url here"
            data-testid="url"
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
