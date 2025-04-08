import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { setPromptValue        } from './GlobalState.mjs'; // Import setP"
import { MessagesComponent     } from './MessagesComponent.mjs'; // Assuming MessagesComponent is in the same directory

//----------------------------------------------------------------

class FormComponent extends LitElement {

  static get styles( ) {
    return css`

      form {
        display         :  flex;
        margin-top      :  20px;
        }

      label { 
        display         :  inline-block;
        font-family     :  sans-serif; 
        font-size       :  14px;
        padding-top     :  5px; 
        width:          : 280px;
        }

      button { 
        font-family     :  sans-serif; 
        font-size       :  14px;
        box-shadow      :  0px 1px 3px #000000;
        border          :  1px solid #ddd;  /* or #ccc */
        border-radius   :  5px;
        height          : 27px; 
        padding         :  5px;            /* was 20px; or 10px; */
        }
  
      .fld-text {
        flex            :  1;
        color           : #333;
        max-width       :  600px;
        min-width       :  340px;
        height          :  15px; 
        margin          :  0 auto;
        margin-left     :  4px; 
        margin-right    :  6px; 
        padding         :  5px;            /* was 20px; or 10px; */

        border          :  2px solid #ddd;  /* or #ccc */
        border-radius   :  5px;
/*      box-shadow      :  0px 1px 3px #000000; */
        border-style    :  inset; 

        background-color: #9ad8e3;  /* Light blue */
        font-family     :  sans-serif; 
        font-size       :  14px;
        }

    ` }; // eof get Styles
//  -------------------------------------------------------
  
  f01_prompt = ''; // Initialize the name property directly

//  -------------------------------------------------------

  connectedCallback() {
    super.connectedCallback();
    const observer = new MutationObserver(() => this.requestUpdate());
    observer.observe( this, { childList: true } );
    }
//  -------------------------------------------------------

  disconnectedCallback() {
    super.disconnectedCallback();  // Disconnect the observer when the component is removed
    observer.disconnect();
    }
//  -------------------------------------------------------

  handleSubmit(event) {
    event.preventDefault();
        console.log( `Prompt, ${ this.f01_prompt }.` );
    if (this.f01_prompt > "") { 

        setPromptValue( this.f01_prompt ); // Update global state // not necessary 

//const messagesComponent = this.shadowRoot?.querySelector( 'messages-component' ); // Assuming MessagesComponent is within FormComponent's shadow DOM
  const messagesComponent =         document.querySelector( 'messages-component' ); // Assuming MessagesComponent is within the parent's HTML DOM
    if (messagesComponent) {
        alert( "  Executing populateMessages( promptValue ) in messages-component" )
        messagesComponent.populateMessages( this.f01_prompt ); // Trigger message population
        }
        alert( `  Prompt has been sent to the MessagesComponent.populateMessages( ):\n ${ this.f01_prompt }.` );
        this.Prompt = ''; // Clear the form after submit
    } else {
        alert( `* Please enter a prompt!` );
        }
    }
//  -------------------------------------------------------

  render() {
    return html`
      <form @submit=${ this.handleSubmit}>
        <label for="f01_prompt">Prompt: </label>
        <input  id="f01_prompt" type="text" class="fld-text" value=${this.f01_prompt} @change=${ ( e ) => this.f01_prompt = e.target.value}>
        <button type="submit">Send</button>
      </form>
    `;
    }
//  -------------------------------------------------------
  } // eoc FormComponent
//----------------------------------------------------------------

customElements.define( 'form-component', FormComponent );
