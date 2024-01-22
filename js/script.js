
//inicializace a vytvoření promněných , potřebných pro průběh programu

let circleX;
let circleY;

//pole pro souřadnice středů
let centerx = [];
let centery = [];

for (let i = 0; i < 10; i++) {
  centerx.push([]);
  centery.push([]);
}
//---->

let orbitals = [];  //pole objektů vytvořených kontruktorem

let NT_NUMBER = 2;  //počet vrstev orbitalů (Start Count)

let velocites = [3.1*3, 7*3,3,4];   //rychlosti
let orbits = [100,50,20,20];        //vzdálenosti
let nummers = [1,1,2,1];            //počet orbitalů na každý z vrstvy předchozí


//přednastavené modifikatory pro zvětšování , zrychlování a StrokeWeight
let numberInputValue;
let scope = 0.85;   
let accer = 0.25;
let setW = 1.0;


//vypis aktualní změny hodnot (v %)

let desDisplay = document.createElement("span");
let desDisplayContainer = document.getElementById('desDisplay'); 
desDisplayContainer.appendChild(desDisplay);
desDisplay.textContent = `(${accer * 100}%)`;

let angDisplay = document.createElement("span");
let angDisplayContainer = document.getElementById('angDisplay'); 
angDisplayContainer.appendChild(angDisplay);
angDisplay.textContent = `(${scope* 100}%)`;

let WeiDisplay = document.createElement("span");
let WeiDisplayContainer = document.getElementById('WeiDisplay'); 
WeiDisplayContainer.appendChild(WeiDisplay);
WeiDisplay.textContent = `(${setW* 100}%)`;

//--------------------->

//objects , constructors ------------>


class Orbital {       //třída Orbital << zakladní objekt v programu 
  constructor(i,ang,v) {    //kontruktor k objektu 
    this.i = i;
    this.we = v;
    this.angle = ang;
    this.x;
    this.y;
    this.trail = [];
    this.desi=0;
    console.log(this.we, this.i,);  // pro potřebu kontroly...
    
  }

  move() { // tato metoda aktualizuje x,y souřadnice a vykonává činosti s tím spojené...
    this.x = centerx[this.i][this.we] + Math.cos(this.angle * (PI / 180)) * (orbits[this.i]*scope);
    this.y = centery[this.i][this.we] + Math.sin(this.angle * (PI / 180)) * (orbits[this.i]*scope);

        for(let z=0;z<nummers[this.i+1];z++){     //aktualizace x,y souřadnic středu pro nadledující vrstvu orbitalů

          centerx[this.i + 1][z+this.we*nummers[this.i+1]] = this.x;
          centery[this.i + 1][z+this.we*nummers[this.i+1]] = this.y;
          
        push();
      }
      
      if (this.i === NT_NUMBER - 1) {     //přidání pozice posledního orbitalu do pole trail[] (pouze unikatní pozice)+ omezení velikosti zaznamenanétrasy...
       
        this.trail.push(createVector(this.x, this.y));
       
        if (this.trail.length > 10000) {  //omezení velikosti
          this.trail.shift();
        }
      }
    
  }

