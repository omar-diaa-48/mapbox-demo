import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

var resultElement = document.getElementById('result')

// mapbox public access token
mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcjQ4IiwiYSI6ImNrcjNudnFwdzFweXgyd3M2anhuNG92MjUifQ.12uhr1bapx7w_KPF8QWerw';

// intialize map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[31.235078, 30.044401],
  zoom:8
});


// to support arabic in the map street names
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  true // Lazy load the plugin
  );

// add search control
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  countries:'eg',
  language:'en,ar',
  marker:false,
  limit:10
  })
);

// add navigation control
map.addControl(new mapboxgl.NavigationControl());
let geoTracker =new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true,
  showUserLocation:false
  })

map.addControl(geoTracker)

// on map load event
map.on('load', () => {
  
  // trigger the geoTracker to detect the current location of the user
  geoTracker.trigger();

  // add source of kml geojson
  map.addSource('branches', {
    type:'geojson',
    data:'./doc-json.json'
  });

  // add layer of kml geojson
  map.addLayer({
    id:'branches-layer',
    type:'fill',
    source:'branches',
    paint: {
      'fill-color': 'rgba(200, 100, 240, 0.2)',
      'fill-outline-color': 'rgba(200, 100, 240, 1)'
      }
  });

  // listen to clicks on map if branches-layer was below, then trigger the click function
  map.on('click', 'branches-layer', (e) => {
    // to check if the click is comming from a map moveend event
    if(e.originalEvent.commingFromMove){
      if(e?.features){
        resultElement.innerHTML = `${e?.features[0]?.properties?.name}, ${e?.features[0]?.properties?.id}`
      }
    }
    // to stopPropagation from reaching the map
    e.cancelBubble = true
  });

  // if the bubble reaches this then the moveend was at a location not served by any branch
  map.on('click', (e) => {
    if(!e.cancelBubble){
      resultElement.innerHTML = 'Can`t deliver here';
    }
  })

  // an orange marker which is always in the center
  const marker = new mapboxgl.Marker({
    color:'#FF5F00'
  })
  .setLngLat(map.getCenter())
  .addTo(map)

  // when ever the map view is moved we set the marker to the center of the map
  map.on('move', (e) => {
    marker.setLngLat(map.getCenter())
  })

  // when ever the map view is moved, at the end of the move we fire the event click and check if its a branch or not
  map.on('moveend', (e) => {
    const coords = map.getCenter();
    map.fire('click', {
      lngLat:coords,
      point:map.project(coords),
      originalEvent : {
        cancelBubble:true,
        commingFromMove:true
      }
    })
  })
})
