import React, {useState, useEffect} from 'react'
import { v4 } from 'uuid';
import axios from 'axios'
import styled from 'styled-components'
import {colors} from '../utils/_var'
import Header from './Header'
import Movies from './Movies'
import Modal from './Modal'

const Wrapper = styled.div`
 background-color: ${colors.$black};
 display: flex;
 flex-direction: column;
 min-height: 100vh;
 padding: 0;
 margin: 0;
 min-width: 100vw;
`



const Home = () => {
 const [movies, setMovies] = useState([])
 const [openModal, setOpenModal] = useState(false)
 const [modalMovie, setModalMovie] = useState({})
//  checking if user has a uuid in the localstorage, if not create an uuid and set to localStorage. 
 const checkLocalStorage = () => {
  let userCode = localStorage.getItem('uuid')
  if(userCode){
   return null
  }else{
   userCode = v4()
   const options = {
    method: 'POST',
    url: 'http://localhost:3000/users',
    headers: {'Content-Type': 'application/json'},
    data: {uuid: userCode}
   }



   // start loading animation here

   axios.request(options).then((response) => {
     localStorage.setItem('uuid', userCode)
     // stop loading animation here
   }).catch((error) => console.log(error))
  }
 }

 useEffect(() => {
  checkLocalStorage()
 })

 // add movies to the state
 const configMovies = (backendData, rapidData) => {
  if(backendData.length === 0){
    let newData = [...rapidData]
    newData.map(movie => {
      movie['up_count'] = 0
      movie['down_count'] = 0
      movie['liked'] = false
      movie['disliked'] = false
    })
    setMovies(newData)
  }else{
    let configedMovies = []
    for(let i in rapidData){
      let backendMovie = backendData.find(movie => movie['query'] === rapidData[i].id)
      if(backendMovie){
        let tempObj = {...rapidData[i]}
        tempObj['up_count'] = backendMovie['up_count']
        tempObj['down_count'] = backendMovie['down_count']
        configedMovies.push(tempObj)
      }else{
        let tempObj = {...rapidData[i]}
        tempObj['up_count'] = 0
        tempObj['down_count'] = 0
        configedMovies.push(tempObj)
      }
    }
    setMovies(configedMovies)
  }
 }

//  update movie up count or down count
 const updateMovie = (c) => {
  let movie = movies.find(movie => movie.id === c.query)
  movie['up_count'] = c.up_count
  movie['down_count'] = c.down_count
  let newMovies = [...movies]
  setMovies(newMovies)
 }


 const renderModal = (movie) => {
  setModalMovie(movie)
  setOpenModal(true)
 }

 return (
  <Wrapper>
    <Header configMovies={configMovies} />
    <Movies movies={movies} updateMovie={updateMovie} renderModal={renderModal}/>
    {openModal && modalMovie ? <Modal modalMovie={modalMovie} setOpenModal={setOpenModal}/> : null}
  </Wrapper>
 )
}

export default Home
