import axios from "axios";
import { type Movie } from "../types/movie";

interface MovieHttpResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export default async function fetchMovies(query: string) {
    const response = await axios.get<MovieHttpResponse>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            query: query
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    });
  return response.data;
}