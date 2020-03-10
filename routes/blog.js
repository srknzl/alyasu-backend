const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
const blogController = require("../controllers/blogController");

router.get("/blogEntries", blogController.getBlogEntries);
router.get("/blogEntries/:id", blogController.getBlogEntryById);

router.post(
  "/add-blogEntry",
  isAuth,
  blogController.addBlogEntry
);

router.put(
  "/edit-blogEntry",
  isAuth,
  blogController.editBlogEntry
);

router.delete("/product/delete/:prodId", isAuth, blogController.removeBlogEntry);
module.exports = router;