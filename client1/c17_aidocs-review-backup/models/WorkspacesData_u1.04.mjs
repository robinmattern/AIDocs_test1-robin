/*\ . . . .
##=========+====================+================================================+
##RD        Workspaces Data     | Retrieve List of workspaces
##RFILE    +====================+=======+===============+======+=================+
##FD   WorkspacesData.mjs       |  12186|  4/12/24 18:10|   262| u1.04`40412.1810
##FD   WorkspacesData.mjs       |  12276|  4/16/24 15:20|   263| u1.04`40416.1520
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file retreive the list of Workspaces in AnythingLLM
#           and then formats them as a table and or a select list.
#
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           setWorkspaces
#           getWorkspaces
#           fmtWorkspaces

#           fmtWorkspacesHeader
#           fmtWorkspaceRow
#           fmtWorkspacesFooter

#           fmtWorkspacesHeader_v1
#           fmtWorkspaceRow_v1

#           fmtWorkspacesHeader_v2
#           fmtWorkspaceRow_v2
#           fmtWorkspacesFooter_v2

#           fmtWorkspacesHd_
#           fmtWorkspaceRow_
#           fmtWorkspacesFt_

##CHGS     .--------------------+----------------------------------------------+
# .(40402.06  4/02/24 RAM  5:30p|  Move FRTools to client1/._3c1/JPTs from ._2/FRTs
# .(40402.10  4/02/24 RAM  6:50p|  Remove process.exit() in WorkspacesComponent
# .(40407.02  4/07/24 RAM  6:30p|  Move FRTools back to client1/c16_app/Utils folder
# .(40407.05  4/07/24 RAM  2:45p|  Rename dirName and appDir fns
# .(40409.03  4/09/24 RAM  4:00p|  Add SERVER_HOST
# .(40411.06  4/11/24 RAM  8:30p|  Deal with single data response
# .(40412.01  4/12/24 RAM  6:10p|  Add JPT's Doc Header Info
# .(40416.01  4/16/24 RAM  3:20p|  Remove colon from URL if no nPort
                                |
##SRCE     +====================+===============================================+
\*/
//  import  JPTfns        from '../../._3c1/JPTs/getAPI_u1.03.mjs';  var getAPI = JPTfns.getAPI     //#.(40402.06.2).(40407.02.2)
//  import  APIfns        from '../../../._2/FRTs/getAPI_u1.04.mjs'; var getAPI = APIfns.getAPI     //#.(40407.02.2).(40402.06.2).(40407.02.3 RAM No workie)
//  import  APIfns        from './_2/FRTs/getAPI_u1.04.mjs';         var getAPI = APIfns.getAPI     //#.(40407.02.2).(40402.06.2).(40407.02.3 RAM No workie)
//  import  APIfns        from './utils/FRTs/getAPI_u1.04.mjs';      var getAPI = APIfns.getAPI     //#.(40407.02.2).(40402.06.2).(40407.02.3 RAM No workie)
//  import  APIfns        from '../utils/FRTs/getAPI_u1.04.mjs';     var getAPI = APIfns.getAPI     //#.(40407.02.3 RAM Move getAPI.mjs again, no workie)

//  var     APIfns     ={ getAppDir: ( a ) => a }                                                   //#.(40407.02.3 RAM Fake it)
    var     APIfns     =  await import( '../utils/FRTs/getAPI_u1.04.mjs' )                          // .(40407.02.9 RAM No default).(40407.02.3 RAM Move getAPI.mjs again, maybe workie)
//  var     APIfns     =  await import( '../utils/FRTs/getAPI_u1.04.mjs' ).default                  //#.(40407.02.3 RAM Move getAPI.mjs again).(40407.02.9)
    var     APIfns     =  APIfns.default;                            var getAPI = APIfns.getAPI     // .(40407.02.6 RAM Move getAPI.mjs again, my goodness!?!)

    var console_log    =  APIfns.console_log
  var __APP_DIR        =  APIfns.getAppDir( import.meta.url )                                       // .(40407.05.6 RAN Changed name)
  var   SERVER_HOST    =  process.env.SERVER_HOST                                                   // .(40409.03.4)
  var   SERVER_PORT    =  process.env.SERVER_PORT                                                   // .(40320.01.1 RAM ENV vars set in getAPI.mjs with dotenv )

//      --------------------------------------------------------

