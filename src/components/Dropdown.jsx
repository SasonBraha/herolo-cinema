import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  componentDidUpdate() {
    this.props.isOpen
      ? document.body.addEventListener('click', this.props.resetDropdown)
      : document.body.removeEventListener('click', this.props.resetDropdown)
  }

  render() {
    return (
      <StyledDropdown {...this.props}>{this.props.children}</StyledDropdown>
    );
  } 
}

export const StyledDropdown = styled.div`
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  box-shadow: 0 0 1rem rgba(0, 0, 0, .2);
  position: absolute;
  transition: all 0.15s, transform 0.2s;
  transform-origin: bottom right;
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  width: ${({ width }) => width};
  z-index: 1;
  overflow-y: auto;
  visibility: hidden;
  opacity: 0;
  transform: scale(.5);
  border-radius: .3rem;
  overflow: hidden;

  ${({ isOpen }) => isOpen && css`
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  `};
`;

Dropdown.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  isOpen: PropTypes.bool,
  width: PropTypes.string
};

Dropdown.defaultProps = {
  background: 'white',
  color: 'black',
  bottom: 0,
  right: 0,
  isOpen: true
};

export default Dropdown;