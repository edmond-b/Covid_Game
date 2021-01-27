import Platform from '../src/platform'
import Passerby from '../src/passerby'
import Score from '../src/score'
import SFX from '../src/sfx'

export default class DetectCollision{

  constructor(hero, platforms, background, passersby, ctx) {
    this.hero = hero
    this.platforms = platforms
    this.touching = false
    this.passersby = passersby;
    this.infectionRate = hero.score;
    this.background = background
    this.middleCanvas = 750
    this.speed = 2
    this.levelNumber = 15
    this.rangeNumber = 15.01
    this.score = new Score()
    this.ctx = ctx;
    this.infected = false;
    this.frames = 0;
  }



  hitBottom = () => {
    var rockBottom = 730
    if (this.hero.position.y > rockBottom){
      this.hero.jumping = false
      this.hero.position.y = rockBottom
    }
  }


  hitEdge = () => {
    if (this.hero.position.x < 0){ this.hero.position.x = 0 }
    (this.hero.position.x > this.middleCanvas) ? this._moveObjectsLeft() : this._stopObjects()
  }

  hitPasserby = () => {

      for (var i = 0; i < this.passersby.length; i++) {
        let passerby  = this.passersby[i]
        var passerbyFront = passerby.position.x + 64
        var passerbyBack = passerby.position.x
        var heroFront = this.hero.position.x + 64
        var heroBack = this.hero.position.x
        if(heroFront >= passerbyBack && heroBack <= passerbyFront && this.hero.jumping === false){
          if(this.hero.position.y === passerby.position.y){
            Score.infectionRateUp()
            this.infected = true;
          }
        }

        let greyColor = [95, 95, 95, 255]
        let passerbyBottom = passerby.position.y + passerby.SCALED_HEIGHT
        let passerByPosition = this.ctx.getImageData(passerby.position.x, passerbyBottom + 5, 1, 1).data
        if(passerby.position.x < 1500){
          if(passerByPosition.toString() !== greyColor.toString()) {passerby.fallSpeed = 7  }
        }
      }
<<<<<<< HEAD
=======

      this._heroHit();
>>>>>>> master
    }


  hitPlatform = () => {
    this.sideTouched = false;

    for (var i = 0; i < this.platforms.length; i++) {
      let platform  = this.platforms[i]

      this._landsOn(platform)
      this._touchesEdge(platform)
      this._touchesUnder(platform)
      this._walksOff(platform)
      // this._moving(platform)
    }

    this.sideTouched ? (this.hero.SPEED = 0) : (this.hero.SPEED = 4)
  }

  _touchesEdge(platform){
    let touchesLeft = (this.hero.right + 8 > platform.left && this.hero.right + 6 < platform.left + 10)
    let touchesRight = (this.hero.left - 6 < platform.right && this.hero.left - 6 > platform.right - 10)
    let betweenPlatformHeight = (this.hero.bottom > platform.top && this.hero.bottom < platform.bottom)

    if((touchesLeft || touchesRight) && betweenPlatformHeight){
      this.sideTouched = true
    }
  }

  _landsOn(platform){
    let placeOnPlatform = platform.position.y - this.hero.SCALED_HEIGHT
    let onPlatform = (this.hero.bottom > platform.top && this.hero.bottom < platform.top + 50)
    let betweenPlatformWidth = (this.hero.right > platform.left + 10 && this.hero.left < platform.right - 10)

    if(onPlatform && betweenPlatformWidth) {
       this.touching = true
       this.hero.position.y = placeOnPlatform
       this.hero.jumping = false
    }
  }

  _touchesUnder(platform){
    let betweenPlatformWidth = (this.hero.right > platform.left - 15 && this.hero.left < platform.right + 15)
    let underPlatform = (this.hero.top + (this.hero.jumpSpeed / 4) < platform.bottom && this.hero.top > platform.bottom - 10)

    if(underPlatform && betweenPlatformWidth && this.hero.jumpSpeed < 3){
       this.hero.jumping = true
       this.hero.jumpSpeed = 3
    }
  }

  _walksOff(platform){
    let notTouchesLeft  = (this.hero.right < platform.left && this.hero.right > platform.left -10)
    let notTouchesRight = (this.hero.left > platform.right && this.hero.left < platform.right +10)

    if(this.hero.bottom === platform.top && (notTouchesLeft || notTouchesRight)) {
       this.hero.jumping = true
       this.hero.jumpSpeed = 1
       this.touching = false
    }
  }

  _moveObjectsLeft(){
    this.hero.position.x = this.middleCanvas
    Platform.movingSpeed = 7
    Passerby.speed = this.speed + Platform.movingSpeed
    this.background.movingSpeed = -6
    Score.scoreUp()
  }

  _stopObjects(){
    Platform.movingSpeed = 0
    Passerby.speed = this.speed
    this.background.movingSpeed = 0
  }

  levelUp = () => {
    var number = Score.distance.toFixed(0)

    if(number < 10){
      this.speed = 2
    } else if (number >= 10 && number < 20) {
      this.speed = 5
    }else if (number >= 20 && number < 30) {
      this.speed = 8
    }else if (number >= 30 && number < 40) {
      this.speed = 11
    }else if (number >= 40 && number < 50) {
      this.speed = 13
    }
  }

  _heroHit(){
    if(this.frames != 30) {
      this.frames += 1
      this.infected = false
    } else {
      this.ok = true
    }
    if(this.infected && this.ok){
      new SFX().hit.play()
      this.infected = false;
      this.ok = false;
      this.frames = 0;
    }
  }
}
