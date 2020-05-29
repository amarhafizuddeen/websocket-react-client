import React from 'react'
import './App.css'
import Chat from './Components/Chat/Chat'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Router>
        <Route path="/:id" component={Chat} />
      </Router>
    </div>
  )
}

export default App
