import React from 'react';
import Header from './components/header'
// import Footer from './components/footer'
import Play from './components/play'
import Home from './components/home'
import Controls from './components/controls'
import About from './components/about'
import ScoreboardDisplay from './components/scoreboard'
import SaveScore from './components/saveScore'

import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home}/>
      <Route path="/play" exact component={Play}/>
      <Route path="/controls" exact component={Controls}/>
      <Route path="/about" exact component={About}/>
      <Route path="/scoreboard" exact component={ScoreboardDisplay}/>
      <Route path="/addscore" exact component={SaveScore}/>
    </Router>
  );
}

export default App;
