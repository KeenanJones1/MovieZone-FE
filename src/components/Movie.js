import React, {useEffect, useState} from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import {colors} from '../utils/_var'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
 color: white;
 width: 325px;
 margin: 1em 2rem 0 0;
 position: relative;
 transition: all ease-in-out 0.3s;
 cursor: pointer;
 padding-left: 40px;

 .movie-content{
  background-color: ${colors.$background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  flex-direction: column;
  .movie-overview{
    margin-bottom: 1em;
    padding-left: 1rem;
    overflow-y: scroll;
    max-height: 8rem;
    min-height: 8rem;
  }
 }


 .img-container > img {
  width: 100%;
  transition: all ease-in 0.2s;
}

 img{
  height: 420px;
  background-color: beige;
  overflow-y: hidden;
  position: relative;
  background-color: ${colors.$black};
  padding: 0;
 }

 .movie-name{
  font-weight: bold;
  font-size: 1rem;
  h3{
   margin-top: 0;
  }
 }

 .movie-thumbs{
  font-weight: bold;
  padding: 4px 10px;
  background-color: ${colors.$secondary};
  color: #f5cc5b;
  border-radius: 5px;
  display:flex;
  flex-direction: row;
  
  p{
    padding: 0 1em;
    margin: 0;
  }

  .icons{
    margin: 0;
    padding: 0 1em;
  }

  .icon-liked{
   color: ${colors.$highlight};
   padding: 0 1em;
  }

  .icon-disliked{
   color: ${colors.$highlight};
   padding: 0 1em;
  }


  .icons:hover{
   color: ${colors.$primary};
  }
 }

`

const Movie = ({movie, updateMovie}) => {
  const [movieDetails, setMovieDetails] = useState({})

 const handleThumbs = (id, name) => {
  const uuid = localStorage.getItem('uuid')
  const options = {
   method: 'POST',
   url: `http://localhost:3000/movies/`,
   headers: {'Content-Type': 'application/json'},
   data: {uuid: uuid, query: movie.id, thumbs: name, title: movie.title}
  }
  axios.request(options).then((resp) =>{
    updateMovie(resp.data.movie)
  }).catch((err) => console.log(err))
 }

 useEffect(() => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_BASE_URL}film/${movie.id}`,
    headers: {
     'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
     'x-rapidapi-host': process.env.REACT_APP_API_HOST
    }}
  axios.request(options).then((resp) => {
    setMovieDetails(resp.data)
  })
 }, [])
 

 return (
  <Wrapper>
    <div className="movie-poster">
      <div className="img-container">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-content">
        <div className="movie-name">
        <h3>{movie.title}</h3>
        </div>
        <div className="movie-overview">
          {movieDetails.plot ? movieDetails.plot : 'Sorry no plot available at this time '}
        </div>
        <div className="movie-thumbs">
        {/* highlight icon if user has liked or disliked in the past */}
          <div className="up">
            <p>{movie.up_count}</p>
            <FontAwesomeIcon icon={faThumbsUp} className={movie.liked ? 'icon-liked' : 'icons'} onClick={movie.liked ? null :() => handleThumbs(movie.id, 'up')}/>
          </div>

          <div className="down">
            <p>{movie.down_count}</p>
            <FontAwesomeIcon icon={faThumbsDown} className={movie.disliked ? 'icon-disliked' : 'icons'} onClick={ movie.disliked ? null : () => handleThumbs(movie.id, 'down')}/>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
 )
}

export default Movie

Movie.propTypes = {
  movie: propTypes.object
}