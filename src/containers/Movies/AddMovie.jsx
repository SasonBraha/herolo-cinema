import React, { Component } from 'react';
import Modal from '../../components/Modal';
import { Field, reduxForm, blur } from 'redux-form';
import Form from '../../components/Form';
import FormGroup from '../../components/Form/FormGroup';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { resetModals, addMovie } from '../../redux/actions';
import { validateForm } from '../../utils';
import GenreInput from '../../components/GenreInput';

class AddMovie extends Component {
  renderInput({ input, label, icon, meta: { error, touched } }) {
    const { name } = input;
    return (
      <FormGroup 
        input={input}
        name={name}
        label={label}
        icon={icon}
        error={touched && error}
      />
    );
  }

  onSubmit = formValues => {
    this.props.addMovie(formValues);
    this.props.initialize();
  }

  render() {
    const { showAddModal, handleSubmit, resetModals } = this.props;
    return (
      <Modal isOpen={showAddModal}>
        <Form
            icon="icon-play"
            header="Add Movie" 
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
            manualValidate={() => this.props.dispatch(blur('addMovie', '_validation', Math.random()))}
            isAddMovie
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
            Create
          </Button>

          <Button
            color="white"
            background="var(--danger-color)"
            type="button"
            onClick={() => {
              resetModals();
              this.props.initialize();
            }}
          >
            Cancel
          </Button>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = ({ movies: { movieItems, showAddModal } }) => ({
  movieItems,
  showAddModal
});

export default connect(
  mapStateToProps,
  { resetModals, addMovie }
)(reduxForm({
  form:'addMovie',
  validate: validateForm,
  destroyOnUnmount: false,
  touchOnBlur: false
})(AddMovie));
