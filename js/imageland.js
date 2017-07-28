// function onMouseDown(event) {
// 		rect = new Path.Rectangle(event.point, new Size(100,100))
// 		rect.fillColor = 'red';
// }
var canvas;

var center = this.view.center;
console.log("center")
console.log(center);
var dontPost = false;
var raster;

$("#image-land").on("mouseenter", function() {
	canvas = $(this);
})

function onDocumentDrag(event) {
	event.preventDefault();
}

function onDocumentDrop(event) {
	console.log(canvas);
	event.preventDefault();
	var file = event.dataTransfer.files[0];
	var reader = new FileReader();

	reader.onloadstart = function(event) {

	}

	reader.onload = function (event) {
		// console.log("onloadstart begin")
		raster = new Raster(event.target.result, center);
		raster.visible = true;
		raster.fitBounds(view.bounds);
		// raster.view.element = document.getElementById("image-land");
		raster.view.element = $('image-land');
		if(raster.view.element != document.getElementById("image-land")) {
			console.log(raster.view.element);
			console.log("trigger")
			raster.remove();
			raster = new Raster(event.target.result, center);
			raster.visible = true;
			raster.fitBounds(view.bounds);

		}
		imgRaster = raster;
		// console.log(canvas[0])
		// imgRasterMain = canvas[0].toDataURL();
	}
	// console.log(imgRasterMain);
	reader.readAsDataURL(file);
	// console.log(raster);
	// console.log("register")
}

// var imageLand = $('#image-land');
var imageLand = document.getElementById("image-land");

// console.log(imageLand)
imageLand.addEventListener('drop', onDocumentDrop, false);
imageLand.addEventListener('dragover', onDocumentDrag, false);
imageLand.addEventListener('dragleave', onDocumentDrag, false);
