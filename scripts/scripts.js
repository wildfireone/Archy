var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

$(function() {
    initmap();
    var myLayer = L.geoJson().addTo(map);
    map.on('click', function(e) {
        $.getJSON("http://mapit.wildfireone.com/point/4326/"+ e.latlng.lng + "," + e.latlng.lat+".json?generation=2", function(data) {

          var list = Object.keys(data);
           console.log(list);

            list.forEach(function(entry) {
                console.log(entry);
                var geojsonLayer = new L.GeoJSON.AJAX("http://mapit.wildfireone.com/area/"+entry+".geojson");
                geojsonLayer.addTo(map);
            });
        });
    });


});


function initmap() {
    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

    // start the map in South-East England
    map.setView(new L.LatLng(51.3, 0.7),9);
    map.addLayer(osm);
}