import { 
  SET_MOVIES, 
  SET_EDIT_MODAL, 
  SET_DELETE_MODAL, 
  SET_SELECTED_MOVIE, 
  UPDATE_MOVIE_ITEMS,
  DELETE_MOVIE,
  SET_ADD_MOVIE_MODAL,
  RESET_MODALS,
  ADD_MOVIE, 
} from '../reduxConstants';

const initialState = {
  movieItems: {},
  selectedMovie: {},
  showAddModal:  false,
  showDeleteModal: false,
  showEditModal: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movieItems: action.payload
      }

    case SET_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: {
          ...state.movieItems[action.payload]
        }
      }
      
    case SET_ADD_MOVIE_MODAL:
      return {
        ...state,
        showAddModal: true
      }

    case SET_EDIT_MODAL:
      return {
        ...state,
        showEditModal: true
      }
    
    case SET_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: true
      }

    case UPDATE_MOVIE_ITEMS:
      return {
        ...state, 
        movieItems: {
          ...state.movieItems,
          [action.payload.id]: action.payload
        }
      }

    case DELETE_MOVIE: {
      const { [state.selectedMovie.id]: deleteValue, ...rest } = state.movieItems;
      return {
        ...state,
        movieItems: rest
      }
    }

    case RESET_MODALS: {
      return {
        ...state,
        showAddModal: false,
        showDeleteModal: false,
        showEditModal: false
      }
    }

    case ADD_MOVIE: {
      return {
        ...state,
        movieItems: {
          ...state.movieItems,
          [action.payload.id]: action.payload
        }
      }
    }
    
    default: 
      return state;
  }
}