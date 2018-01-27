import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSmurfs, addSmurf, deleteSmurf, deleteAllSmurfs } from '../actions';

import Header from './Header';
import Smurfs from './Smurfs';
import AddSmurf from './AddSmurf';

import logo from '../assets/logo.svg';

import '../styles/App.css';

class App extends Component {
  componentDidMount() {
    this.props.getSmurfs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error)
      window.alert(`${JSON.parse(nextProps.error.request.responseText).Error}`);
  }

  addSmurfHandler = newSmurf => {
    this.props.addSmurf(newSmurf);
  };

  deleteAllFriendsButtonHandler = _ => {
    if (this.props.smurfs.length > 0) {
      if (
        window.confirm(
          'This will annihilate your village. This CANNOT be undone. Smurfs are not evicted. They are annihilated. Are you sure you want to continue?'
        )
      ) {
        this.props.deleteAllSmurfs();
      }
    } else {
      window.alert('Add some smurfs to your village before annihilating!');
    }
  };

  refreshVillageClickedHandler = _ => {
    this.props.getSmurfs();
  };

  render() {
    return (
      <div className="App">
        <Header />

        <div className="TopStatusBar">
          <div className="TopStatusBarButtons">
            <button
              className="DeleteVillageButton"
              disabled={!this.props.showUi}
              onClick={this.deleteAllFriendsButtonHandler}
            >
              &#x2717;
            </button>

            <AddSmurf
              className="App__addSmurf"
              disabled={!this.props.showUi}
              addSmurfHandler={this.addSmurfHandler}
            />

            <button
              className="RefreshVillageButton"
              disabled={!this.props.showUi}
              onClick={this.refreshVillageClickedHandler}
            >
              &#10227;
            </button>
          </div>
        </div>

        {this.props.showUi ? (
          <Smurfs className="App__smurfs" smurfs={this.props.smurfs} />
        ) : (
          <img src={logo} className="LoadingPicture" alt="loading-logo" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showUi: state.showUi,
    smurfs: state.smurfs,
    evictedSmurfs: state.evictedSmurfs,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  getSmurfs,
  addSmurf,
  deleteSmurf,
  deleteAllSmurfs,
})(App);
