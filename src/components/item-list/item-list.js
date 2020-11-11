import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './item-list.css';

export default class ItemList extends Component {
  state = {
    itemList: null,
    loading: true,
    error: false,
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };
  loadedAllPeople = () => {
    const { getData } = this.props;
    getData()
      .then((item) => {
        this.setState({ itemList: item, loading: false });
      })
      .catch(this.onError);
  };

  componentDidMount() {
    this.loadedAllPeople();
  }
  render() {
    const { loading, itemList, error } = this.state;
    const { onLoadDetails } = this.props;
    const hasData = !(loading || error);
    const viewError = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? (
      <PeopleView
        people={itemList}
        onLoadDetails={onLoadDetails}
        renderItem={this.props.renderItem}
      />
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

const PeopleView = ({ people, onLoadDetails, renderItem }) => {
  const elements = people.map((item) => {
    const { id } = item;
    const label = renderItem(item);
    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onLoadDetails(id)}
      >
        {label}
      </li>
    );
  });
  return <React.Fragment>{elements}</React.Fragment>;
};
