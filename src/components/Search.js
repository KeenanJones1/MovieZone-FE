import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import env from "react-dotenv";


 const Wrapper = styled.div`
  color: white;
 `

const Search = () => {
 const [title, setTitle] = useState('')

 const options = {
  method: 'GET',
  url: `${process.env.REACT_APP_API_BASE_URL}search/${title}`,
  headers: {
   'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
   'x-rapidapi-host': process.env.REACT_APP_API_HOST
  }
 }



 const handleForm = (e) => {
  e.preventDefault()
  axios.request(options).then(function (response) {
   console.log(response.data);
  }).catch(function (error) {
   console.error(error);
  });
 }


 return (
  <Wrapper>
   <form action="">
    <input type="text" onChange={(event) => setTitle(event.target.value)}/>
    <input type="submit" value="submit" onClick={(event) => handleForm(event)}/>
   </form>
  </Wrapper>
 )
}

export default Search
