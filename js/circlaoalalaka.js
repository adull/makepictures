//GLOBAL SHIT
var currentColor = 'black'
var startingPoint = "notinitialized";
var brushPath;
var brushDefineTempArr;
var brushDefineShape = [];
var brushDefinePos = [];

//MODE
var brushMode = true;
var rectangleMode = false;
var triangleMode = false;
var circleMode = false;
var lineMode = false;


function setMode(shape) {
  brushMode = false;
  rectangleMode = false;
  triangleMode = false;
  circleMode = false;
  lineMode = false;
  if (shape == "brush") {
    brushMode = true;
  }
  if (shape == "rectangle") {
    rectangleMode = true;
  }
  if (shape == "triangle") {
    triangleMode = true;
  }
  if (shape == "rectangle") {
    circleMode = true;
  }
  if (shape == "line") {
    lineMode = true;
  }
  console.log("mode = " + shape);
}

$(document).ready(function() {
  $('.color-option').each(function() {
    var color = $(this)[0].id;
    $(this).css("background-color", color)
  })
  $('.color-option').on('click', function() {
    currentColor = $(this)[0].id;
  })
  $('.make-shape').on('click', function() {
    var idName = $(this)[0].id
    var shapeMode = idName.split("-").pop();

    setMode(shapeMode);
  })


})
