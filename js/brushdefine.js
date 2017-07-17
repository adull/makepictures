

function onMouseDown(event) {
  if(!startingPoint) {
    startingPoint = event.point;
    var tempArr = [];
    tempArr.push(0)
    tempArr.push(0)
    brushDefinePos.push(tempArr)
  }
  path3 = new Path({
    segments: [event.point],
    strokeColor: 'black',
    closed: false
  });

}
function onMouseDrag(event) {
    path3.add(event.point);
    canvas = $('#brush-define');
    var dataURL = canvas[0].toDataURL();
    $('#copy-img').attr("src",dataURL);
    var tempArr = [];
    tempArr.push(startingPoint.x - event.point.x);
    tempArr.push(startingPoint.y - event.point.y);
    brushDefinePos.push(tempArr);
}
function onMouseUp(event) {
  // console.log(path3.segments)
  // console.log(brushDefineShape);
  // brushDefineShape.push(path3.segments);
  // console.log(brushDefineShape[0])
  brushDefineShape = path3.segments;
}

function onKeyDown(event) {
  if(event.key == 'k') {
    path3.fillColor = 'red';
  }
  if(event.key == 'g') {
    console.log(brushDefineShape);
  }
}
