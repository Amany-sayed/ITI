const router = require("express").Router();
const isAuth = require("../../middlewares/auth.js");
const { signup, login, confirmEmail, logout } = require("./auth.controller.js");
router.get("/verify-email/:token", confirmEmail);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuth(), logout);

module.exports = router;
