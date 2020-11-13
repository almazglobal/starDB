import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';
import Row from '../row';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';

class ErrorBoundry extends Component {
  state = {
    error: false,
  };
  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) return <ErrorIndicator />;
    return this.props.children;
  }
}
export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedItem: null,
    error: false,
  };
  onLoadDetails = (id) => {
    this.setState({ selectedItem: id });
  };

  render() {
    const itemList = (
      <ErrorBoundry>
        <ItemList
          onLoadDetails={this.onLoadDetails}
          getData={this.swapiService.getAllPeople}
          renderItem={({ name, gender, birthYear }) => (
            <span>
              {`${name} (${gender}, ${birthYear})`}
              <ErrorButton />
            </span>
          )}
        />
      </ErrorBoundry>
    );
    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedItem}
          getData={this.swapiService.getPerson}
          getImageUrl={this.swapiService.getPersonImage}
        >
          <Record field="gender" label="Gender" />
          <Record field="eyeColor" label="Eye color" />
        </ItemDetails>
      </ErrorBoundry>
    );
    return <Row left={itemList} right={itemDetails} />;
  }
}
