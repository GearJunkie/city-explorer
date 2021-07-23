import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      moviesList: [],
      searchQuery: '',
      errors: ''
    }
  }

  getMovies = async () => {
    const apiURL = 'https://api.themoviedb.org';
    const data = await axios.get(`${apiURL}/movies`); //<-- is this the API endpoint? movie or movies?
    console.log(data);
    this.setState({moviesList: data.data})
  }



  render(){
    return(
      <div>
        {this.props.moviesList.length && this.state.moviesList.map((movieList, idx) => {
          return <Card key={idx} style={{ width: '18rem' }}>
          <Card.Text>{value.title}, {value.description}, {value.popularity}, {value.image_url}</Card.Text>
        </Card>
        })}
      </div>
      )
      }
  
}

export default Movies;
