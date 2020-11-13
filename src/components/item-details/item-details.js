import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Record };
export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
  };
  swapiService = new SwapiService();
  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) return;
    getData(itemId).then((item) => {
      this.setState({ item, image: getImageUrl(item) });
    });
  };
  componentDidMount() {
    this.updateItem(this.props.itemId);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId) this.updateItem();
  }
  render() {
    if (!this.state.item) {
      return <span>Select item!</span>;
    }
    const { name } = this.state.item;
    const { item, image } = this.state;
    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="" />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child, idx) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
        <ErrorButton />
      </div>
    );
  }
}
