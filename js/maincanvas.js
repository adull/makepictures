var copy;
var mainBrush;
var group;
var startShapeX;
var startShapeY;
// var groupArr = [];



function onMouseDown(event) {
  if(customBrushMode) {
    if(defineBrush.segments.length > 0) {
      var copy = new Raster(brushPathImg, event.point);
      group = new Group();
      group.addChild(copy);
    }
  }
  else if(defaultBrushMode) {
    group = new Group();
    mainBrush = new Path({
      segments: [event.point],
      strokeColor: currentColor,
      closed: false
    });
    group.addChild(mainBrush);

  }
  else if(rectangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    rect = new Rectangle(event.point.x, event.point.y, 0, 0);
    rectPath = new Path.Rectangle(rect)
  }
  else if(triangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, 0);
    // triangle = 5
    // trianglePath = new Path.RegularPolygon(triangle)
    // var triangle = new Path.RegularPolygon(new Point(80, 70), 3, 50);
  }
}

function onMouseDrag(event) {
  if(customBrushMode) {
    copy = new Raster(brushPathImg, event.point);
    group.addChild(copy);
  }
  else if(defaultBrushMode) {
    mainBrush.add(event.point);
  }
  else if(rectangleMode) {
    rectPath.removeSegments();
    rect.width = event.point.x - startShapeX;
    rect.height = event.point.y - startShapeY;
    rectPath = new Path.Rectangle(rect)
    rectPath.fillColor = currentColor;
  }
  else if(triangleMode) {
    var group = new Group();
    triangle.removeSegments();
    var height = startShapeY - event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, height);
    var width = startShapeX - event.point.x;
    triangle.rotation += width;
    triangle.fillColor = currentColor;
    group.addChild(triangle);
  }

}

function onMouseUp() {
  if(customBrushMode) {

  }
}

function onKeyDown(event) {
  if(event.key == 'k') {
    // if(mainBrush) {
    // console.log(currentColor)
      group.fillColor = currentColor;
    // }
  }
  if(event.key == 'z') {
    group.remove();

  }
}
