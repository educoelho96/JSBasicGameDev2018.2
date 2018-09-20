const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// Armazenei as dimensões da caixinha.
let player = {
    altura: 70,
    largura: 70,
    cor: "#FF0000",
    posicaoX: 395,
    posicaoY: 295,
    desenhar: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.posicaoX,this.posicaoY,
                     this.largura,this.altura);
    }
}

function enemy() {
    let self = this;
    self.altura = 30;
    self.largura = 40;
    self.cor = "#AAA";
    self.posicaoX = 230;
    self.posicaoY = 160;
    self.desenhar = function(){
        ctx.fillStyle = self.cor;
        ctx.fillRect(self.posicaoX,self.posicaoY,
                     self.largura,self.altura);
    }
}

let enemy2 = new enemy();
enemy2.posicaoX = 160;
enemy2.posicaoY = 160;


function gameLoop() {
    ctx.clearRect(0, 0, 800, 600);
    player.desenhar();
    enemy2.desenhar();
    console.log("Game Loop :D");
}

setInterval(gameLoop, 16.66);
