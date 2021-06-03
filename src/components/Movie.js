import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {colors} from '../utils/_var'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
 color: white;
 width: 325px;
 margin: 1rem;
 position: relative;
 transition: all ease-in-out 0.3s;
 cursor: pointer;

 .movie-content{
  background-color: ${colors.$background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  flex-direction: column;
 }


 .img-container > img {
  width: 100%;
  transition: all ease-in 0.2s;
}

 img{
  height: 430px;
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
  padding: 5px 10px;
  background-color: ${colors.$secondary};
  color: #f5cc5b;
  border-radius: 5px;

  .icons{
   margin-right: 1.5em;
   padding-left: 1em;
  }

  .icons:hover{
   color: ${colors.$primary};
  }
 }

`

const Movie = ({movie}) => {

 const handleThumbs = (id, name) => {
  const uuid = localStorage.getItem('uuid')
  const options = {
   method: 'POST',
   url: `http://localhost:3000/movies/`,
   headers: {'Content-Type': 'application/json'},
   data: {uuid: uuid, query: movie.id, thumbs: name, title: movie.title}
  }
  axios.request(options).then((resp) =>{
   console.log(resp.data)
  }).catch((err) => console.log(err))
 }

 console.log(movie)
 return (
  <Wrapper>
   <div className="img-container">
    <img src={movie.image} alt={movie.title} />
   </div>

   <div className="movie-content">
    <div className="movie-name">
     <h3>{movie.title}</h3>
    </div>
    <div className="movie-thumbs">
     {/* highlight icon if user has liked or disliked in the past */}
      <p>{movie.like_count}</p>
      <FontAwesomeIcon icon={faThumbsUp} className="icons" onClick={() => handleThumbs(movie.id, 'up')}/>

  <p>{movie.down_count || movie.dislike_count}</p>
     <FontAwesomeIcon icon={faThumbsDown} className="icons" onClick={() => handleThumbs(movie.id, 'down')}/>
    </div>
   </div>
  </Wrapper>
 )
}

export default Movie