  angles() {    //metoda aktualizace uhlů dle uhlové rychlosti 
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

  draw() {    // Draw --> vyvolání metod() + vykreslení objektu (kruh + line); 
    this.angles();
    this.move();
    push();
    fill(255, 255, 255);
    ellipse(this.x, this.y, 5*scope, 5*scope);
    stroke(255);
    strokeWeight(1.0);
    line(this.x, this.y, centerx[this.i][this.we], centery[this.i][this.we]);
    pop();


      drawTrail(this.trail)   //vyvolání funkce pro vykreslení trasy 
    
  }
}


// end objects, constructors --------------->
//info gathering for animations --->


function resetAnimation() {   //funkce pro znovu ačtení hodnot a nahraní hodnot z formuláře
  NT_NUMBER = numberInputValue;
  orbitals = [];
  velocites = [];
  orbits = [];
  
  scope = 0.5;
  accer = 1.0;
  setW=1.0;

  for (var i = 0; i < NT_NUMBER; i++) {   //input z formuláře
    var orbi = 'orbit' + i;
    orbits[i] = document.getElementById(orbi).value;
    var vel = 'velocity' + i;
    velocites[i] = document.getElementById(vel).value;

    var num = 'nummers' + i;
    nummers[i] = document.getElementById(num).value;
  }

centerx = [];     //reinicializace --->
centery = [];

for (let i = 0; i < 10; i++) {
  centerx.push([]);
  centery.push([]);
}

  for(let i =0;i<nummers[0];i++){
    centerx[0][i] = circleX;
    centery[0][i] = circleY;
  }

  //------->  
  setOrbitals();    //vytvoření objektů dle nových hodnot...

}

function nwe() {        // vytváření input podoken v závislosti na zadané hodnotě ORBITAL_NUMBER
  numberInputValue = document.getElementById('numberInput').value;
  var velocityInputsContainer = document.getElementById('velocityInputsContainer');
  var orbitInputsContainer = document.getElementById('orbitInputsContainer');
  var nummersInputsContainer = document.getElementById('nummersInputsContainer');
  nummersInputsContainer.innerHTML = "";
  velocityInputsContainer.innerHTML = "";
  orbitInputsContainer.innerHTML = ""; 

  for (var i = 0; i < numberInputValue; i++) {  //vytvoření tolika   řádků o třech sloupcích 

    var tableRow = document.createElement('tr');

    var orbitLabel = document.createElement('span');
    orbitLabel.textContent = `${i + 1}. Orbit.L:`;

    var nummersInput = document.createElement('input');
    nummersInput.type = 'number';
    nummersInput.className = 'nummersInput';
    nummersInput.id = 'nummers' + i;
    nummersInput.placeholder = 'Enter count of orbitals';

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

    tableRow.appendChild(orbitLabel);
    tableRow.appendChild(velocityInput);
    tableRow.appendChild(orbitInput);
    tableRow.appendChild(nummersInput);

    
    velocityInputsContainer.appendChild(tableRow);
  }
}

//end info gathering for animation --->
//functions---


function plusorb(na){
  clearTrails();
  orbitals[orbitals.length-1].trail = [];
  if(na==0){
    scope += 0.2;
  }
  else if(scope>0.2){scope -= 0.2;}
  angDisplay.textContent = `(${Math.round(scope * 100 / 10) * 10}%)`;


}

function plusvel(na){
  if(na==0){
    accer += 0.2;
  }
  else if(accer>0.2){accer -= 0.2;}
desDisplay.textContent = `(${Math.round(accer * 100 / 10) * 10}%)`;
}

function chanWei(na){
  if(na==0){
    setW += 0.1;
  }
  else if(setW>0.1){setW -= 0.1;}
WeiDisplay.textContent = `(${Math.round(setW * 100 / 10) * 10}%)`;
}

//trail drawing , clearing ----->

function clearTrails() {
  for (let i = 0; i < orbitals.length; i++) {
    orbitals[i].trail = [];
  }
}

function drawTrail(trail) {
  stroke(255, 255, 0);
  strokeWeight(setW);
  noFill();

  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(trail[i].x, trail[i].y);
  }
  endShape();
}

//trail end ------>

function mriz(){
    let mez=20;
    stroke(255);
    strokeWeight(0.1);

      for(let i=0;i<height/mez;i++){

      line(0, height/2+(i*mez), width, height/2+(i*mez));
      line(0, height/2-(i*mez), width, height/2-(i*mez));
      }

      for(let i=0;i<width/mez;i++){

        line(width/2+(i*mez),0, width/2+(i*mez), height);
        line(width/2-(i*mez),0, width/2-(i*mez),height);
        }

        strokeWeight(1.5);
  }
//orbitals setup ----->

  function setOrbitals(){
    let de=0 ;
    for(let i=0;i<NT_NUMBER;i++){
      de = fact(i);
      if(i<1){
        for(let v = 0;v < nummers[i];v++){
          orbitals.push(new Orbital(i,360/nummers[i]*v,v));
      }
      }else{
        for(let v = 0;v < de;v++){
          orbitals.push(new Orbital(i,360/nummers[i]*v,v));
      }
      }
    }
  }
  
  function fact(pocet){
    var faktor=1;
      for(let d=0;d<pocet+1;d++){
        faktor=faktor*nummers[d];
      }
    return faktor;
  }

//setup canvas --->

function setup() {
  createCanvas(windowWidth/1.75,windowHeight);
  circleX = width / 2;
  circleY = height / 2;

  
  for(let i =0;i<nummers[0];i++){
    centerx[0][i] = circleX;
    centery[0][i] = circleY;
  }
  setOrbitals();

}

//end setup canvas --->



//draw --->

function draw() {
  background(0);
      mriz();
  fill(255, 255, 255);
  ellipse(circleX, circleY, 20*scope, 20*scope);


  orbitals.forEach(function (orbital) {
    orbital.draw();
  });

  push();
  textSize(20);
  fill(255);
  textAlign(LEFT, BOTTOM);


  for(let i=0;i<NT_NUMBER;i++){

    text("Orbital"+ i + " l=" + orbits[i] + " v=" + velocites[i] + " c=" + nummers[i] + ";", 30, height - 30-i*20);

  }
  pop();
}

//end draw --->


  
