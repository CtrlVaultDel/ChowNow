import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController{
    static async apiPostReview(req, res, next){
        try{
            // Gather required information (from the request body instead of the url)
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();

            // Wait for the response, then save it
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );

            // Return the response as JSON
            res.json({status: "success"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
}