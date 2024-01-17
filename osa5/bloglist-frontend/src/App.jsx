import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const contentStyle = {
    padding: "6px",
    fontSize: "28px",
    margin: "12px 0",
    border: "2px solid green",
    backgroundColor: "rgb(226, 226, 226)",
    color: "green",
  };

  const errorStyle = {
    padding: "6px",
    fontSize: "28px",
    margin: "12px 0",
    border: "2px solid red",
    backgroundColor: "rgb(226, 226, 226)",
    color: "red",
  };

  const emptyStyle = {
    height: "0",
    width: "0",
  };

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStyle, setNotificationStyle] = useState(emptyStyle);

  const Notification = ({ message, style }) => {
    return <em style={style}>{message}</em>;
  };

  const notificationSetter = (message, style) => {
    setNotificationMessage(message);
    setNotificationStyle(style);

    setTimeout(() => {
      setNotificationMessage("");
      setNotificationStyle(emptyStyle);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");

    notificationSetter("logged out", contentStyle);
  };

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      notificationSetter(`${blog.title} added to bloglist`, contentStyle);
    } catch (exception) {
      notificationSetter("invalid blog info", errorStyle);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      notificationSetter(`${user.name} logged in`, contentStyle);
    } catch (exception) {
      notificationSetter("login failed. wrong login info?", errorStyle);
    }

    setUsername("");
    setPassword("");
  };

  const userLoggedInContent = () => {
    return (
      <div>
        <div>Logged in as {user.name}</div>

        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>

        <Togglable buttonLabel="new blog">
          <NewBlog createBlog={createBlog} />
        </Togglable>

        <br />
      </div>
    );
  };

  const userNotLoggedInContent = () => {
    return (
      <div>
        <h1>log in to application</h1>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>blogsite</h1>

      <div>
        <Notification message={notificationMessage} style={notificationStyle} />
      </div>

      {!user && userNotLoggedInContent()}
      {user && userLoggedInContent()}

      <button onClick={logOut}>log out</button>
    </div>
  );
};

export default App;
