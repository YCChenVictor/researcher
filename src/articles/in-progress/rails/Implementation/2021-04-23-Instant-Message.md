---
layout: post
title: (Rails) Instant Message (Action Cable)
date: '2021-04-23T10:06:45.684Z'
categories: rails
note: 還沒時間修正完成
---

### Introduction

Action Cable

### new project

$ rails new instant\_message

### new controller for chat rooms

$ rails g controller rooms show

It will only create show for rooms view and controller and this webpage is going to show all the related received and sent messages between these two users.

Then go to `./rooms/show`

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__UAaGasQYryT5S__ck4KJBlQ.png)

Add the following HTML to `./rooms/show`

<div id="main">  
  <h2>Chat room</h2>  
  <div>  
    <div id="messages">  
      <p class="received">Hello</p>  
      <p class="sent">Hi</p>  
      <p class="received">How are you doing?</p>  
      <p class="sent">I am doing alright</p>  
    </div>

    <form id="send\_message">  
      <input type="text" id="message" name="message">  
      <button>Send</button>  
    </form>  
  </div>  
</div>

Then the webpage looks like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__eblKAxVYU4DRYYlPFRXIlA.png)

### Build Action Cable

$ rails g channel `chat_room`

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__BZSEL__JAdfz4uK8eU8j1HQ.png)

#### Test our channel connection

In `app/channels/chat_room_channel.rb`

```
def subscribed  stream_from "chat_room_channel"end
```

In `javascript/channels/chat_room_channel.js`

In `javascript/channels/chat_room_channel.js`

connected() {  
  // Called when the subscription is ready for use on the server  
  `console.log("Connected to the chat room!");  
`}

Then it will

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__vNOslrcaV8f0o52MpgUdgA.png)

meaning the channel successfully built

### After user input message, we want it to show on the receiver’s page

After the message sent, javascript should get the message from div=form with id=send\_message

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____Gmxo5FJnXQRluTq1ca5KQ.png)

in `app/javascript/packs/application.js,` add

// other code  
document.addEventListener('turbolinks:load', function () {  
  document.getElementById("send\_message").addEventListener('submit', function(e){  
    e.preventDefault();  
    let message = document.getElementById('message').value;  
    if (message.length > 0) {  
      chatRoomChannel.speak(message);  
    }  
  });  
})

The function means that after something submit to `form` then it will do following:

1.  `preventDefault` means we want it not to do default method
2.  create a message variable to save the message value
3.  Then trigger the method `speak` from `chatRoomChannel` channel
4.  `'turbolinks:load'`

After input text and press `send`

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__cx4yDOmkRBRssD__LY5pnFw.png)

It means it do not know what chatRoomChannel is, this is because we did not export chatRoomChannel from chat\_room\_channel.js; as a result,

import consumer from "./consumer"

**const** chatRoomChannel = consumer.subscriptions.create("ChatRoomChannel", {  
  ...

});

**export default** chatRoomChannel;

And add `app/javascript/packs/application.js,`

import chatRoomChannel from "../channels/chat\_room\_channel"

Then we input text again,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__YetwA1tx5mJXdHStLlSlGg.png)

Then it means it do not know `speak,` so we add function to `chat_room_channel.js`

consumer.subscriptions.create("ChatRoomChannel", {  
  ...  
  `speak(message) {  
    this.perform('speak', { message: message })  
  }  
  ...`  
});

The meaning of `.perform` :

Then

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__gthnJGDX5rIIWG__Y____MPbw.png)

It means it do not know where to process the message. We need to add backend to get the message and deploy it to frontend

In `app/channels/chat_room_channel.rb`

```
def speak(data)  # broadcast the message to received function of room_channel  ActionCable.server.broadcast("
```

Then we send message again,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____jdNxfLL6fbKZvejOLPBug.png)

meaning it successfully speak it, and it will send it to `chat_room_channel.js` and trigger `received` function

In `chat_room_channel.js` add

received(data) {  
  console.log("testing")  
},

After sending any text,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ch4BCAwZRWpJn56QWxIKUA.png)

we want this message to append to the last of instant message, so

received(data) {  
  const message\_tag = document.createElement("p");  
  message\_tag.textContent = data.message;  
  message\_tag.classList.add('received');  
  document.getElementById('messages').append(message\_tag)  
},

Then the message can be received and show

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__fimtWqJGVWz7WsN4zoVe5A.png)

However, we want to have received and sent message separately (received on the right, sent on the left)

### Identify the message sender

