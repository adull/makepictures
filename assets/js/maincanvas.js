var copy;
var mainBrush;
var startShapeX;
var startShapeY;
var group;
var groupStartWidth;
var groupStartHeight;
var groupStartRotation;
var rotateAmt = 0;
var skewAmt = 0;
var brushThickness = 1;

var lockThickness = true;
var lockScale = true;
var lockRotate = true;
var lockSkew = true;

brushThickness = $('line-thickness').val();

$('#group-scale').on('mousedown', function() {
  lockScale = false;
  $('#group-scale').on('mousemove', function() {
    if(!lockScale) {
      var scaleAmt = ($('#group-scale').val() * 0.02) + 0.01;
      group.bounds.width = (groupStartWidth * scaleAmt);
      group.bounds.height = (groupStartHeight * scaleAmt);
    }
  });
});
$('#group-scale').on('mouseup', function() {
  lockScale = true;
});

$('#group-rotate').on('mousedown', function() {
  lockRotate = false;
  $('#group-rotate').on('mousemove', function() {
    if(!lockRotate) {
      console.log('rotate is goin')
      var rotateVal = $('#group-rotate').val() -rotateAmt;
      group.rotation = rotateVal;
      rotateAmt = $('#group-rotate').val();
    }
  });
});
$('#group-rotate').on('mouseup', function() {
  lockRotate = true;
});

$('#group-skew').on('mousedown', function() {
  var center = group.bounds.center;
  lockSkew= false;
  $('#group-skew').on('mousemove', function() {
    var skewVal = $('#group-skew').val() - skewAmt;
    if(!lockSkew) {
      console.log('skew is goin')
      group.skew(skewVal, center);
    }
    skewAmt = $('#group-skew').val();
  });
});
$('#group-skew').on('mouseup', function() {;
  lockSkew = true;
});

$("#click-undo").on("click", function() {
  group.remove();
  $("#click-undo").css("cursor", "default");
});

$("#click-paint").on("click", function() {
  group.fillColor = currentColor;
});

function onMouseDown(event) {
  $("#click-paint").css("cursor", "pointer");
  $("#click-undo").css("cursor", "pointer");
  brushThickness = $('#line-thickness').val();
  group = new Group();
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
      strokeWidth: brushThickness,
      closed: false
    });
    group.addChild(mainBrush);

  }
  else if(rectangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    rect = new Rectangle(event.point.x, event.point.y, 0, 0);
    rectPath = new Path.Rectangle(rect)
    rectPath.strokeWidth = brushThickness;
    group.addChild(rectPath);
  }
  else if(triangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, 0);
    triangle.strokeWidth = brushThickness
    group.addChild(triangle);
  }
  else if(circleMode) {
    // console.log("yuh");
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    circleRect = new Rectangle(new Point(startShapeX, startShapeY), new Size(0, 0));
    circle = new Shape.Ellipse(circleRect);
    circle.strokeWidth = brushThickness;
    group.addChild(circle)
  }
  else if(imageMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    imgRect = new Rectangle(event.point.x, event.point.y, 0, 0);
    imgRectPath = new Path.Rectangle(rect)
    group.addChild(imgRectPath);
  }
  else if(textMode) {
    var text = new PointText(new Point(event.point));
    var test = new PointText(new Point(event.point));
    text.fontSize = textSize
    text.fillColor = currentColor;
    text.fontFamily = textFamily;
    if(textFamily == "badcoma") {
      text.content = textVal.toUpperCase();
    }
    else {
      text.content = textVal;
    }
    group.addChild(text);
  }
}

function onMouseDrag(event) {
  brushThickness = $('#line-thickness').val();

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
    rectPath.strokeWidth = brushThickness;
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
    triangle.strokeWidth = brushThickness;
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
      circle.strokeWidth = brushThickness;
      circle.strokeColor = currentColor;
    }
    else {
      circleRect = new Rectangle(new Point(startShapeX, startShapeY), new Size(width, height));
      circle = new Shape.Ellipse(circleRect);
      circle.strokeWidth = brushThickness;
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
  else if(textMode) {
    var text = new PointText(new Point(event.point));
    text.fontSize = textSize
    text.fillColor = currentColor;
    text.fontFamily = textFamily;
    if(textFamily == "badcoma") {
      text.content = textVal.toUpperCase();
    }
    else {
      text.content = textVal;
    }
    group.addChild(text);
  }


}

function onMouseUp() {
  lockSkew = true;
  $('#group-scale').val('50');
  $('#group-rotate').val('0');
  $('#group-skew').val('0');
  // $('#group-rotate').val('0');
  if(imageMode) {
    if(!imgRaster) {
      imgRectPath.remove();
    }
    if(scaledImgMod && imgRaster) {

      console.log(imgRaster);
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
