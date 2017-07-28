//GLOBAL SHIT
var currentColor = 'black'
var defineBrush;

//SHAPE SHIT
var brushPathImg;
var rect;
var rectPath;
var triangle;
var circleRect;
var circle;
var imgRect;
var imgRectPath;
var imgRaster;
var imgRasterMain;

//modifiers
var traceMod = false;
var scaledImgMod = true;
var fullImgMod = false;

//MODE
var defaultBrushMode = true;
var customBrushMode = false;
var rectangleMode = false;
var triangleMode = false;
var circleMode = false;
var imageMode = false;

//COLOR PICKER SHIT
var colorPickerOn = false;
var colorPickerRed = false;
var colorPickerGreen = false;
var colorPickerBlue = false;
var colorPickedRed;
var colorPickedGreen;
var colorPickedBlue;

function setMode(shape) {
  defaultBrushMode = customBrushMode = rectangleMode = triangleMode =
  circleMode = false;
  // console.log(window[shape + "Mode"]);
  window[shape + "Mode"] = true;
  // console.log(shape);
}

$(document).ready(function() {
  $('#scaledImg-x').css("opacity", "1")
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

  //toggles
  $('.toggle-thing').on('click', function() {
    var id = ($(this)[0].id)
    var toggle = id.slice(7,id.length);
    console.log(toggle);
    console.log(window[toggle + "Mod"]);
    if(window[toggle + "Mod"] == false) {
      $("#" + toggle + "-x").css("opacity","1");
      window[toggle + "Mod"] = true;
    }
    else {
      $("#" + toggle + "-x").css("opacity","0");
      window[toggle + "Mod"] = false;
    }
  })
  $('#scaledImg-x').on('click', function() {
    scaledImgMod = true;
    $("#scaledImg-x").css("opacity","1");
    fullImgMod = false;
    $("#fullImg-x").css("opacity","0");
  })
  $('#fullImg-x').on('click', function() {
    scaledImgMod = false;
    $("#scaledImg-x").css("opacity","0");
    fullImgMod = true;
    $("#fullImg-x").css("opacity","1");
  })


})