We want to identify the receiver and sender on the view point of the chat room. To get the name, we need user to input their name (or to get the user name from backend); as a result, we modify the html. in `./rooms/show`

<div id="main">  
  <h2>Chat room</h2>  
  <div id="chat\_body">  
    <div id="messages">  
    </div>  
    <form id="send\_message">  
      <input type="text" id="message" name="message">  
      <button>Send</button>  
    </form>  
  </div>

  <div id="modal">  
    <div>  
      <h4>Add a name</h4>  
      <form id="set\_name">  
        <input type="text" id="add\_name" name="add\_name">        
        <button>Submit</button>  
      </form>  
    </div>  
  </div>  
</div>

It looks like

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ypCOBj7jzb5SqlnLoJbSiA.png)

This html file is going to set the name by the form with `id="set_name"`

To get the name from the form, after the Submit button of `Add a name` clicked, the name should be captured and stored; as a result, we add a eventListener to the full addEventListener in `app/javascript/packs/application.js`

document.addEventListener('turbolinks:load', function () {

  ...  
  document.getElementById("set\_name").addEventListener('submit', function(e){  
    e.preventDefault();  
    let name = document.getElementById('add\_name').value;  
    sessionStorage.setItem('chat\_room\_name', name)  
  });  
})

`sessionStorage.setItem('chat_room_name', name)` will store the name.

Then, we should add the data to be sent in `speak` function as follow

```
speak(message) {  let name = sessionStorage.getItem('chat_room_name')  this.perform('speak', { message: message, name: name })},
```

and update the `speak` in `app/channels/chat_room_channel.rb`

def speak(data)  
  ActionCable.server.broadcast "chat\_room\_channel", { message: data\["message"\], sent\_by: data\["name"\] }  
end

so that actioncable can catch the room name and send it to received function on the frontend.

Then after we Submit the name to Add a name and then type in message we want to send in chat room and send it, we can access the name with `sessionStorage.getItem` and then in `receive` function, if the message is sent by user himself/herself, then we should have the `chat_room_name` to identify the sender of message. Then, add

received(data) {  
  ...  
  let current\_name = sessionStorage.getItem('chat\_room\_name')  
},

and then we can write the classname, `sent` and `received` accordingly.

Then we update the `received` function, if the message sent from the owner of message room -> sender (`sent`), else receiver(`received`)

received(data) {  
  let current\_name = sessionStorage.getItem('chat\_room\_name')  
  let msg\_class = data.sent\_by === current\_name ? "sent" : "received"  
  const message\_tag = document.createElement("p");  
  message\_tag.textContent = data.message;  
  message\_tag.classList.add(msg\_class);  
  document.getElementById('messages').append(message\_tag)  
},

, the `received` function is going to insert class name and message to `id=messages`

Then, to test the chat room, please open another webpage and input the same url, and submit other name and submit a message.

#### **person two:**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__M64R4lfUkgjY7QyKMi4IUA.png)

#### **person one:**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__xiJV6qzCnZgmTYXCwp1Qyg.png)

In console,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__0UZ0x6d5rw__ZIDeVSs8pZw.png)

we can have different `sent_by` and we are done!

### The receiver and sender message should on different side

Check the inspection:

With three people, the inspection should be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1____rL4mRGIBMAHK__YbM2ZWqg.png)
![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__QstmJxPKLJm4ChZXCxUUGA.png)
![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__6vve9vG51omZgGKL0L6zvg.png)

#### **css (app/assets/stylesheets/rooms.scss)**

There should be different css for receiver and sender or at least received message on left hand side and sent message on right hand side

#main {  
  h2 {  
    text-align: center; // let the title, chat room on the middle position  
  }  
    
  >div#chat\_body {  
    height: 90vh; // specify the height of chat room, so that the height is not propped by the filler  
    background-color: black;  
      
    div#messages {  
      height: 90%; // so that the division for messages should fill 90% of chat\_body  
      // with display: flex and flex-direction: column, the <p> will flex on the direction of column  
      display: flex;  
      flex-direction: column;  
    
      p {  
        width: max-content; // the width of <p> will be the maximum width of text  
          
        &.received {  
          background-color: chocolate;  
        }  
        
        &.sent {  
          background-color: darkred;  
          align-self: flex-end; // the message sent will be on the right  
        }  
      }  
    }  
      
    form#send\_message {  
      input {  
      }

      button {  
      }  
    }  
  }  
}

### Add the method to tell someone joined the chat room

