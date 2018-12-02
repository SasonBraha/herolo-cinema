import React from 'react'
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const MoviesLoader = () => (
  <StyledLoaderContainer>
    <ContentLoader 
      height={300}
      width={350}
      speed={2}
      primaryColor="#f2f3f4"
      secondaryColor="#a8a8a8"
    />
  </StyledLoaderContainer>
);

const StyledLoaderContainer = styled.div`
  width: 35rem;
  height: 30rem;
  margin: 1rem;
  display: inline-block;
`;

export default MoviesLoader;

