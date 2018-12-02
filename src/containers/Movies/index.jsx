import React from 'react'
import { connect } from 'react-redux';
import MovieItem from './MovieItem';
import styled from 'styled-components';
import MoviesLoader from '../../components/Movies.loader';

const Movies = ({ movieItems }) => (
  <StyledMovies>
    {
      Object.keys(movieItems).length 
        ? Object.values(movieItems).map((movieItem, i) => <MovieItem key={i} movieItem={movieItem} />) 
        : Array.from({ length: 10 }).map((_, i) => <MoviesLoader key={i} />)
    }
  </StyledMovies>
  
);

const StyledMovies = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
`;

const mapStateToProps = ({ movies: { movieItems } }) => ({ movieItems });
export default connect(mapStateToProps, null)(Movies);
