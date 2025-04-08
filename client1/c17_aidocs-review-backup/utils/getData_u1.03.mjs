/*\
##=========+====================+================================================+   
##RD        Get Data            | Get data from AnythingLLM API
##RFILE    +====================+=======+===============+======+=================+
##FD   getData.mjs              |  14293|  4/12/24 18:51|   205| v1.03`40412.1851
##FD   getData.mjs              |  15205|  4/14/24 12:08|   210| v1.03`40414.1208
##FD   getData.mjs              |  15840|  4/16/24 15:20|   215| v1.03`40416.1520
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file calls getAPI and deals with the response from
#           the AnythingLLM API.
#
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           getChatMessages
#           getChatResponse
#           fmtResponse
##CHGS     .--------------------+----------------------------------------------+
# .(40402.02  4/02/24 RAM  7:30a|  Remove ANYLLM_API_KEY
# .(40402.03  4/02/24 RAM  7:30a|  Move getAPI_u1.02.mjs to c16/utils
# .(40402.06  4/02/24 RAM  5:30p|  Move FRTools to client1/._3c1/JPTs from ._2/FRTs
# .(40402.07  4/02/24 RAM  5:30p|  Move import of setWorkspaces
# .(40405.02  4/02/24 RAM  5:30p|  Rework getting OPENAI_API_KEY
# .(40405.04  4/05/24 RAM  5:00p|  Fix pMessages error handling
# .(40406.02  4/05/24 RAM  3:38p|  Rename fmtEnv & Update getEnv, process.env
# .(40407.02  4/07/24 RAM  6:30p|  Move FRTools back to client1/c16_app/Utils folder
# .(40407.05  4/07/24 RAM  2:45p|  Rename dirName and appDir fns
# .(40409.02  4/09/24 RAM  4:10p|  Improve API Error messages
# .(40409.03  4/09/24 RAM  4:00p|  Add SERVER_HOST
# .(40409.04  4/09/24 RAM  4:00p|  Add ANYLLM_WORKSP
# .(40411.03  4/11/24 RAM  9:30a|  Add <br>s to chat response
# .(40411.05  4/11/24 RAM  8:00p|  Use main page variable
# .(40412.01  4/12/24 RAM  6:50p|  Add JPT's Doc Header Info
# .(40414.02  4/14/24 RAM 10:00p|  Add better test to pResponse.sources
# .(40415.02  4/15/24 RAM 12:40p|  Make source an MT array if not found
# .(40415.05  4/15/24 RAM  3:46p|  Add toLowercase() to ANYLLM_WORKSP
# .(40416.01  4/16/24 RAM  3:20p|  Remove colon from URL if no nPort

##SRCE     +====================+===============================================+
\*/
//  import  JPTfns        from   '../../._2/JPTs/getAPI.mjs';        var getAPI = JPTfns.getAPI     //#.(40402.03.1)
//  import  JPTfns        from    '../._3c1/JPTs/getAPI_u1.02.mjs';  var getAPI = JPTfns.getAPI     //#.(40402.03.1)
//  import  JPTfns        from                './getAPI_u1.02.js';   var getAPI = JPTfns.getAPI     //#.(40402.03.1).(40402.06.3)
//  import  JPTfns        from '../../._3c1/JPTs/getAPI_u1.03.mjs';  var getAPI = JPTfns.getAPI     //#.(40402.06.3).(40407.02.4)

//  import  APIfns        from '../../../._2/FRTs/getAPI_u1.04.mjs'; var getAPI = APIfns.getAPI     //#.(40407.02.4 RAM Move getAPI.mjs again, no workie)
//  import  APIfns        from './_2/FRTs/getAPI_u1.04.mjs';         var getAPI = APIfns.getAPI     //#.(40407.02.4 RAM Move getAPI.mjs again, no workie)
//  import  APIfns        from './utils/FRTs/getAPI_u1.04.mjs';      var getAPI = APIfns.getAPI     //#.(40407.02.4 RAM Move getAPI.mjs again, no workie)
//  import  APIfns        from './utils/getAPI_u1.04.mjs';           var getAPI = APIfns.getAPI     //#.(40407.02.4 RAM Move getAPI.mjs again, no workie)
//  import  APIfns        from './getAPI_u1.04.mjs';                 var getAPI = APIfns.getAPI     //#.(40407.02.4 RAM Move getAPI.mjs again, no workie)
//  import  APIfns        from '../FRTs/getAPI_u1.04.mjs';           var getAPI = APIfns.getAPI     //#.(40407.02.4 RAM Move getAPI.mjs again, no workie)

//  import  setWorkspaces from '../models/WorkspacesData_u1.04.mjs'                                 //#.(40402.07.2 RAM Remove it from here)

    var     APIfns     =  await import( '../utils/FRTs/getAPI_u1.04.mjs' )                          // .(40407.02.9 RAM No default).(40407.02.4 RAM Move getAPI.mjs again, maybe workie)
