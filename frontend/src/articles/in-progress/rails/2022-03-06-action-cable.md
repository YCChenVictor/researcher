---
layout: post
title:
date: '2022-03-06'
categories: rails
note: going to connect to overview.md
publish: true
---

## Introduction

A full-stack offering, providing client-side **JavaScript** framework and a server-side **Ruby** framework, integrates **WebScokets** for real-time features.

## Why

With WebSocket protocol, multiple clients(browsers) can maintain constant connection with the server, meaning all the changes in database revealed on all the clients. You **do not** need to refreash(re GET) data from your server.

## How

### http protocal vs websocket protocal

<img src="/assets/img/http-protocol.png" alt="">

<img src="/assets/img/websocket-protocol.png" alt="">

image resource: [Real-Time Rails: Implementing WebSockets in Rails 5 with Action Cable](https://blog.heroku.com/real_time_rails_implementing_websockets_in_rails_5_with_action_cable)

[websocket wiki](https://en.wikipedia.org/wiki/WebSocket)

## What

I am going to demo an instant message with steps:

1. (connect) basic setup
2. (speak) a user inputs message -> trigger `broadcast`
3. (receive) `broadcast` -> all client receive it
4. (multiplayer) identify receiver and sender -> demo
5. (other) styles
6. (other) announce from newcomers

### (connect) basic setup

#### new & controller & view

```bash
$ rails new instant_message
$ rails g controller chat_rooms show
```

In `./rooms/show`

```javascript
<div id="main">  
  <h2>Chat room</h2>  
  <div>  
    <div id="messages">  
      <p class="received">Hello</p>  
      <p class="sent">Hi</p>  
      <p class="received">How are you doing?</p>  
      <p class="sent">I am doing alright</p>  
    </div>

    <form id="send_message">  
      <input type="text" id="message" name="message">  
      <button>Send</button>  
    </form>  
  </div>  
</div>
```

#### action cable

```bash
$ rails g channel chat_room
```

<img src="/assets/img/1__BZSEL__JAdfz4uK8eU8j1HQ.png" alt="">

1. `channels/chat_room_channel.rb`:

```ruby
def subscribed
  stream_from "chat_room_channel"
end
```

2. `javascript/channels/chat_room_channel.js`: (define behaviors of client-side)

```javascript
connected() {  
  console.log("Connected to the chat room!");  
}
```

In frontend,

<img src="/assets/img/1__vNOslrcaV8f0o52MpgUdgA.png" alt="">

In backend,

<img src="/assets/img/websocket_connect_and_chat_room_streaming.png" alt="">

### (speak) a user inputs message -> trigger `broadcast`

<img src="/assets/img/1____Gmxo5FJnXQRluTq1ca5KQ.png" alt="">

In `app/javascript/packs/application.js`,

```javascript
document.addEventListener('turbolinks:load', function () {  
  document.getElementById("send_message").addEventListener('submit', function(e){  
    e.preventDefault();  
    let message = document.getElementById('message').value;  
    if (message.length > 0) {  
      chatRoomChannel.speak(message);  
    }  
  });  
})
```

Above code means input text and press `send` -> trigger the method `speak` in `chat_room_channel.js`:

```javascript
speak(message) {
  let name = sessionStorage.getItem('chat_room_name')
  this.perform('speak', { message: message, name: name })
},
```

Then it will trigger backend method `speak` in `chat_room_channel.rb`

```ruby
def speak(data)
  ActionCable.server.broadcast "chat_room_channel", { message: data["message"], sent_by: data["name"] }
end
```

, which will broadcast the message to the frontend and in backend log:

<img src="/assets/img/actioncable_broadcasting.png" alt="">

### (receive) `broadcast` -> all client receive it

In `chat_room_channel.js` add

```javascript
received(data) {  
  const messageTag = document.createElement(“p”);
  messageTag.textContent = data.message;
  messageTag.classList.add('received');
  document.getElementById('messages').append(messageTag)
  },
},
```

After trigger `broadcast` from backend, the `received` method will be triggered and the text will be appended as follow

<img class="w-1/2" src="/assets/img/chat_room_receive_message.png">

### (multiplayer)

After setting up mechanism, speak and receive, let us add more users to a chat room.

In `./rooms/show`

```javascript
<div id="main">  
  <h2>Chat room</h2>  
  <div id="chat_body">  
    <div id="messages">  
    </div>  
    <form id="send_message">  
      <input type="text" id="message" name="message">  
      <button>Send</button>  
    </form>  
  </div>

  <div id="modal">  
    <div>  
      <h4>Add a name</h4>  
      <form id="set_name">  
        <input type="text" id="add_name" name="add_name">        
        <button>Submit</button>  
      </form>  
    </div>  
  </div>  
</div>
```

and in `app/javascript/packs/application.js`

```javascript
document.addEventListener('turbolinks:load', function () {
  ...  
  document.getElementById("set_name").addEventListener('submit', function(e){  
    e.preventDefault();  
    let name = document.getElementById('add_name').value;  
    sessionStorage.setItem('chat_room_name', name)  
  });  
})
```

The view is as follow and going to set up the chat room name with `Add a name`

<img class="w-1/2" src="/assets/img/1__ypCOBj7jzb5SqlnLoJbSiA.png">

add `sent_by` in `speak`

```ruby
def speak(data)
  ActionCable.server.broadcast "chat_room_channel", { message: data["message"], sent_by: data["name"] }
end
```

modify the received function to identify the receiver and sender.

```javascript
received(data) {  
  let currentName = sessionStorage.getItem('chat_room_name')  
  let msgClass = data.sent_by === current_name ? "sent" : "received"  
  const messageTag = document.createElement("p");  
  messageTag.textContent = data.message;  
  messageTag.classList.add(msgClass);  
  document.getElementById('messages').append(messageTag)  
},
```

Then, to test the chat room, please open another webpage and input the same url, and submit other name and submit a message.

#### **person two:**

<img class="" src="/assets/img/1__M64R4lfUkgjY7QyKMi4IUA.png">

#### **person one:**

<img class="" src="/assets/img/1__xiJV6qzCnZgmTYXCwp1Qyg.png">

we can have different `sent_by` and wrap up!

### (other) styles

Different style for receiver and sender

In `app/assets/stylesheets/rooms.scss`,

```javascript
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
```

### (other) announce from newcomers

1. modal cover the chat room
2. modal disappears after name submitted
3. tell all users who joined the chat room

#### modal cover

In rooms.scss,

```javascript
\>div#modal {  
  height: 100vh; // so that it can cover the height of chat room  
  position: absolute;  
  top: 0;  
  background-color: #000000bf;  
  width: 100%;  
  ...  
}
```

#### modal disappears

In `application.js`

```javascript
document.getElementById("set_name").addEventListener('submit', function(e){  
  ...  
  document.getElementById("modal").style.display = "none";  
  ...  
}
```

#### tell all users

In `chat_room_channel.js`

```javscript
const chatRoomChannel = consumer.subscriptions.create("ChatRoomChannel", {  
    
  ...  
  `announce(content) {  
    this.perform('announce', { name: content.name, type: content.type })  
  }`

})
```

and in `application.js`

```javscript
document.getElementById("set\_name").addEventListener('submit', function(e){  
  chatRoomChannel.announce({ name, type: 'join' });  
});
```

and to catch the `name` and `type` on the backend, in `chat_room_channel.rb`

```ruby
def announce(data)
  ActionCable.server.broadcast "chat_room_channel", { chat_room_name: data["name"], type: data["type"] }
end
```

and in `chat_room_channel.js`, `received` function, we need to check the source of data received; that is, the messages from users or the messages tell someone join or leave

```javascript
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
```

and in `rooms.scss`

```javascript
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
```

Then after user enter its name it will announce xxx join the room and put a message on the middle of chat room and we are done.

### What

<img class="" src="/assets/img/1__RdCwZ43JRMf2eAfvsKJ6rw.png">

### Reference

[Simple chatroom with Rails 6 and ActionCable](https://dev.to/nkemjiks/simple-chatroom-with-rails-6-and-actioncable-3bc3)

[Rails Actioncable 即時通訊](https://dosmanthus.medium.com/rails-actioncable-%E5%8D%B3%E6%99%82%E9%80%9A%E8%A8%8A-eea02474ff33)

[Deploy ActionCable to Production GoRails](https://gorails.com/deploy/actioncable)

[Action Cable Overview](https://guides.rubyonrails.org/action_cable_overview.html)

[Action Cable 即時通訊](https://ihower.tw/rails/actioncable.html)

[Real-Time Rails: Implementing WebSockets in Rails 5 with Action Cable](https://blog.heroku.com/real_time_rails_implementing_websockets_in_rails_5_with_action_cable)
