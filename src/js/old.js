import L, { marker } from 'leaflet';
import { findNearestBranch } from './util';
// import { branches } from '../db/branches'
import axios from 'axios';
import { userIcon, branchIcon } from './icons'
// import "leaflet/dist/leaflet.css"
import { kml } from "@mapbox/leaflet-omnivore";

// const dbBranches = [
//   {name:'Al-ahly', lat:31.3499478 , lng:30.0685426},
//   {name:'Concord Mall', lat:31.4825517 , lng:30.0249045},
//   {name:'Downtown Mall', lat:31.4116844 , lng:30.017431}
// ]


const btn = document.getElementById('result')

const map = L.map('map').setView([30.045201, 31.242078], 12)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var userLocation = []
var userMarker = L.marker();
navigator.geolocation.getCurrentPosition(loc => {
  const { latitude, longitude } = loc.coords
  userLocation = [latitude, longitude]
  userMarker = L.marker(userLocation, { icon: userIcon, riseOnHover: true }).addTo(map)
  map.flyTo(userLocation)
},
  (error) => console.log(error),
  { enableHighAccuracy: true })

// const branchPolygons = []
// branches.forEach(branch => {
//   const polygon = L.polygon(branch.coordinates).addTo(map)
//   branchPolygons.push({polygon, id: branch.id, name: branch.name})
//   L.marker(polygon.getCenter(), {icon:branchIcon}).addTo(map)
//       .bindTooltip(`I'm buffalo, ${branch.name} branch!.<br> How can i help?`)
// });

// map.on('click', (e) => findNearestBranch(e.latlng, branchPolygons))

map.on('move', () => {
  userMarker.setLatLng(map.getCenter())
})

// map.on('dragend', () => {
//   axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${userMarker.getLatLng().lat}+${userMarker.getLatLng().lng}&key=f5a3f221bf964f3189615751caac1ae1`)
//       .then(res => {
//         document.querySelector('#address').innerHTML = res.data.results[0].formatted
//       })
//       .catch(console.log)
// })


const kmlData = kml('./doc.kml')
// console.log(kml);
// let branches = [];
// let nearBranches = []
// const parser = new DOMParser();

kmlData
  .on('ready', function () {
    // branches = Object.entries(kmlData._layers)
    // console.log(kmlData._layers);
    // branches.forEach(branch => {
    //   console.log(branch[1]?.feature?.properties?.name);
    //   console.log(branch[1]?.feature?.id);
    // console.log(branch[1]?._latlng?.toBounds(1).contains({ lat: 30.02490450000005, lng: 31.48255170000005 }));
    // console.log(branch[1]);
    // });
    // this.setStyle({color:'#fff'})
  })
  .addTo(map)

// map.on('dragend', (e) => {
//   console.log('map dragend', e);
//   console.log('map dragend', e?.target._lastCenter);
//   // kmlData.fire('click', e?.target._lastCenter)
// })

console.log(kmlData);

kmlData.on("click", (e) => {
  console.log('click', e);
  const {feature} = e?.layer;
  if(feature){
    alert(`branch ${feature?.properties?.name} with id ${feature?.id}`);
  }
})

// kmlData.on('mouseup', (e) => {
//   console.log('mouseup', e);
// })

// kmlData.on('dragover', (e) => {
//   console.log('dragover', e);
// })

// kmlData.on('drag', (e) => {
//   console.log('drag', e);
// })

// kmlData.on('locationfound', (e) => {
//   console.log('locationfound', e);
// })

// kmlData.on('dragover', (e) => {
//   console.log('dragover', e);
// })

// kmlData.on("drag", e => {
//   console.log('drag');
//   console.log(e);
// })

// kmlData.on("move", e => {
//   console.log('move');
//   console.log(e);
// })

// kmlData.on("pan", e => {
//   console.log('pan');
//   console.log(e);
// })

// map.on('click', (e) => {
//   console.log(e.latlng);
//   branches.forEach(branch => {
//     if(branch[1]?._latlng?.toBounds(100).contains(e.latlng)){
//       nearBranches.push(branch);
//       alert(branch[1]?.feature?.properties?.name)
//     }
//     if(branch[1]._bounds?.contains(e.latlng)){
//       alert(`branch ${branch[1]?.feature?.properties?.name} with id ${branch[1]?.feature?.id}`)
//     }
//   })
// })

// { lat: 30.02490450000005, lng: 31.48255170000005 }

// map.on('click', (e) => {
//   alert(e.latlng);
// })


// // import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl'
// import L, { marker } from 'leaflet';
// import { kml } from "@mapbox/leaflet-omnivore";

// mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcjQ4IiwiYSI6ImNrcjNudnFwdzFweXgyd3M2anhuNG92MjUifQ.12uhr1bapx7w_KPF8QWerw';
// const map = new mapboxgl.Map({
//   container:'map',
//   center:[31,30],
//   zoom:12
// })

// map.addControl(new mapboxgl.NavigationControl());

// var userLocation = []
// var userMarker;

// map.on('click', (e) => {
//   console.log(e);
// })

// map.on('load', () => {
//   navigator.geolocation.getCurrentPosition(loc => {
//     const { latitude, longitude } = loc.coords
//     userLocation = [latitude, longitude]
//     // userMarker = L.marker(userLocation, { icon: userIcon, riseOnHover: true }).addTo(map)
//     // map.flyTo({
//     //   center: userLocation,
//     //   essential: true
//     // })
//   }, (err) => {
//     console.log(err);
//   }, {
//     enableHighAccuracy:true
//   })
// })

// kml('./doc.kml').addTo(map)