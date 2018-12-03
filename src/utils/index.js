export const serializeString = str => {
  return str && str.replace(/[^a-zA-Z0-9]/gi, ' ').replace(/ +/g, ' ').toLowerCase().trim();
} 

export const validateForm = (formValues, props) => {
  const formFields = ['Title', 'Year', 'Runtime', 'Director'];
  const { Title, Year, Runtime } = formValues;
  const currentMovieId = props.initialValues && props.initialValues.id
  const errors = {};

  // Check for duplicate title
  const duplicateErrorMessage = 'A movie with the same title is already exists, please choose another';
  const movieItemsArray = Object.values(props.movieItems);
  for(let movie of movieItemsArray) {
    // Duplicate validation when editing (id to compare)
    if (currentMovieId) {
      if (serializeString(Title) === serializeString(movie.Title) && currentMovieId !== movie.id) {
        errors.Title = duplicateErrorMessage;
      }
      // Duplicate validation when adding new movie
    } else {
      if (serializeString(Title) === serializeString(movie.Title)) {
        errors.Title = duplicateErrorMessage;
      }
    }
  }

  // Check for ONLY non-alphanumeric title
  if (serializeString(Title) === '') {
    errors.Title = 'At least one letter is required.';
  }

  // Check for valid year
  const currentYear = new Date().getFullYear();
  const firstMovieDebut = 1888;
  const yearInputValue = parseInt(Year);
  if (!(yearInputValue >= firstMovieDebut && yearInputValue <= currentYear) || isNaN(Year)) {
    errors.Year = `Valid year is between ${firstMovieDebut} and ${currentYear}`;
  }

  // Check for valid runtime
  const runtimeInputValue = parseInt(Runtime);
  if ((isNaN(Runtime)) || runtimeInputValue <= 0) {
    errors.Runtime = 'Runtime must be a positive whole number.';
  }
  
  // Check for valid genres
  if (formValues.Genres && !formValues.Genres.length) {
    errors.Genres = 'Genres cannot be empty.';
  }

  // Check for empty fields
  formFields.forEach(field => !formValues[field] ? errors[field] = `Field "${field}" is required.` : false);

  return errors;
}

export const generateId = () => `${Date.now().toString()}`;

export const serializeTitle = title => serializeString(title)
  .split(' ')
  .map(char => char[0].toUpperCase() + char.substr(1))
  .join(' ')
