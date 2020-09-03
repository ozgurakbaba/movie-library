import React, { useState } from 'react';
import MovieCard from './movieCard'

function SearchMovies() {
    // states- input query, movies
    const [query, setQuery] = useState('');
    // states- movies
    const [movies, setMovies] = useState([]);

    const apiKEY = "d8a9d6a993d23f445e3a7e1da6b07fba";
    
    const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    
    const searchMovies = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(apiURL);
            const data = await res.json();
            // console.log(data);
            setMovies(data.results);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <form className="form" onSubmit={searchMovies}>
            <label htmlFor="query" className="label">Movie Name</label>
            <input name="query" type="text" className="input" placeholder="Search for movies here..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="button" type="submit">Search</button>
        </form>
        <div className="card--list">
            {movies.filter(movie => movie.poster_path).map(movie => (
                <MovieCard movie={movie} />    
            ))}
        </div>
        </>
    )
}

export default SearchMovies;