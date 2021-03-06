import React, { Component } from 'react';
// wire up to Redux
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  // life-cycle hook method
  componentDidMount() {
    this.props.fetchSurveys();
  }

  // helper method to return cards of surveys from materialize.css
  renderSurveys() {
    // newest surveys on top
    return this.props.surveys.reverse().map(survey => {
      return (
        <div
          className="card darken-1"
          key={survey._id}
          style={{ marginLeft: '40px', marginRight: '40px' }}
        >
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
