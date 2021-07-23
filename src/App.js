//1 - import modules
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Weather from './Weather';
import Movies from './Movies';

//2 - setup component class
class App extends React.Component {
  constructor(props) {
    super(props);
//3 - setup some state in component constructor
      this.state={
        searchQuery: '',
        location: {},
        map: '',
        errors: '',
        displayAlert: false,
        forecastArr: [],
        movieList: []

      }
      this.getLocation=this.getLocation.bind(this);
      this.closeAlert=this.closeAlert.bind(this);
 }
 
 //4 - create shell method(s) for actions

  getLocation = async (e) => {
    try{
      e.preventDefault();
      const LOCATION = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(LOCATION)
      // console.log('Location IQ Data:', response)
      this.setState({location: response.data[0]})
      
      const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;
      const answer = await axios.get(MAP);
      console.log(this.state.map);
      this.setState({map: answer.config.url})

    } catch(error){
      this.setState({errors: error.response.data.error, displayAlert: true})
      }
  }

  closeAlert = () => {
    this.setState({displayAlert: false});
  }

 
  render () {
    return (
        <>
          <Alert show={this.state.displayAlert} variant='warning'>
            <Alert.Heading>Oops! Somthing went wrong...</Alert.Heading>
            Error code {this.state.errors}: Error
            <Button variant='warning' onClick={this.closeAlert}>Close</Button>
          </Alert>

          <Form onSubmit={this.getLocation}>
            <Form.Group className="mb-3" controlId="formBasicEntry">
              <Form.Label>Location</Form.Label>
              <Form.Control onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder='type city name here...' type='text' />
              <Form.Text className="text-muted">
                Location: {this.state.location.display_name}<br />
                Location latitude: {this.state.location.lat}<br />
                Location longitude: {this.state.location.lon}<br />
                <Image src={this.state.map} alt='map of selected city'/>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
            Explore!
            </Button>
          </Form>

          {/* {this.state.forecastArr.length>0 && */}
          <Weather WEATHER={this.state.forecastArr} searchQuery={this.state.searchQuery}/>
          {/* {this.state.moviesArr.length>0 && */}
          <Movies MOVIES={this.state.moviesArr} searchQuery={this.state.searchQuery}/>
        </>
    );
  }
}

export default App;
