import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController{
    static async apiGetMovies(req, res, next){
        // Set desired movies per page
        const moviesPerPage = req.query.moviesPerPage
            ?   parseInt(req.query.moviesPerPage)
            :   20;
        
        // Set current page
        const page = req.query.page
            ?   parseInt(req.query.page)
            :   0;
        
        // Set filters
        let filters = {};
        if(req.query.rated){
            filters.rated = req.query.rated;
        }
        else if(req.query.title){
            filters.title = req.query.title;
        }

        // Get movies based off previous factors and save results
        const {moviesList, totalNumMovies} = await MoviesDAO.getMovies({filters, page, moviesPerPage});

        // Prepare response
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }

        // send off response in JSON format
        res.json(response);
    }

    static async apiGetMovieById(req, res, next){
        try{
            let id = req.params.id || {};
            let movie = await MoviesDAO.getMovieById(id);
            if(!movie){
                res.status(404).json({error: "not found"})
                return;
            }
            res.json(movie);
        }
        catch(e){
            console.log(`api, ${e}`);
            res.status(500).json({error: e})
        }
    }

    static async apiGetRatings(req, res, next){
        try{
            let ratings = await MoviesDAO.getRatings();
            res.json(ratings);
        }
        catch(e){
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }
}