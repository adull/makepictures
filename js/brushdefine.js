

function onMouseDown(event) {
  if(startingPoint == "notinitialized") {
    startingPoint = event.point;
    var tempArr = [];
    tempArr.push(0)
    tempArr.push(0)
    brushDefinePos.push(tempArr)
    console.log("new starting Point")

  }
  brushPath = new Path({
    segments: [event.point],
    strokeColor: currentColor,
    closed: false
  });
  setMode("brush")

}
$("#brush-define-wrapper").on('mouseenter', function() {
  $("#brush-define-trash").css("opacity", "1");
});
$("#brush-define-wrapper").on('mouseleave', function() {
  $("#brush-define-trash").css("opacity", "0");
})
$('#brush-define-trash').on('click', function() {
  console.log("trigga")
  brushDefineShape = [];
  var canvas = $('#brush-define')[0];
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
    canvas = $('#brush-define');
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