//  var aHost          = `http://localhost:${SERVER_PORT}`                                          // .(40409.03.5)
    var aHost          = `${SERVER_HOST}${SERVER_PORT ? `:${SERVER_PORT}` : '' }`                   // .(40416.01.2 RAM).(40409.03.5)

    var bQuiet         =  false

    var bCalled        =  APIfns.isCalled( import.meta.url )
   if (!bCalled) {
    var bQuiet         =  false

        setWorkspaces()
        }
//      --------------------------------------------------------

  async function setWorkspaces( ) {
//      bQuiet =  false
//      bQuiet =  0;  getWorkspaces( )
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader ] )
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader,    fmtWorkspaceRow ] ); console_log( aHTML, 0 )
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader,    fmtWorkspaceRow,    fmtWorkspacesFooter ] );
    var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader_v2, fmtWorkspaceRow_v2, fmtWorkspacesFooter_v2 ] );
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader_v1, fmtWorkspaceRow_v1, fmtWorkspacesFooter ] );

        console_log( "- getWorkspaces:", aHTML, bQuiet )
//      putWorkspace( aHTML, aDiv = "" )
 return aHTML
        } // eof setWorkspace
// -------------------------------------------------------------------------------------------

//      fmtWorkspacesHeader(): Fmt Heading for Workspaces
//  --------------------------------------------------------------
function fmtWorkspacesHeader( ) {
//  var mCols    = [ "Id", "Workspace", "':slug'", "Hst", "CreatedAt" ]
    var mCols    = [ "Workspace", "':slug'" ]
    var aColfmt  = `         <th>{Col}</th>`
    var aCols    = `
     <table>
       <tr>
       ${ mCols.map( aCol => { return aColfmt.replace( /{Col}/, aCol ) } ).join("\n").substr(7) }
       </tr>\n`
 return aCols
        } // eof fmtWorkspacesHeader
//      --------------------------------------------------------

function fmtWorkspacesHeader_v2( ) {
        var aSelect = `\n     <select id="lstWorkspaces">\n`
     return aSelect
            } // eof fmtWorkspacesHeader
    //      --------------------------------------------------------

    function fmtWorkspacesFooter( ) {
 return `\n     </table>`
        } // eof fmtWorkspacesFooter
//      --------------------------------------------------------

function fmtWorkspacesFooter_v2( ) {
    return `\n     </select>`
           } // eof fmtWorkspacesFooter
   //      --------------------------------------------------------

function fmtWorkspacesHeader_v1( ) {
    var mCols    = [ "Id", "Workspace", "':slug'", "Hst", "CreatedAt" ]
    var aColfmt  = `         <div><u>{Col}</u></div>`
    var aCols    = `
     <div class="Header" style="display: flex">
     ${ mCols.map( aCol => { return aColfmt.replace( /{Col}/, aCol ) } ).join("\n").substr(7) }
     </div>\n`
 return aCols
        } // eof
//      --------------------------------------------------------

//      fmtWorkspaceRow(): Fmt Each Workspace row
//  --------------------------------------------------------------
function fmtWorkspaceRow( pRec, i ) {
    var mCells   =
//      [ `${pRec.id}`.padStart(3)                              // Id
        [  pRec.name.trim()                                     // Workspace
        ,  pRec.slug.trim()                                     // slug
//      ,  pRec.createdAt .substr(2, 17).replace( /T/, " " )    // CreatedAt
           ]
    var aCells   =
`       <tr>
        ${ mCells.map( aCell => { return `         <td>${aCell}</td>` } ).join("\n").substr(8) }
       </tr>`
 return aCells
        }
//      --------------------------------------------------------

function fmtWorkspaceRow_v1( pRec, i ) {
    var mCells   =
        [ `${pRec.id}`.padStart(3)                              // Id
        ,  pRec.name.trim()                                     // Workspace
        ,  pRec.slug.trim()                                     // slug
        ,  pRec.createdAt .substr(2, 17).replace( /T/, " " )    // CreatedAt
           ]
    var aCellfmt =  `      <div>{Cell}</div>`
    var aCells   =  `
    <div class="row" style="display: flex">
      ${ mCells.map( aCell => { return aCellfmt.replace( /{Cell}/, aCell ) } ).join("\n").substr(6) }
    </div>`
 return aCells
        }
//      --------------------------------------------------------

