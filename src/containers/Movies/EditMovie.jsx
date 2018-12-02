import React, { Component } from 'react';
import Modal from '../../components/Modal';
import { connect } from 'react-redux';
import { updateMovieItems, resetModals } from '../../redux/actions';
import Form from '../../components/Form';
import FormGroup from '../../components/Form/FormGroup'
import Button from '../../components/Button';
import { Field, reduxForm, blur } from 'redux-form';
import { validateForm } from '../../utils';
import GenreInput from '../../components/GenreInput';

class EditMovie extends Component {
  renderInput({ input, label, icon, meta: { error } }) {
    const { name } = input;
    return (
      <FormGroup 
        input={input}
        name={name}
        label={label}
        icon={icon}
        error={error}
      />
    );
  }

  onSubmit = formValues => {
    this.props.updateMovieItems(formValues);
  }

  render() {
    const { resetModals, showEditModal, handleSubmit } = this.props;
    return (
      <Modal isOpen={showEditModal}>
        <Form
          icon="icon-play"
          header="Edit movie" 
          onSubmit={handleSubmit(this.onSubmit)}
          noValidate 
        >
          <Field 
            name="Title"
            label="Title" 
            icon="icon-subject"
            component={this.renderInput}
          />

          <Field 
            name="Year"
            label="Year" 
            icon="icon-calendar"
            component={this.renderInput}
          />

          <Field
            name="Genres"
            component={GenreInput}
            // By calling blur redux-form is forced to re-validate.
            manualValidate={() => this.props.dispatch(blur('editMovie', '_validation', Math.random()))}
          />

          <Field 
            name="Runtime"
            label="Runtime" 
            icon="icon-clock"
            component={this.renderInput}
          />

          <Field 
            name="Director"
            label="Director" 
            icon="icon-user"
            component={this.renderInput}
          />

          {/* Virtual field to manually trigger validation */}
          <Field 
            name="_validation"
            component={() => <span style={{display: 'none'}} />}
          />

          <Button
            color="white"
            background="var(--main-color)"
            type="submit"
          >
            Update
          </Button>

          <Button
            color="white"
            background="var(--danger-color)"
            type="button"
            onClick={resetModals}
          >
            Cancel
          </Button>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = ({ movies: { showEditModal, selectedMovie, movieItems } }) => ({
  showEditModal,
  initialValues: selectedMovie,
  movieItems
});

export default connect(
  mapStateToProps,
  { updateMovieItems, resetModals }
)(reduxForm({
  form:'editMovie',
  enableReinitialize: true,
  validate: validateForm,
})(EditMovie));