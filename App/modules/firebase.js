var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("..//intellcapbot-firebase-adminsdk-gyxhm-04b84f656a.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://intellcapbot-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();   

//gravar dado de imagem no firebase
let setBot = function (branch, value){
  let data={}
  if(branch=='rudder angle'){data = {angle: value}}
  else if(branch=='connection'){data = {connection: value}}
  else if(branch=='dive'){data = {dive: value}}
  else if(branch=='rotation'){data = {rotation: value}}

  db.ref('/controls').update(data)
    }
    
    //leitura dos dados do firebase 
    var readBotSatus = db.ref('/');

module.exports = {setBot, readBotSatus}