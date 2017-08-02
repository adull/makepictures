var canvas;

var topLeft = this.view.topLeft;
var center = this.view.center;
var dontPost = false;
var raster;


$('#fileUpload').on('change', function() {
	var input = document.querySelector('#fileUpload');
	var file = input.files[0];
	var reader = new FileReader();

	reader.onload = function(event) {
		var image = document.createElement('img');
		image.onload = function() {
			raster = new Raster(image);
			raster.visible = false;
			imgRaster = raster;
		};
		image.src = event.target.result;

	};
	reader.readAsDataURL(file);
})
