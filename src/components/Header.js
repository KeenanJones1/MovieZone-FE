import React from 'react'
import styled from 'styled-components'
import Search from './Search'
import {colors} from '../utils/_var'


const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 padding: 1rem;
 color: white;
 background-color: ${colors.$background};

 h1{
  font-size: 3.5rem;
  width: 30vw;
  margin: 1rem;
 }
`

const Header = ({configMovies}) => {

 
 return (
  <Wrapper>
   <h1>The Movie Zone</h1>
   <Search configMovies={configMovies}/>
  </Wrapper>
 )
}

export default Header
