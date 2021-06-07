import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Search from './Search'
import {colors} from '../utils/_var'
import img from '../utils/images/MovieZone.png'


const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 padding: 0.5rem;
 color: white;
 margin-bottom: 0;
 background-color: ${colors.$background};
 flex-direction: row;

 h1{
  font-size: 3.5rem;
  width: 30vw;
  margin: 1rem;
  padding-left: 8rem;
 }


@media(max-width: 992px){
 flex-direction: column;
 .movie-zone{
  h1{
   padding-left: 4rem;
  }
 }
 .image-wrapper{
  display:none;
 }
}
`

const Header = ({configMovies}) => {

 
 return (
  <Wrapper>
   <div className="image-wrapper">
    <img src={img}/>
   </div>

   <div className="movie-zone">
    <h1>The Movie Zone</h1>
    <Search configMovies={configMovies}/>
   </div>

   <div className="image-wrapper">
    <img src={img}/>
   </div>
  </Wrapper>
 )
}

export default Header

Headers.propTypes={
 configMovies: propTypes.func.isRequired
}