
# UWDrone🤖

authors: 
Talisma Manuel & Jeremias Bartolomeu<br>
v1.0

We pretend to built a not expensive ROV based on wifi control, now we know that it isnt as simple as it look like.
things like the range of the wifi signal, the fluctuations in the T-S profiles of water masses are some factors to keep in mind.

knowing all that, we built one drone working under those limitations.

this is a stable projet version that we control the drone composed of:<br> 
- ESP32 CAM 
- Node MCU 1.0V    
- Diode Rectifier - 
- 3 DC Motor with     
- L298N Motor Driver Board Module   
- N-Channel MOSFET 60V 30A  
- 2 10K Ohm Resistor  
- Adafruit Ultimate GPS Breakout - 66 channel w/10 Hz updates - Version 3  
- DHT22/11 Humidity and Temperature Sensor  
- BreadBoard   
- Jumper Wires Pack - M/M   
- Jumper Wires Pack - M/F   

 
## Tools and technologies:

we capture the images through a camera integrated into our circuit and we visualize the images thanks to the interface made with javascript (both backend and frontend).

projet interface 

<img src="App/public/images/interface.png" alt="projet interface" />
For this project we choose to use the ESP8266(Node MCU 1.0V) and ESP32 microcontroller, for purely financial reasons. Associated with an OV2640 camera (2MG pixels) able to transmit in WIFI and live a video stream, images, the ESP32 is also programmable using the Arduino IDE. The two ESP choosed are also programmable using the Arduino IDE.

The three-thruster arrangement only allows forward / reverse / yaw movement, while the fourth thruster also allows for lateral translation. The five-thruster variant allows all four horizontal thrusters to push simultaneously in any horizontal direction.
In addition, placing the propellant outside the longitudinal axis of the vehicle will allow better turning moment, while providing the vehicle with high longitudinal stability.
As our misson is very simple we chose the three thruster design, so here is the architecture we chose for our drone:

<p align="center" >
<img src="App/public/images/3Ddesign.png" alt="projet 3Ddesign" width=40%/> &nbsp; <img src="App/public/images/projetImage.png" alt="projet image" width=40%/>
</p><br/>

based on **santoshsn** water drone design on tinkercad


this is how the robot circuit look like <br/>
<p align="center" >
<img src="App/public/images/bot_circuit.png" alt="projet circuit"/>
<img src="App/public/images/esp32cam.png" alt="esp32cam" width=30%/>
</p>
We recommend soldering a 0.1uF ceramic capacitor to the positive and negative terminals of the DC motor, as shown in the diagram to help smooth out any voltage spikes. and do not connect vin to L298N 5+<br>
we still increasing features to the projets so this circuit shall be more complete with time 

we control our drone through a web browser (client side), The front-end of our web app communicates with the back-end by web socket protocol, for that we use the socket.io which is a JavaScript library for real-time web applications

this app use firebase as midleware for comunicate our drone to our nodejs server  

<img src="App/public/images/firebaseDatabase.png" alt="firebase database"/><br/>

we're using RCNN-mask to identify and classify the fish in the images. 

<img src="App/public/images/identifiedSpecie.png" width=25%/>

<a href="https://www.notion.so/projeto-INTELLCAP-8fc0aab3e8a24e9c8a9eb93412a3a829">chaier de charge sur NOTION</a>
