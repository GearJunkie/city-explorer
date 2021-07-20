import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';

class App extends React.Component {
 constructor(props) {
   super(props);
   this.state={
     searchQuery: '',
     location: {},
     map: ''
   }
 }
 
 getLocation = async (e) => {
   e.preventDefault();
   const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER}&q=${this.state.searchQuery}&format=json`;

   const response = await axios.get(API);
   console.log('Location IQ Data:', response)
   this.setState({ location: response.data[0] })
   
   const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;

   const answer = await axios.get(MAP);
   console.log(this.state.map);
   this.setState({map: answer.config.url})
 }
 
  render () {
    return (
        <>
      <Form onSubmit={this.getLocation}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control onChange={(e) => this.setState({ searchQuery: e.target.value })}
          placeholder='type city name here...' type='text' />
          <Form.Text className="text-muted">
          Location: {this.state.location.display_name}<br />
          Location latitude: {this.state.location.lat}<br />
          Location longitude: {this.state.location.lon}<br />
          <img src={this.state.map} alt='map of selected city'/>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Explore!
        </Button>
      </Form>
      </>
    );
  }
}

export default App;
