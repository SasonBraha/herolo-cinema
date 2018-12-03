  import React, { Component } from 'react';
  import styled, { css } from 'styled-components';
  
  class GenreInput extends Component {
    state = {
      genres: [...this.props.input.value] || [],
      inputValue: ''
    }
    
    componentDidMount() {
      this.updateReduxForm();
    }

    updateReduxForm = () => {
      const { genres } = this.state;
      // Add { Array<genres> } to reudx-form
      this.props.input.onChange(genres);
      if (!genres.length) this.props.manualValidate();
    }

    updateGenresState = () => {
      const { genres, inputValue } = this.state;
      const trimmedValue = inputValue.trim();
      if (trimmedValue.length) {
        this.setState({
          genres: [...genres, trimmedValue]
        }, () => {
          this.updateReduxForm();
          this.setState({ inputValue: '' })
        }); 
      }
    }
    
    removeGenre = index => {
      const newState = [...this.state.genres];
      newState.splice(index, 1);
      this.setState({ genres: newState }, () => this.updateReduxForm());
    }

    handleChange = e => {
      this.setState({ inputValue: e.target.value });
    }

    handleKeyDown = e => {
      const isEnterPressed = e.which === 13;
      const isTabPressed = e.which === 9;
      if (isEnterPressed || isTabPressed) {
        if (this.state.inputValue.length) {
          this.updateGenresState();
          // Prevent form submission / tab to next element
          e.preventDefault();
        }
        // Prevent only submission if input is empty
        isEnterPressed && e.preventDefault();
      }
      
    }

    render() {
      const { meta: { touched, error }, isAddMovie } = this.props;
      return (
        <>
          <StyledGenresEditor>
            {
              this.state.genres.map((genre, i) => (
                <StyledGenreTag key={i}>
                  {genre}
                  <StyledRemoveGenre onClick={() => this.removeGenre(i)}>X</StyledRemoveGenre>
                </StyledGenreTag>
              ))
            }
            <div>
              <StyledInput 
                {...this.props.input}
                value={this.state.inputValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                // Override redux-form blur function to prevent value reset
                onBlur={() => null}
                placeholder="Add genre"
                showError={isAddMovie ? touched && error : error}
              />
              <StyledAddGenreMobile onClick={this.updateGenresState}>Add</StyledAddGenreMobile>
            </div>
          </StyledGenresEditor>
        </>
      );
    }
  }

  const StyledGenresEditor = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  `;

  const StyledGenreTag = styled.span`
    display: inline-block;
    background: var(--main-color);
    border-radius: .5rem;
    color: white;
    box-shadow: 0 .2rem .5rem rgba(0, 0, 0, .2);
    padding: .63rem .7rem;
    margin: 0 .8rem .8rem 0;
  `;

  const StyledRemoveGenre = styled.span`
    display: inline-block;
    height: 100%;
    background: #0049a3;
    padding: 0 .8rem;
    cursor: pointer;
    margin-left: .7rem;
    border-radius: .7rem;
  `;

  const StyledInput = styled.input`
    padding: .9rem .5rem;
    border-radius: .5rem;
    margin: 0 0 .5rem 0;
    border: none;
    outline: none;
    flex: 1;
    box-shadow: 0 .1rem .6rem rgba(0, 0, 0, .2);
    font-family: inherit;
    border: .2rem solid transparent;
    max-width: 11rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    ${({ showError }) => showError && css`
      border-color: var(--danger-color);
    `}
  `;

  const StyledAddGenreMobile = styled(StyledGenreTag)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: .55rem .7rem;
    transform: translateY(.12rem);
    box-shadow: 0 .1rem .6rem rgba(0, 0, 0, .2);
    cursor: pointer;
  `;

  export default GenreInput;