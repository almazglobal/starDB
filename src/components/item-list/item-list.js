import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();
  state = {
    allPeople: null,
    loading: true,
    error: false,
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };
  loadedAllPeople = () => {
    this.swapiService
      .getAllPeople()
      .then((people) => {
        this.setState({ allPeople: people, loading: false });
      })
      .catch(this.onError);
  };

  componentDidMount() {
    this.loadedAllPeople();
  }
  render() {
    const { loading, allPeople, error } = this.state;
    const {onLoadDetails} = this.props
    const hasData = !(loading || error);
    const viewError = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? (
      <PeopleView people={allPeople} onLoadDetails={onLoadDetails} />
    ) : null;

    return (
      <ul className="item-list list-group">
        {spinner}
        {content}
        {viewError}
      </ul>
    );
  }
}

const PeopleView = ({ people, onLoadDetails }) => {
  const elements = people.map((el) => {
    return (
      <li className="list-group-item" key={el.id} onClick={() => onLoadDetails(el.id)}>
        {el.name}
      </li>
    );
  });
  return <React.Fragment>{elements}</React.Fragment>;
};
