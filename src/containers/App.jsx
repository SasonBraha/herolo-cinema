import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../redux/actions';
import Header from './Layouts/Header';
import Movies from './Movies';
import AddMovie from './Movies/AddMovie';
import EditMovie from './Movies/EditMovie';
import DeleteMovie from './Movies/DeleteMovie';
import Toasts from './Toasts';

class App extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <Movies />
        </main> 

        <AddMovie />
        <EditMovie />
        <DeleteMovie />
        <Toasts />
      </>
    );
  }
}

export default connect(null, { fetchMovies })(App);