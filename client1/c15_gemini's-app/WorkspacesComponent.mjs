  import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
  import { getPromptValue        } from './GlobalState.mjs'; // Import setP"
  import { getData               } from './getData.mjs'; 
//-------------------------------------------------------------------------------

  class MessagesComponent_ extends LitElement {

    static get styles() {
      return css`
        #spacer {
          height          :  20px;
          }
        #messages-container_x {
          display         :  flex;
          width           :  80%; 
          flex-direction  :  column;
          margin          :  0 auto;
          padding         :  20px;
          border          :  1px solid #ddd;
          border-radius   :  5px;
          }

        .message {
          flex            :  1;
          max-width       :  650px;
          min-width       :  300px;
          height          :  15px; 
          margin          :  5px auto;
          margin-left     :  4px; 
          margin-right    :  6px; 
          padding         :  5px;            /* was 20px; or 10px; */
  
          border          :  2px solid #ddd;  /* or #ccc */
          border-radius   :  5px;
  /*      box-shadow      :  0px 1px 3px #000000; */
          border-style    :  inset; 
    
          font-family     :  sans-serif; 
          font-size       :  14px;
          }    

        .user-message {
          background-color: #9ad8e3;  /* Light blue */
          color           : #333;
          text-align      : right;
          margin-left     : 52px;
          }

        .assistant-message {
          background-color: #338b33;  /* Dark green */
          color: #fff;
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

      const pWorkspaces = await getWorkspaces() 

      this.workspaces = pWorkspaces;
      } // eof constructor
//    ---------------------------------------------------------

async populateMessages( promptValue ) {
//    const promptValue = promptValue ? promptValue : await getPromptValue( ); // Retrieve prompt value from global state
            promptValue = promptValue ? promptValue : await getPromptValue( ); // don't use const to redefine promptValue

   // Use promptValue to create your message array (details depend on your API logic)
//    this.messages = await createMessagesFromPrompt( promptValue ); // Assuming a createMessagesFromPrompt function
      alert( ` Received prompt, ${promptValue}, in the MessagesComponent` )
      }
//    ---------------------------------------------------------
render() {
      // const promptValue = getPromptValue(); // Get prompt value f
      // alert( `Submitting prompt: ${promptValue}`)
      return html`
        <div id="spacer"></div> 
        <div id="messages-container">
          ${this.messages.map( ( message ) => this.renderMessage( message ) ) }
        </div>
      `;
      }
//    ---------------------------------------------------------

    renderMessage( message ) {
      return html`
        <div class="message ${ message.role === 'user' ? 'user-message' : 'assistant-message'}">
          ${ message.message }
        </div>
      `;
      }
//    ---------------------------------------------------------

    }
//  -------------------------------------------------------------------------------

    customElements.define( 'messages-component', MessagesComponent_ );

    export class MessagesComponent extends MessagesComponent_ { }
//  import { MessagesComponent } from './MessagesComponent'

//  Default export (can only have one)
//  export default function myFunction() { ... }
//  import MessagesComponent from './MessagesComponent'
