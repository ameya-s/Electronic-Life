var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

var Vector = function(x,y){
  this.x = x;
  this.y = y;
};

Vector.prototype.plus = function(otherVector){
  return new Vector(this.x + otherVector.x, this.y + otherVector.y);
};

Vector.prototype.minus = function(otherVector){
  return new Vector(this.x - otherVector.x, this.y - otherVector.y);
};

var Grid = function(width, height){
  this.space = new Array(width*height);  // to access element at (x,y) position => [x+y*width]
  this.width = width;
  this.height = height;
};

// Grid methods => isInside, get, set (param => Vector)
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && Vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector){
    return this.space[vector.x + vector.y * this.width];
};

Grid.prototype.set = function(vector, value){
  this.space[vector.x + vector.y * this.width] = value;
};

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

var Surroundings = function(position){  //position: Vector
  return {"n":  position.plus(directions.n),
  "ne": position.plus(directions.ne),
  "e":  position.plus(directions.e),
  "se": position.plus(directions.se),
  "s":  position.plus(directions.s),
  "sw": position.plus(directions.sw),
  "w":  position.plus(directions.w),
  "nw": position.plus(directions.nw)};
};

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
var directionNames = "n ne e se s sw w nw".split(" ");

var Critter = function(){
  this.direction = randomElement(directionNames);
};

var View = function(surroundings){
  this.surroundings = surroundings;
};

View.prototype.look = function(direction){
  return this.surroundings[direction];
};
View.prototype.find = function(){

};
View.prototype.findAll = function(mapChar){
  var result = [];
  for(var direction in this.surroundings){
    if(this.surroundings[direction] === mapchar){result.push(direction);}
  }
  return result;
};

var Action = function(type, direction){
  this.type = type;
  this.direction = direction;
};

Critter.prototype.act = function(view){
  if(view.look(this.direction) !== " "){
    this.direction = view.find(" ") || "s";
  }
  return new Action('move', this.direction);
};

var elementFromChar = function(legend, ch){
  if(ch == " "){
    return null;
  }
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
};

var charFromElement = function(element){
  if(element === null){
    return " ";
  }
  return element.originChar;
};

var World = function(plan,legend){
  var grid = new Grid(plan[0].length, plan.length);
  this.grid = grid;
  this.legend = legend;
  var self = this;
  plan.forEach(function(line, y){
    for(var x=0; x < line.length; x++){
        grid.set(new Vector(x, y), elementFromChar(self.legend, line[x]));
    }
  });
};

World.prototype.toString = function(){
  var output = "";
  for(var y=0; y<this.grid.height; y++){
    for(var x=0; x<this.grid.width; x++){
      output += charFromElement(this.grid.get(new Vector(x, y)));
    }
    output += "\n";
  }
  return output;
};

var Wall = function(){}
