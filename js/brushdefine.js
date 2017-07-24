// var canvas = $('#brush-define-1');
// var context = canvas[0].getContext('2d');
var canvas;
var context;
var groupNum;

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
  console.log("b")
  var thisCanvas = $("#brush-define-" + groupNum);
  var thisContext = thisCanvas[0].getContext('2d');
  // thisContext.clearRect(0,0, thisCanvas.width(), thisCanvas.height());
  if(triangleMode) {
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, 0);
  }
  var elementId = project.view.element.id;
  console.log(elementId.slice(-1));
  if(groupNum == elementId.slice(-1)) {
    project.activeLayer.removeChildren();
  }

  brushPathImg = thisCanvas[0].toDataURL();
});

$(".brush-define").on('click', function() {
  canvas = $(this);
  context = canvas[0].getContext('2d');
  brushPathImg = canvas[0].toDataURL();
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
}

function onMouseDrag(event) {
  // console.log(groupNum);
  // console.log(window["group"+ groupNum]);
  var canvas = $(this.view.element);
  if(rectangleMode) {
    rectPath.removeSegments();
    rect.width = event.point.x - startShapeX;
    rect.height = event.point.y - startShapeY;
    rectPath = new Path.Rectangle(rect)
    rectPath.strokeColor = currentColor;
    brushPathImg = canvas[0].toDataURL();
  }
  else if(triangleMode) {
    triangle.removeSegments();
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
    circle.remove();
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
}

function onKeyDown(event) {
  if(event.key == 'k') {
    console.log(rectangleMode);
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
}
