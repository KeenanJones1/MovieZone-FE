import React, {useState, useEffect} from 'react'
import propTypes from 'prop-types';
import styled from 'styled-components'
import logo from '../utils/images/MovieZone.png'
import {useTransition, animated} from 'react-spring'

const Wrapper = styled.div`
 width: 100vw;
 padding: 0;
 margin: 0;
 background-color: #C72C41;
 text-align: center;
`


const Container = styled.div`
 color: white;
 min-height: 200px;
 height: 100vh;
 width: 80vw;
 display: block;
 margin-left: auto;
 margin-right: auto;

 .item{
  font-size: 4rem;
  color: white;
  padding: 0;
  margin: 0;
 }
 img{
   height: 5rem;
  }
 

 @media(min-width: 756px){
  img{
   height: 10rem;
  }
 }
`





const Welcome = ({setWelcome}) => {
 const [items, setItems] = useState([])

 useEffect(() => {
  const timeout = setTimeout(() => setItems(v => v.length ? [] : [{y: 200, delay:100, text: 'Welcome'}, {y: 200, delay: 300, text: 'To' }, {y: 200, delay:500, text: 'The Movie Zone'}]), 3000)

  setTimeout(() => setWelcome(), 8000)

  return () => clearTimeout(timeout);
 })

 const transition = useTransition(items, {
  from: {x: -100, y: 800, opacity: 0, fontSize: '1rem'},
  enter: item => async (next) => {
   await next({y: item.y, opacity: 1, delay: item.delay});
   await next({x: 0, height: 100, width: 100, fontSize: '3rem'})
   await next({x: 0, height: 100, width: 100,opacity: 0.5})
   await next({x: 0, height: 100, width: 100,opacity: 0})
  },
  leave: {x: 100, y: 800, opacity: 0}
 });



 return (
  <Wrapper>
   <Container>
    {
     transition((style, item) => item ? <animated.h1 style={style}className="item">{item.text}</animated.h1> : '')}

     {transition((style, item) => item ? <animated.img src={logo} style={style}></animated.img> : null)}
   </Container>
  </Wrapper>
 )
}

Welcome.propTypes = {
  setWelcome: propTypes.func.isRequired
}

export default Welcome


