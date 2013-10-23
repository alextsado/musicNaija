var myCamera = {
    // Application Constructor
initialize: function() {
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    
    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",this.onDeviceReady,false);

},

onDeviceReady: function() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
},
onPhotoDataSuccess: function(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
    
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
},
onPhotoURISuccess: function(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
    
    // Get image handle
    //
    var largeImage = document.getElementById('campic');
    
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
},
capturePhoto: function() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                                destinationType: destinationType.DATA_URL });
},
capturePhotoEdit: function() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                                destinationType: destinationType.DATA_URL });
},
getPhoto: function(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: source });
},
onFail: function(message) {
   alert('Failed because: ' + message);
}

};
