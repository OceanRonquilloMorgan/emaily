// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  // separate helper function to render the four different fields in application
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div style={{ marginLeft: '60px', marginRight: '60px' }}>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red lighten-1 btn white-text">
            Cancel
          </Link>
          <button
            type="button"
            className="blue-grey lighten-3 btn center white-text"
            style={{ marginLeft: '5px' }}
            onClick={this.props.reset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="green lighten-1 btn right white-text"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// validate entered form values
function validate(values) {
  // return an object
  const errors = {};

  // return a string indicating invalid emails
  errors.recipients = validateEmails(values.recipients || '');

  // use load dash library to iterate thru fields object
  _.each(formFields, ({ name }) => {
    // use square brackets syntax to find name on run-time
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  // keep our values around if we hit 'Back' on review
  destroyOnUnmount: false
})(SurveyForm);
