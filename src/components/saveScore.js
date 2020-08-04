import React from 'react';

class SaveScore extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      score: ''
    }
  };

  render(){
    return(
      <center>
        <h1> Save your score here! </h1>
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"/>
          <label for="score">Score:</label>
          <input type="text" id="score" name="score"/>
        </form>
      </center>
    )
  }

}

export default SaveScore;
