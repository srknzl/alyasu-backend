export const router = require("express").Router();
const body = require("express-validator").body;
const authController = require("../controllers/authController")

router.post('/newPassword/:token',
[
  body("password").isLength({
    min: 8
  }).withMessage('Şifreniz en az sekiz karakter olsun.'),
  body("confirmPassword").custom((value, { req }) => {
    if (req.body.password !== value) {
      throw new Error("Şifreler aynı değil.");
    }
    return true;
  })
],
authController.postNewPassword);

router.post("/logout", authController.postLogout);
router.post("/checklogin", authController.postCheckLogin);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage('Email düzgün değil'),
    body("password").isLength({
      min: 8
    }).withMessage('Şifreniz en az sekiz karakter olsun')
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage('E-mail düzgün giriniz.'),
    body("name")
      .isString().withMessage('Adınız yazı olmalı.')
      .isLength({
        min: 3
      }).withMessage('Adınız en az 3 karakter içermeli.'),
    body("password").isLength({
      min: 8
    }).withMessage('Şifreniz en az 8 karakter olmalı.'),
    body("confirmPassword").custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Şifreler aynı değil");
      }
      return true;
    })
  ],
  authController.postSignup
);


router.post("/reset",
  [
    body('email').isEmail().withMessage('Emailinizi düzgün giriniz.')
  ], authController.postReset);

export default router;