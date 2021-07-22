import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
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
