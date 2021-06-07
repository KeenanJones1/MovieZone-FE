import React, {useState} from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'



 const Wrapper = styled.div`
  .movie-search{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    height: 3.5rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background: darkcyan;
    border-radius: 1rem 1.5rem;
    box-sizing: border-box;
    #search-icon{
      font-size: 1.5rem;
      color: ghostwhite;
    }
    #input-label {
      display: none;
    }
    #search-input{
      width: 100%;
      height: 100%;
      font-size: 1.8rem;
      color: ghostwhite;
      padding-left: 1rem;
      background: darkcyan;
      border: none;
      outline: none;
      &::placeholder {
        color: ghostwhite;
        opacity: 0.7;
      }
    }
    #clear{
      cursor: pointer;
    }
  }

  @media(max-width: 768px){
    .movie-search{
      width: 80vw;
    }
  }
 `

const Search = ({configMovies}) => {
 const [title, setTitle] = useState('')


//  fetch movies from backend 
const movieFetch = (data) => {
 const movieQueries = []
 const uuid = localStorage.getItem('uuid')
  data.titles.map( query => movieQueries.push(query.id))
  const options = {
   method: 'GET',
   url: `http://localhost:3000/movies/`,
   headers: {'Content-Type': 'application/json'},
   params: {queries: movieQueries, uuid: uuid}
  }

  axios.request(options).then((resp) => 
    // sending both movies list to Home component to be combined
    configMovies(resp.data.movies, data.titles)
  ).catch((error) => console.log(error))
}
 



// fetch movies from rapid-api
 const handleForm = (e) => {
  e.preventDefault()
  const options = {
   method: 'GET',
   url: `${process.env.REACT_APP_API_BASE_URL}search/${title}`,
   headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': process.env.REACT_APP_API_HOST
   }
  }

  axios.request(options).then(function (response) {
   movieFetch(response.data)
  }).catch(function (error) {
   console.error(error);
  });
 }





 return (
  <Wrapper>
   <form onSubmit={(event) => handleForm(event)}>
      <div className="movie-search">
        <FontAwesomeIcon icon={faSearch} id='search-icon' />
        <label for="movie-search" id="input-label">Movie Search</label>
        <input type="text" placeholder="Search Movies" name='movie-search' id='search-input' onChange={(event) => setTitle(event.target.value)} value={title}/>
        <FontAwesomeIcon icon={faTimes} id="clear" onClick={() => setTitle('')}/>
      </div>
   </form>
  </Wrapper>
 )
}

export default Search


Search.propTypes = {
  configMovies: propTypes.func.isRequired
}
