import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MyForm extends LitElement {
  name = ''; // Initialize the name property directly

  connectedCallback() {
    super.connectedCallback();
    const observer = new MutationObserver(() => this.requestUpdate());
    observer.observe( this, { childList: true } );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Disconnect the observer when the component is removed
    observer.disconnect();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`Hello, ${this.name}!`);
    this.name = ''; // Clear the form after submit
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label for="name">Your Name: </label>
        <input id="name" type="text" value=${this.name} @change=${(e) => this.name = e.target.value}>
        <button type="submit">Say Hi!</button>
      </form>
    `;
  }
}

customElements.define('my-form', MyForm);
