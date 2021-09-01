# intellCapBot🤖

authors: 
Talisma Manuel & Jeremias Bartolomeu<br>


we use esp32 camera to catupe photos and Convolutional neural network for analyse it 

intellcapBot is robot that works like a sumarine 
our goal is to build a robot that dive into the sea, film and recognize marine species using convolutional neural networks

this is how to get a firebase collection and extrat docs values in arduino
```cpp
//#include <IOXhop_FirebaseESP32.h>
   JsonObject& sensors = Firebase.get("/sensors");
   int pressure = sensors[String("pressure")].as<int>();
   String temp  = sensors[String("temperature")].as<String>();
   Serial.print("pressure: ");
   Serial.println(pressure);
   Serial.print("temp: ");
   Serial.println(temp);
```

<a href="https://www.notion.so/projeto-INTELLCAP-8fc0aab3e8a24e9c8a9eb93412a3a829">chaier de charge sur NOTION</a>
