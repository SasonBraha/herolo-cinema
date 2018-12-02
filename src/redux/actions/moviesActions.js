import axios from 'axios';
import { 
  SET_MOVIES, 
  SET_ADD_MOVIE_MODAL,
  SET_EDIT_MODAL, 
  SET_DELETE_MODAL, 
  SET_SELECTED_MOVIE, 
  UPDATE_MOVIE_ITEMS, 
  DELETE_MOVIE,
  RESET_MODALS,
  ADD_MOVIE
} from '../reduxConstants';
import { reset as reduxFormReset } from 'redux-form';
import { generateId, serializeTitle } from '../../utils'; 
import { API_URL } from '../../utils/config';
import { setToast } from './';


export const fetchMovies = (title = 'iron man') => async dispatch => {
  try {
    const moviesData = await axios.get(`${API_URL}&s=${title}`);
    const { Response, Search } = moviesData.data;
    if (Response === 'True') {
      const movieIds = Search.map(({ imdbID }) => imdbID);
      const movies = {};
      for(let movieId of movieIds) {
        const movieData = await axios.get(`${API_URL}&i=${movieId}`);
        const { Title, Year, Runtime, Genre, Director } = movieData.data;
        const id = generateId();
        movies[id] = {
          id, 
          Title,
          Year,
          Runtime: Runtime.split(' ')[0],
          Genres: Genre.split(','),
          Director
        }
      }
      dispatch({ type: SET_MOVIES, payload: movies });
    } 
  } catch(ex) {
    throw ex;
  }
}

export const setSelectedMovie = movieId => ({
  type: SET_SELECTED_MOVIE,
  payload: movieId
});

export const setAddMovieModal = () => ({ type: SET_ADD_MOVIE_MODAL });

export const setEditModal = movieId => dispatch => { 
  dispatch(setSelectedMovie(movieId));
  dispatch({ type: SET_EDIT_MODAL });
};

export const setDeleteModal =  movieId => dispatch => { 
  dispatch(setSelectedMovie(movieId));
  dispatch({ type: SET_DELETE_MODAL });
};

export const updateMovieItems = formValues => dispatch => {
  dispatch({
    type: UPDATE_MOVIE_ITEMS, 
    payload: {
      ...formValues,
      Title: serializeTitle(formValues.Title)
    }
  });
  dispatch(resetModals());
  dispatch(setToast('Movie updated successfully'));
}

export const addMovie = formValues => dispatch => {
  dispatch({
    type: ADD_MOVIE,
    payload: {
      id: generateId(),
      ...formValues,
      Title: serializeTitle(formValues.Title)
    }
  });
  dispatch(resetModals());
  dispatch(setToast('Movie added successfully'));  
}

export const deleteMovie = () => dispatch => {
  dispatch({ type: DELETE_MOVIE });
  dispatch(resetModals());
  dispatch(setToast('Movie deleted successfully'));
}

export const resetModals = () => dispatch => {
  dispatch({ type: RESET_MODALS });
  dispatch(reduxFormReset('editMovie'));
};

