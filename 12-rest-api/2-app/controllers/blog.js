exports.getBlogs = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "Halo",
        content: "Helo covid desa",
        imgUrl:
          "https://th.bing.com/th/id/OIP.IhuxzLymIC6wwForncd_6QHaEM?w=294&h=180&c=7&o=5&pid=1.7",
        creator: {
          name: "Amin Yaris",
        },
        date: new Date(),
      },
    ],
  });
};

exports.postBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const author = req.body.author;
  const content = req.body.content;
  res.status(201).json({
    message: " Post created successfully",
    pst: { id: new Date().toISOString(), title, image, author, content },
  });
};
