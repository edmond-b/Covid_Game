import Score from '../src/score'
import SFX from '../src/sfx'

export default class Game {

  constructor(hero, game_width, game_height, input){
    this.game_width = game_width
    this.game_height = game_height
    this.hero = hero;
    this.paused = false;
    this.gameOver = false;
    this.input = input
    this.sfx = new SFX();
  }

  draw(ctx){
    if(Score.infectionRate >= 1 || this.hero.position.y === 730){
      this.gameOver = true
    }else if (this.input.paused === true){
      this.paused = true;
    } else {this.paused = false}
      this.gameStateText(ctx);
    }

  gameStateText(ctx){
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fill();
    ctx.font = "35px arcadeclassicregular";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if (this.gameOver){
      this.sfx.stayAtHome.play()
      ctx.fillText("Game Over", this.game_width / 2, this.game_height - 600);
    } else if (this.paused){
      ctx.fillText("Paused", this.game_width / 2, this.game_height - 600);
    } else if (this.paused === false){
      ctx.fillText("", this.game_width / 2, this.game_height - 600);
    }
  }
}
