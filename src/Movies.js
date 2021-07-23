import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      errors: '',
      moviesArr: []
    }
    this.getMovies=this.getMovies.bind(this);
  }

  getMovies = async (e) => {
    try{
      e.preventDefault();
      const MOVIES = `https://code-fellows-city-explorer-api.herokuapp.com/movies?searchQuery=${this.state.searchQuery}`;
      const movieResponse = await axios.get(MOVIES);
      console.log(MOVIES);
      this.setState({moviesArr: movieResponse.data})
      console.log(this.state.moviesArr);
    } catch(error){
      this.setState({errors: error.MovieResponse.data.error})
    }
  }



  render(){
    return(
      <div>
        {this.props.MOVIES.map((value, idx) => 
          <Card key={idx} style={{ width: '18rem' }}>
          <Card.Text>{value.title}, {value.description}, {value.popularity}, {value.image_url}</Card.Text>
        </Card>
        )}
      </div>
    )
  }
}

export default Movies;
