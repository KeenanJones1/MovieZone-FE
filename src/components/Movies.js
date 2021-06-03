import React from 'react'
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

  const likeCount = () => {
    for(let i = 0; i < movies.length; i++){
      let query = movies[i].id
      for(let j = 0; j < seenMovies.length; j++){
        if(query === seenMovies[j]['query']){
          movies[i]['like_count'] = seenMovies[j]['up_count']
          movies[i]['down_count'] = seenMovies[j]['dislike_count']
        }else{
          movies[i]['like_count'] = 0
          movies[i]['down_count'] = 0
        }
      }
    }
  }

 const renderMovies = () => {
  //  check if movies were liked or disliked in the past.
  // after function completes send function to end loading animation
  likeCount()
  return movies.map(movie => 
    <Movie movie={movie} className="movie" key={movie.id} />
   )
 }

 console.log(movies, "Hello")
 return (
  <Wrapper>
  <div className="center">
   {movies.length ? renderMovies() : null}
  </div>
  </Wrapper>
 )
}

export default Catalog
