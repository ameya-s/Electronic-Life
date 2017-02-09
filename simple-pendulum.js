window.onload = init;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var g = 9.42,
    stringLen = 200,
    supportPos = {x:400, y:50},
    particleRadius = 15,
    colors =['#000','#f00','#00f','#0f0'],
    period = 2*Math.PI*Math.sqrt(stringLen/g),
    startingAngle = Math.PI/2-15*Math.PI/180,
    startTime = new Date();

function Support(){
  this.x = supportPos.x;
  this.y = supportPos.y;
  this.color = colors[0];
  this.radius = 5;
}

function Connector(angle){
  this.len = stringLen;
  this.originX = supportPos.x;
  this.originY = supportPos.y;
  this.endY = this.originY + stringLen*Math.sin(angle);
  this.endX = this.originX + stringLen*Math.cos(angle);
  this.color = colors[1];
}

function Particle(angle,timeElapsed){
  this.x = supportPos.x + stringLen*Math.cos(angle);
  this.y = supportPos.y + stringLen*Math.sin(angle);
  this.color = colors[2];
  this.radius = particleRadius;
  this.ax = g*Math.cos(angle)*Math.cos(angle);
  this.ay = g*Math.sin(angle)*Math.cos(angle);
  this.vx = this.ax*timeElapsed;
  this.vy = this.ay*timeElapsed;
}

function init(){
  setInterval(onEachStep, 1000/60); // 60 fps
}

function onEachStep(){
  var currentTime = new Date(),
      timeLapsed = (currentTime.getTime()-startTime.getTime())/60,
      currentAngle = (Math.PI/2) -(Math.PI/2-startingAngle)*Math.cos(2*Math.PI*timeLapsed/period);
  if(currentAngle >= startingAngle && currentAngle <= startingAngle + Math.PI/2){
    var support = new Support(),
        connector = new Connector(currentAngle),
        particle = new Particle(currentAngle);
    drawPendulum(support,connector,particle,context);
  }
}

function drawPendulum(support,connector,particle,context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    support.draw(context);
    connector.draw(context);
    particle.draw(context);
}

Support.prototype.draw = function(context){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
}

Connector.prototype.draw = function(context){
    context.beginPath();
    context.moveTo(this.originX, this.originY);
    context.lineTo(this.endX, this.endY);
    context.strokeStyle = this.color;
    context.strokewidth = 5;
    context.stroke();
}

Particle.prototype.draw = function(context){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
}