//  var     APIfns     =  await import( '../utils/FRTs/getAPI_u1.04.mjs' ).default                  //#.(40407.02.4 RAM Move getAPI.mjs again).(40407.02.9 RAM No default)
    var     APIfns     =  APIfns.default;                            var getAPI = APIfns.getAPI     // .(40407.02.6 RAM Move getAPI.mjs again, my goodness!?!)

    var console_log    =  APIfns.console_log

    var __APP_DIR      =  APIfns.getAppDir( import.meta.url )                                       // .(40407.05.7 RAN Changed name)
    var SERVER_HOST    =  process.env.SERVER_HOST                                                   // .(40409.03.6)
    var SERVER_PORT    =  process.env.SERVER_PORT                                                   // .(40320.01.1 RAM ENV vars set in getAPI.mjs with dotenv )
//  var ANYLLM_API_KEY =  process.env.ANYLLM_API_KEY                                                //#.(40405.02.1 RAM Don't assign it here)
    var OPENAI_API_KEY =  process.env.OPENAI_API_KEY                                                // .(40405.02.2 RAM)
//  var openaiApiKey   =  process.env.OPENAI_API_KEY                                                //#.(40405.02.9 RAM Not used)
    var ANYLLM_WORKSP  =  process.env.ANYLLM_WORKSP                                                 // .(40409.04.3)
    var ANYLLM_MODE    =  process.env.ANYLLM_MODE                                                   // .(40411.05.1)

//      --------------------------------------------------------

//  var aHost          = `http://localhost:${SERVER_PORT}`                                          // .(40409.03.7)
    var aHost          = `${SERVER_HOST}${SERVER_PORT ? `:${SERVER_PORT}` : '' }`                   // .(40416.01.1 RAM).(40409.03.7)
    var bQuiet         =  false

//  var aANYLLM_API_KEY= '6Q5P8YR-JXAMFGB-KGGEZ6T-W94PXE3'                                          //#.(40402.02.2)
//  var aANYLLM_API_KEY= '6K8TTW4-GN7MW5Q-QKRX78E-49BEM8R'                                          //#.(40402.02.3)

//      --------------------------------------------------------

    var bCalled        =  APIfns.isCalled( import.meta.url )
   if (!bCalled) {
    var bQuiet         =  true

//      setWorkspaces()

//  var aPrompt        = "What's it all about"
//  var pResponse      =  await getChatResponse( { message: aPrompt, workspace: 'workspace2', quiet: true } );
//  var pResponse      =  await getChatResponse( { message: aPrompt, workspace: 'workspace2' } );
//  var pResponse      =  await getChatResponse( { message: aPrompt, quiet: true } );
//      console_log(   `  Answer:   ${ pResponse.response}`, 0 )

//  var aPrompt        = "What's it all about"
    var aPrompt        = "Can you list the signers and their states"
    var mMessages      =  await getChatMessages( aPrompt, [ ] )
//  var mMessages      =  await getChatMessages( aPrompt, [ ], 'workspace2' )
//      console_log(   "  Messages:", 0); console_log( mMessages.slice(-2), false )  // get last two items. .splice( -2 ) removes last two items, in place
        console_log(   "  Messages:", mMessages, 0 )

        } // eof bDoit if bCalled
// ---------------------------------------------------------------------------------

//  getChatMessages(): Submit a prompt to an LLM and append it to previous messages
//  --------------------------------------------------------------
  async function getChatMessages( aPrompt, mMessages, aWorkspace, aChatMode ) {                     // .(40411.05.2)
        aWorkspace  =  aWorkspace ? aWorkspace : ANYLLM_WORKSP                                      // .(40409.04.4 RAM Was: 'constitution')
        aChatMode   =  aChatMode  ? aChatMode  : ANYLLM_MODE                                        // .(40411.05.3)
/*
    var mMessages   = [ ...mMessages, ...
        [ { role: 'user',      message: "What's up" }
        , { role: 'assistant', message: "Not much" }
        , { role: 'user',      message: "What's really up" }
        , { role: 'assistant', message: "Really not much" }  
          ] ];
*/
    var pData       =
        {  workspace:  aWorkspace.toLowerCase()                                                                         // .(40415.05.2)
        ,  message  :  aPrompt
        ,  mode     :  aChatMode                                                                                        // .(40411.05.4)
        ,  quiet    :  bQuiet
           }
    var pResponse   =  await getChatResponse( pData )   // also contains pResponse.sources

    if (pResponse.error) {                                                                                       // .(40405.04.1 RAM)
        mMessages.push( { error : pResponse } )                                                                  // .(40405.04.2)
    } else {                                                                                                     // .(40405.04.3)
    var aResponse   =  pResponse.error ? pResponse.message : fmtResponse( pResponse.response )                   // .(40411.03.2)
        mMessages.push( { role: 'user',      message: aPrompt   }
//                    , { role: 'assistant', message: pResponse[ pResponse.error ? 'message' : 'response' ] } )  //#.(40411.03.3)
                      , { role: 'assistant', message: aResponse } )                                              // .(40411.03.3)
        }                                                                                                        // .(40405.04.4)
 return mMessages
        } // eof getChatMessages
//  --- ------------------------------------------------

