import React from 'react';

class CityExplorerForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitLocation();
  }

  render() {
    return (

        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='enter city name here...' onChange={this.props.updateLocation(e)} />
          <input type='submit' />
        </form>

    )
  }
}

export default CityExplorerForm;
