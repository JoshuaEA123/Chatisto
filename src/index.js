
const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// settings
app.set('port' , process.env.PORT || 3000);


// llama a la funcion de sockets en la carpeta sockets
require('./sockets') (io);

// obtiene la direccion actual del proyecto
// console.log(path.join(__dirname , 'public'));




// enviando archivos statics
app.use(express.static(path.join(__dirname , 'public')));

// empezando el servidor
server.listen(app.get('port') , () => {

    console.log('servidor en puerto ', app.get('port'));

} );