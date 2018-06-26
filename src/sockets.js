
module.exports = function (io) {


    let users = {};




    io.on('connection', _socket => {

        console.log('Nuevo Usuario Conectado');
        


        _socket.on('new user', (data,cb) =>{

            console.log(data);
            if (data in users){

                cb(false);

            }else {

                cb(true);
                _socket.nickname = data;
                users[_socket.nickname] = _socket;
                updateNickNames();
            }

        });


       _socket.on('send message' ,  (data,cb) => {

            var msg = data.trim();

            if (msg.substr(0,3) === '/w '){

                msg = msg.substr(3);
                const index = msg.indexOf(' ');

                if (index !== -1) {
                    
                    var name = msg.substring(0, index);

                    var msg = msg.substring(index + 1);

                    if (name in users) {
                        users [name].emit('whisper', {

                            msg,
                            nick: _socket.nickname 

                        });
                    }else {
                        cb('Error! Ingrese Nombre Valido');
                    }
                }else {

                    cb('Error! Porfavor ingrese su mensaje');
                }

            }else {

            console.log(data);
            io.sockets.emit('new message' , {

                msg:data,
                nick : _socket.nickname
            });

        }

          

        });


        _socket.on('disconnect' , data =>{

            if (!_socket.nickname) return;
            delete users[_socket.nickname];
            updateNickNames();
        });


        function updateNickNames(){

            io.sockets.emit('usernames',Object.keys(users));

        }





    });


}

