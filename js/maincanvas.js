var copy;
var mainBrush;
var startShapeX;
var startShapeY;
var group;



function onMouseDown(event) {
  group = new Group();
  if(customBrushMode) {
    if(defineBrush) {
      //weird lag issues made me do it
      setTimeout(function() {
        copy = new Raster(brushPathImg, event.point);
        group.addChild(copy);
      }, 100);
    }
  }
  else if(defaultBrushMode) {
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
    group.addChild(rectPath);
  }
  else if(triangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, 0);
    group.addChild(triangle);
  }
  else if(circleMode) {
    // console.log("yuh");
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    circleRect = new Rectangle(new Point(startShapeX, startShapeY), new Size(0, 0));
    circle = new Shape.Ellipse(circleRect);
    group.addChild(circle)
  }
}

function onMouseDrag(event) {
  if(customBrushMode) {
    if(defineBrush) {
      copy = new Raster(brushPathImg, event.point);
      group.addChild(copy);
    }
  }
  else if(defaultBrushMode) {
    if(event.modifiers.shift) {
      mainBrush.lastSegment.point = event.point;
    }
    else {
      mainBrush.add(event.point);
      group.addChild(mainBrush)
    }
  }
  else if(rectangleMode) {
    if(traceMod == false) {
      rectPath.removeSegments();
    }
    rect.width = event.point.x - startShapeX;
    rect.height = event.point.y - startShapeY;
    rectPath = new Path.Rectangle(rect)
    rectPath.strokeColor = currentColor;
    group.addChild(rectPath);
  }
  else if(triangleMode) {
    if(traceMod == false) {
      triangle.removeSegments();
    }
    var width = startShapeX - event.point.x;
    var height = startShapeY - event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, height);
    triangle.rotation += width;
    triangle.strokeColor = currentColor;
    group.addChild(triangle);
  }
  else if(circleMode) {
    if(traceMod == false) {
      circle.remove();
    }
    var width = event.point.x - startShapeX;
    var height = event.point.y - startShapeY;
    if(event.modifiers.shift) {
      circle = new Shape.Circle(new Point(startShapeX, startShapeY), Math.abs(height));
      circle.strokeColor = currentColor;
    }
    else {
      circleRect = new Rectangle(new Point(startShapeX, startShapeY), new Size(width, height));
      circle = new Shape.Ellipse(circleRect);
      circle.strokeColor = currentColor;
    }
    group.addChild(circle);
  }

}

function onMouseUp() {
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
