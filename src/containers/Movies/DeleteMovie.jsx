import React from 'react';
import Modal from '../../components/Modal';
import { connect } from 'react-redux';
import { resetModals, deleteMovie } from '../../redux/actions';
import Button from '../../components/Button';
import styled from 'styled-components';

const DeleteMovie = ({ showDeleteModal, Title, resetModals, deleteMovie }) => (
  <Modal isOpen={showDeleteModal}>
    <StyledWarningIcon>
      <use xlinkHref="./sprite.svg#icon-notification"></use>
    </StyledWarningIcon>

    <StyledWarningText>Are you sure you want to delete "{Title}"?</StyledWarningText>   

    <Button
      color="white"
      background="var(--danger-color)"
      onClick={deleteMovie}
    >
      Delete
    </Button>

    <Button
      color="white"
      background="var(--main-color)"
      onClick={resetModals}
    >
      Cancel
    </Button>
  </Modal>
);

const StyledWarningIcon = styled.svg`
  fill: #f8bb86;
  width: 8rem;
  height: 8rem;
  display: block;
  margin: 0 auto;
`;

const StyledWarningText = styled.div`
  font-size: 1.7rem;
  margin: 2rem auto;
`;

const mapStateToProps = ({ movies: { showDeleteModal, selectedMovie: { Title } } }) => ({
  showDeleteModal,
  Title 
});
export default connect(mapStateToProps, { resetModals, deleteMovie })(DeleteMovie);

