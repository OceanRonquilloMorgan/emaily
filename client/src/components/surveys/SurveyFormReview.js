// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
// to access the history functionality to redirect users
// back to /surveys on submit
import { withRouter } from 'react-router-dom';
// access all of our action creators
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // prints out SurveyForm form values for review
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} style={{ marginTop: '10px' }}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div style={{ marginLeft: '30px', marginRight: '30px' }}>
      <h5>Please Confirm Your Entries:</h5>
      {reviewFields}
      <button
        style={{ marginTop: '20px' }}
        className="red lighten-1 white-text btn"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        style={{ marginTop: '20px' }}
        onClick={() => submitSurvey(formValues, history)}
        className="green lighten-1 white-text btn right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// take redux state and transforming into props to pass down to component
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
