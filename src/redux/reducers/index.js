import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import globalReducer from './globalReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  movies: moviesReducer,
  global: globalReducer,
  form: formReducer
});