let circleX;
let circleY;
let centerx = [];
let centery = [];
let orbitals = [];
let NT_NUMBER = 2;
let velocites = [3.1*2, 7*2,3,-3];
let orbits = [200,100,50,25];
let anglep = [0,0,0,0];
let numberInputValue;
let scope = 0.5;
let accer = 1;

class Orbital {
  constructor(i) {
    this.i = i;
    /*velocites[this.i];*/
    this.angle = 0;
    this.x;
    this.y;
    this.trail = [];
  }

  move() {
    this.x = centerx[this.i] + Math.cos(this.angle * (PI / 180)) * (orbits[this.i]*scope);
    this.y = centery[this.i] + Math.sin(this.angle * (PI / 180)) * (orbits[this.i]*scope);
    centerx[this.i + 1] = this.x;
    centery[this.i + 1] = this.y;

    // Přidá nový bod do stopy pouze pro nejvzdálenější planetu
   if (this.i === NT_NUMBER - 1) {
      this.trail.push(createVector(this.x, this.y));

      // Omezení délky stopy na "x" bodů
      if (this.trail.length > 7000) {
        this.trail.shift();
      }
   }
  }

  angles() {
    if(this.i%1){
      this.angle += velocites[this.i]*accer;
        if (this.angle == 360) {
          this.angle = 0;
        }
    }else{
      this.angle -= velocites[this.i]*accer;
        if (this.angle == -360) {
          this.angle = 0;
        }
    }
  }

  draw() {
    this.angles();
    this.move();
    push();
    fill(255, 255, 255);
    ellipse(this.x, this.y, 5*scope, 5*scope);
    stroke(255);
    line(this.x, this.y, centerx[this.i], centery[this.i]);
    pop();

    // Vykreslí stopu pouze pro nejvzdálenější planetu
    if (this.i === NT_NUMBER - 1) {
      drawTrail(this.trail);
    }
  }
}

function plusorb(na){
  orbitals[orbitals.length-1].trail = [];
  if(na==0){
    scope += 0.2;
  }
  else{scope -= 0.2;}


}

function plusvel(na){
  orbitals[orbitals.length-1].trail = [];
  if(na==0){
    accer += 0.2;
  }
  else{accer -= 0.2;}


}


function setup() {
  createCanvas(800,800);
  circleX = width / 2;
  circleY = height / 2;
  centerx[0] = circleX;
  centery[0] = circleY;

  for (let i = 0; i < NT_NUMBER; i++) {
    orbitals.push(new Orbital(i/** , velocites[i]*/));   /**<------ info managment :  */
  }
}


//info gathering for animations --->


function resetAnimation() {
  // Clear existing data
  NT_NUMBER = numberInputValue;
  orbitals = [];
  velocites = [];
  orbits = [];

  for (var i = 0; i < NT_NUMBER; i++) {
    var idKonkretnihoInputu = 'orbit' + i;
    orbits[i] = document.getElementById(idKonkretnihoInputu).value;
    var vel = 'velocity' + i;
    velocites[i] = document.getElementById(vel).value;
  }

  for (let i = 0; i < NT_NUMBER; i++) {
    orbitals.push(new Orbital(i/** , velocites[i]*/));   /**<------ info managment :  */
  }


}


function nwe() {
  numberInputValue = document.getElementById('numberInput').value;
  var velocityInputsContainer = document.getElementById('velocityInputsContainer');
  var orbitInputsContainer = document.getElementById('orbitInputsContainer');
  velocityInputsContainer.innerHTML = "";
  orbitInputsContainer.innerHTML = ""; 

  for (var i = 0; i < numberInputValue; i++) {
    
    var tableRow = document.createElement('tr');

    
    var velocityInput = document.createElement('input');
    velocityInput.type = 'number';
    velocityInput.className = 'velocityInput';
    velocityInput.id = 'velocity' + i;
    velocityInput.placeholder = 'Enter velocity';

   
    var orbitInput = document.createElement('input');
    orbitInput.type = 'number';
    orbitInput.className = 'orbitInput';
    orbitInput.id = 'orbit' + i;
    orbitInput.placeholder = 'Enter orbit';

    
    tableRow.appendChild(velocityInput);
    tableRow.appendChild(orbitInput);

    
    velocityInputsContainer.appendChild(tableRow);
  }
}


function draw() {
  background(0);
  fill(255, 255, 255);
  ellipse(circleX, circleY, 20*scope, 20*scope);

  orbitals.forEach(function (orbital, idx, arr) {
    orbital.draw();
  });

  push();
  textSize(20);
  fill(255);
  textAlign(LEFT, BOTTOM);


  for(let i=0;i<NT_NUMBER;i++){

    text("Orbital"+ i + " l=" + orbits[i] + " v=" + velocites[i] + ";", 30, height - 30-i*20);

  }
  pop();

  
  /**if(frameCount%50==0){

    if(velocites[1]==8){velocites[1]= -2;}
    else {velocites[1]=8;}
  }
*/
 /**if(frameCount%3==0) {
  velocites[1]+=1;
  if(velocites[1]>30){velocites[1]=1;}
 } 

*/

/**let a=0;
  
  if(orbits[a]==0){orbits[a]=1};
  orbits[a]-=0.1;
 
--- orbitala spiral*/

}

function drawTrail(trail) {
  stroke(255, 255, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(trail[i].x, trail[i].y);
  }
  endShape();
}
