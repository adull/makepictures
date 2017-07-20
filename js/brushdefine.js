var canvas = $('#brush-define');
var context = canvas[0].getContext('2d');

$("#brush-define-wrapper").on('mouseenter', function() {
  $("#brush-define-trash").css("opacity", "1");
});
$("#brush-define-wrapper").on('mouseleave', function() {
  $("#brush-define-trash").css("opacity", "0");
})
$('#brush-define-trash').on('click', function() {
  defineBrush.removeSegments();
  project.activeLayer.removeChildren();
  brushPathImg = canvas[0].toDataURL();
  setMode('defaultBrush')
})

function onMouseDown(event) {
  if(rectangleMode) {
    startShapeX = event.point.x;
    startShapeY = event.point.y;
    rect = new Rectangle(event.point.x, event.point.y, 0, 0);
    rectPath = new Path.Rectangle(rect)
    brushPathImg = canvas[0].toDataURL();
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
    setMode("customBrush");
  }
}

function onMouseDrag(event) {
  if(rectangleMode) {
    rectPath.removeSegments();
    rect.width = event.point.x - startShapeX;
    rect.height = event.point.y - startShapeY;
    rectPath = new Path.Rectangle(rect)
    rectPath.fillColor = currentColor;
    brushPathImg = canvas[0].toDataURL();
  }
  else if(triangleMode) {
    triangle.removeSegments();
    var height = startShapeY - event.point.y;
    triangle = new Path.RegularPolygon(new Point(event.point.x, event.point.y), 3, height);
    var width = startShapeX - event.point.x;
    triangle.rotation += width;
    triangle.fillColor = currentColor;
    brushPathImg = canvas[0].toDataURL();
  }
  else if(defaultBrushMode || customBrushMode) {
    defineBrush.add(event.point);
    brushPathImg = canvas[0].toDataURL();
  }

}
function onMouseUp(event) {

}

function onKeyDown(event) {
  if(event.key == 'k') {
    defineBrush.fillColor = currentColor;
    brushPathImg = canvas[0].toDataURL();
  }
  if(event.key == 'g') {
    // console.log(brushDefineShape);
  }
}
