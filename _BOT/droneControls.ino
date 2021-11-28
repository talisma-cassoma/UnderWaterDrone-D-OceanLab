//ESP8266 Node MCU 1.0V 

#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>
//#include <Servo.h>
#include <DHT.h>
//#include "Adafruit_GPS.h"   


#define ssid "******************"     
#define password "*********************" 
#define FIREBASE_HOST "****************" //Firebase Project URL Remove "https:" , "\" and "/"
#define FIREBASE_AUTH "****************"      


//MOTOR LEFT PINS
const int DCMOTORDRIVERL298_PIN_INT1	5
const int DCMOTORDRIVERL298_PIN_INT2	0
const int DCMOTORDRIVERL298_PIN_ENA	4

//MOTOR RIGHT PINS
const int DCMOTORDRIVERL298_PIN_INT3	2
const int DCMOTORDRIVERL298_PIN_INT4	16
const int DCMOTORDRIVERL298_PIN_ENB	14

//UPPER MOTOR PINS
const int motor3 15; 

//DHT PINS
const int DHT_PIN_DATA	9
const int DHTTYPE DHT11
DHT dht(DHT_PIN_DATA, DHTTYPE);

//GPS PINS
#define GPSADAFUIT_PIN_RX	13
#define GPSADAFUIT_PIN_TX	12

int angleDegree = 0; 

FirebaseData Humidity_Temp_sensor;
FirebaseData Drone_moves;
FirebaseData Dive;

void turnOff(uint8_t motor1, uint8_t motor2){
digitalWrite(motor1, LOW);
digitalWrite(motor2, LOW);

}
void turnOn(uint8_t motor1, uint8_t motor2){
digitalWrite(motor1, HIGH);
digitalWrite(motor2, HIGH);
}
void setClockwise(uint8_t motor1, uint8_t motor2){
digitalWrite(motor1, HIGH); 
digitalWrite(motor2, LOW);
}
void setUnclockwise(uint8_t motor1, uint8_t motor2){
digitalWrite(motor1, LOW); 
digitalWrite(motor2, HIGH);
}

void setup() {
  
  Serial.begin(115200);
   // MOTOR LEFT:
   pinMode(DCMOTORDRIVERL298_PIN_INT1, OUTPUT);
   pinMode(DCMOTORDRIVERL298_PIN_INT2, OUTPUT);
   pinMode(DCMOTORDRIVERL298_PIN_ENA, OUTPUT);
   
   //MOTOR RIGH:
   pinMode(DCMOTORDRIVERL298_PIN_INT3, OUTPUT);
   pinMode(DCMOTORDRIVERL298_PIN_INT4, OUTPUT);
   pinMode(DCMOTORDRIVERL298_PIN_ENB, OUTPUT);
   
   //turn off the motors
   //left motor
   turnOff(DCMOTORDRIVERL298_PIN_INT1, DCMOTORDRIVERL298_PIN_INT2);
   digitalWrite(DCMOTORDRIVERL298_PIN_ENA);
   
   //right motor
   turnOff(DCMOTORDRIVERL298_PIN_INT3, DCMOTORDRIVERL298_PIN_INT4);
   digitalWrite(DCMOTORDRIVERL298_PIN_ENB, LOW);
   
  
  dht.begin();
   
   WiFi.begin (ssid, password);
   while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println ("");
  Serial.println ("WiFi Connected!");
  
  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);  
  //Firebase.reconnectWiFi(true);
}

