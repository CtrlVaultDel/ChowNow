import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController{
    static async apiPostReview(req, res, next){
        try{
            // Wait for a response from the add request
            const ReviewResponse = await ReviewsDAO.addReview(
                req.body.movie_id,
                {
                    name: req.body.name,
                    _id: req.body.user_id
                },
                req.body.review,
                new Date()
            );

            // Return the response as JSON
            res.json({status: "success"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            // Wait for a response from the update request
            const ReviewResponse = await ReviewsDAO.updateReview(
                req.body.review_id,
                req.body.user_id,
                req.body.review,
                new Date()
            )

            // Case: Error during call to ReviewsDAO.updateReview
            let { error } = ReviewResponse;
            if(error){
                res.status.json({error});
            }

            // Case: Nothing was modified
            if(ReviewResponse.modifiedCount === 0){
                throw new Error("unable to update review. The requestor might not be the original poster.");
            }

            // Send off response as JSON
            res.json({status: "success"})
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            // Wait for a response from the delete request
            const ReviewResponse = await ReviewsDAO.deleteReview(
                req.body.review_id,
                req.body.user_id
            )

            // Send off response as JSON
            res.json({status: "success"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
}