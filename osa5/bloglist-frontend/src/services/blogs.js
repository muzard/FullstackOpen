import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (credentials) => {
  const response = await axios.post(
    "http://localhost:3001/api/login",
    credentials
  );
  console.log(response.data);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    "http://localhost:3001/api/blogs",
    blog,
    config
  );
  return response.data;
};

const like = async (likes, id) => {
  const response = await axios.put(`http://localhost:3001/api/blogs/${id}`, {
    likes: likes,
  });
  return response.data;
};

export default { getAll, login, setToken, create, like };