void DHT11sensorData(){
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("C  ,"));
  Serial.print(f);
  Serial.println(F("F  "));

  if (Firebase.setFloat(Humidity_Temp_sensor, "/sensors/temperature", t))
  {
    Serial.println("PATH: " + Humidity_Temp_sensor.dataPath());
    Serial.println("TYPE: " + Humidity_Temp_sensor.dataType());
    //Serial.println("ETag: " + Humidity_Temp_sensor.ETag());
    Serial.println("------------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + Humidity_Temp_sensor.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }
}
void BotControls(){
    
       //moves forward
       delay(1500);
       //clockwise
       setClockwise(DCMOTORDRIVERL298_PIN_INT1, DCMOTORDRIVERL298_PIN_INT2);

       //unclockwise
       setUnclockwise(DCMOTORDRIVERL298_PIN_INT3, DCMOTORDRIVERL298_PIN_INT4);
    
    if (Firebase.getString(Drone_moves, "/controls/turn")) {
      if (Drone_moves.dataTypeEnum() == fb_esp_rtdb_data_type_string) { 
        String turn = Drone_moves.to<const char *>();
        if( turn == "on"){

            if (Firebase.getInt(Drone_moves, "/controls/angle")) {

               if (Drone_moves.dataTypeEnum() == fb_esp_rtdb_data_type_integer) {
                  angleDegree = Drone_moves.to<int>();
                  
                    //turn to RIGHT
                    if((angleDegree >= 0 && angleDegree < 90 )|| (angleDegree > 270  && angleDegree <= 360)){

                      //clockwise
                      setClockwise(DCMOTORDRIVERL298_PIN_INT1, DCMOTORDRIVERL298_PIN_INT2);

                      //stop
                      turnOff(DCMOTORDRIVERL298_PIN_INT3, DCMOTORDRIVERL298_PIN_INT4);
                       //analogWrite(motor1, 244);
                       //analogWrite(motor2, angleDegree);
            }
                    //turn to LEFT
                    if((angleDegree >= 90 && angleDegree <= 270) ){
             
                      //analogWrite(motor1, 200);
                      //analogWrite(motor2, 244);
                      //stop
                      turnOff(DCMOTORDRIVERL298_PIN_INT1, DCMOTORDRIVERL298_PIN_INT2);

                      //unclockwise
                      setUnclockwise(DCMOTORDRIVERL298_PIN_INT3, DCMOTORDRIVERL298_PIN_INT4);
                     }
                   }
                } else {Serial.println(Drone_moves.errorReason());}
              }

           } else {Serial.println(Drone_moves.errorReason().c_str());
           
            //moves forward
            delay(1500);
            //clockwise
            setClockwise(DCMOTORDRIVERL298_PIN_INT1, DCMOTORDRIVERL298_PIN_INT2);

             //unclockwise
             setUnclockwise(DCMOTORDRIVERL298_PIN_INT3, DCMOTORDRIVERL298_PIN_INT4);
           }
  //make drone dives     
     if (Firebase.getString(Drone_moves, "/controls/dive")) {
      if (Drone_moves.dataTypeEnum() == fb_esp_rtdb_data_type_string) { 
        String dive = Drone_moves.to<const char *>();
        if( dive == "on"){
            
            digitalWrite(motor3, HIGH);
            //digitalWrite(motor3B, LOW);
            Serial.print("dive: ");
            Serial.println(dive);
          }else{
            digitalWrite(motor3, LOW);
            //digitalWrite(motor3B, LOW);
            Serial.print("dive: ");
            Serial.println(dive);
          }
        }

    } else {Serial.println(Drone_moves.errorReason().c_str()); }
        }
    }
void loop() {
  
  DHT11sensorData();
  //if connected do:
  if (Firebase.getString(Drone_moves, "/controls/connection")) {
      if (Drone_moves.dataTypeEnum() == fb_esp_rtdb_data_type_string) { 
        String connection = Drone_moves.to<const char *>();
        if( connection == "on"){
          Serial.print("connection: ");
          Serial.println(connection);
          BotControls();
          }
        if( connection == "off"){
        delay(1500);
        
        turnOff(DCMOTORDRIVERL298_PIN_INT1, DCMOTORDRIVERL298_PIN_INT2);
        
        turnOff(DCMOTORDRIVERL298_PIN_INT3, DCMOTORDRIVERL298_PIN_INT4;
        }
       }
   }
  }
