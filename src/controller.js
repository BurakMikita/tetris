export default class Controller {
    constructor(game, view){
   
        this.game = game
        this.view = view
        this.intervalId = null
        this.isPlaying = false

     
        document.addEventListener("keydown",  this.handleKeyDown.bind(this))
        document.addEventListener("keyup",  this.handleKeyUp.bind(this))
        this.view.renderStartScree()
    }

    update(){
        this.game.movePieseDown()
        this.updateView()
    }
    play( ) {
        this.isPlaying = true
        this.startTimer()
        this.updateView()
    }
    pause(){
        this.stopTimer()
        this.isPlaying = false
       
        this.updateView()
    }
    updateView(){
        const state = this.game.getState()
        if(state.isGameOver) {
            this.view.renderEndScree(state)
        }  else if(!this.isPlaying){
        this.view.renderPauseScreen()
       }else {
         this.view.renderMeinScreen(state)
       }
   
  }
  reset(){
    this.game.reset()
    this.play()
  }
    startTimer(){
           const speed = 1000 - this.game.getState().level * 100

        if(!this.intervalId){
            this.intervalId =  setInterval(()=> {
                this.update()
              },speed > 0 ? speed: 100 )
        }
      
    }
    stopTimer(){
        if(this.intervalId){
            console.log(this.intervalId)
            clearInterval(this.intervalId)
            this.intervalId = null
        }
     
    }
     handleKeyDown(event){
        const state = this.game.getState()
        switch(event.keyCode){
            case 13: 
            if(state.isGameOver){
                this.reset();
            }else  if(this.isPlaying){
                     this.pause()
                 }else {
                     this.play()
                 }
              break
            case 37: 
            this.game.movePieseLeft()
            this.updateView()
            break;
            case 38: 
            this.game.rotatePiece()
            this.view.updateView()
            break;
            case 39: 
            this.game.movePieseRight()
            this.updateView()
            break;
            case 40: 
            this.stopTimer()
            this.game.movePieseDown()
            this.updateView()
            break;
        }
     }
     handleKeyUp(event){
        switch(event.keyCode){
          
            case 40: 
            this.startTimer()
            break;
        }
     }

}
