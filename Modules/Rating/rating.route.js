const router = require("express").Router();
const { addRatingAndReview } = require("./rating.controller");

router.post("/rating", addRatingAndReview);

module.exports = router;
