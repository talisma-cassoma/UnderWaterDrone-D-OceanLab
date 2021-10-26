
# intellCapBot🤖

authors: 
Talisma Manuel & Jeremias Bartolomeu<br>
v1.0
this is a stable projet version that controls the bot with one dc mootor and a servo-motor 

## Functional description of needs:
 
- [x] Integrates a camera and a wifi module on bot for remote control. 
- [x] Dectect and recognize marine speicies from images stream. 
- [x] Create a simple and pleasant interface to control the device underwater.
- [ ] Design an impermeable structure to protect the circuit on the water.

## Tools and technologies:

Our drone is controlled by WIFI signal, we capture the images through a camera integrated into our circuit and we visualize the images thanks to the interface.

projet interface 

<kbd><img src="App/public/images/interface.png" alt="projet interface" /></kbd>

For this project we chose to use the ESP32 microcontroller, for purely financial reasons. Associated with an OV2640 camera (2MG pixels) able to transmit in WIFI and live a video stream, images. The ESP32 is also programmable using the Arduino IDE. The ESP32 is also programmable using the Arduino IDE.

this is how the robot circuit look like <br/>
<img src="App/public/images/bot_circuit.png" alt="projet circuit"/>
we still increasing features to the projets so this circuit shall be more complete with time 

we control our drone through a web browser (client side), The front-end of our web app communicates with the back-end by web socket protocol, for that we use the socket.io which is a JavaScript library for real-time web applications

this app use firebase as midleware for comunicate our robot to our server  

<img src="App/public/images/firebaseDatabase.png" alt="firebase database"/>


we're using mask-RCNN for classifie marines species 
<img src="App/public/images/identifiedSpecie.png" />

<a href="https://www.notion.so/projeto-INTELLCAP-8fc0aab3e8a24e9c8a9eb93412a3a829">chaier de charge sur NOTION</a>
