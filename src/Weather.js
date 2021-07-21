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

// 1 - import modules
import React from 'react';
import axios from 'axios';

// 2 - component class
class Weather extends React.Component {

  constructor (props) {
    super (props);
    //3 - setup state w/in constructor
    this.state={
      searchQuery: '',
      errors: '',
      displayAlert: false
    }
  }

  //4 - shell method
  getWeather = async (e) => {
    try{
      e.preventDefault();
      const API = `https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHERBIT}&q=${this.state.searchQuery}&format=json`;
    
      const response = await axios.get(API)
      // console.log('Location IQ Data:', response)
      this.setState({location: response.data[0]})

    } catch(error) {

    }
  } 
}
