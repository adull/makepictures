//GLOBAL SHIT
var currentColor = 'black'
var startingPoint = "notinitialized";
var defineBrush;

var brushPathImg;
var rect;
var rectPath;
var triangle;
// var trianglePath;


//MODE
var defaultBrushMode = true;
var customBrushMode = false;
var rectangleMode = false;
var triangleMode = false;
var circleMode = false;
var lineMode = false;


function setMode(shape) {
  defaultBrushMode = customBrushMode = rectangleMode = triangleMode =
  circleMode = lineMode = false;
  window[shape + "Mode"] = true;
  console.log(shape);
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
