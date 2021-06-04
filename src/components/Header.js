import React from 'react'
import styled from 'styled-components'
import Search from './Search'
import {colors} from '../utils/_var'
import moduleName from 'module'

const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 padding: 1rem;
 color: white;
 background-color: ${colors.$background};
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
