// var canvas, dataURL;
var topLeft = new Point(10,20);
var rectSize = new Size(200,200);
var path1 = new Path.Rectangle(topLeft, rectSize);
path1.fillColor = "blue";
var path2;


function onMouseDown(event) {
  // console.log("ok")
  path2 = new Path({
    // segments: [brushDefineShape],
    strokeColor: 'black',
    closed: false
  });
  for(j = 0; j < brushDefineShape.length; j ++) {
    brushDefineShape[j].point.x = event.point.x - (brushDefinePos[j])[0];
    brushDefineShape[j].point.y = event.point.y - (brushDefinePos[j])[1];
    // console.log(brushDefineShape[i])
    path2.add(brushDefineShape[j]);
  }
}

function onMouseDrag(event) {
  for(i = 0; i < brushDefineShape.length; i ++) {
    // brushDefineShape[0][i].point.x = event.point.x - (brushDefinePos[i])[0];
    // brushDefineShape[0][i].point.y = event.point.y - (brushDefinePos[i])[1];
    // path2.add(brushDefineShape[0][i]);
    brushDefineShape[i].point.x = event.point.x - (brushDefinePos[i])[0];
    brushDefineShape[i].point.y = event.point.y - (brushDefinePos[i])[1];
    path2.add(brushDefineShape[i]);
  }
}

function onMouseUp(event) {
  // console.log(path2);
}
