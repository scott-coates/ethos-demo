import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import sprite from './../assets/images/icon-sprite.png';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.requestContent) {
    errors.requestContent = 'Required';
  }

  return errors;
};

const warn = values => {
  const warnings = {};

  if (values.requestContent && values.requestContent.length < 10) {
    warnings.requestContent = 'We\'ll need a little more detail than that.';
  }

  return warnings;
};

const renderField = ({ input, ElementType, placeholder, type,className, id, meta: { touched, error, warning } }) => (

  <div className={"form-group" + (touched && error ? " has-error" : "")}>
    <ElementType {...input} id={id} placeholder={placeholder} type={type} className={className}/>
    {touched && (warning && <span className="help-block">{warning}</span>)}
  </div>
);

class App extends Component {

  scrollToSignUp() {
    const signup = document.querySelector('.signup');
    signup.scrollIntoView({behavior: 'smooth'});
  }

  onSubmit(values) {
    console.log(values);
  }

  handleChange(event) {
    // TODO - fill in
    const setState = this.setState.bind(this);
    this.setState({input: event.target.value});
    fetch('http://0.0.0.0:3000/?search_text=' + event.target.value)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
      console.log("json", json); // todo console.log statement
      setState({results: json});
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app">

        <div className="content-section benefits">
          <div className="container">
            <div className="row">
              <div className="col-sm-24">
                <div className="box">
                  <div className="title-row">
                    <h4>Title</h4>
                    <a href="#"><i className="fa fa-close"></i></a>
                  </div>
                  <div className="label-row">
                    <h5>Label</h5>
                  </div>
                  <div className="tree-row">
                    <h5>Label</h5>
                  </div>
                  <div className="link-row">
                    <a href="#">Link</a>
                    <div className="btn btn-primary">Done</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

function extracted(state) {
  return {
    app: state.app
  };
}

App = connect(extracted)(App);
export default reduxForm({
  form: 'mainForm',  // a unique identifier for this form
  validate,
  warn
})(App);
