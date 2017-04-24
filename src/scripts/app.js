import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

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
        <div className="above-the-fold hello">
          <a className="logo-wrapper" href="/">
            <span className="logo-text">{this.props.app.appName}</span>
          </a>
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-24">
                  <h1 className="blurb">Hello, {this.props.app.appName}!</h1>
                  <h2 className="blurb">Get your hackath-on!
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="sign-up-wrapper">
            <div className="container">
              <button className="btn btn-lg btn-primary" onClick={this.scrollToSignUp}>Start Building</button>
            </div>
          </div>
        </div>
        <div className="content-section benefits">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Create React App</h3>
                <p>This is built with <a href="https://github.com/facebookincubator/create-react-app">create react
                  app</a>.
                </p>
              </div>
              <div className="col-sm-11 col-sm-offset-1">
              </div>
            </div>
          </div>
        </div>
        <div className="content-section alt-content-section benefits">
          <div className="container">
            <div className="row">
              <div className="col-sm-10">
              </div>
              <div className="col-sm-12">
                <h3>Webpack</h3>
                <p>NPM scripts and webpack. Very easy. Just run
                </p>
                <pre className="code">npm install && npm start</pre>
              </div>

            </div>
          </div>
        </div>
        <div className="content-section benefits">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Redux Form</h3>
                <p>Use the form below to get signups!
                </p>
              </div>
              <div className="col-sm-11 col-sm-offset-1">
              </div>
            </div>
          </div>
        </div>

        <div className="signup">
          <div className="container">
            <div className="row">
              <div className="col-sm-24">
                <div className="signup-container">

                  <h3>Let's do This</h3>
                  <p>
                    Use this app!
                  </p>

                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field ElementType="input" type="text" className="form-control" name="name" id="name"
                           placeholder="Your Full Name*"
                           component={renderField}/>
                    <Field ElementType="input" type="email" className="form-control" name="email" id="email"
                           placeholder="Your E-mail Address*"
                           component={renderField}/>

                    <Field ElementType="textarea" className="form-control" name="requestContent"
                           id="request-content"
                           placeholder="Your Message*"
                           component={renderField}/>
                    <div className="form-group">
                      <button className="btn btn-sm btn-primary btn-sign-up">Sign Up!</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <ul>
            <li className="social">
              <a href="https://twitter.com/" target="_blank">
                <i className="fa fa-twitter"/>
              </a>
            </li>
            <li id="footer-copyright">
              <span>© {new Date().getFullYear()} {this.props.app.appName}</span>
            </li>
          </ul>
        </footer>

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
