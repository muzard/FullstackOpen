const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (likes, item) => {
    return likes + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let returnable;
  let highestLikes = -1;

  blogs.forEach((blog) => {
    if (blog.likes > highestLikes) {
      returnable = blog;
      highestLikes = blog.likes;
    }
  });
  return returnable;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
