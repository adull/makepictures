// var canvas = $('#brush-define-1');
// var context = canvas[0].getContext('2d');
var canvas;
var context;
var groupNum;
var group;
var layerStartWidth;
var layerStartHeight;
var rotateAmt = 0;
var skewAmt = 0;

var lockCustomScale = true;
var lockCustomRotate = true;
var lockCustomSkew = true;

// rect = new Path.Rectangle(new Point(0,0), new Size(100,100))
// rect.fillColor = 'black';

$(".brush-define-wrapper").on('mouseenter', function() {
  bdt = "#brush-define-trash-" + groupNum;
  groupNum = ($(this)[0].id).slice(-1);
  $("#brush-define-trash-" + groupNum).css("opacity", "1");
});
$(".brush-define-wrapper").on('mouseleave', function() {
  $("#brush-define-trash-" + groupNum).css("opacity", "0");
})
$(".brush-define-trash").on('click', function() {
  groupNum = ($(this)[0].id.slice(-1));
  var elementId = project.view.element.id;
  if(groupNum == elementId.slice(-1)) {
    project.activeLayer.removeChildren();
  }
  brushPathImg = canvas[0].toDataURL();
});

$(".brush-define").on('click', function() {
  canvas = $(this);
  console.log(canvas);
  context = canvas[0].getContext('2d');
  brushPathImg = canvas[0].toDataURL();
  $('.customBrushScale')[0].id = "scale-" + $(this)[0].id.slice(-1);
  $('.customBrushRotate')[0].id = "scale-" + $(this)[0].id.slice(-1);
  $('.customBrushSkew')[0].id = "scale-" + $(this)[0].id.slice(-1);
})


$('.customBrushScale').on('mousedown', function() {
  lockScale = false;
  $('.customBrushScale').on('mousemove', function() {
    if(!lockScale) {
      groupNum = ($(this)[0].id.slice(-1));
      var scaleAmt = ($('.customBrushScale').val() * 0.02) + 0.01;
      var elementId = project.view.element.id;
      if(groupNum == elementId.slice(-1)) {
        project.activeLayer.bounds.width = (layerStartWidth * scaleAmt);
        project.activeLayer.bounds.height = (layerStartHeight * scaleAmt);
      }
      canvas = $("#brush-define-" + groupNum);
      brushPathImg = canvas[0].toDataURL();
    }
  });
});
$('.customBrushScale').on('mouseup', function() {
  lockScale = true;
});

$('.customBrushRotate').on('mousedown', function() {
  lockRotate = false;
  $('.customBrushRotate').on('mousemove', function() {
    groupNum = ($(this)[0].id.slice(-1));
    var elementId = project.view.element.id;
    if(groupNum == elementId.slice(-1)) {
      if(!lockRotate) {
        var rotateVal = $('.customBrushRotate').val() - rotateAmt;
        project.activeLayer.rotation = rotateVal;
        rotateAmt = $('.customBrushRotate').val();
      }
    }
    canvas = $("#brush-define-" + groupNum);
    brushPathImg = canvas[0].toDataURL();
  });
});
$('.customBrushScale').on('mouseup', function() {
  lockRotate = true;
});

$('.customBrushSkew').on('mousedown', function() {
  console.log("hmm")
  lockSkew = false;
  $('.customBrushSkew').on('mousemove', function() {
    groupNum = ($(this)[0].id.slice(-1));

    var elementId = project.view.element.id;
    if(groupNum == elementId.slice(-1)) {
      if(!lockSkew) {
        var skewVal = $('.customBrushSkew').val() - skewAmt;
        console.log(project.activeLayer);
        // project.activeLayer.
        //TODO I STOPPED HERE
      }
    }
  })
})


function onMouseDown(event) {
  if(rectangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    rect = new Rectangle(event.point.x, event.point.y, 0, 0);
    rectPath = new Path.Rectangle(rect)
  }
  else if(triangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, 0);
  }
  else if(defaultBrushMode || customBrushMode) {
    defineBrush = new Path({
      segments: [event.point],
      strokeColor: currentColor,
      closed: false
    });
  }
  else if(circleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    circleRect = new Rectangle(new Point(startShapeX, startShapeY), new Size(0, 0));
    circle = new Shape.Ellipse(circleRect);
  }
  else if(imageMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    imgRect = new Rectangle(event.point.x, event.point.y, 0, 0);
    imgRectPath = new Path.Rectangle(rect)
    // group.addChild(imgRectPath);
  }
}

function onMouseDrag(event) {
  var canvas = $(this.view.element);
  if(rectangleMode) {
    if(traceMod == false) {
      rectPath.removeSegments();
    }
    rect.width = event.point.x - startShapeX;
    rect.height = event.point.y - startShapeY;
    rectPath = new Path.Rectangle(rect)
    rectPath.strokeColor = currentColor;
    brushPathImg = canvas[0].toDataURL();
    defineBrush = brushPathImg
  }
  else if(triangleMode) {
    if(traceMod == false) {
      triangle.removeSegments();
    }
    var height = startShapeY - event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, height);
    var width = startShapeX - event.point.x;
    triangle.rotation += width;
    triangle.strokeColor = currentColor;
    brushPathImg = canvas[0].toDataURL();
  }
  else if(defaultBrushMode || customBrushMode) {
    if(event.modifiers.shift) {
      defineBrush.lastSegment.point = event.point;
      brushPathImg = canvas[0].toDataURL();
    }
    else {
      defineBrush.add(event.point);
      brushPathImg = canvas[0].toDataURL();
    }
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
    brushPathImg = canvas[0].toDataURL();
  }
  else if(imageMode) {
    imgRectPath.removeSegments();
    imgRect.width = event.point.x - startShapeX;
    imgRect.height = event.point.y - startShapeY;
    imgRectPath = new Path.Rectangle(imgRect);
    imgRectPath.strokeColor = 'black';
    imgRectPath.fillColor = 'rgba(0,0,0, .3)'
    // group.addChild(imgRectPath);
  }
}

function onMouseUp(event) {
  lockRotate = true;
  $('.customBrushScale').val('50');
  $('.customBrushRotate').val('0');
  layerStartWidth = project.activeLayer.bounds.width;
  layerStartHeight = project.activeLayer.bounds.height;
  var canvas = $(this.view.element);

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
      // group.addChild(raster)
      imgRectPath.remove();
    }
    if(fullImgMod && imgRaster) {
      var imagePoint = new Point(startShapeX, startShapeY);
      var raster = new Raster(imgRaster.source, imagePoint);
      group = new Group(imgRectPath, raster);
      group.clipped = true;
    }
  }
  setTimeout(function() {
    brushPathImg = canvas[0].toDataURL();
  },100)

}

function onKeyDown(event) {
  if(event.key == 'k') {
    if(defaultBrushMode || customBrushMode ) {
      defineBrush.fillColor = currentColor;
    }
    if(circleMode) {
      circle.fillColor = currentColor;
    }
    if(rectangleMode) {
      rectPath.fillColor = currentColor;
    }
    if(triangleMode) {
      triangle.fillColor = currentColor;
    }

    //weird lag issues made me do it
    setTimeout(function() {
      brushPathImg = canvas[0].toDataURL();
    }, 100);
  }
  if(event.key == 'z') {

  }
}
