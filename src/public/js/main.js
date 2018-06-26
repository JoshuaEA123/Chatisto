$(function(){

    
    const socket = io();

    // obteniendo elementos del DOM desde pa interfaz

    const $messageForm  = $('#message-form');
    const $messageBox = $('#message');
    const $chat  = $('#chat')
    //

    // obtener formulario del formulario Nick

    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');
    
    const $users = $('#usernames');

    const $nickPersonal = $('#NickPersonal');

    $nickForm.submit(e => {


        e.preventDefault();

        socket.emit('new user', $nickname.val() , data => {

            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
               
            }else {
                $nickError.html(
                    ' <div class="alert alert-danger"> Ese usuario ya exists </div> '
                );
            }

            $nickname.val('');
        } );
    });

    // eventos

    $messageForm.submit(e => {
    
        e.preventDefault();

        socket.emit('send message' , $messageBox.val() , data => {

            $chat.append(`<p class="error"> ${data} </p>`);
            
        });

        $messageBox.val('');
        //console.log($messageBox.val());

    });

    socket.on('new message' , function (data){

        $chat.append('<b>' + data.nick + '</b>:  ' + data.msg + '<br/>');

    });

    socket.on('usernames', data => {

        let html ='';

        for (let i = 0 ; i < data.length ; i++){

            
            html += `<p><i class="fas fa-user" ></i> ${data[i]} </p> `
         //  htm2 += `<h3> ${data[i]} </h3>`
        }
        $users.html(html);
       // $nickPersonal.append(`<h3> ${data[i]} </h3>`);





    });



    socket.on('whisper' , data => {

        $chat.append(`<p class="whisper"> <b> ${data.nick}: </b> ${data.msg}</p>`);

    });

})



