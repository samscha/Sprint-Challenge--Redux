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
    // console.log('next', nextProps);
    // console.log('current', this.props);
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

  render() {
    console.log(this.props.smurfs);
    return (
      <div className="App">
        <Header />

        <div className="TopStatusBar">
          <div className="TopStatusBarButtons">
            <button
              className="DeleteVillageButton"
              onClick={this.deleteAllFriendsButtonHandler}
            >
              &#x2717;
            </button>

            <AddSmurf
              className="App__addSmurf"
              addSmurfHandler={this.addSmurfHandler}
            />

            <button className="EditVillageButton">&#x270e;</button>
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
  };
};

export default connect(mapStateToProps, {
  getSmurfs,
  addSmurf,
  deleteSmurf,
  deleteAllSmurfs,
})(App);
