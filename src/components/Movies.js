import React, {useState} from 'react'
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


const Catalog = ({movies, seenMovies}) => {
  const [userMovies, setUserMovies] = useState({})

  // fix showing movies count

  const likeCount = () => {
    for(let i = 0; i < movies.length; i++){
      let query = movies[i].id
      for(let j = 0; j < seenMovies.length; j++){
        if(query === seenMovies[j]['query']){
          movies[i]['like_count'] = seenMovies[j]['up_count']
          movies[i]['down_count'] = seenMovies[j]['down_count']
          console.log(movies[i])
        }else{
          movies[i]['like_count'] = 0
          movies[i]['down_count'] = 0
        }
      }
    }
  }

  const checkUserMovies = (liked, disliked, movies) => {
    let liked_queries = []
    let disliked_queries = []

    setUserMovies({likes: liked, dislikes: disliked})

    

    for(let i = 0; liked.length > i; i++){
      liked_queries.push(liked[i].movie.query)
    }

    for(let i = 0; disliked.length > i; i++){
      disliked_queries.push(disliked[i].movie.query)
    }

    // for(let i = 0; movies.length > i; i++){
    //   if(liked_queries.includes(movies[i].id)){
    //     movies[i]['liked'] = true
    //     movies[i]['disliked'] = false
    //   }
    //   else if(disliked_queries.includes(movies[i].id)){
    //     movies[i]['disliked'] = true
    //     movies[i]['liked'] = false
    //   }
    //   else{
    //     movies[i]['liked'] = false
    //     movies[i]['disliked'] = false
    //   }
    // }
    
  }

 const getUserMovies = () => {
  // recieves user movies liked and disliked 
  const uuid = localStorage.getItem('uuid')
  const options = {
   method: 'GET',
   url: `http://localhost:3000/users/${uuid}/`,
   headers: {'Content-Type': 'application/json'},
  }
    axios.request(options).then((resp) =>{
     checkUserMovies(resp.data.likes, resp.data.dislikes, movies)
    }).catch((err) => console.log(err))
 }






 const renderMovies = () => {
  //  console.log(userMovies)
  likeCount()
  if(!userMovies['likes'] || !userMovies['dislikes']){
    getUserMovies()
  }



  return movies.map(movie => 
    <Movie movie={movie} className="movie" key={movie.id} />
   )
 }



 return (
  <Wrapper>
  <div className="center">
   {movies.length ? renderMovies() : null}
  </div>
  </Wrapper>
 )
}

export default Catalog
