// function onMouseDown(event) {
// 		rect = new Path.Rectangle(event.point, new Size(100,100))
// 		rect.fillColor = 'red';
// }
var canvas;

var topLeft = this.view.topLeft;
var center = this.view.center;
var dontPost = false;
var raster;

$("#image-land").on("mouseenter", function() {
	canvas = $(this);
})

function onDocumentDrag(event) {
	event.preventDefault();
}

function onDocumentDrop(event) {
	if(canvas) {
		console.log("yes")
		var context = canvas[0].getContext('2d');
		// context.clearRect(0, 0, canvas.width, canvas.height);
		var rect = new Path.Rectangle(0,0,canvas.height, canvas.width);
		rect.fillColor = 'red';
		console.log(rect);
	}
	console.log(canvas);
	event.preventDefault();
	var file = event.dataTransfer.files[0];
	var reader = new FileReader();
	reader.onload = function (event) {
		raster = new Raster(event.target.result, center);
		raster.visible = true;
		raster.fitBounds(view.bounds);
		raster.view.element = $('image-land');
		if(raster.view.element != document.getElementById("image-land")) {
			console.log(raster.view.element);
			console.log("it got put in the wrong element lol")
			raster.remove();
			raster = new Raster(event.target.result, center);
			raster.visible = true;
			raster.fitBounds(view.bounds);
		}
		imgRaster = raster;
	}
	reader.readAsDataURL(file);
}

// var imageLand = $('#image-land');
var imageLand = document.getElementById("image-land");

// console.log(imageLand)
imageLand.addEventListener('drop', onDocumentDrop, false);
imageLand.addEventListener('dragover', onDocumentDrag, false);
imageLand.addEventListener('dragleave', onDocumentDrag, false);
