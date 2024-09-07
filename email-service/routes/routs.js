const router = require("express").Router();

const { signup, getMail } = require("../controller/appController.js");

/** HTTP Reqeust */
router.post("/signup", signup);
router.get("/getMail", getMail);
module.exports = router;
