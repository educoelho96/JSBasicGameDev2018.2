// Singleton-like artifacts:
// Initializing canvas:
function CanvasObjConstructor() {
    let self = this;
    this.canvasHTML = document.getElementById("gameCanvas");
    self.getCanvasWidth = function() {
        return self.canvasHTML.width
    };
    self.getCanvasHeight = function() {
        return self.canvasHTML.height
    };
    self.getCanvasContext = function() {
        return self.canvasHTML.getContext("2d")
    };
}
let canvasObj = new CanvasObjConstructor();

// Initializing player character:
function PlayerCharacterConstructor() {
    let self = this;
    self.xPosition = canvasObj.getCanvasWidth()/2;
    self.yPosition = canvasObj.getCanvasHeight()/2;
    self.modelWidth = 30;
    self.modelHeight = 30;
    self.modelColor = "#AABBDD";
    self.draw = function() {
        let ctx = canvasObj.getCanvasContext();
        ctx.fillStyle = this.modelColor;
        ctx.fillRect(self.xPosition, self.yPosition, self.modelWidth, self.modelHeight);
    };
    self.upwardMovement = false;
    self.leftwardMovement = false;
    self.rightwardMovement = false;
    self.downwardMovement = false;
    self.updatePosition = function() {
        if (self.upwardMovement) {
            let newYPosition = self.yPosition - self.moveSpeed;
            if (newYPosition > self.gameArea[2] && newYPosition < self.gameArea[3]) {
                self.yPosition = newYPosition;
            }
        }
        if (self.leftwardMovement) {
            let newXPosition = self.xPosition - self.moveSpeed;
            if (newXPosition > self.gameArea[0] && newXPosition < self.gameArea[1]) {
                self.xPosition = newXPosition;
            }
        }
        if (self.rightwardMovement) {
            let newXPosition = self.xPosition + self.moveSpeed;
            if (newXPosition > self.gameArea[0] && newXPosition < self.gameArea[1]) {
                self.xPosition = newXPosition;
            }
        }
        if (self.downwardMovement) {
            let newYPosition = self.yPosition + self.moveSpeed;
            if (newYPosition > self.gameArea[2] && newYPosition < self.gameArea[3]) {
                self.yPosition = newYPosition;
            }
        }
    };
    self.moveSpeed = 3;
    self.gameArea = [0, (canvasObj.getCanvasWidth() - self.modelWidth), 0, (canvasObj.getCanvasHeight() - self.modelHeight)] // Notation: [minX, maxX, minY, maxY].
    // TODO: define player velocity (movespeed);
}
let playerCharacter = new PlayerCharacterConstructor();

// Initializing game loop:
function GameLoopConstructor() {
    let self = this;
    self.clearFunction = function() {
        canvasObj.getCanvasContext().clearRect(0, 0, canvasObj.getCanvasWidth(), canvasObj.getCanvasHeight());
    };
    self.getLoopRate = function() {
        return 1000/60;
    };
    self.loopFunction = function() {
        self.clearFunction();
        playerCharacter.updatePosition();
        playerCharacter.draw();
    };
    self.runLoop = function() {
        setInterval(self.loopFunction, self.getLoopRate());
    }
}
let gameLoop = new GameLoopConstructor();
gameLoop.runLoop();

window.addEventListener('keydown', function(event) {
   switch (event.key) {
       case "w": {
           playerCharacter.upwardMovement = true;
           break;
       }

       case "a": {
           playerCharacter.leftwardMovement = true;
           break;
       }

       case "d": {
           playerCharacter.rightwardMovement = true;
           break;
       }

       case "s": {
           playerCharacter.downwardMovement = true;
           break;
       }
   }
});

window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case "w": {
            playerCharacter.upwardMovement = false;
            break;
        }

        case "a": {
            playerCharacter.leftwardMovement = false;
            break;
        }

        case "d": {
            playerCharacter.rightwardMovement = false;
            break;
        }

        case "s": {
            playerCharacter.downwardMovement = false;
            break;
        }
    }
});