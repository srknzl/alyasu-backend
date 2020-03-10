const router = require("express").Router();
const body = require("express-validator").body;
const isAuth = require("../middleware/isAuth");
const blogController = require("../controllers/blogController");

router.get("/blogEntries", blogController.getBlogEntries);
router.get("/blogEntries/:id", blogController.getBlogEntryById);

router.post(
  "/add-blogEntry",
  // [
  //   body("title")
  //     .isString()
  //     .withMessage("Title must be a text")
  //     .isLength({
  //       min: 5
  //     })
  //     .withMessage("Title should have at least five characters"),
  //   body("price")
  //     .isFloat({
  //       min: 0.0,
  //       max: 1000.0
  //     })
  //     .withMessage("Price must be between 0 and 1000")
  //     .isDecimal({
  //       decimal_digits: "0,2"
  //     })
  //     .withMessage("Price can have 2 decimals steps"),
  //   body("description")
  //     .isLength({
  //       min: 10,
  //       max: 300
  //     })
  //     .withMessage(
  //       "Description must have at least 10 characters, maximum of 300."
  //     )
  //     .isString()
  //     .withMessage("Description must be a string")
  // ],
  isAuth,
  blogController.addBlogEntry
);

router.put(
  "/edit-blogEntry",
  // [
  //   body("title")
  //     .isString()
  //     .withMessage("Title must be a text")
  //     .isLength({
  //       min: 5
  //     })
  //     .withMessage("Title should have at least five characters"),
  //   body("price")
  //     .isFloat({
  //       min: 0.0,
  //       max: 1000.0
  //     })
  //     .withMessage("Price must be between 0 and 1000")
  //     .isDecimal({
  //       decimal_digits: "0,2"
  //     })
  //     .withMessage("Price can have 2 decimals steps"),
  //   body("description")
  //     .isLength({
  //       min: 10,
  //       max: 300
  //     })
  //     .withMessage(
  //       "Description must have at least 10 characters, maximum of 300."
  //     )
  //     .isString()
  //     .withMessage("Description must be a string")
  // ],
  isAuth,
  blogController.editBlogEntry
);

router.delete("/product/delete/:prodId", isAuth, blogController.removeBlogEntry);
module.exports = router;