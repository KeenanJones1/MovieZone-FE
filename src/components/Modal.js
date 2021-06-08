import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {colors} from '../utils/_var'

const Wrapper = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: rgba(0, 0, 0, 0.8);
 display: flex; 
 align-items: center; 
 justify-content: center;
 color: white;
 flex-direction: column;
 padding-left: 0;

 .title-cast{
  h1{
   font-size: 3rem;
  }
 }

 .cast{
   display: flex;
   flex-direction: row;
   max-width: 5vw;
   p{
    padding-right: 1rem;
   }
  }

 .close-btn{
  font-size: 6rem;
  color: ghostwhite;
  background: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
 }

 .close-btn:hover{
  color: ${colors.$highlight}
 }

 .plot{
   max-width: 60vw;
  }

  a{
  color: ghostwhite;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
 }

 a:hover{
  color: ${colors.$highlight};
 }
 
 @media(min-width: 992px){
  .movie-details{
   margin-right: 35rem;
  }
 }

 @media(min-width: 768px){
  padding-left: 5rem;
 .title-cast{
   h1{
    margin-bottom: 0;
    font-size: 6rem;
   }
 }

 .movie-details{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 2rem;
  margin-right: 30rem;
  h4{
   margin-right: 2rem;
  }
   p{
    padding-top: .4rem;
    padding-right: 2rem;
   }
  }
 }
`

const Modal = ({modalMovie, setOpenModal}) => {
 const {title, cast, rating, year, length, plot, rating_votes, poster, trailer} = modalMovie

 const renderCast = () => {
  let castmem = []
  for(let i = 2; i >= 0; i--){
   castmem.push(cast[i].actor)
  }
  let reverseCast = castmem.reverse()
  return reverseCast.map(actor => <p>{actor }</p>)
 }

 return (
  <Wrapper>
   <div className="overlay">
    <button onClick={() => setOpenModal(false)} className="close-btn">
     <FontAwesomeIcon icon={faTimes} />
    </button>

    <div className="title-cast">
     <div className="movie-title">
      <h1>{title}</h1>
      <div className="cast">
       <p>cast: </p>
       {renderCast()}
      </div>
     </div>
    </div>

    <div className="movie-details">
     <h4>released: {year}</h4>
     <p>runtime: {length}</p>
     <p> IMDB rating: <span> {rating}</span></p>
     <p>IMDB rating votes: <span>{rating_votes}</span></p>
    </div>


    <div className="plot">
     <p>{plot}</p>
    </div>
   </div>

     { trailer ? 
      <div className="trailer-link">
        <a href={trailer.link} target="_blank" rel="noopener noreferrer">Check out a trailer</a>
      </div> : null
    }
  </Wrapper>
 )
}

export default Modal


Modal.propTypes= { 
 modalMovie: propTypes.object, 
 setOpenModal: propTypes.func
}