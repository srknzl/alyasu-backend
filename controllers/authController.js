// const bcyrpt = require("bcrypt");
const validationResult = require("express-validator").validationResult;
const crypto = require("crypto");
const sendgridMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

import User from "../models/user";


if (process.env.NODE_ENV === "production" && process.env.SENDGRID_API) {
  sendgridMail.setApiKey(process.env.SENDGRID_API);
} else {
  sendgridMail.setApiKey(require("../credentials/sendgrid").apiKey);
}

export const postNewPassword = async (req, res, next) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;

  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    const err = new Error("Girdiniz Hatalı");
    err.statusCode = 422;
    valErrors.array().forEach((err) => {
      delete err.value;  // Do not return value for security.
    });
    err.problems = valErrors.array();
    return next(err);
  }

  try {
    const user = await User.findOneAndUpdate({
      resetToken: token,
      resetTokenExpiry: {
        $gt: Date.now()
      }
    }, {
      password: newPassword
    });
  } catch (error) {
    console.log(error);
    error.message = "Kullanıcı bulunamadı!";
    next(error);
  }
  

  if (!user) {
    return res.status(401).json({ message: "Your token is not valid" });
  } else {
    res.status(200).json({
      message: "Şifre başarıyla değiştirildi"
    });
  }
};
export const postLogin = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    const err = new Error("Girdiniz hatalı!");
    err.statusCode = 422;
    valErrors.array().forEach((err) => {
      delete err.value;  // Do not return value for security.
    });
    err.problems = valErrors.array();
    return next(err);
  }
  let user;
  try {
    user = await User.findOne({
      email: email
    });
  } catch (error) {
    console.log(error);
    error.status = 404;
    error.message = "Kullanıcı Bulunamadı";
    return next(error);
  }

  if (user) {
    let match;
    try {
      match = await compare(password, user.password);
    } catch (error) {
      return next(error);
    }
    if (!match) {
      const err = new Error("Email veya şifre yanlış");
      err.statusCode = 401;
      return next(err);
    }
    const token = jwt.sign({
      email: email,
      userid: user._id.toString()
    }, "somesupersecretsecret", {
      expiresIn: "1h"
    });
    const decoded = jwt.decode(token);

    const exp = decoded["exp"];
    let secure = false;
    let sameSite = false;
    if (process.env.NODE_ENV === "production") {
      secure = true;
      sameSite = true;
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: secure,
      sameSite: sameSite,
      maxAge: 1000 * 60 * 60 // 1 hour
    });
    return res.status(200).json({
      message: "Giriş başarılı",
      userid: user._id.toString(),
      email: user.email,
      exp: exp
    });
  } else {
    const err = new Error("Email veya şifre yanlış");
    err.statusCode = 401;
    next(err);
  }

};
export const postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const valErrors = validationResult(req);

  if (!valErrors.isEmpty()) {
    const err = new Error("Girdiniz hatalı");
    err.statusCode = 422;
    valErrors.array().forEach((err) => {
      delete err.value;  // Do not return value for security.
    });
    err.problems = valErrors.array();
    return next(err);
  }

  const foundUser = await User.findOne({
    email: email
  });

  if (foundUser) {
    const err = new Error("Kullanıcı Mevcut");
    err.statusCode = 422;
    return next(err);
  }

  const hashPass = await hash(password, 12);

  const user = new User({
    password: hashPass,
    name: name,
    email: email,
    cart: {
      items: []
    }
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    error.message = "Kullanıcı kaydedilemedi!";
    next(error);
  }

  res.status(201).json({
    message: "Successfully signed up"
  });
};


export const postLogout = (req, res, next) => {
  const token = req.cookies["token"];
  let secure = false;
  let sameSite = false;
  if (process.env.NODE_ENV === "production") {
    secure = true;
    sameSite = true;
  }
  if (token) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: secure,
      sameSite: sameSite,
      expires: new Date(0)
    });
  } else {
    res.cookie("token", "", {
      httpOnly: true,
      secure: secure,
      sameSite: sameSite,
      expires: new Date(0)
    });
  }

  res.status(204).json(null);
};

export const postReset = async (req, res, next) => {
  const email = req.body.email;
  const valErrors = validationResult(req);

  if (!valErrors.isEmpty()) {
    const err = new Error("Girdiniz hatalı");
    err.statusCode = 422;
    valErrors.array().forEach((err) => {
      delete err.value;  // Do not return value for security.
    });
    err.problems = valErrors.array();
    return next(err);
  }

  const user = await User.findOne({
    email: email
  });
  if (!user) {
    return res.status(404).json({
      message: "Kullanıcı Bulunamadı"
    });
  }
  const bytes = crypto.randomBytes(32);

  const hex = bytes.toString("hex");

  user.resetToken = hex;
  user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    error.message = "Kullanıcı kaydedilemedi!";
    next(error);
  }

  try {
    const msg = {
      to: email,
      from: 'support@alyasugelisimakademisi.com',
      subject: "Şifre resetleme linki",
      html: `
      <h3>Şifre reset linki</h3>
      <hr>
      <p> Şifre resetleme linkin :) <a href="https://alyasugelisimakademisi.com/newPassword/${hex}">link</a>.  </p>
    `
    };
    sendgridMail.send(msg);
  } catch (error) {
    console.log(error);
    error.message = "Email gönderilemedi!";
    next(error);
  }

  res.status(200).json({
    message: "E-mail gönderildi!"
  });
};

export const postCheckLogin = (req, res, next) => {
  const token = req.cookies["token"];
  try {
    const decoded = jwt.verify(token, "somesupersecretsecret");
    res.status(200).json(decoded);
  } catch (error) {
    next(error);
  }
}