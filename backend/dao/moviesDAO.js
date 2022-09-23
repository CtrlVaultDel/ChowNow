// Will hold reference to database movies collection
let movies;

// Movie Data Access Object
export default class MoviesDAO{
    static async injectDB(conn){
        // Return reference if it already exists
        if(movies){
            return
        }

        // Reference does not exist: attempt to get one from database
        try{
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies");
        }
        catch(e){
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    static async getMovies({
        // default filter
        filters = null,
        page = 0,
        moviesPerPage = 20
    } = {}){
        let query;

    }
}