function fmtWorkspaceRow_v2( pRec, i ) {
    var pItem   =
        {  Name      : pRec.name.trim()
        ,  Slug      : pRec.slug.trim()
//      ,  CreatedAt : pRec.createdAt .substr(2, 17).replace( /T/, " " )    // CreatedAt
        }
    var aItemFmt =  `       <option id="{Slug}">{Name}</option>`
    var aItem    = aItemFmt
        aItem    = aItem.replace( /{Slug}/, pItem.Slug )
        aItem    = aItem.replace( /{Name}/, pItem.Name )
 return aItem
        }
//      --------------------------------------------------------

//      getWorkspaces(): Get Workspaces with API_KEY
//  --------------------------------------------------------------
  async function getWorkspaces( aURL, mFmtFns ) {
        APIfns.setAPIoptions( { bQuiet: true } )

    if (Array.isArray(aURL)) { mFmtFns = aURL; aURL = '' }
        aURL      =  aURL ? aURL : '/api/v1/workspaces'
    var aURL      = `${aHost}/${ aURL.replace( /^\//, '' ) }`;  // or `${aHost}/api/v1/workspaces`
        console_log( `  Request:  GET ${aURL}`, bQuiet )

    var pResponse =  await getAPI( aURL ) || { }
//      console.log( pResponse || {} )

    if (pResponse.workspaces) {

    var mRecs     =  pResponse.workspaces
    var aFmtText  =  fmtWorkspaces( mRecs, mFmtFns || [] )

        console_log( "- fmtWorkspaces: ", aFmtText, bQuiet )
        return aFmtText
    } else {
        throw new Error( `* Workspaces API request failed with no response.` );                     //.(40402.10.1 RAM Remove process.exit() in WorkspacesComponent)
//      process.exit()
        }
//  --- --------------------------------------------------------

function fmtWorkspaces( mRecs, mFmtFns ) {

    var fmtWorkspacesHd = mFmtFns[0] ? mFmtFns[0] : fmtWorkspacesHd_
    var fmtWorkspaceRow = mFmtFns[1] ? mFmtFns[1] : fmtWorkspaceRow_
    var fmtWorkspacesFt = mFmtFns[2] ? mFmtFns[2] : fmtWorkspacesFt_

    var aResult =             fmtWorkspacesHd()
        aResult += mRecs.map( fmtWorkspaceRow ).join( "\n" )
        aResult +=            fmtWorkspacesFt()
 return aResult

//      -----------------------------------------------

function fmtWorkspacesHd_( ) {
    var aText = `\n`
//    + `  Id          Workspace                       ':slug'             Hst     CreatedAt          UpdatedAt     `
//    + ` ----  ------------------------------  -------------------------  ---  -----------------  -----------------`
      + `  Id          Workspace                       ':slug'             Hst     CreatedAt     \n`
      + ` ----  ------------------------------  -------------------------  ---  -----------------\n`
 return aText
        } // eof fmtWorkspaceHd_
//      -----------------------------------------------

function fmtWorkspaceRow_( pRec, i ) {
    var aWID       = `${pRec.id}`.padStart(3)
    var aWorkspace =  pRec.name.padEnd( 30 )
    var aSlug      =  pRec.slug.padEnd( 25 )
    var aAIPrompt  =  pRec.openAiPrompt
    var aAITemp    =  pRec.openAiTemp
    var aAILikness =  pRec.similarityThreshold
    var aAITopN    =  pRec.topN
    var aChatModel =  pRec.chatModel
    var aChatMode  =  pRec.chatMode
    var aHistory   = `${pRec.openAiHistory}`.padStart(3)
    var aCreatedAt =  pRec.createdAt .substr(2, 17).replace( /T/, " " )
    var aUpdatedAt =  pRec.lastUpdatedAt.substr(2, 17).replace( /T/, " " )

//eturn ` ${aWID}.  ${aWorkspace}  ${aHistory}  ${aCreatedAt}  ${aUpdatedAt}`
 return ` ${aWID}.  ${aWorkspace}  ${aSlug}  ${aHistory}  ${aUpdatedAt}`
        } // eof fmtWorkspaceRow_

function fmtWorkspacesFt_( ) {
 return ``
        } // eof fmtWorkspaceFt
//      -----------------------------------------------
        } // eof fmtWorkspaces
//  --- --------------------------------------------------------
      } // eof getWorkspaces
//  --- ------------------------------------------------------------------

 export default setWorkspaces
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/



