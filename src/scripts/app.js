import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import dom from 'xmldom';

import html from './test-html';

import cx from 'classnames';

function getNodeComponent(node) {
  var returnNode = null;

  if (node.data && node.data.trim()) {
    // this is a non-empty text value
    returnNode = <Text node={node}/>;
  }
  else if (node.tagName) {
    // this is an element
    returnNode = <Folder node={node}/>;
  }

  if (returnNode) {
    return <li key={node.lineNumber.toString() + node.columnNumber.toString()}>{returnNode}</li>;
  }
}

class Text extends Component {

  render() {
    return <div className="text-node">
      {this.props.node.data}
    </div>;
  }
}


class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  onToggle(event) {
    event.stopPropagation();
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const nodeName      = this.props.node.nodeName;
    const toggleClasses = cx('toggle', this.state.expanded ? 'collapse' : 'expand');

    // TODO DRY up this code
    const childrenNodeComponents = Array.from(this.props.node.childNodes).map(getNodeComponent).filter(Boolean);

    return <div className="folder-node">
      <div><a href="#" className={toggleClasses} onClick={this.onToggle.bind(this)}></a>{nodeName}</div>
      <ul style={{display: this.state.expanded ? 'block' : 'none' }}>
        {childrenNodeComponents}
      </ul>
    </div>
  }
}

class App extends Component {

  render() {

    const parsedDom   = new dom.DOMParser().parseFromString(html);
    const bodyElement = parsedDom.getElementsByTagName('body')[0];

    const results = Array.from(bodyElement.childNodes).map(getNodeComponent).filter(Boolean);
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
                    <ul className="elements">{results}</ul>
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
})(App);
