import React, { Component } from 'react'
import Home from './components/Home'
import Welcome from './components/Welcome'

class App extends Component {
  constructor(){
    super()
    this.state = {
      welcome: false,
    }
  }

  setWelcome = () => {
    this.setState({welcome: true})
  }



  render() {
    return (
      <div>
        { this.state.welcome ?  <Home /> : <Welcome setWelcome={this.setWelcome}/>}
      </div>
    )
  }
}

export default App
