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
var textFamily;
var textVal = "";
var textSize;

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
var textMode = false;

var fontsArr = ['pokemon', 'wingdings', 'comicsans', 'facebook', 'times',
                'harrypotter', 'badcoma', 'futura', 'ptmono'];

function setMode(shape) {
  defaultBrushMode = customBrushMode = rectangleMode = triangleMode =
  circleMode = imageMode = textMode = false;
  window[shape + "Mode"] = true;
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
    $('.make-shape').css('font-weight', 'normal')
    var idName = $(this)[0].id
    $('#' + idName).css('font-weight', 'bold')
    var shapeMode = idName.split("-").pop();
    setMode(shapeMode);
  })
  $('#color-picker-space').on('click', function() {
    console.log("you mother")
    var valGoingUp = true;
    var valGoingDown = false;
    $(this).text("PRESS SPACE TO STOP");
    $("#color-picker-text").text("RED VALUE: ")
    $("#color-picker-slider").css('display','block')
    for(i = 0; i < 256; i ++) {
      if($('#color-value').val() == 255) {
        valGoingUp = false;
        valGoingDown = false;
      }
      changeColorVal(i)
      console.log($('#color-value').val())
    }
  })

  //text SHIT

  $('#text-size').on('change', function() {
    console.log($("#text-size").val())

  })

  $('#text-actual-text').on('keyup', function() {
    textVal = $("#text-actual-text").val();
  })
  $('#text-size').on('change', function() {
    textSize = $("#text-size").val();
  })
  $('#text-family').on('change', function() {
    textFamily = fontsArr[$("#text-family").val() - 1];
    console.log(textFamily)
  });


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
  });
  $('#fullImg-x').on('click', function() {
    scaledImgMod = false;
    $("#scaledImg-x").css("opacity","0");
    fullImgMod = true;
    $("#fullImg-x").css("opacity","1");
  });
});
