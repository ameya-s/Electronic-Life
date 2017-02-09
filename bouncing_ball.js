var g = 0.1, x =50, y=50, vx = 0, vy = 0;

var colour = "#0000ff"

var radius = 10

var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d')

function onEachStep() {
vy += g; // gravity increases the vertical speed
x += vx; // horizontal speed increases horizontal position
y += vy; // vertical speed increases vertical position
if (y > canvas.height - radius){ // if ball hits the ground
y = canvas.height - radius; // reposition it at the ground
vy *= -1;

}if (x > canvas.width + radius){ // if ball goes beyond canvas
x = -radius; // wrap it around
}drawBall(); // draw the ball
};

function drawBall() {
with (context){
clearRect(0, 0, canvas.width, canvas.height);
fillStyle = colour;
beginPath();
arc(x, y, radius, -1, 2*Math.PI, true);
arc(x+75, y, radius, -1,2* Math.PI, true);
closePath();
fill();
}
};

window.onload = init;
function init() {
  setInterval(onEachStep, 1000/60); // 60 fps
};
