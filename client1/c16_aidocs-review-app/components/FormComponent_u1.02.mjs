/*\ . . . .
##=========+====================+================================================+
##RD        Form Component      | For AIDocs-Review Chat App
##RFILE    +====================+=======+===============+======+=================+
##FD   FormComponent.mjs        |   7453|  4/08/24  7:45|   153| u1.02`40408.0745
##FD   FormComponent.mjs        |   7596|  4/12/24 15:17|   155| u1.02`40412.1517
##FD   FormComponent.mjs        |   8364|  4/21/24 21:30|   179| u1.02`40421.2130
##FD   FormComponent.mjs        |   8690|  4/26/24 09:30|   182| u1.02`40426.0930
##FD   FormComponent.mjs        |  11244|  4/29/24 10:05|   219| u1.02`40429.1005
##FD   FormComponent.mjs        |  11693|  5/01/24 16:30|   224| u1.02`40501.1630
##FD   FormComponent.mjs        |  12229|  5/03/24 11:01|   235| u1.02`40503.1101
##FD   FormComponent.mjs        |  16239|  5/10/24 10:00|   310| u1.02`40510.1000
##FD   FormComponent.mjs        |  16477|  5/11/24 10:31|   312| u1.02`40511.1031
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript Lit Component file creates the HTML tag form-component.
#           It is defined in the class FormComponent that includes styles that
#           are local to the component.
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           FormComponent          extends LitElement class
#             connectedCallback
#             disconnectedCallback
#             handleSubmit
#             render
#           Alert
##CHGS     .--------------------+----------------------------------------------+
# .(40405.05  4/05/24 RAM  5:30p|  Add bNoAlert to browser Alert()
# .(40405.06  4/05/24 RAM  6:30p|  Add bNoAlert to browser Alert()
# .(40408.03  4/08/24 RAM  7:45a|  Clear Prompt Form Field
# .(40412.01  4/12/24 RAM  3:17p|  Add JPT's Doc Header Info
# .(40422.03  4/21/24 RAM  9:30p|  Import Msg Comp failed on Mac
# .(40426.01  4/26/24 RJS  9:30a|  Style Changes
# .(40429.02  4/29/24 RJS 10:02a|  Add .Documents
# .(40429.03  4/29/24 RJS 10:03a|  Change color to grey
# .(40429.04  4/29/24 RJS 10:04a|  Change font size
# .(40429.05  4/29/24 RJS 10:05a|  Replace <hr> above .Documents with border-top
# .(40501.01  5/01/24 RJS 10:01a|  Style changes
# .(40501.05  5/01/24 RAM  4:30p|  Add space to top of .Documents
# .(40503.01  5/03/24 RJS 11:01a|  iPad Responsiveness
# .(40510.02  5/10/24 RJS 10:00a|  Style changes to Form Component
# .(40510.03  5/10/24 RJS 10:00a|  Add two text links
# .(40510.04  5/10/24 RJS 10:00a|  Add Media Portrait
# .(40511.02  5/11/24 RJS 10:31a|  Remove dangling }
                                |
##SRCE     +====================+===============================================+
\*/
   import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
   import { setPromptValue        } from '../utils/GlobalState_u1.02.mjs';  // Import setPromptValue"
// import { MessagesComponent     } from './MessagesComponent.mjs';         // .(40422.03.1 RAM Indeed, Assuming MessagesComponent is in the same directory)

//----------------------------------------------------------------
    var bNoAlert = true                                                                                     // .(40405.06.1)

class FormComponent extends LitElement {

