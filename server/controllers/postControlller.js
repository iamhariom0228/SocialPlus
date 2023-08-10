const Post = require("../models/Post");
const User = require("../models/User");

//Create a post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated!");
    } else {
      res.status(403).json("You can only update your post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(rleq.params.id);
    if (req.body.userId === post.userId) {
      await post.deleteOne();
      res.status(200).json("Your Post has been successfully deleted.");
    } else {
      res.status(403).json("You can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked.");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// comment on a post
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("Comment has been added");
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete a post comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const commentIndex = post.comments.findIndex(
      (comment) => comment.userId === req.body.userId
    );

    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1); // Remove the comment at the found index
      await post.save(); // Save the updated post
      res.status(200).json("Comment has been deleted");
    } else {
      res
        .status(403)
        .json("You can only delete your comment or comment not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get timeline posts
exports.getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};
