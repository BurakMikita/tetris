export default class View {


  static colors = {
    "1": "cyan",
    "2": "blue",
    "3": "orange",
    "4": "yellow",
    "5": "green",
    "6": "purple",
    "7":   "red"
  }
  
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;


 

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.playfieldBorderWidth= 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2/3
    this.playfieldWidtHeight = this.height;

    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2
    this.playfieldInnerHeight = this.playfieldWidtHeight - this.playfieldBorderWidth * 2

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHeight / rows;

    this.panelX = this.playfieldWidth + 10
    this.panelY = 0
    this.panelWidth = this.width / 3
    this.panelHeight = this.height 

    this.element.appendChild(this.canvas);


  }

  renderMeinScreen(state) {
    this.clearScreen()
    this.renderPlayfiled(state.playfield)
    this.renderPanel(state)

  }
  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  renderStartScree(){
    this.context.fillStyle = "white"
    this.context.font = '18px "Press Start 2P"'
    this.context.textAlign = "center";
    this.context.textBaseline = "middle"
    this.context.fillText("Press Enter to Start", this.width /2, this.height / 2)

  }
  renderPauseScreen(){
    this.context.fillStyle = "rgba(0,0,0,0.75)";
    this.context.fillRect(0,0, this.width,this.height)
    this.context.fillStyle = "white"
    this.context.font = '18px "Press Start 2P"'
    this.context.textAlign = "center";
    this.context.textBaseline = "middle"
    this.context.fillText("Press Enter to Resume", this.width /2, this.height / 2)

  }
  renderEndScree({score}){
    this.clearScreen()
    this.context.fillStyle = "white"
    this.context.font = '18px "Press Start 2P"'
    this.context.textAlign = "center";
    this.context.textBaseline = "middle"
    this.context.fillText("Gsme over", this.width /2, this.height / 2 -48)
    this.context.fillText(`Score: ${score}`, this.width /2, this.height / 2 )
    this.context.fillText(`Press Enter to restart`, this.width /2, this.height / 2 + 48 )

  }
  renderPlayfiled(playfield) {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y]
      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
           4 + x * this.blockWidth,
           4+  y * this.blockHeight,
            this.blockWidth,
             this.blockHeight,
              View.colors[block])
        }

      }

    }
    this.context.strokeStyle = "white"
    this.context.lineWidth= this.playfieldBorderWidth
    this.context.strokeRect(0,0, this.playfieldWidth, this.playfieldWidtHeight)
  }
  renderPanel({level , score ,lines, nextPiece}){
       this.context.textAlign = "start";
       this.context.textBaseline = "top";
       this.context.fillStyle = "white";
       this.context.font = '14px "Press Start 2P"'

       this.context.fillText (`Level: ${level}`,this.panelX, this.panelY + 0)
       this.context.fillText (`score: ${score}`,this.panelX, this.panelY + 24)
       this.context.fillText (`lines: ${lines}`,this.panelX, this.panelY + 48)
       this.context.fillText (`next:`,this.panelX, this.panelY + 96)
      
     
       for (let y = 0; y < nextPiece.blocks.length; y++) {
        for (let x = 0; x < nextPiece.blocks[y].length; x++) {
             const block= nextPiece.blocks[y][x]
             if(block){
              this.renderBlock(
                this.panelX +  (x * this.blockWidth * 0.7), 
                this.panelY + 100 + (y * this.blockHeight * 0.7),
                this.blockWidth * 0.7,
                 this.blockHeight * 0.7,
                  View.colors[block])
             }
        }
       }
       
  }
  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}