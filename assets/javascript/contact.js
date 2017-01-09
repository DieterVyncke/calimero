//--------------------
//	GOOGLE MAPS
//--------------------

if (document.getElementById('map')){
  var myLatlng = new google.maps.LatLng(51.179094, 3.742570);
  var mapOptions = {
       zoom: 14,
       center: myLatlng,
       scrollwheel: false,
       mapTypeId: google.maps.MapTypeId.ROADMAP
   };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var image = {
    url: '../themes/luncherie/assets/images/marker.png',
    scaledSize: new google.maps.Size(80, 80),
   // The origin for this image is (0, 0).
   origin: new google.maps.Point(0, 0),
   // The anchor for this image is the base of the flagpole at (0, 32).
   anchor: new google.maps.Point(10, 0)
 };

  var marker = new google.maps.Marker({
     position: myLatlng,
     map: map,
     icon: image,
   });
}
