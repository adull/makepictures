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
    }
  })

  //text SHIT
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

  //piano SHIT
  function addPianoKey(note, color, i) {
    var key = "key-" + note + "-" + i;
    if(color === 'white') {
      var whiteText = "<span class='piano-key-white' id='" + key + "'></span>";
      $("#piano-keys").append(whiteText);
    }
    if(color === 'black') {
      var blackText = "<span class='piano-key-black' id='" + key + "'></span>";
      $("#piano-keys").append(blackText);
      var item = $("#key-" + note +"-" + i)
      console.log(item);
      // var posLeft = item.position().left;
      var posLeft = item[0].offsetLeft;
      item.css("position", "absolute");
      item.css("left", (posLeft - 14).toString()+"px");
    }
  }
  for(i = 0; i < 2; i ++) {
    addPianoKey('c', 'white', i);
    addPianoKey('c-sharp', 'black', i);
    addPianoKey('d', 'white', i);
    addPianoKey('d-sharp', 'black', i);
    addPianoKey('e', 'white', i);
    addPianoKey('f', 'white', i);
    addPianoKey('f-sharp', 'black', i);
    addPianoKey('g', 'white', i);
    addPianoKey('g-sharp', 'black', i);
    addPianoKey('a', 'white', i);
    addPianoKey('a-sharp', 'black', i);
    addPianoKey('b', 'white', i);
  }
  $('.piano-key-white').on('mousedown', function() {
    // $(this).css("width", "35px");
    $(this).css("background-color", "#CCCCCC");
    $('.piano-key-white').on('mouseleave', function() {
      // $(this).css("width", "40px");
      $(this).css("background-color", "#FFFFFF");
    })
  })
  $('.piano-key-white').on('mouseup', function() {
    // $(this).css("width", "40px");
    $(this).css("background-color", "#FFFFFF");
  })
  $('.piano-key-black').on('mousedown', function() {
    // $(this).css("width", "24px");
    $(this).css("background-color", "yellow");
    $('.piano-key-black').on('mouseleave', function() {
      // $(this).css("width", "28px");
      $(this).css("background-color", "#000000");
    })
  })
  $('.piano-key-black').on('mouseup', function() {
    // $(this).css("width", "28px");
    $(this).css("background-color", "#000000");
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
  });
  $('#fullImg-x').on('click', function() {
    scaledImgMod = false;
    $("#scaledImg-x").css("opacity","0");
    fullImgMod = true;
    $("#fullImg-x").css("opacity","1");
  });
});
