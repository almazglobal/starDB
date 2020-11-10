import React, { Component } from 'react';
import './error-button.css';

export default class ErrorButton extends Component {
  state = {
    renderError: false,
  };
  render() {
    if (this.state.renderError) return (this.foo.bar = 0);
    return (
      <button
        className="btn btn-danger btn-lg"
        onClick={() => this.setState({ renderError: true })}
      >
        Throw Error
      </button>
    );
  }
}
