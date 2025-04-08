/*\ . . . . .
##=========+====================+================================================+
##RD        Workspaces Component| For AIDocs-Review Chat App
##RFILE    +====================+=======+===============+======+=================+
##FD   WorkspacesComponent.mjs  |   3855|  4/08/24  8:48|    94| u1.03`40408.0848
##FD   WorkspacesComponent.mjs  |   4113|  4/08/24 18:42|    96| u1.03`40408.1842
##FD   WorkspacesComponent.mjs  |   7209|  4/10/24 16:00|   141| u1.03`40410.1600
##FD   WorkspacesComponent.mjs  |   7398|  4/12/24 15:30|   143| u1.04`40412.1530
##FD   WorkspacesComponent.mjs  |   7560|  4/26/24 09:30|   146| u1.04`40426.0930
##FD   WorkspacesComponent.mjs  |   7917|  4/30/24 12:02|   150| u1.04`40430.1202
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file creates the HTML tag: workspaces-component.
#           It is defined in the class WorkspacesComponent that includes styles that
#           are local to the component.
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           WorkspacesComponent    extends LitElement class
#             get styles
#             constructor
#             fetchAndRenderWorkspaces
#             render
##CHGS     .--------------------+----------------------------------------------+
# .(40402.07  4/02/24 RAM  5:30p|  Move import of setWorkspaces
# .(40408.01  4/08/24 RAM  4:00p|  Modify Rick's CSS Styles
# .(40408.02  4/08/24 RAM  7:45a|  Remove Workspaces Select field
# .(40410.03  4/10/24 RAM  4:00p|  Hardcode workspace label
# .(40410.04  4/10/24 RJS  4:00p|  Add Filelist
# .(40412.01  4/12/24 RAM  3:30p|  Add JPT's Doc Header Info
# .(40426.01  4/26/24 RJS  9:30a|  Style Changes
# .(40430.02  4/30/24 RJS 12:02p|  Remove Table styles
                                |
##SRCE     +====================+===============================================+
\*/
// import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
   import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// import { LitElement, html, css,  unsafeHTML } from 'https://cdn.jsdelivr.net/npm/@polymer/lit-html/lit-html.min.js';
// import { LitElement, html, css,  unsafeHTML } from 'https://cdn.jsdelivr.net/npm/@polymer/lit-html';
// import { html, render          } from 'https://unpkg.com/lit-html?module'; import { unsafeHTML } [1]
// import { html, css, unsafeHTML } from 'lit-html';
// import { unsafeHTML   } from 'https://unpkg.com/lit-html@^3';
// import { Directive    } from 'https://cdn.jsdelivr.net/npm/lit-html@1.4.1/directive.js'
// import { html         } from 'https://cdn.jsdelivr.net/npm/lit-html@1.4.1/lit-html.js'
// import { unsafeHTML   } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.2/lit-html.js'
   import { unsafeHTML   } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.2/directives/unsafe-html.js'

   import   setWorkspaces  from '../models/WorkspacesData_u1.04.mjs'                                // .(40402.07.1 RAM import of setWorkspaces here)
//-------------------------------------------------------------------------------

//  var aHTML = await setWorkspace( ); // console.log( aHTML )   // Var aHTML is not defined inside component

  class WorkspacesComponent_ extends LitElement {

    static get styles() {
      return css`
        #WorkspaceList {
          display         : none;                                       /* .(40426.01.4 RJS Style added) */
          position        : relative;
          top             : 20px;                                       /* .(40426.01.4 RJS Style changes, was 40px;) *//* .(40408.01.7 RAM Was 10px; in _v1.03.40410.1120-Rick) */
          text-align      : left;
          margin-right    : 10px;
          }
        #WorkspaceLabel {
          padding-left    : 20px;                                       /* .(40410.03.1 RJS Beg Chg CSS #WorkspaceLabel, Was 10px;) */
          font-size       : 15px;
          font-family     : sans-serif;
          padding-bottom  : 0px;                                        /* .(40408.01.8 RAM Added) */
        }                                                               /* .(40410.03.1 RJS End) */
        #FileList {                                                     /* .(40410.04.1 RJS Beg Add CSS #Filelist) */
          padding-left    : 20px;
          font-size       : 20px;
          color           : blue;
          font-family     : sans-serif;
        }                                                               /* .(40410.04.2 RJS End) */
        select option {
          height          : 15px;
          padding-left    : 20px;
          min-height      : 15px;
          font-family     : serif;
          font-size       : 20px;
        }
        select {
          line-height     : 45px;
          font-family     : serif;
          font-size       : 20px;
        }
/*                                                                    *//*#.(40430.02.1 RJS Beg Remove Table styles) */
        table left{
          position        : relative;  /* absolute; */
          top             : 15px;
          left            : 750px;
          border          : 1px solid blue;
          }
        tr {
          background-color: lightblue;
          }
*/                                                                      /*#.(40430.02.1 RJS End) */
        `;
        }
//      ---------------------------------------------------------

//  static get properties() { }
//      ---------------------------------------------------------

      constructor() {
        super();
        this.HTML = '';                           // Initialize aHTML within the component
        this.fetchAndRenderWorkspaces();          // Call the method to fetch data and render
        } // eof constructor
//      ---------------------------------------------------------

  async fetchAndRenderWorkspaces() {
    try {
    var aHTML     =  await setWorkspaces( );      // Call setWorkspace inside a method
        this.HTML =  aHTML;                       // Assign the result to aHTML property
//      this.HTML =  "<div>Hello</div>"           // Don't show it
        this.HTML =  "<div></div>"                                 // .(40408.02.1 RAM Remove)
        this.requestUpdate( );                    // Trigger a re-render
    } catch (error) {
        console.error( 'Error fetching workspace data:', error );
        }
        }
//      ---------------------------------------------------------

  render( ) {
 return html`
    <div id="WorkspaceList">
       <span  id="WorkspaceLabel">User Document(s):</span>            <!-- .(40410.03.2 RJS Add Doc Name) -->
       <b     id="FileList">                                          <!-- .(40410.04.2 RJS Beg Add Filelist) -->
         <a href="./uploads/GreenbookFY2025.pdf" target="_blank"
           title="View GreenbookFY2025.pdf">GreenbookFY2025.pdf
         </a>
       </b>                                                           <!-- .(40410.04.2 End) -->
       ${ unsafeHTML( this.HTML ) }
    </div>
    `;
        } // eof render
//      ---------------------------------------------------------
      } // eof WorkspacesComponent_
//  -------------------------------------------------------------------------------

    customElements.define( 'workspaces-component', WorkspacesComponent_ );

    export class WorkspacesComponent extends WorkspacesComponent_ { }
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/

