const BlogEntry = require("../models/blog");

export const getBlogEntries = async (req, res, next) => {
  try {
    const blogEntries = await BlogEntry.find();
    res
      .status(200)
      .json({ message: "Buyrun!", blogEntries: blogEntries });
  } catch (error) {
    console.log(error);
    error.message = "Blog girdilerini alarken hata oluştu";
    next(error);
  }
};
export const getBlogEntryById = async (req, res, next) => {
  try {
    const blogEntry = await BlogEntry.findById(req.body.id);
    if (blogEntry) {
      res.status(200).json({ message: "Buyrun", blogEntry: doc });
    } else {
      res.status(404).json({ message: "Öyle bir blog bulunamadı." });
    }
  } catch (error) {
    console.log(error);
    error.message = "Blog bilinmeyen sebeple alınamadı";
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
      message: "Oluşturuldu"
    });
  } catch (error) {
    console.log(error);
    error.message = "Bilinmeyen sebeple oluşturulamadı";
    next(error);
  }
};
export const removeBlogEntry = async (req, res, next) => {
  try {
    const blogEntry = await BlogEntry.findById(req.body.id);
    if (blogEntry) {
      await blogEntry.remove();
      res.status(200).json({
        message: "Silindi"
      });
    } else {
      res.status(404).json({
        message: "Öyle bir blog bulunamadı"
      });
    }
  } catch (error) {
    console.log(error);
    error.message = "Blog silinemedi";
    next(error);
  }
};
export const editBlogEntry = async (req, res, next) => {
  try {
    const blogEntry = await BlogEntry.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      content: req.body.content,
      coverImageUrl: req.body.coverImageUrl,
      keywords: req.body.keywords
    });
    if (blogEntry) {
      res.status(200).json({
        message: "Düzenleme başarılı"
      });
    } else {
      res.status(404).json({
        message: "Öyle bir blog bulunamadı"
      });
    }
  } catch (error) {
    console.log(error);
    error.message = "Düzenlerken bilinmeyen hata";
    next(error);
  }
};