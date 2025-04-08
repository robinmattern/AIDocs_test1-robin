  import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

//-------------------------------------------------------------------------------

  class ConversationComponent extends LitElement {

    static get styles() {
      return css`
        #conversation-container {
          display         : flex;
          flex-direction  : column;
          width           : 600px;
          margin          : 0 auto;
          padding         : 20px;
          border          : 1px solid #ddd;
          border-radius   : 5px;
          }

        .message {
          margin-bottom   : 10px;
          padding         : 10px 15px;
          border-radius   : 5px;
          box-shadow      : 0 1px 2px rgba(0, 0, 0, 0.1);
          }

        .user-message {
          background-color: #9ad8e3;  /* Light blue */
          color           : #333;
          text-align      : right;
          }

        .assistant-message {
          background-color: #338b33;  /* Dark green */
          color: #fff;
          }

        #user-prompt {
          background-color: #9ad8e3;  /* Light blue */
          color           : #333;
          width           : 600px;
          margin          : 0 auto;
          padding         : 20px;
          border          : 1px solid #ddd;
          border-radius   : 5px;
          }
      `;
      }
//    ---------------------------------------------------------

    static get properties() {
      return { messages: { type: Array } };
      }
//    ---------------------------------------------------------

    constructor() {
      super();

      const pMessages =
      [ { role: 'user',      message: "What's up" },
      , { role: 'assistant', message: "Not much" },
      , { role: 'user',      message: "What's really up" },
      , { role: 'assistant', message: "Really not much" },
          ];

      this.messages = pMessages;
      } // eof constructor
//    ---------------------------------------------------------

    render() {
      return html`
        <div id="conversation-container">
          ${this.messages.map( ( message ) => this.renderMessage( message ) ) }
        </div>
      `;
      }
//    ---------------------------------------------------------

    renderMessage(message) {
      return html`
        <div class="message ${ message.role === 'user' ? 'user-message' : 'assistant-message'}">
          ${ message.message }
        </div>
      `;
      }
//    ---------------------------------------------------------

    }
//  -------------------------------------------------------------------------------

    customElements.define('conversation-component', ConversationComponent);

