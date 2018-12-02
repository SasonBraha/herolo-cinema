import React, { Component } from 'react';
import Dropdown from '../../components/Dropdown';
import ListItem from '../../components/ListItem';
import { setSelectedMovie, setEditModal, setDeleteModal } from '../../redux/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

class MovieItem extends Component {
  state = {
    isDropdownOpen: false
  }

  handleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  render() {
    const { id, Title, Year, Runtime, Genres, Director } = this.props.movieItem;
    return (
      <StyledMovieItem>
        <h3>
          {Title} 
          <StyledYear>({Year})</StyledYear>
        </h3>

        { Genres.map((genre, i) => <StyledGenreTag key={i}>{genre}</StyledGenreTag>) }

        <div>{Runtime}min</div>

        <div>
          <StyledDirector>Director: </StyledDirector>
          {Director}
        </div>

        <StyledMovieId>#{id}</StyledMovieId>
        
        <StyledOptions onClick={this.handleDropdown}>
          <StyledOptionsIcon>
            <use xlinkHref="./sprite.svg#icon-list2"></use>
          </StyledOptionsIcon>

          <Dropdown 
            isOpen={this.state.isDropdownOpen} 
            resetDropdown={this.handleDropdown}
            width="13rem"
          >
            <ul>
              <ListItem
                color="var(--main-color)"
                background="white"
                icon="icon-pencil"
                onClick={() => this.props.setEditModal(id)}
              >
                Edit
              </ListItem>
              
              <ListItem
                color="var(--danger-color)"
                background="white"
                icon="icon-bin2"
                onClick={() => this.props.setDeleteModal(id)}
              >
                Delete
              </ListItem>
            </ul>
          </Dropdown>
        </StyledOptions>
      </StyledMovieItem>
    );
  };
}

const StyledMovieItem = styled.div`
  width: 35rem;
  height: 30rem;
  max-width: 100%;
  background: white;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 0 1.1rem rgba(0, 0, 0, .2); 
  position: relative;
  transition: .3s;
  
  &:hover {
    transform: translateY(-.5rem);
    box-shadow: 0 .5rem 1.5rem rgba(0, 0, 0, .2); 
  }
`;

const StyledOptions = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  background: transparent;
  cursor: pointer;
  z-index: 1;
`;

const StyledOptionsIcon = styled.svg`
  width: 2rem;
  height: 2rem;
  fill: var(--main-color);
`;

const StyledYear = styled.span`
  font-size: 1.65rem;
  color: #363636;
  padding: 0 .5rem;
`;

const StyledGenreTag = styled.span`
  display: inline-block;
  box-shadow: 0 .2rem .5rem rgba(0, 0, 0, .2);
  padding: .3rem .6rem;
  background: #fff;
  border-radius: .5rem;

  &:not(:last-child) {
    margin: 0 .5rem 1rem 0;
  }
`;

const StyledDirector = styled.span`
  font-weight: bold;
`;

const StyledMovieId = styled.span`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  color: #bebebe;
`;

export default connect(null, { setSelectedMovie, setEditModal, setDeleteModal })(MovieItem);
