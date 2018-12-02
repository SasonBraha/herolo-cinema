import React, { Component } from 'react';
import styled from 'styled-components';

class ErrorBoundry extends Component {
  state = { 
    hasErr: false
  }

  static getDerivedStateFromError(ex) {
    return {
      hasErr: true
    }
  }

  render() {
    return this.state.hasErr
      ? (
        <StyledErrorBoundry>
          Oops! Something went wrong.
        </StyledErrorBoundry>
      ) : (
        this.props.children
      )
  }
}

const StyledErrorBoundry = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2DEDE;
  width: 100%;
  height: 100vh;
`;

export default ErrorBoundry;
