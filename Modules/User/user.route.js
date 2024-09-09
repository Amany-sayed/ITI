const router = require("express").Router();
const { signup } = require("./user.controller.js");
router.post("/signup", signup);
module.exports = router;
