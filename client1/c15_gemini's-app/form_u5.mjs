import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

//----------------------------------------------------------------

class FormComponent extends LitElement {

  static get styles( ) {
    return css`

      form {
        display         :  flex;
        margin-top      :  20px;
        }

      label { 
        font-family     :  sans-serif; 
        font-size       :  14px;
        padding-top     :  5px; 
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
        width           :  600px;
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
    if (this.F01_Prompt > "") { 
        alert( `Prompt, ${ this.f01_prompt }.` );
        this.Prompt = ''; // Clear the form after submit
    } else {
        alert( `* Please enter a prompt!` );
        }
    }
//  -------------------------------------------------------

  render() {
    return html`
      <form @submit=${ this.handleSubmit}>
        <label for="f01_prompt">Your Name: </label>
        <input  id="f01_prompt" type="text" class="fld-text" value=${this.f01_prompt} @change=${ ( e ) => this.f01_prompt = e.target.value}>
        <button type="submit">Say Hi!</button>
      </form>
    `;
    }
//  -------------------------------------------------------
  } // eoc FormComponent
//----------------------------------------------------------------

customElements.define( 'form-component', FormComponent );
