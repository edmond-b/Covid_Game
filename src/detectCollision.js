import Platform from '../src/platform'
import Passerby from '../src/passerby'

export default class DetectCollision{
  constructor(hero, platforms, background) {
    this.hero = hero
    this.platforms = platforms
    this.touching = false
    this.background = background
    this.middleCanvas = 750
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

  hitPasserby = (passerby, input) => {

    var passerbyFront = passerby.position.x + 64
    var passerbyBack = passerby.position.x
    var heroFront = this.hero.position.x + 64
    var heroBack = this.hero.position.x
    var noJumps = (this.hero.jumpingDirection.length === 0)
    var rightJump = (this.hero.jumpingDirection[this.hero.jumpingDirection.length -1] === 3)
    var leftJump = (this.hero.jumpingDirection[this.hero.jumpingDirection.length -1] === 2)

    if(heroFront >= passerbyBack && heroBack <= passerbyFront && this.hero.jumping === false){
      if(noJumps){
        this.hero.position.x = passerby.position.x - 110
      } else if (rightJump){
        this.hero.position.x = passerby.position.x - 110
      } else if (leftJump){
        this.hero.position.x = passerby.position.x + 110
      }
    }
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
      this.hero.infectionRateUp()
    }
  }

  _landsOn(platform){
    let placeOnPlatform = platform.position.y - this.hero.SCALED_HEIGHT
    let onPlatform = (this.hero.bottom > platform.top && this.hero.bottom < platform.top + 50)
    let betweenPlatformWidth = (this.hero.right > platform.left + 10 && this.hero.left < platform.right - 10)

    if(onPlatform && betweenPlatformWidth) {
       this.touching = true
       // this.hero.infectionRateUp()
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

    if(this.hero.bottom == platform.top && (notTouchesLeft || notTouchesRight)) {
       this.hero.jumping = true
       this.hero.jumpSpeed = 1
       this.touching = false
    }
  }

  _moveObjectsLeft(){
    this.hero.position.x = this.middleCanvas
    Platform.movingSpeed = -4
    Passerby.speed = 6
    this.background.movingSpeed = -3

  }

  _stopObjects(){
    Platform.movingSpeed = 0
    Passerby.speed = 2
    this.background.movingSpeed = 0
  }

  // _moving(platform){
  //   if(this.hero.position.y == (platform.position.y - this.hero.SCALED_HEIGHT)){
  //     this.hero.position.x += platform.movingSpeed
  //   }
  // }
}

//platform.height = 100
//platform.width = 500
//platform.position.x = 300
//platform.position.y = 600

//platform max x position = 400
//platform max y position = 1100


//hero.HEIGHT = 18;
//hero.WIDTH = 16;
//hero.position.x = 280
//hero.position.y = 610

//platform max x position = 298
//platform max y position = 616
