# intellCapBot🤖

authors: 
Talisma Manuel & Jeremias Bartolomeu<br>


we use esp32 camera to catupe photos and Convolutional neural network for analyse it 

intellcapBot is robot that works like a sumarine 
our goal is to build a robot that dive into the sea, film and recognize marine species using convolutional neural networks

this is how to get a firebase collection and extrat docs values in arduino



```cpp
//#include <IOXhop_FirebaseESP32.h>
   Firebase.stream("/ controls", [](FirebaseStream stream) {
    String eventType = stream.getEvent();
    eventType.toLowerCase();
     
    //Serial.print("event: ");
    //Serial.println(eventType);
   
   if (eventType == "put") {
      
      String path = stream.getPath();
      Serial.print("Path: ");
      Serial.println(path);
    
      String  command = stream.getDataString();
      Serial.print("command: ");
      Serial.println(command);
     
      if(path == "/dive"){//dive button on/off 
           if(command =="ON"){
              digitalWrite(IN3_PIN, LOW);
              digitalWrite(IN4_PIN, HIGH);
              }
          else if(command =="OFF"){
              digitalWrite(IN3_PIN, HIGH);
              digitalWrite(IN4_PIN, LOW);
            }
         }
 
       else if(path == "/rotate"){//rotatate clockwise/unclockwise
          if(command =="clockwise"){
              digitalWrite(IN1_PIN, LOW);
              digitalWrite(IN2_PIN, HIGH);
          }
          else if(command =="unclockwise"){
              digitalWrite(IN1_PIN, HIGH);
              digitalWrite(IN2_PIN, LOW);
          }
        }
   }
  });
```

<a href="https://www.notion.so/projeto-INTELLCAP-8fc0aab3e8a24e9c8a9eb93412a3a829">chaier de charge sur NOTION</a>
