import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";

async function main(){
    // Load environment variables
    dotenv.config();

    // Create an instance of MongoClient and pass in the database URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    );

    // Attempt to get port from environment variable; default to 8000 if there isn't one
    const port = process.env.PORT || 8000;

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`server is running on port ${port}`)
        })
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}
main().catch(console.error);