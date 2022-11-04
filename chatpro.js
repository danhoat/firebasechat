(function($){
    var Message ={};
    $(document).ready(function(){
        const config = {
            apiKey: "AIzaSyC1arzN1536rUQA9G-J_pT-YzKgdQzfxaU",
            authDomain: "chat-8e454.firebaseapp.com",
            databaseURL: "https://chat-8e454-default-rtdb.firebaseio.com",
            projectId: "chat-8e454",
            storageBucket: "chat-8e454.appspot.com",
            messagingSenderId: "91376384591",
            appId: "1:91376384591:web:0e5db36107ffb3b9a7483a"
        };


        firebase.initializeApp(config);


        var playersRef = firebase.database().ref('chatpro'); // get all records table name == chatpro.
        var date =  new Date();
        // playersRef.set ({
        //     JohnDavid: {
        //         sender: 'John',
        //         text: 'hello 1',
        //         time: date,
        //     },

        //    AmandaKent: {
        //         sender: 'Amanda',
        //         text: 'How are you?',
        //        time: date,
        //    },
        //    AmandaKent: {
        //         sender: 'Kent',
        //         text: 'Thank you',
        //         time: date,
        //    }
        // });

        window.Message = playersRef.child("messages"); // get and auto create if not exist.
        // JohnDavid.set({}); remove all
        // JohnDavid.push({
        //       sender: 'John',
        //       text: 'hello ne 111',
        //       time: date,
        // });
        // JohnDavid.push({
        //       sender: 'John',
        //       text: 'hello lan 222',
        //       time: date,
        // });
        // JohnDavid.push({
        //       sender: 'David',
        //       text: 'I am David lan 222',
        //       time: date,
        // });
        $('#messageInput').keypress(function (e) {

            if (e.keyCode == 13) {
                $(".form-chat").submit();
                return false;
                var name = $('#nameInput').val();
                var text = $('#messageInput').val();
                if(text == ''){ return false; }

                var today = new Date();
                var day = today.getDate() + "";
                //var month = (today.getMonth() + 1) + "";
                var year = today.getFullYear() + "";
                var hour = today.getHours() + "";
                var minutes = today.getMinutes() + "";
                var seconds = today.getSeconds() + "";
                var options = { month: 'long'};
                var month = new Intl.DateTimeFormat('en-US', options).format(today);
                var time_string = hour + ':' +minutes +'-' + month + '/' + day + '/' + year;

                window.Message.push({
                    user_id: 11,
                    sender: 'John',
                    text: text,
                    date_add: time_string,
                });
                $('#messageInput').val('');
            }
        });
        $(".form-chat").submit(function(event){
            var form    = $( this );
            var message = form.find("#messageInput").val();
            var sender  = form.find("select.sender").val();
            if(message == ''){
                return false;
            }
            let user_id = 11;
            if( sender == 'David')
                user_id = 11;

            var record = {user_id: user_id, sender:sender,message:message, date_add: 'today'};
            window.Message.push(record);
            $(".btn-reset").trigger('click');
            form.find("select.sender").val(sender).change();
            event.preventDefault();
            return false;
        })
        var i = 1;
        window.Message.on('child_added', function(snapshot) {
            console.log('child_add event');
            var item    = snapshot.val();
            var key     = snapshot.key;
            displayChatMessage(item, key);
            i++;
        });
        window.Message.on('child_removed', function(snapshot) {
            var deletedPost = snapshot.val();
            console.log("Chat was removed", deletedPost);
        });
        function displayChatMessage(item, key) {
            var sender      = item.sender;
            var message     = item.message;
            var avatar      = '<img src="img/avatar.png" class="user-avatar" />';
            var avatar_2    = '<img src="img/avatar2.jpg" class="user-avatar" />';
            if(sender == 'David'){
                avatar = avatar_2;
            }
            var msg_detail = '<div class="msg-detail">' +  '<label class="sender-name">'+ sender+'</label><p>' + message +'</p><span class="message-time">' + item.date_add+ '</span></div>';
            $('<li class = "message-item msg-item'+key+'"/>').html(msg_detail).prepend($('<span class="avatar" />').html(avatar)).appendTo($('#messagesDiv'));
            $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
        };
    });
})(jQuery);