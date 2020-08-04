import React from 'react';
import { useState } from 'react';

function Play(){

  const [score, setScore] = useState(0);

  const [name, setName] = useState('');

  // const importScore = () => {
  //   var scoreGame = document.getElementById("score")
  //   var score = scoreGame.innerHTML
  //   var numberScore = parseFloat(score)
  //   setScore(numberScore)
  // }

  const mySubmitHandler = (event) => {
    event.preventDefault()
    console.log('my submit handler called')

    var scoreGame = document.getElementById("score")
    var score = scoreGame.innerHTML
    var numberScore = parseFloat(score)
    setScore(numberScore)

    let newScore = {
      name: name,
      score: score
    }

    fetch('http://localhost:3001/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newScore)
      })
      .then((response) => {
        console.log(response)
      })
  }

  const myChangeHandler = (event) => {
    setName(event.target.value)
  }

  return(
    <div className="play">
      <center>
        <canvas id="gameScreen" width="1500" height="800"></canvas>
        <div id="submitScore">
        <h2> Game over </h2>
        <h3>Your distance was: </h3>
        <h3 id="score">Score</h3>
        <p> Enter your name to save your score! </p>
        <form id="submitScoreForm" onSubmit={mySubmitHandler}>
          <input id="name" type="text" placeholder="Type your name here" onChange={myChangeHandler}></input>
          <input type="submit" id="submitButton" class="button" value="Submit"></input>
        </form>
        </div>
      </center>
    </div>
  )
}



export default Play
