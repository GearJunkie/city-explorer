import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      searchQuery: '',
      errors: '',
      forecastArr: []
    }
    this.getWeather=this.getWeather.bind(this);
  }

  getWeather = async (e) => {
    try{
      e.preventDefault();
      const WEATHER = `https://code-fellows-city-explorer-api.herokuapp.com/weather?searchQuery=${this.state.searchQuery}`;
      const weatherResponse = await axios.get(WEATHER);
      console.log(WEATHER);
      this.setState({forecastArr: weatherResponse.data})
      console.log(this.state.forecastArr);
    } catch(error){
      this.setState({errors: error.weatherResponse.data.error})
    }
  }

//I need to create a nested WeatherDay component that will render a single day's forcast//

  render(){
    return(
      <div>
        {this.props.WEATHER.map((value, idx) =>
        <Card key={idx} style={{ width: '18rem' }}>
          <Card.Text>{value.datetime}, {value.temp}, {value.description}</Card.Text>
        </Card>
        )}
      </div>
    )
  }
}

export default Weather;
