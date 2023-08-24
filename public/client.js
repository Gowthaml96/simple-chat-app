const socket = io();

const emojis = {
  react: "⚛️",
  woah: "😯",
  hey: "👋",
  lol: "😂",
  like: "💓",
  congratulations: "🎉"
};

const userForm = prompt("Enter your name:");
const user = userForm ? userForm : 'Guest'; // Set a default if user doesn't provide a name

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const userList = document.getElementById('user-list');

// Display user name in the sidebar
const userElement = document.createElement('li');
userElement.innerText = user;
userList.appendChild(userElement);

sendButton.addEventListener('click', () => {
  let message = messageInput.value;
  message = replaceEmojis(message);
  
  if (message.trim() !== '') {
    socket.emit('message', `${user}: ${message}`);
    messageInput.value = '';
  }
});

socket.on('message', (message) => {
  message = replaceEmojis(message);
  
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  
  if (message.startsWith(`${user}:`)) {
    messageElement.classList.add('sender');
  } else {
    messageElement.classList.add('received');
  }
  
  messageElement.innerText = message;
  messagesContainer.appendChild(messageElement);
});

function replaceEmojis(message) {
  for (const keyword in emojis) {
    if (message.includes(keyword)) {
      const emoji = emojis[keyword];
      message = message.replace(keyword, emoji);
    }
  }
  return message;
}
