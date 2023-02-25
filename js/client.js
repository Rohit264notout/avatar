const socket = io('http://127.0.0.1:8000');

const form = document.getElementById('sendcontainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    // messageInput='';
    document.getElementById('messageInp').value ='';
})
const nam = prompt("Enter your name to join");
socket.emit('newuserjoined', nam);

socket.on('userjoined', nam =>{
    append(`${nam} joined the chat`, 'right');
})

socket.on('receive', data =>{
    append(`${data.nam}: ${data.message}`, 'left');
})

socket.on('leave', data =>{
    append(`${data.nam} left the chat`, 'left');
})