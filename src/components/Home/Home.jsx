import React, { useState, useEffect } from 'react'
import movieApi from '../../api/MovieApi'
import { APIKey } from '../../api/MovieApiKey'
import { useDispatch } from 'react-redux' // update ค่า ให้ redux store
import { addMovie } from '../../store/Reducer'
import './Home.scss'

import MovieListing from '../MovieListing/MovieListing'

function Home() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    console.log(search);

    useEffect(() => {
        const fetchMovies = async () => {
            const searchKey = search ? search : "Harry Potter";
            const res = await movieApi.get(`?apikey=${APIKey}&s=${searchKey}&type=movie`);

            setTimeout(() => {
                // update state ให้ redux store
                dispatch(addMovie(res.data.Search))
            }, 500);
        }

        fetchMovies();
    }, [search]); // ทุกครั้งที่ state เปลี่ยน จะ run ใหม่

    return (
        <div>
            <h3 style={{ margin: "1rem 0" }}>Movies</h3>
            <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
            <MovieListing />
        </div>
    )
}

export default Home
