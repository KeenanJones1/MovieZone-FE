import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid';
import styled from 'styled-components'
import {colors} from '../utils/_var'
import Header from './Header'
import Catalog from './Catalog'

const Wrapper = styled.div`
 background-color: ${colors.$black};
 height: 100vh;
 width: 100vw;
 padding: 0;
 margin: 0;
`



const Home = () => {
 const [uuid, setUuid] = useState('')
 const [movies, setMovies] = useState([])

 const checkLocalStorage = () => {
  let userCode = localStorage.getItem('uuid')
  if(userCode){
   setUuid(userCode)
  }else{
   userCode = v4()
   localStorage.setItem('uuid', userCode)
   setUuid(userCode)
  }
 }

 useEffect(() => {
  checkLocalStorage()
 })



 return (
  <Wrapper>
   {/* header*/}
    <Header setMovies={setMovies}/>
   {/* search */}
    <Catalog movies={movies}/>
   {/* movie cards using grid and media queries */}
  </Wrapper>
 )
}

export default Home
