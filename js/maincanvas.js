// var canvas, dataURL;
var topLeft = new Point(10,20);
var rectSize = new Size(200,200);
var path1 = new Path.Rectangle(topLeft, rectSize);
path1.fillColor = "blue";
var path2;


function onMouseDown(event) {
  if(brushMode) {
    path2 = new Path({
      strokeColor: currentColor,
      closed: false
    });
    for(i = 0; i < brushDefineShape.length; i ++) {
      for(j = 0; j < brushDefineShape[i].length; j ++) {
        brushDefineShape[i][j].point.x = event.point.x - (brushDefinePos[j])[0];
        brushDefineShape[i][j].point.y = event.point.y - (brushDefinePos[j])[1];
        // console.log(brushDefineShape[i])
        path2.add(brushDefineShape[i][j]);
      }
    }
  }
  else if(rectangleMode) {
    console.log("rect")
  }
}

function onMouseDrag(event) {
  if(brushMode && brushPath) {
    for(i = 0; i < brushDefineShape.length; i ++) {
      for(j = 0; j < brushDefineShape[i].length; j ++) {
        brushDefineShape[i][j].point.x = event.point.x - (brushDefinePos[j])[0];
        brushDefineShape[i][j].point.y = event.point.y - (brushDefinePos[j])[1];
        // console.log(brushDefineShape[i])
        path2.add(brushDefineShape[i][j]);
      }
    }
    path2.fillColor = brushPath.fillColor;
  }
  else if(rectangleMode) {
    console.log("rect");
  }
}

function onMouseUp(event) {


}
