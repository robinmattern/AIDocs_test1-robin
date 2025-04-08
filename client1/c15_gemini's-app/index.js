
const conversationContainer = document.getElementById( 'conversation-container' );

// Replace this with your actual JSON data or fetch it from an API
const messages = [
  { role: 'user', message: "What's up" },
  { role: "assistant", message: "Not much" },
  { role: 'user', message: "What's really up" },
  { role: "assistant", message: "Really not much" },
];

function displayMessage(message) {

  const messageElement = document.createElement( 'div' );
        messageElement.classList.add( 'message' );

    if (message.role === 'user') {
        messageElement.classList.add( 'user-message' );
    } else {
        messageElement.classList.add( 'assistant-message' );
        }

  messageElement.textContent = message.message;
  conversationContainer.appendChild( messageElement );
  }

  messages.forEach( displayMessage );
