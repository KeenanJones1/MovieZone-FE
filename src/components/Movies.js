import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Movie from './Movie'

const Wrapper = styled.div`
  padding: 2rem 0;
  line-height: 1.5;
  margin: 2rem;
  

  @media(min-width: 576px){
   .center{
    display: flex;
    justify-content: space-between; 
    flex-wrap: wrap;
    padding: 0 4rem;
    }

    .movie{
    flex: 0 0 calc(50% - 1rem);
    margin-bottom: 1rem;
    }
   }

   @media(min-width: 992px){
   .movie{
    flex: 0 0 calc(33.33% - 1rem);
    margin-bottom: 1rem;
   }
  }

  @media(min-width: 1170px){
   .movie{
    display: flex; 
    text-align: left;
   }
  }
`


const Catalog = ({movies, updateMovie}) => {
  const [newMovies, setNewMovies] = useState([])

  // checking if any movie from the api, has been liked or disliked by user 
  const checkUserMovies = (liked, disliked, movies) => {
    // queries are an unique string from the rapid api 
    let liked_queries = []
    let disliked_queries = []
    let newMovies = []

    for(let i = 0; liked.length > i; i++){
      liked_queries.push(liked[i].movie.query)
    }

    for(let i = 0; disliked.length > i; i++){
      disliked_queries.push(disliked[i].movie.query)
    }

    for(let i = 0; movies.length > i; i++){
      if(liked_queries.includes(movies[i].id)){
        let temp = {...movies[i]}
        temp['liked'] = true
        temp['disliked'] = false
        newMovies.push(temp)
      }
      else if(disliked_queries.includes(movies[i].id)){
        let temp = {...movies[i]}
        temp['disliked'] = true
        temp['liked'] = false
        newMovies.push(temp)
      }
      else{
        let temp = {...movies[i]}
        temp['liked'] = false
        temp['disliked'] = false
        newMovies.push(temp)
      }
    }
    setNewMovies(newMovies)
  }

  // getting movies liked and disliked by user from past
 const getUserMovies = () => {
  const uuid = localStorage.getItem('uuid')
  const options = {
   method: 'GET',
   url: `https://pacific-beach-65675.herokuapp.com/users/${uuid}/`,
   headers: {'Content-Type': 'application/json'},
  }
    axios.request(options).then((resp) =>{
      console.log(resp)
     checkUserMovies(resp.data.likes, resp.data.dislikes, movies)
    }).catch((err) => console.log(err))
 }





// render movie component, after checking if user has liked  or disliked in the past. 
 const renderMovies = () => {
   if(newMovies.length > 0){
     return newMovies.map( movie => 
      <Movie movie={movie} className="movie" key={movie.id} updateMovie={updateMovie}/>
     )
   }else{
    return movies.map( movie => 
      <Movie movie={movie} className="movie" key={movie.id} updateMovie={updateMovie}/>
     )
   }
 }


useEffect(() => {
  getUserMovies()
}, [movies])

 return (
  <Wrapper>
  <div className="center">
   {movies.length ? renderMovies() : null}
  </div>
  </Wrapper>
 )
}

export default Catalog
