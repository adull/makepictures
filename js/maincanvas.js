var copy;
var mainBrush;
var startShapeX;
var startShapeY;
var group;
var groupStartWidth;
var groupStartHeight;
var groupStartRotation;
var rotateAmt = 0;
var lockScale = true;
var lockRotate = true;

$('#groupScale').on('mousedown', function() {
  lockScale = false;
  lockRotate = true;
  console.log("rotate is locked")
  $('#groupScale').on('mousemove', function() {
    if(!lockScale) {
      // console.log("trigger scale");
      var scaleAmt = ($('#groupScale').val() * 0.02) + 0.01;
      group.bounds.width = (groupStartWidth * scaleAmt);
      group.bounds.height = (groupStartHeight * scaleAmt);
    }
  });
});

$('#groupRotate').on('mousedown', function() {
  lockScale = true;
  lockRotate = false;
  console.log("rotate is not locked")
  $('#groupRotate').on('mousemove', function() {
    var rotateVal = $('#groupRotate').val() -rotateAmt;
    group.rotation = rotateVal;
    rotateAmt = $('#groupRotate').val();
  });
});

function onMouseDown(event) {
  group = new Group();
  // scaleAmt = 0;
  rotateAmt = 0;
  if(customBrushMode) {
    if(defineBrush) {
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
  else if(imageMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    imgRect = new Rectangle(event.point.x, event.point.y, 0, 0);
    imgRectPath = new Path.Rectangle(rect)
    group.addChild(imgRectPath);
  }
}

function onMouseDrag(event) {
  if(customBrushMode) {
    copy = new Raster(brushPathImg, event.point);
    group.addChild(copy);
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
    group.bringToFront;
  }
  else if(imageMode) {
    imgRectPath.removeSegments();
    imgRect.width = event.point.x - startShapeX;
    imgRect.height = event.point.y - startShapeY;
    imgRectPath = new Path.Rectangle(imgRect);
    imgRectPath.strokeColor = 'black';
    imgRectPath.fillColor = 'rgba(0,0,0, .3)'
    group.addChild(imgRectPath);
  }

}

function onMouseUp() {
  $('#groupScale').val('50');
  $('#groupRotate').val('0');
  // $('#groupRotate').val('0');
  if(imageMode) {
    if(!imgRaster) {
      imgRectPath.remove();
    }
    if(scaledImgMod && imgRaster) {
      widthRatio = imgRectPath.bounds.width/imgRaster.bounds.width;
      heightRatio = imgRectPath.bounds.height/imgRaster.bounds.height;

      var imagePoint = new Point(startShapeX, startShapeY);
      var raster = new Raster(imgRaster.source, imgRectPath.bounds.center);
      raster.scale(widthRatio, heightRatio);
      group.addChild(raster)
      imgRectPath.remove();
    }
    if(fullImgMod && imgRaster) {
      var imagePoint = new Point(startShapeX, startShapeY);
      // console.log(imgRectPath);
      var raster = new Raster(imgRaster.source, imagePoint);
      group = new Group(imgRectPath, raster);
      group.clipped = true;
    }
  }
  groupStartWidth = group.bounds.width;
  groupStartHeight = group.bounds.height;
  groupStartRotation = group.rotation;
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
