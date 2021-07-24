import React from 'react';
import axios from 'axios';
import CityExplorerForm from './CityExplorerForm.js';
import Alert from 'react-bootstrap/Alert';
import Movies from './Movies.js';
import Weather from './Weather.js';
import Location from './Location.js';

const storage = {};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesArr: [],
      searchQuery: '',
      location: {},
      lat: '',
      lon: '',
      map: '',
      forecastArr: [],
      errors: '',
      displayAlert: false
    }
  }

  getLocation = async () => {
    try{
      const LOCATION = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${this.state.searchQuery}&format=json`, { params: {city: this.state.searchQuery}})
      this.setState({location: LOCATION.data })
      
      const MAP = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`)
      this.setState({map: MAP.data })
    } catch(err) {
      this.setState({errors: error.data.error, displayAlert: true})
      console.error(err);
    }
  }

  getWeather = async () => {
    try {
      const WEATHER = await axios.get(`https://code-fellows-city-explorer-api.herokuapp.com/weather?searchQuery=${this.state.searchQuery}`, { params: {city: this.state.searchQuery }});
      console.log('weather data', WEATHER);
      this.setState({forecastArr: WEATHER.data})
    } catch(err) {
      console.error(err);
    }
  }

  getMovies = async () => {
    try {
      const MOVIES = await axios.get(`https://code-fellows-city-explorer-api.herokuapp.com/movies?searchQuery=${this.state.searchQuery}`, { params: {city: this.state.searchQuery}})
      this.setState({ moviesArr: MOVIES.data })
      console.log('movie data', MOVIES);
    } catch(err) {
      console.error(err);
    }
  }

  updateLocation = (e) => {
    this.setState({ searchQuery: e.target.value})
  }

  submitLocation = async () => {
      this.setState({ location: this.state.searchQuery })
      this.getMovies();
      this.getWeather();
  }

  closeAlert = () => {
    this.setState({displayAlert: false});
  }

  render() {
    return (
    <main className="app">

      <Alert show={this.props.displayAlert} variant='warning'>
        <Alert.Heading>Oops! Somthing went wrong...</Alert.Heading>
        Error code {this.props.errors}: Error
        <Button variant='warning' onClick={this.closeAlert}>Close</Button>
      </Alert>

      <CityExplorerForm submitLocation={this.submitLocation} updateLocation={this.updateLocation} />
      <Location lat={this.state.lat} lon={this.state.lon} map={this.state.map}/>
      <Movies movies={this.state.moviesArr} />
      <Weather forecast={this.state.forecastArr} />
    </main>
    )
  }
}

export default Main;