import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './random-planet.css';
export default class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
    error: false,
  };
  swapiService = new SwapiService();

  constructor() {
    super();
    this.updatePlanet();
  }
  onError = (err) => {
    this.setState({ error: true, loading: false });
  };
  onPlanetLoaded = (id) => {
    this.swapiService
      .getPlanet(id)
      .then((planet) => {
        this.setState({ planet, loading: false });
      })
      .catch(this.onError);
  };
  updatePlanet = () => {
    // const id = Math.floor(Math.random() * 25) + 2;
    const id = 12000;
    this.onPlanetLoaded(id);
  };
  render() {
    const { loading, planet, error } = this.state;
    const hasData = !(loading || error);
    const viewError = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {viewError}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="image_of_planet"
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diametr</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