In the above `show.html.erb` , there is `id="modal"` , meaning user needs to input data to this division before any action.

#### Let "`Add a name”` props up before any action and disappear after inputting data

**modal cover the chat room**

In rooms.scss,

\>div#modal {  
  height: 100vh; // so that it can cover the height of chat room  
  position: absolute;  
  top: 0;  
  background-color: #000000bf;  
  width: 100%;  
  ...  
}

It will place modal absolutely and with `top: 0` and `width: 100%` it cover all the chat room.

**after setting name, modal should disappear**

In `application.js`

document.getElementById("set\_name").addEventListener('submit', function(e){  
  ...  
  document.getElementById("modal").style.display = "none";  
  ...  
}

Then after input name, modal will disappear.

#### Add method to tell all users that a user joined chat room

In `chat_room_channel.js`

const chatRoomChannel = consumer.subscriptions.create("ChatRoomChannel", {  
    
  ...  
  `announce(content) {  
    this.perform('announce', { name: content.name, type: content.type })  
  }`

})

`name` means the name user input and `type` means user join or leave

and in `application.js`

document.getElementById("set\_name").addEventListener('submit', function(e){  
  chatRoomChannel.announce({ name, type: 'join' });  
});

and to catch the name and type on the backend, in `chat_room_channel.rb`

```
def announce(data)  ActionCable.server.broadcast "chat_room_channel", { chat_room_name: data["name"], type: data["type"] }end
```

and in `chat_room_channel.js` `received` function, we need to check the source of data received; that is, the messages from users or the messages tell us join or leave

received(data) {  
  const message\_tag = document.createElement("p");  
  if (data.message) {  
    // message from user  
    let current\_name = sessionStorage.getItem('chat\_room\_name')  
    let msg\_class = data.sent\_by === current\_name ? "sent" : "received"  
    message\_tag.textContent = data.message;  
    message\_tag.classList.add(msg\_class);  
    document.getElementById('messages').append(message\_tag)  
  } else if (data.chat\_room\_name) {  
    // join or leave message  
    let name = data.chat\_room\_name;  
    let announcement\_type = data.type == 'join' ? 'joined' : 'left';  
    message\_tag.textContent = name + " " +announcement\_type + " the chat room";  
    message\_tag.classList.add("announce");  
    document.getElementById('messages').append(message\_tag)  
  }  
},

and in `rooms.scss`

#main {  
  ...  
    
      p {  
        width: max-content; // the width of <p> will be the maximum width of text  
          
        &.received {  
          background-color: chocolate;  
        }  
        
        &.sent {  
          background-color: darkred;  
          align-self: flex-end; // the message sent will be on the right  
        }

        &.announce {  
          align-self: center;  
          font-style: italic;  
          color: cyan;

        }

      }  
    }  
      
    ...  
  }  
}

Then after user enter its name it will announce it and put a message on the middle of chat room and we are done.

### What

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__RdCwZ43JRMf2eAfvsKJ6rw.png)

### Reference

[**Simple chatroom with Rails 6 and ActionCable**  
_Hello everyone, This week, we will be building a simple chatroom with Rails 6 and ActionCable. We are going to learn…_dev.to](https://dev.to/nkemjiks/simple-chatroom-with-rails-6-and-actioncable-3bc3 "https://dev.to/nkemjiks/simple-chatroom-with-rails-6-and-actioncable-3bc3")[](https://dev.to/nkemjiks/simple-chatroom-with-rails-6-and-actioncable-3bc3)

[**\[Rails\] Actioncable 即時通訊**  
_Actioncable是一個Pub/Sub 模型 + WebSocket 的 Ruby 框架，可以讓Rails透過websocket，實現即時通訊。_dosmanthus.medium.com](https://dosmanthus.medium.com/rails-actioncable-%E5%8D%B3%E6%99%82%E9%80%9A%E8%A8%8A-eea02474ff33 "https://dosmanthus.medium.com/rails-actioncable-%E5%8D%B3%E6%99%82%E9%80%9A%E8%A8%8A-eea02474ff33")[](https://dosmanthus.medium.com/rails-actioncable-%E5%8D%B3%E6%99%82%E9%80%9A%E8%A8%8A-eea02474ff33)

[**Deploy ActionCable to Production | GoRails - GoRails**  
_Our guide takes you through installing Passenger 5 but if you've installed it previous, you'll need to update to the…_gorails.com](https://gorails.com/deploy/actioncable "https://gorails.com/deploy/actioncable")[](https://gorails.com/deploy/actioncable)