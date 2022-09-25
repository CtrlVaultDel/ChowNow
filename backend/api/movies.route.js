import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

// Get access to express router
const router = express.Router();

// Default path: Return all movies
router.route("/").get(MoviesController.apiGetMovies);

// Get a specified movie
router.route("/id/:id").get(MoviesController.apiGetMovieById);

// Gets list of movie ratings
router.route("/ratings").get(MoviesController.apiGetRatings);

// Review path: allow adding, updating, and deleting reviews
router.route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);

export default router;