//  getChatResponse(): Submit a prompt to an LLM established for a Workspace
//  --------------------------------------------------------------
  async function getChatResponse( aURL, pData ) {
        APIfns.setAPIoptions( { bQuiet: true } )

    var bURL         =  typeof( aURL ) == 'string'; pData = bURL ? pData : aURL
        aURL         =  bURL  ? aURL : '/api/v1/workspace/:slug/stream-chat'
        aURL         = `${aHost}/${ aURL.replace( /^\//, '' ) }`;  // or `${aHost}/api/v1/workspaces`

    var pDefaults =
         {  workspace: 'constitution'
         ,  message  : "List the state and signers of the Constitution."
         ,  mode     : 'chat'
         ,  quiet    :  false
            }

        pData        =  { ...pDefaults, ...pData }
    var aWorkspace   =  pData.workspace;                    delete pData.workspace
    var bQuiet       =  pData.quiet ? pData.quiet : false;  delete pData.quiet
//               var {  workspace, quiet, ...pData2  } = pData

        aURL         =  aURL.replace( /:slug/,   aWorkspace )
        console_log( `Server API: ${aURL}`,          bQuiet )
        console_log( `  Question: ${pData.message}`, bQuiet )

//  var pResponse    =  await getAPI( aURL, pData, aANYLLM_API_KEY ) || { }                         //#.(40402.02.4).(40405.02.4)
    var pResponse    =  await getAPI( aURL, pData ) || { }                                          // .(40405.02.3 RAM Don't pass it here)

    var aLLM_Key     = `LLM_API_KEY: '${OPENAI_API_KEY.substr(0,20)}...${OPENAI_API_KEY.slice(-3)}'`          // .(40405.02.4 RAM)
//  if (pResponse.sources && pResponse.sources.length > 0) {                                                  //#.(40414.02.1 RAM Add better test to pResponse.sources)
    if (pResponse.response) {                                                                                 // .(40414.02.2 RAM Maybe this is better)
    var pResponse_sources = pResponse.sources[0] == "No Citations" ? [] : pResponse.sources                   // .(40415.02.5 RAM MAke length == 0)
        console_log( `   Sources: ${ pResponse_sources.length}, Mode: '${pData.mode}', ${aLLM_Key}`, bQuiet ) // .(40415.02.6).(40405.02.4 RAM)
        console_log( `  Response: ${ pResponse.response.replace( /\n/g, "\n            ")        }`, bQuiet ) // .(40415.02.7)
    var pResponse =
         {  error    :  false
         ,  sources  :  pResponse.sources
         ,  response :  pResponse.response
            }
    } else {
        if (pResponse.data) {                                                                                                     // .(40409.02.2 RAM Extra protection)
//    throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
//  var aMsg         = `* API request failed with ${pResponse.status}: ${pResponse.statusText}`
//  var aMsg         =    pResponse.data ? '* API Data request failed.\n  Error: ${pResponse.data.error}.' ? aMsg                 //#.(40405.04.5 RAM ??)
//  var aMsg         = `* API request failed with AnyLLM ${pResponse.data.type || ''} error:\n  ${pResponse.data.error}`          //#.(40405.04.5)
//  var aMsg         = `* API request failed with AnythingLLM ${pResponse.data.type || ''} error:\n    '${pResponse.data.error}'` //#.(40409.02.6).(40414.02.5)
    var aErr         =    pResponse.data.error ? pResponse.data.error : (pResponse.data.textResponse || "unknown")                // .(40414.02.3 RAM Who knows)
    var aMsg         =    pResponse.response   ? pResponse.response   :  aErr                                                     // .(40414.02.4)
    var aMsg         = `* API request failed with AnythingLLM ${pResponse.data.type || ''} error:\n    '${aMsg}'`                 // .(40414.02.5).(40409.02.6)
        aMsg        +- `\n  Is there a problem with the ${aLLM_Key}?  Try chat in AnythingLLM.`                                   // .(40409.02.7 RAM Add to msg)
    var bErr         =  true                                                                                                      // .(40409.02.9 RAM Beg Send back an error)
    } else {                                                                                                                      // .(40409.02.3)
    var aMsg         = `* LLM API chat reponse isn't returning a data object`                                                     // .(40409.02.4)
    var bErr         =  false                                                                                                     // .(40409.02.10 RAM Beg Send back a response)
        }                                                                                                                         // .(40409.02.5)
        console_log( aMsg.replace( /  /, ' '), -2 )
        pResponse    =
         {  error    :  bErr                                                                                                      // .(40409.02.11 RAM Was true)
         ,  sources  :  [ ]
         ,  message  :  aMsg
         ,  response :  aMsg                                                                                                      // .(40409.02.12 RAM ??)
            }
//      process.exit( )
        }
 return pResponse
        } // eof getChatResponse
//  --- ------------------------------------------------

function fmtResponse( aStr ) {                                                                                   // .(40411.03.1 RAM Beg Add fnc to format chat response)
    var aHTML = `${aStr}`.replace( /[\n\r]/g, "<br>" )
 return aHTML
        }                                                                                                        // .(40411.03.1 RAM End)
//  --- ------------------------------------------------

 export default { getChatResponse, getChatMessages }
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/
