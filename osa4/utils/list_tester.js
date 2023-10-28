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

const mostBlogs = (blogs) => {
  const authorArray = [];

  blogs.forEach((blog) => {
    authorArray.push(blog.author);
  });

  const counts = {};

  authorArray.forEach((author) => {
    counts[author] = (counts[author] || 0) + 1;
  });

  let authorWithMostBlogs = {};
  let mostBlogsCount = 0;

  for (const [key, value] of Object.entries(counts)) {
    if (value > mostBlogsCount) {
      authorWithMostBlogs = {
        author: key,
        blogs: value,
      };
      mostBlogsCount = value;
    }
  }

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const authorsLikes = {};

  blogs.forEach((blog) => {
    if (Object.keys(authorsLikes).includes(blog.author)) {
      authorsLikes[blog.author] += blog.likes;
    } else {
      authorsLikes[blog.author] = blog.likes;
    }
  });

  let mostLikesCount = -1;
  let authorWithMostLikes = {};

  for (const [key, value] of Object.entries(authorsLikes)) {
    if (value > mostLikesCount) {
      authorWithMostLikes = {
        author: key,
        likes: value,
      };
      mostLikesCount = value;
    }
  }

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
