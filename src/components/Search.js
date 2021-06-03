import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'



 const Wrapper = styled.div`
  color: white;
 `

const Search = ({setMovies, likesCount}) => {
 const [title, setTitle] = useState('')
 const [seenMovies, setSeenMovies] = useState([])

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
   likesCount(resp.data.movies)
  ).catch((error) => console.log(error))
  setMovies(data.titles)
}
 



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
    <input type="text" onChange={(event) => setTitle(event.target.value)}/>
    <input type="submit" value="submit" />
   </form>
  </Wrapper>
 )
}

export default Search
