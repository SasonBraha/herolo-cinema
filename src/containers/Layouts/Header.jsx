import React from 'react';
import styled from 'styled-components';
import { setAddMovieModal } from '../../redux/actions';
import { connect } from 'react-redux';
import Button from '../../components/Button';

const Header = ({ setAddMovieModal }) => (
  <StyledHeader>
    Herolo Cinema

    <Button
      color="white"
      background="var(--main-color)"
      onClick={setAddMovieModal}
    >
      Add Movie
    </Button>
  </StyledHeader>
);

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: var(--main-color);
  height: 5.5rem;
  background: white;
  box-shadow: 0 .5rem 1.3rem rgba(0, 0, 0, .3);
  border-bottom: .5rem solid var(--main-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;
  color: var(--main-color);
  font-weight: 700;
  padding: 0 1rem;
  z-index: 10;
`; 

export default connect(null, { setAddMovieModal })(Header);