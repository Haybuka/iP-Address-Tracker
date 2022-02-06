const form = document.querySelector('form')
let ipDisplay = document.querySelector('.ip-display');
let  ipAddress = document.querySelector('.ip-address')
let  ipIsp = document.querySelector('.ip-isp')
let  iptimeZone = document.querySelector('.ip-timeZone')


const overlay = document.querySelector('.overlay')
form.addEventListener('submit',function (e){
  e.preventDefault()
  let inputData = this[0].value;
  // Regular expression to check if string is a IP address
  const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

if(regexExp.test(inputData)){
    overlay.classList.remove('hidden')
    ipData(inputData)

 this[0].value=''

 } else{
    const errMsg = document.createElement('span');
     errMsg.innerHTML = 'not a valid Ip Address'
     errMsg.setAttribute('class','error-msg')
     form.append(errMsg)
     setTimeout(() => {
         errMsg.remove()
     }, 2000);
 }

})

const ipData = async (inputData='8.8.8') =>{
   const data= await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_ej8ONrT2E7rC02ncS4hEfErduuexo&ipAddress=${inputData}`)
   .then(response => response.json())
   .then(data => {
       const{ip,isp,location} = data
       const {country,region,timezone} = location
        createData(ip,isp,country,region,timezone)
   })
   .catch(e =>{
    // const {isp,ip,location} = 'network error'
    createData(ip='network',isp="error",country="",region="error",timezone="error")
   })
}

// ipData()

function createData(ip,isp,country,region,timezone){
    //select corresponding tags

     
    const ipSpan = document.createElement('span')
    const ispSpan = document.createElement('span')
    const countrySpan = document.createElement('span')
    const regionSpan = document.createElement('span')
    const timeZoneSpan = document.createElement('span')
    
    //append info

    ipSpan.innerHTML = ip
    ispSpan.innerHTML = isp
    countrySpan.innerHTML = country
    regionSpan.innerHTML = `${region}, ${country}`
    timeZoneSpan.innerHTML = `UTC ${timezone}`

    ipDisplay.append(ipSpan)
    ipAddress.append(regionSpan)
    ipIsp.append(ispSpan)
    iptimeZone.append(timeZoneSpan)
    overlay.classList.add('hidden')

}



function getLocation() {
    navigator.geolocation ?  navigator.geolocation.getCurrentPosition(success, error) :
     alert(`Allow Location Access`)
  }

  function success({ coords }) {
    latitude = coords.latitude;
    longitude = coords.longitude
    let zoom = 5
    callMap(latitude,longitude,zoom)
  }

  function error(err) {
      //set a default error point
    callMap(0.637178,18.984375,2)
  }


  function callMap(latitude,longitude,zoom){
      //map to the document id of map
// set view takes in lat and long and the zoom view
var map = L.map('map').setView([latitude, longitude], zoom);
//initialize map layer
var osm = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2Fyb2wwMSIsImEiOiJja3o5bm42dXUwM3FuMm9zNjhha3E3M21qIn0.l8lCE5iB5ZCn-OhDnjCmpA'
}).addTo(map)
//marker suggests pin, and location,then add to map to show
var newIcon = L.icon({
    iconUrl : '../images/icon-location.svg',
    iconSize : [25,30],
})
var singleMarker =L.marker([latitude, longitude],{icon:newIcon,draggable:true});
var popup = singleMarker.bindPopup('<b> You are here </b>'+ singleMarker.getLatLng()).openPopup()
popup.addTo(map)

//use leaflet tile layer provider to change map view (default is the tile layer line 78)
// set the new tile layer to a variable as in line 78, then load it on the dom by using the addTo(map)
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
        console.log('called')
}

map.on('click', onMapClick);
  }
  getLocation()