  static get styles( ) {
    return css`

      form {
        display         :  flex;
        flex-direction  :  row;                                         /* .(40510.02.1 RJS Add: flex direction) */
        margin-top      :  20px;
        margin-bottom   :  100px;                                       /* .(40501.01.1 RJS Add: margin-bottom to form) */
        margin-right    :  10px;                                        /* .(40510.02.2 RJS Add: margin-right) */
        padding         :  0 10px;                                      /* .(40510.02.3 RJS Add: padding).(40501.01.1 RJS Add margin-bottom to form) */
        }

      label {
        display         :  inline-block;
        font-family     :  sans-serif;
        font-size       :  14px;
        padding-top     :  5px;
        width:          :  280px;
        padding-left    :  35px;                                        /* .(40426.01.1 RJS Style changes, was 15px;) */
        }

      button {
        font-family     :  sans-serif;
        font-size       :  14px;
        box-shadow      :  0px 1px 3px #000000;
        border          :  1px solid #ddd;  /* or #ccc */
        border-radius   :  5px;
        height          : 27px;
        padding         :  5px;             /* was 20px; or 10px; */
        }
      .SendText {                                                       /* .(40510.03.3 RJS Add: two Text labels Beg) */
        display         : block;
        background      : white;
        color           : blue;
      }
      .GreaterText {
        display          : none;
        background      : white;
        color           : blue;
        padding         : 0px 10px 25px 10px;
      }                                                                 /* .(40510.03.3 RJS End) */
      .fld-text {
        flex            :  1;
        color           :  #333;
        width           :  auto;                                        /* .(40510.02.4 RJS Was: 780px).(40426.01.2 RJS Added width) */
        max-width       :  780px;                                       /* .(40426.01.2 RJS Was: 700px;) */
        min-width       :  940px;                                       /* .(40510.02.5 RJS Was: 340px;) */
        height          :  15px;
        margin          :  0 auto;
        margin-left     :  4px;
        margin-right    :  6px;
        padding         :  5px;             /* was 20px; or 10px; */

        border          :  2px solid #ddd;  /* or #ccc */
        border-radius   :  5px;
/*      box-shadow      :  0px 1px 3px #000000; */
        border-style    :  inset;

        background-color:  #DDDDDD;                                     /* .(40429.03.2 RJS light gray Was #9ad8e3 Light blue) */
        font-family     :  sans-serif;
        font-size       :  1rem;                                        /* .(40429.04.2 RJS Change font size was 14px;) */
        font-weight     :  500;                                         /* .(40429.04.3 RJS) */
        }
      .prompt {
        color           :  blue;
        font-size       :  1.3rem;
        font-weight     :  700;
        padding-bottom  :  10px;
      }
/*                                                                    *//*#.(40429.05.1 RJS Beg Don't add  <hr> ) *//*
      hr {
        color           : blue;
        width           : 90%;
        height          : 0px;
        margin          : auto;
      }
 */                                                                     /*#.(40429.05.1 RJS End) */
      .Documents {                                                      /* .(40429.02.3 RJS Beg Add .Documents ) */
        position        :  relative;
        padding-left    :  40px;
        padding-bottom  :  5px;
        padding-top     :  30px;                                        /* .(40510.02.6 RJS Was: 20px;) */
        text-align      :  left;
        margin-top      :  -20px;                                       /* .(40510.02.7 RJS Was: 10px;).(40501.05.1 RAM Add space to top of .Documents) */
        border-top      :  blue solid 2px;                              /* .(40429.05.2 RJS Beg Add border-top) */
        }
      .DocumentTitle {                                                  /* .(40429.02.3 RJS Add .DocumentTitle ) */
        color             :  black;
        font-size         :  1rem;
        }
      .DocumentText {                                                   /* .(40429.02.3 RJS Add .DocumentText ) */
        color             :  blue;
        font-size         :  1.2rem;
/*      text-decoration   :  underline; */
        background-color  :  yellow;
        }                                                               /* .(40429.02.3 RJS End) */

        @media only screen                                              /* .(40503.01.1 RJS Beg iPad Responsiveness) */
        and (min-width: 621px)
        and (max-width: 1000px)
/*        {                                                           *//* .(40510.02.8 RJS Mov: .fld-text Beg) *//*
            .fld-text {
              max-width    :  550px;
              width        : 1500px;
            }
          }  */                                                         /* .(40510.02.8 RJS End).(40503.01.1 RJS End) */
        {                                                               /* .(40510.02.9 RJS Add: many lines Beg) */
        form {
          display          : flex;
          flex-direction   : row;
          margin-top       : 20px;
          margin-bottom    : 100px;
          margin-right     : 10px;
          padding          : 0 10px;
        }

        label {
          padding-left     : 2px;
        }
        .fld-text {
          flex-grow        : 1;
          max-width        : 575px;
          min-width        : 575px;
          width            :  auto;
          font-size        : 12px;
        }
        .DocumentTitle {
          font-size: .9rem;
        }
        .DocumentText {
          font-size: 1rem;
        }
      }                                                                 /* .(40510.02.9 RJS End).(40503.01.1 RJS End) */
      @media only screen
      and (max-width: 440px)                                            /* .(40510.04.1 RJS Add: Media portrait Beg) */
                                                                        /* .(40511.02.1 RJS Ops: Remove extra { ) */
      and (max-width: 500px)
      and (orientation: portrait) {

        form {
          display: flex;
          margin-top: 20px;
          margin-bottom: 100px;
          margin-right: 10px;
        }
        .Document {
          padding-top     : 100px;
          width           : 20px;
        }
        .SendText {
          display         : none;
         }
        .GreaterText {
          display         : contents;
          font-size       : 1.5rem;
         }
        .fld-text {
          min-width       :  310px;
          max-width       :  350px;                                     /* .(40510.02.10 RJS Was: 0px;) */
          font-size       :  .9rem;
        }
        label {
          padding-left: 18px;
          font-weight: bold;
        }                                                               /* .(40510.11.11 RJS End) */
        .prompt {
          font-size       :  1.2rem;
          font-weight     :  600;                                       /* .(40510.02.11 RJS Was: 700) */
          padding-bottom  :  10px;
          margin-left     :  -2px;                                      /* .(40510.02.12 RJS Was: 0) */
        }
        #f01_prompt {                                                   /* .(40510.02.13 RJS Add: #f01_prompt Beg) */
          min-width       : 310px;
          margin          : 0px 10px 0px 10px;
        }                                                               /* .(40510.02.13 RJS End) */
      }                                                                 /* .(40510.04.1 RJS End) */

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
        console.log( `  Prompt: ${ this.f01_prompt }` );
    if (this.f01_prompt > "") {

        setPromptValue( this.f01_prompt ); // Update global state // not necessary

//const messagesComponent = this.shadowRoot?.querySelector( 'messages-component' ); // Assuming MessagesComponent is within FormComponent's shadow DOM
  const messagesComponent =         document.querySelector( 'messages-component' ); // Assuming MessagesComponent is within the parent's HTML DOM
    if (messagesComponent) {
        Alert( "Executing populateMessages( promptValue ) from the FormComponent",    bNoAlert )            // .(40405.05.9).(40405.06.2)
        messagesComponent.populateMessages( this.f01_prompt ); // Trigger message population
        }
        Alert( `Prompt has been sent to the MessagesComponent.populateMessages( )}.`, bNoAlert )            // .(40405.05.10).(40405.06.3)
//      this.Prompt = "";                                                                                   //#.(40408.03.1 RAM Clear the form after submit)
//      this.f01_prompt = ""                                                                                //#.(40408.03.1 RAM Like this, no workie)
//      document.getElementById('f01_prompt').value = ""                                                    //#.(40408.03.1 RAM Like this, no workie either)
        this.shadowRoot.getElementById('f01_prompt').value = ""                                             // .(40408.03.1 RAM Like this!!)
    } else {
        Alert( `* Please enter a question!`, -2 );                                                          // .(40405.05.11).(40405.06.4)
        }
    }
//  -------------------------------------------------------

  render() {
    return html`
<!--  <hr style='width:90%; height:0px; color:red;'> -->                                                  <!--#.(40429.05.3 RJS Don't add <hr>) -->
      <div class="Documents">                                                                             <!-- .(40429.02.4 RJS Add .Documents) -->
        <span class="DocumentTitle">User Document(s):</span>
        <span class="DocumentText">&nbsp;GreenbookFY2025.pdf&nbsp;</span>
      </div>                                                                                              <!-- .(40429.02.4 RJS End) -->
      <form @submit=${ this.handleSubmit}>
        <label for="f01_prompt">&nbsp;<font class="prompt">?</font></label>
<!--    <label for="f01_prompt">&nbsp;Prompt: </label>-->
        <input  id="f01_prompt" type="text" class="fld-text" value=${this.f01_prompt} @change=${ ( e ) => this.f01_prompt = e.target.value}>
        <button type="submit" class="SendText">SEND</button>                                              <!-- .(40510.03.1 RJS Add: class) -->
        <button type="submit" class="GreaterText">></button>                                              <!-- .(40510.03.2 RJS Add: GreaterText) -->
      </form>
    `;
    }
//  -------------------------------------------------------
  } // eoc FormComponent
//----------------------------------------------------------------

customElements.define( 'form-component', FormComponent );

function Alert( aMsg, bNoAlert_) {                                                  // .(40405.05.8 RAM Beg Write Alert).(40405.06.5 RAM Add NoAlert)
    var bNoAlert1 = (typeof( bNoAlert )  != 'undefined') ? bNoAlert  : false        // .(40405.06.6 RAM Assign bNoAlert1 not bNoAlert_ )
//      bNoAlert_ = (typeof( bNoAlert  ) != 'undefined') ? bNoAlert  : false        //#.(40405.06.7)
        bNoAlert_ = (typeof( bNoAlert_ ) != 'undefined') ? bNoAlert_ : bNoAlert1    // .(40405.06.8 RAM Set default to bNoAlert1 not false)
        bNoAlert_ = ( bNoAlert_ != -2) ? bNoAlert_ : false                          // .(40405.06.9)
    if (bNoAlert_) { console.log( `    ${ aMsg.trim() }` ) } else { alert( aMsg )}  // .(40405.06.10)
        }                                                                           // .(40405.05.8 RAM End)
//  -------------------------------------------------------
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/
