import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ListItem = props => (
  <StyledListItem {...props}>
    <StyledIcon>
      <use xlinkHref={`./sprite.svg#${props.icon}`}></use>
    </StyledIcon>
    {props.children}
  </StyledListItem>
);

ListItem.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string
}

export const StyledListItem = styled.li`
  padding: 1rem .5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: .3s;
  color: ${({ color }) => color};
  background: ${({ background }) => background};
  font-size: 1.6rem;

  &:hover {
    background: ${({ color }) => color};
    color: ${({ background }) => background};
  }
`;

export const StyledIcon = styled.svg`
  fill: currentColor;
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
`;

export default ListItem;