//joystick config and functionns
const joystick = nipplejs.create({
    zone: document.getElementById('joystick'),
    mode: 'static',
    position: {right: '180px', bottom: '180px'},
    color: 'red'
});
//get the joystick angle on mouve
joystick.on('move', function (evt, data) {
    //console.log(parseInt(data.angle.degree)); // joystick angle ::NB: servo max speed is 1ms 
    socket.emit('setBot', 'rudder angle', parseInt(data.angle.degree))
})

//buttons functions 
const controls_buttons= document.querySelectorAll('.button')//get all buttons

let rotation = false
let dive = false
let connection = false 

function setButtonFunction(event){ // set funtions for all buttons
    const buttonName = event.currentTarget.className
    if(buttonName=='button rotate'){
        setMotorRotation()
    }
    else if(buttonName=='button dive'){
        diveBot()
    }
    else if(buttonName=='button connect'){
        const buttonLabel = connect__to_Bot()
        event.currentTarget.innerHTML = buttonLabel
    }
}
//add click event to all buttons 
controls_buttons.forEach(button =>{
    button.addEventListener('click', setButtonFunction)
})

function setMotorRotation(){
    if(!rotation){
        socket.emit('setBot','rotation' , 'clockwise')
        rotation= true
    }
    else{
        socket.emit('setBot','rotation', 'unclockwise' )
        rotation= false
    }
}
function diveBot(){
    if(!dive){
        socket.emit('setBot','dive' , 'on')
        dive= true
    }
    else{
        socket.emit('setBot','dive', 'off' )
        dive= false
    }
}
function connect__to_Bot(){
    if(!connection){
        socket.emit('setBot','connection' , 'on')
        connection= true
        return 'OFF'

    }
    else{
        socket.emit('setBot','connection', 'off' )
        connection= false
        return 'ON'
    }
}
