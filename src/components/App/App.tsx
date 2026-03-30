import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import { type Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmitSearchBar = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const moviesData = await fetchMovies(query);

      if (moviesData.results.length === 0) {
        toast('No movies found for your request.');
      }

      setMovies(moviesData.results);
      setIsLoading(false);
    } catch {
      setIsError(true);
      toast.error(
        `Error occurred while fetching movies. Please try again later.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpenModal(true);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSubmitSearchBar}></SearchBar>
      {isLoading && <Loader></Loader>}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelectMovie} movies={movies}></MovieGrid>
      )}
      {isOpenModal && selectedMovie && (
        <MovieModal
          onClose={() => {
            setIsOpenModal(false);
            setSelectedMovie(null);
          }}
          movie={selectedMovie}
        ></MovieModal>
      )}
    </>
  );
}

export default App;
