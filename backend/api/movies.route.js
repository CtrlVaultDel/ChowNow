import express from "express";
import MoviesController from "./movies.controller.js";

// Get access to express router
const router = express.Router();

// Every time there is a request for "/api/v1/movies/" return movies
router.route('/').get(MoviesController.apiGetMovies);

export default router;