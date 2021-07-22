// 1 - import modules
// 2 - setup your component class
// 3 - setup some state in my component constructor
// 4 - create a shell method for actions -> today, i need to get the location -> shell method is getLocation() { // TODO: get location data }
// 5 - render out hardcoded sample data, check to make sure the component renders -> render() { return ( <h1>hello</h1> ) }
// 6 - render out a few state lines in your final output -> <h1>{this.state.whatever}</h1>
// 7 - fill in your getLocation method with a request to get the location data from your backend
// 8 - this.setState with that data
// 9 - your component <h1> should render that state information
// 10 - repeat 7-9 as needed with new state properties/display on the page


//1 - import modules
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';
import Alert from 'react-bootstrap/Alert';
import Weather from './Weather';
import Image from 'react-bootstrap/Image';

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
     forecastArr: []
   }
   this.getLocation=this.getLocation.bind(this);
   this.closeAlert=this.closeAlert.bind(this);
 }
 
 //4 - create shell method(s) for actions

getLocation = async (e) => {
  try{
    e.preventDefault();
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${this.state.searchQuery}&format=json`;
    const response = await axios.get(API)
    // console.log('Location IQ Data:', response)
    this.setState({location: response.data[0]})
    
    const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;
    const answer = await axios.get(MAP);
    console.log(this.state.map);
    this.setState({map: answer.config.url})

    // const WEATHER = `http://localhost:3333/weather?searchQuery=${this.state.searchQuery}`;
    const WEATHER = `https://code-fellows-city-explorer-api.herokuapp.com/weather?searchQuery=${this.state.searchQuery}`;
    const weatherResponse = await axios.get(WEATHER);
    console.log(WEATHER);
    this.setState({forecastArr: weatherResponse.data})
    console.log(this.state.forecastArr);

  } catch(error){
    // console.log(error.response);
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
              <Form.Control onChange={(e) => this.setState({ searchQuery: e.target.value })}
            placeholder='type city name here...' type='text' />
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
        {this.state.forecastArr.length>0 &&
        <Weather WEATHER={this.state.forecastArr} searchQuery={this.state.searchQuery}/>}
      </>
    );
  }
}

export default App;
