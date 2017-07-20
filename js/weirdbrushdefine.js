console.log("fjah")

var startingPoint = "notinitialized";
var brushPath;
var brushDefineShape = []
var brushDefineTempArr = [];

function onMouseDown(event) {
  if(startingPoint == "notinitialized") {
    console.log("hello")
    startingPoint = event.point;
    var tempArr = [];
    tempArr.push(0)
    tempArr.push(0)
    brushDefinePos.push(tempArr)
    console.log("new starting Point")
  }
  else {
    console.log(startingPoint)
  }
  brushPath = new Path({
    segments: [event.point],
    strokeColor: currentColor,
    closed: false
  });
  setMode("customBrush")

}
$("#weird-brush-define-wrapper").on('mouseenter', function() {
  $("#weird-brush-define-trash").css("opacity", "1");
});
$("#weird-brush-define-wrapper").on('mouseleave', function() {
  $("#weird-brush-define-trash").css("opacity", "0");
})
$('#weird-brush-define-trash').on('click', function() {
  console.log("trigga")
  brushDefineShape = [];
  var canvas = $('#weird-brush-define')[0];
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  // brushDefineShape[0] = [];
  for(i = 0; i < brushDefineShape.length; i ++ ) {
    brushDefineShape[i] = [];
  }
  brushPath.segments = [];
  brushDefineTempArr = [];
  startingPoint = "notinitialized";
})

function onMouseDrag(event) {
    brushPath.add(event.point);
    var canvas = $('#weird-brush-define');
    var dataURL = canvas[0].toDataURL();
    $('#copy-img').attr("src",dataURL);
    brushDefineTempArr = [];
    brushDefineTempArr.push(startingPoint.x - event.point.x);
    brushDefineTempArr.push(startingPoint.y - event.point.y);
    brushDefinePos.push(brushDefineTempArr);
}
function onMouseUp(event) {
  brushDefineTempArr = brushPath.segments;
  brushDefineShape.push(brushDefineTempArr);
  console.log("brushDefineShape after mouseup brushdefine")
  console.log(brushDefineShape)
}

function onKeyDown(event) {
  if(event.key == 'k') {
    brushPath.fillColor = currentColor;
  }
  if(event.key == 'g') {
    console.log(brushDefineShape);
  }
}
