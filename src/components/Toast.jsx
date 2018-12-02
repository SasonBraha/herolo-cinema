import React from 'react'
import styled, { keyframes } from 'styled-components';

const Toast = props => (
  <StyledToast {...props}>{props.message}</StyledToast>
);

const fadeOut = keyframes`
  from { 
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledToast = styled.div`
  margin-bottom: 3rem;
  background: white;
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 .1rem .6rem 0 rgba(0, 0, 0, .2);
  font-weight: bold;
  animation: ${fadeOut} 2s forwards 3s;
  color: var(--success-color);
  border-left: .4rem solid currentColor;
  transition: .3s;
`;

export default Toast;
