import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Toast from '../components/Toast';
import { removeToast } from '../redux/actions';

const Toasts = ({ toasts, removeToast }) => (
  ReactDOM.createPortal(
    <StyledToasts>
      {
        toasts.map(({ id, message }) => (
          <Toast 
            message={message} 
            key={id}
            onAnimationEnd={() => removeToast(id)} 
          />
        ))
      }
    </StyledToasts>,
    document.getElementById('toastMount')
  )
);

const StyledToasts = styled.div`
  position: fixed;
  width: 30rem;
  left: 2rem;
  bottom: 0;
  z-index: 5;
`;

const mapStateToProps = ({ global: { toasts } }) => ({ toasts });
export default connect(mapStateToProps, { removeToast })(Toasts);