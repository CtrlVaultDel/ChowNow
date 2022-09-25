import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

// Reviews Data Access Object
export default class ReviewsDAO{
    static async injectDB(connection){
        if(reviews){
            return;
        }
        try{
            reviews = await connection.db(process.env.MOVIEREVIEWS_NS).collection("reviews");
        }
        catch(e){
            console.error(`unable to establish connection handle in reviewDAO: ${e}`)
        }
    }

    static async addReview(movieId, {name, _id}, review, date){
        try{
            const reviewDoc = {
                name: name,
                user_id: _id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId) // Convert movieId into a MongoDB object id
            };

            return await reviews.insertOne(reviewDoc);
        }

        catch(e){
            console.error(`unable to post review: ${e}`);
            return {error: e}
        }
    }
    

    static async updateReview(reviewId, userId, review, date){
        try{
            const updateResponse = await reviews.updateOne(
                // Filter for an existing review
                {
                    user_id: userId,
                    _id: ObjectId(reviewId)
                },
                // If review exists, update it
                {
                    $set:{
                        review: review,
                        date: date
                    }
                }
            )

            return updateResponse;
        }
        catch(e){
            console.log(`unable to update review: ${e}`);
            return {error: e};
        }
    }

    static async deleteReview(reviewId, userId){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            });

            return deleteResponse;
        }
        catch(e){
            console.error(`unable to delete review: ${e}`);
            return {error: e};
        }
    }
}