const router = require("express").Router();

const { signup, getMail, logIn } = require("./controller/appController.js");

/** HTTP Reqeust */
router.post("/signup", signup);
router.get("/getMail", getMail);
router.get("/login", logIn);
module.exports = router;
