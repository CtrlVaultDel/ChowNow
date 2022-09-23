// Will hold reference to database movies collection
let movies;

// Movie Data Access Object
export default class MoviesDAO{
    static async injectDB(connection){
        // Return reference if it already exists
        if(movies){
            return
        }

        // Reference does not exist: attempt to get one from database
        try{
            movies = await connection.db(process.env.MOVIEREVIEWS_NS).collection("movies");
        }
        catch(e){
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    static async getMovies({filters = null, page = 0, moviesPerPage = 20} = {}){
        // Filter Info
        let query;
        // $text & $search => MongoDB query operators
        if("title" in filters){
            query = {$text: {$search: filters["title"]}}
        }
        // Ex: "G", "PG", etc
        else if("rated" in filters){
            query = {"rated": {$eq: filters["rated"]}}
        }

        let cursor
        try{
            cursor = await movies
            .find(query)
            .limit(moviesPerPage)
            .skip(moviesPerPage * page)

            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return {moviesList, totalNumMovies}
        }
        catch(e){
            console.error(`unable to issue find command, ${e}`);
            return {moviesList: [], totalNumMovies: 0}
        }
    }
}
