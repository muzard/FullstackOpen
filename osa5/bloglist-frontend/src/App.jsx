import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [URL, setURL] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const logOut = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const createBlog = async event => {
    event.preventDefault()
    const blog = await blogService.create(title, author, URL)
    setBlogs(blogs.concat(blog))
    setTitle("")
    setAuthor("")
    setURL("")
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await blogService.login({username, password})
    setUser(user)
    blogService.setToken(user.token)

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

    setUsername("")
    setPassword("")
  }

  const userLoggedInContent = () => {
      return (
      <div>
        <div>
          Logged in as {user.name}
        </div>

        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>

        <div>
          <h2>Create new blog</h2>
          <form onSubmit={createBlog}>
            <div>title <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>

            <div>author <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
            </div>

            <div>URL <input type="text" name="URL" value={URL} onChange={({ target }) => setURL(target.value)} />
            </div>

            <button type="submit">create</button>
          </form>
        </div>

        <br />
      </div>
    )
  }

  const userNotLoggedInContent = () => {
    return (
      <div>
        <h1>log in to application</h1>

        <form onSubmit={handleLogin}>
          <div>username<input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)}/></div>
          <div>password<input type="text" name="password" value={password} onChange={({ target }) => setPassword(target.value)}/></div>
          <button type="submit">login</button>
        </form>

      </div>
    )
  }

  return (
    <div>
      <h1>blogsite</h1>

      {!user && userNotLoggedInContent()}
      {user && userLoggedInContent()}


      <button onClick={logOut}>log out</button>
    </div>
  )
}

export default App