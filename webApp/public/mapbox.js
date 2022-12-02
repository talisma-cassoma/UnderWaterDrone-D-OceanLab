//mapBox config 
function mapsConfig(){
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaXNtYSIsImEiOiJja3Q3eTR6YTQweDNiMnZwZGM5cndqbHk1In0.fHYQU0xHlOwsbVH_lcFiIw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.9796, 40.7105],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
    });
 
    map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
 
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer(
    {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
 
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        [       'zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
        },
        labelLayerId
        );
        });
            // Add zoom and rotation controls to the map.
           map.addControl(new mapboxgl.NavigationControl());
           // Create a new marker.
            const marker = new mapboxgl.Marker({
                    color: "#FFBA69",
                    draggable: true
                    })
            .setLngLat([-73.9796, 40.7100])
            .setPopup(new mapboxgl.Popup().setHTML("<p>salut <br>c'est moi,<br> drone</p>")) // add popup
            .addTo(map);
}

//turn DOM elemets dragble
function dragBox(){
    const {target, clientY, clientX }= event
    if(target.className == "moving_box" && isMousedown){
        target.style.top = `${clientY - target.offsetHeight/2}px`;
        target.style.left= `${clientX - target.offsetWidth/2}px`;

        //let coor = `Coordinates: (${target.style.left}, ${target.style.top})`;
        //console.log(coor)
        //console.log(event.target.className)
    }
}

const showMaps =(config)=>{
    return new Promise((config)=>{
    //#stop animation
    // charge map 
    config()
    });
}

let isMousedown= false
const mouvingBox =  document.querySelectorAll(".moving_box")
const onScreen= document.querySelector('body')
const streamingvideo = document.querySelector("#stream")

//show maps and after active event lister   
showMaps(mapsConfig()).then((res, rej)=>{
    mouvingBox.forEach(box =>{
        box.addEventListener('mousedown',box=>{isMousedown= true})
        box.addEventListener('mouseup', ()=> isMousedown= false) 
        onScreen.addEventListener("mousemove", dragBox)
    })
})

//full screen image captured from bot  
let isfullscreen= false
streamingvideo.addEventListener('dblclick', function rezire(){
    if(!isfullscreen){
        this.style.width = "500px"
        this.style.height= "500px"
        isfullscreen= true
    }else{
        this.style.width = "350px"
        this.style.height= "350px" 
        isfullscreen= false
    }
})
//elements on body 
//comunicate with backend
let socket= new io('http://localhost:5500')   

//listen to incoming data
socket.on('sendingData', data=>{

    streamingvideo.src=`${data.imageCaptured.base64Image}`
    document.querySelector(".ph").innerHTML=  `${data.sensors.ph}`
    document.querySelector(".pressure").innerHTML=  `${data.sensors.pressure}Pa`
    document.querySelector(".temperature").innerHTML=   `${data.sensors.temperature}°C`
    document.querySelector(".specieIdentified").innerHTML=  `${data.analyzedImage.especieFound}`
   // console.log(data)
})