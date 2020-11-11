import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';
import SwapiService from '../../services/swapi-service';

const Row = ({ left, right }) => {
  return (
    <div className="row mb2">
      <div className="col-mb-6">{left}</div>
      <div className="col-md-6">{right}</div>
    </div>
  );
};
export default class PeoplePage extends Component {
  swapiService = new SwapiService();
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
    const itemList = (
      <ItemList
        onLoadDetails={this.onLoadDetails}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) =>
          `${name} (${gender}, ${birthYear})`
        }
      />
    );
    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );
    return <Row left={itemList} right={personDetails} />;
  }
}
