import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';

export default class PeoplePage extends Component {
  state = {
    selectedPerson: null,
    error: false,
  };
  onLoadDetails = (id) => {
    this.setState({ selectedPerson: id });
  };
  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) return <ErrorIndicator />;
    return (
      <div className="row mb2">
        <div className="col-mb-6">
          <ItemList onLoadDetails={this.onLoadDetails} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}
