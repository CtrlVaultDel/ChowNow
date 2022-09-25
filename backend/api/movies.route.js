import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

// Get access to express router
const router = express.Router();

// Default path: Return movies
router.route('/').get(MoviesController.apiGetMovies);

// Review path: allow adding, updating, and deleting reviews
router.route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);

export default router;