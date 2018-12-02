  import React, { Component } from 'react';
  import styled, { css } from 'styled-components';

  class GenreInput extends Component {
    state = {
      genres: [...this.props.input.value] || [],
      inputValue: ''
    }

    updateReduxForm = () => {
      const { genres } = this.state;
      // Pass { Array<genres> } To Reudx-Form
      this.props.input.onChange(genres);
      
      if (!genres.length) {
        // Force redux-form to re-validate
        this.props.manualValidate();
      }
    }

    componentDidMount() {
      this.updateReduxForm();
    }

    handleChange = e => {
      this.setState({ inputValue: e.target.value });
    }

    removeGenre = index => {
      const newState = [...this.state.genres];
      newState.splice(index, 1);
      this.setState({
        genres: newState
      }, () => this.updateReduxForm());
    }

    handleKeyDown = e => {
      const { genres, inputValue } = this.state;
      const isEnter = e.which === 13;
      const isTab = e.which === 9;
      if (isEnter || isTab) {
        if (inputValue.length) {
          this.setState({
            genres: [...genres, inputValue]
          }, () => {
            this.updateReduxForm();
            this.setState({ inputValue: '' })
          }); 
          // Prevent Form Submission / Tab To Next Element
          e.preventDefault();
        }
        // Prevent submission only if input is empty
        isEnter && e.preventDefault();
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
            <StyledInput 
              {...this.props.input}
              value={this.state.inputValue}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              // Override redux-form blur function to prevent field value reset
              onBlur={() => null}
              placeholder="Add genre"
              showError={isAddMovie ? touched && error : error}
              shouldShrink={this.state.genres.length > 0}
            />
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
    padding: .4rem .7rem;
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
    margin: 0 .4rem .5rem 0;
    border: none;
    outline: none;
    flex: 1;
    box-shadow: 0 .1rem .6rem rgba(0, 0, 0, .2);
    font-family: inherit;
    border: .1rem solid transparent;
    max-width: 11rem;

    ${({ showError }) => showError && css`
      border-color: var(--danger-color);
    `}

    ${({ shouldShrink }) => shouldShrink && css`
    `}
  `;

  export default GenreInput;