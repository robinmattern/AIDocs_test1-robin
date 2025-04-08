//  import { LitElement, html      } from 'https://cdn.jsdelivr.net/npm/lit@2/dist/lit.min.js';
    import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


    class MyForm extends LitElement {

      static get styles() {
        return css`

          form {
            display: flex;
            margin-top: 20px;
          }

          #user-prompt {
            flex: 1;
            color: #333;
            width: 600px;
            height: 20px;
            margin: 0 auto;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #9ad8e3;  /* Light blue */
          }

        `;
      }


      // No property declaration needed here
//    name = ''; // Initialize the name property directly
//    user-prompt = ''; // Can't use dashes in variable name
      UserPrompt = ''; // Initialize the user-prompt property directly

      handleSubmit(event) {
        event.preventDefault();
        alert(`Hello, ${ this.UserPrompt }!`);
        this.name = ''; // Clear the form after submit
      }

      render() {
        return html`
          <form @submit=${this.handleSubmit}>
            <label for="name">Prompt: </label>
<!--        <input id="name" type="text" value=${name} @change=${(e) => this.name = e.target.value}> -->
            <input id="user-prompt" type="text" value=${this.UserPromnpt} @change=${ (e) => this.UserPrompt = e.target.value}>
            <button type="submit">Say Hi!</button>
          </form>
        `;
      }
    }

    customElements.define('my-form', MyForm);
