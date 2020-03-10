const BlogEntry = require("../models/blog");

export const getBlogEntries = async (req, res, next) => {
  try {
    const blogEntries = await BlogEntry.find();
    res
      .status(200)
      .json({ message: "Here you are!", blogEntries: blogEntries });
  } catch (error) {
    console.log(error);
    error.message = "Could not get blog entries";
    next(error);
  }
};
export const getBlogEntryById = async (req, res, next) => {
  try {
    const blogEntry = await BlogEntry.findById(req.body.id);
    if (blogEntry) {
      res.status(200).json({ message: "Here you are!", blogEntry: doc });
    } else {
      res.status(404).json({ message: "Not found a blog entry with that id" });
    }
  } catch (error) {
    console.log(error);
    error.message = "Could not get blog entry";
    next(error);
  }
};
export const addBlogEntry = async (req, res, next) => {
  try {
    const blogEntry = new BlogEntry({
      title: req.body.title,
      content: req.body.content,
      coverImageUrl: req.body.coverImageUrl,
      keywords: req.body.keywords
    });
    await blogEntry.save();
    res.status(201).json({
      message: "Created"
    });
  } catch (error) {
    console.log(error);
    error.message = "Could not add blog entry";
    next(error);
  }
};
export const removeBlogEntry = async (req, res, next) => {
  try {
    const blogEntry = await BlogEntry.findById(req.body.id);
    if (blogEntry) {
      await blogEntry.remove();
      res.status(200).json({
        message: "Deleted"
      });
    } else {
      res.status(404).json({
        message: "Not found a blog entry with that id"
      });
    }
  } catch (error) {
    console.log(error);
    error.message = "Could not remove blog entry";
    next(error);
  }
};
export const editBlogEntry = async (req, res, next) => {
  try {
    const blogEntry = await BlogEntry.findByIdAndUpdate(req.body.id);
    if (blogEntry) {
      res.status(200).json({
        message: "Edit successful"
      });
    } else {
      res.status(404).json({
        message: "Not found a blog entry with that id"
      });
    }
  } catch (error) {
    console.log(error);
    error.message = "Could not edit blog entry";
    next(error);
  }
};