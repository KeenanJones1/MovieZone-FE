import React, {useState} from 'react'
import styled from 'styled-components'
import {useTransition, animated} from 'react-spring'

const Wrapper = styled.div`
 height: 100vh;
 width: 100vw;
 padding: 0;
 margin: 0;
 background-color: #C72C41;
 text-align: center;

 .item{
 width: 100px;
 height: 100px;
 margin: 0 auto;
 background-color: white;
 border-radius: 8px;
 box-shadow: rgba(0,0,0,0.2) 0px 8px;
 }
`

const Container = styled.div`
 font-size: 5rem;
 color: white;
 padding: 40px;
 margin-top: 200px;
 min-height: 200px;
`

const Btn = styled.button`
 padding: .9em;
 margin-top: 1rem;
 min-height: 2rem;
`




const Loading = () => {
 const [items, setItems] = useState([])
 const transition = useTransition(items, {
  from: {x: -100, y: 800, opacity: 0, height: 10, width: 10},
  enter: item => async (next) => {
   await next({y: item.y, opacity: 1, delay: item.delay});
   await next({x: 0, height: 100, width: 100});
  },
  leave: {x: 100, y: 800, opacity: 0}
 });

 return (
  <Wrapper>
   <Btn onClick={() => {setItems(v => v.length ? [] : [{y: -100, delay:200 }, {y: 0, delay: 400 }, {y: 100, delay:600 }])}}>{items.length ? 'mount' : 'un-mount'}</Btn>
   
   <Container>
    {transition((style, item) => item ? <animated.div style={style} className="item" /> : '')}
   </Container>
  </Wrapper>
 )
}

export default Loading