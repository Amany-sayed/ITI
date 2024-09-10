const router = require("express").Router();
const isAuth = require("../../middlewares/auth.js");

const { addRatingAndReview } = require("./rating.controller");

router.post("/add", isAuth(), addRatingAndReview);

module.exports = router;
