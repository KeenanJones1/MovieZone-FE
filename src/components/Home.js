import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid';
import axios from 'axios'
import styled from 'styled-components'
import {colors} from '../utils/_var'
import Header from './Header'
import Movies from './Movies'

const Wrapper = styled.div`
 background-color: ${colors.$black};
 display: flex;
 flex-direction: column;
 min-height: 100vh;
 padding: 0;
 margin: 0;
`



const Home = () => {
 const [uuid, setUuid] = useState('')
 const [movies, setMovies] = useState([])
 const [seenMovies, setSeenMovies] = useState([])

 const checkLocalStorage = () => {
  let userCode = localStorage.getItem('uuid')
  if(userCode){
   setUuid(userCode)
  }else{
   userCode = v4()
   const options = {
    method: 'POST',
    url: 'http://localhost:3000/users',
    headers: {'Content-Type': 'application/json'},
    data: {uuid: userCode}
   }

   localStorage.setItem('uuid', userCode)

   // start loading animation here

   axios.request(options).then((response) => {
     console.log(response.data)
     // stop loading animation here
   }).catch((error) => console.log(error))
   setUuid(userCode)
  }
 }

 useEffect(() => {
  checkLocalStorage()
 })

 // add the like and dislike count to movies
 const likesCount = (data) => {
  setSeenMovies(data)
 }

const configMovies = (myBackendList, rapidApiList) => {
  likesCount(myBackendList)
  let configedMovies = []
  for(let i = 0; i < rapidApiList.length; i++){
    if(myBackendList.find(movie => movie['query'] === rapidApiList[i].id)){
      let backendMovie = myBackendList.find(movie => movie['query'] === rapidApiList[i].id)
      let tempObj = {...rapidApiList[i]}
      tempObj['up_count'] = backendMovie['up_count']
      tempObj['down_count'] = backendMovie['down_count']
      configedMovies.push(tempObj)
    }else{
      let tempObj = {...rapidApiList[i]}
      tempObj['up_count'] = 0
      tempObj['down_count'] = 0
      configedMovies.push(tempObj)
    }
  }

  setMovies(configedMovies)
}



 return (
  <Wrapper>
    <Header configMovies={configMovies}/>
    <Movies movies={movies} seenMovies={seenMovies}/>
  </Wrapper>
 )
}

export default Home
