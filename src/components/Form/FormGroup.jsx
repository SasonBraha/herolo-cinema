import React from 'react';
import styled from 'styled-components';

const FormGroup = ({ input, name, label, icon, error }) => (
  <StyledFormGroup>
    <StyledInput 
      {...input}
      id={name}
      required 
      autoComplete="off"
      className={error && 'invalid'}
    />
    <StyledInputError>{error}</StyledInputError>
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
    <StyledInputIcon>
      <use xlinkHref={`./sprite.svg#${icon}`}></use>
    </StyledInputIcon>
  </StyledFormGroup>
);

const StyledFormGroup = styled.div`
  position: relative;
  margin-bottom: 3.3rem;
  flex: 1;
`;

const StyledInput = styled.input`
  border: none;
  background: white;
  border-bottom: .2rem solid #d4d4d4;
  display: block;
  padding: .5rem .2rem;
  outline: none;
  width: 100%;
  transition: .3s;
  font-family: inherit;
  font-size: 1.5rem;


  &:focus, &:valid {
    border-color: var(--main-color);
    
    & ~ label, & ~ svg {
      color: var(--main-color);
      fill: var(--main-color);
    }
    
    & ~ label {
      font-size: 1.4rem;
      transform: translateY(-1.7rem);
    }
  }

  &.invalid {
    border-color: var(--danger-color);
  
    & ~ label, & ~ svg {
      color: var(--danger-color);
      fill: var(--danger-color);
    }
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  transition: .25s;
  cursor: text;
  user-select: none;
  color: #888;
  left: .1rem;
  top: 0;
  transition: .3s;
`;

const StyledInputIcon = styled.svg`
  position: absolute;
  transition: .3s;
  right: 0.4rem;
  top: -.3rem;
  width: 2rem;
  height: 3rem;
`;

const StyledInputError = styled.div`
  color: var(--danger-color);
  font-size: 1.25rem;
  text-align: left;
`;

export default FormGroup;
