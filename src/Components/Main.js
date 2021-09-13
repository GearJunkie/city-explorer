import React from 'react';
import axios from 'axios';
import CityExplorerForm from './CityExplorerForm.js';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Movies from './Movies.js';
import Weather from './Weather.js';
import Location from './Location.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      map: '',
      forecastArr: [],
      moviesArr: [],
      errors: '',
      displayAlert: false
    }
  }

  getLocation = async () => {
    try{
      const LOCATION = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${this.state.searchQuery}&format=json`;
      const locationResponse = await axios.get(LOCATION);
      this.setState({location: locationResponse.data[0] })
      
      const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;
      const mapResponse = await axios.get(MAP);
      this.setState({ map: mapResponse.config.url })
    } catch(error) {
      this.setState({errors: error.response.data.error, displayAlert: true})
    }
    console.log(this.getLocation);
  }
  

  getWeather = async () => {
    try {
      const WEATHER = `https://code-fellows-city-explorer-api.herokuapp.com/weather?searchQuery=${this.state.searchQuery}&lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
      // const WEATHER = `http://localhost:3333/weather?searchQuery=${this.state.searchQuery}&lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
      const weatherResponse = await axios.get(WEATHER);
      this.setState({ forecastArr: weatherResponse.data })
    } catch(error) {
      this.setState({errors: error.response.data.error, displayAlert: true})
    }
  }
  
  
  getMovies = async () => {
    try {
      const MOVIES = `https://code-fellows-city-explorer-api.herokuapp.com/movies?searchQuery=${this.state.searchQuery}`;
      // const MOVIES = `http://localhost:3333/movies?searchQuery=${this.state.searchQuery}`;
      const movieResponse = await axios.get(MOVIES);
      this.setState({ moviesArr: movieResponse.data })
    } catch(error) {
      console.error(error);
      console.log(this.getMovies);
    }
  }

  onChange = async (e) => {
    this.setState({ searchQuery: e.target.value})
  }

  submitLocation = async (e) => {
    e.preventDefault();
      this.setState({ location: this.state.searchQuery })
      this.getLocation();
      this.getMovies();
      this.getWeather();
  }
  

  closeAlert = () => {
    this.setState({displayAlert: false});
  }

  render() {
    return (
    <main className="main">
      <Alert show={this.state.displayAlert} variant='warning'>
        <Alert.Heading>Oops! Somthing went wrong...</Alert.Heading>
        Error code {this.state.errors}: Error
        <Button variant='warning' onClick={this.closeAlert}>Close</Button>
      </Alert>

      <CityExplorerForm submitLocation={this.submitLocation} onChange={this.onChange} />

      <Location location={this.state.location} lat={this.state.lat} lon={this.state.lon} map={this.state.map}/>

      <Weather forecast={this.state.forecastArr} searchQuery={this.state.searchQuery} />
      
      <Movies movies={this.state.moviesArr} searchQuery={this.state.searchQuery}/>
    </main>
    )
  };
}

export default Main;