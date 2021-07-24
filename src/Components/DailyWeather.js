import React from 'react';

class DailyWeather extends React.Component {
  render () {
    return (
      <div className='daily-forecast'>
        <h2>{this.props.weather.date}</h2>
        <p>{this.props.weather.lowtemp}</p>
        <p>{this.props.weather.hightemp}</p>
        <p>{this.props.weather.description}</p>
      </div>
    )
  }
}

export default DailyWeather;
