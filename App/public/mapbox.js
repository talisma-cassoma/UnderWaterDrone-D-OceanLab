//mapBox config 
function mapsConfig(){
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaXNtYSIsImEiOiJja3Q3eTR6YTQweDNiMnZwZGM5cndqbHk1In0.fHYQU0xHlOwsbVH_lcFiIw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 4,
        center: [-86.622088, 41.878781]
        });
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
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
        this.style.width = "50vw"
        this.style.height= "50vh"
        isfullscreen= true
    }else{
        this.style.width = "350px"
        this.style.height= "450px" 
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
    document.querySelector(".pressure").innerHTML=  `${data.sensors.pressure}`
    document.querySelector(".temperature").innerHTML=   `${data.sensors.temperature}`
    document.querySelector(".specieIdentified").innerHTML=  `${data.analyzedImage.especieFound}`
   // console.log(data)
})