const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const handlebars = require('express-handlebars')
//const bodyParser = require('body-parser')
//var cors = require('cors')

const {setBot, readBotSatus} = require('./modules/firebase')


//app.use(cors())
//config hbs
    //tamplate engine
    app.engine('handlebars', handlebars({defaultlayout: 'main'}))
    app.set('view engine', 'handlebars')

//rotas
//let i
io.on('connection', (socket) => {
    //console.log(`a user connected ${socket.id}`) 
    readBotSatus.on('value', (snapshot) => {//listen to firebase changes 
        const data = snapshot.val(); //save get and save data
        //console.log("imagem"+i)
        socket.emit('sendingData', data) //sending data (to frontend)
        })
        socket.on("setBot", (branch, data) => {
            //console.log(`the data: ${data} and the branch: ${branch}`);
            setBot(branch, data)
          }); 
    });
    app.get('/', function(req, res){
        res.render('home')////send html(hb) page 
    })

    app.use(express.static('public'));//rotas para arquivos staticos como .css , .js  ... etc
      
//SERVIDOR
  server.listen(5500, () => {
    console.log('listening on :5500 => tudo pronto pra começar');
  });