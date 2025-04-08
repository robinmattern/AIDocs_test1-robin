/*\ . . . . . . . . .
##=========+====================+================================================+
##RD        getAPI.mjs          |  FRT's API Methods
##RFILE    +====================+=======+===============+======+=================+
##FD   getAPI.mjs               |  15778|  4/05/24 17:40|   273| v1.02`40405.1740
##FD   getAPI_u1.04.mjs         |  19442|  4/08/24 15:51|   299| u1.04`40408.1551
##FD   getAPI.mjs               |  18666|  4/12/24 19:05|   294| u1.04`40412.1905
##FD   getAPI.mjs               |  19183|  4/19/24 22:35|   297| u1.04`40419.2235
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file calls getAPI and deals with the response from
#           the AnythingLLM API. It hanles, text, json, errors and streaming data.
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           getAPI              |  Get API data for aURL, aMethod, pData, aAPI_KEY
#           submitAPI           |  Submmit API  for aURL, aMethod, pData, aAPI_KEY
#           getReadableStream   |  Receive NodeJS stream
#           parseOpenAI_data    |  Parse OpenAI's received stream
#             strip             |
#           setAPIoptions       |  Set API pOptions
#           getDirName          |  Get Dir Name for aPath
#           getAppDir           |  Get Dir Name for aApp
#           isCalled            |  Get if script is called
#                               |
##CHGS     .--------------------+----------------------------------------------+
# .(40402.02  4/02/24 RAM  7:30a|  Remove ANYLLM_API_KEY
# .(40405.01  4/05/24 RAM  4:38p|  Modify API failure messages
# .(40405.02  4/02/24 RAM  5:30p|  Rework getting OPENAI_API_KEY
# .(40406.02  4/05/24 RAM  3:38p|  Rename fmtEnv & Update getEnv, process.env
# .(40407.01  4/07/24 RAM  3:48p|  Add Doc Header
# .(40407.05  4/07/24 RAM  2:45p|  Rename dirName and appDir fns
# .(40407.06  4/07/24 RAM  4:05p|  Replace inspect with fmtObj
# .(40408.03  4/08/24 RAM  7:45a|  Clear Prompt Form Field
# .(40409.02  4/09/24 RAM  3:48p|  Improve API Error messages
# .(40410.02  4/10/24 RAM  4:15a|  Fix Chat response with no sources
# .(40412.01  4/12/24 RAM  7:05p|  Add JPT's Doc Header Info
# .(40419.03  4/19/24 RAM 10:35p|  Return pResponse error corectly
                                |
##SRCE     +====================+===============================================+
\*/
        import { FRT                 }  from  './formr_utility-fns_u1.08.mjs'; var fmtObj = FRT.fmtObj      // .(40407.06.10)
        import { __dirname, __appDir }  from  './formr_utility-fns_u1.08.mjs'

    var __APP_DIR        =  __appDir
    var bQuiet           =  true, bNoisy = bQuiet ? 0 : 2

//  --- --- -----------  =  --------------------------------------------------

//      FRT.getHelp()
        FRT.setQuiet(  bQuiet )
//      FRT.traceR(   'getAPI.mjs[1]', 'FRT', 2, FRT );
        FRT.traceR(   'getAPI.mjs[2]', '__dirname', bNoisy, __dirname );
//      FRT.traceR(   'getAPI.mjs[3]', `__appDir: ${__dirname}`, 2 );

    var pEnv             =  await FRT.getEnv( true )
        FRT.traceR(   'getAPI.mjs[1]', 'pEnv', bNoisy, pEnv );

    var ANYLLM_API_KEY   =  process.env[ 'ANYLLM_API_KEY' ]
    var OPENAI_API_KEY   =  process.env[ 'OPENAI_API_KEY' ]                                                 // .(40405.02.5)
   if (!ANYLLM_API_KEY) {
        console_log(   `* Error:    ANYLLM_API_KEY not set in: ` + ` ${__APP_DIR}/.env` );
//      console_log(   `* Error:    ANYLLM_API_KEY not set in:`,`\n  ${__APP_DIR}/.env`.padStart(7), -2 );
//      process.exit()                                                                                      //#.(40408.03.1)
        throw new { message: `* Error:    ANYLLM_API_KEY not set in: ${__APP_DIR}/.env` }                   // .(40408.03.1)
        } // eif !ANYLLM_API_KEY
//      --- ----- = ---  =  --------------------------------------------

  async function getAPI( aURL, aMethod, pData, aAPI_KEY ) {
        aMethod   =  aMethod  ? aMethod  : 'GET'
    if (typeof(aMethod) == 'object') {
        aAPI_KEY  =  pData    // shift 3rd arg to 4th arg
        pData     =  aMethod  // shift 2nd arg to 3rd arg
        aMethod   = 'POST'    // insert           2nd arg
        }
//      dotenv.config( { path: `${__APP_DIR}/.env` } )
//      ANYLLM_API_KEY = process.env.ANYLLM_API_KEY
        aAPI_KEY  =  aAPI_KEY ? aAPI_KEY : ANYLLM_API_KEY
//      console.log(    `  Using THE ANYLLM_API_KEY: ${aAPI_KEY}` )                                 //#.(40402.02.5 RAM ??)
try {
    if (!bQuiet) {
        console.log(    `  Request:  ${aMethod.toUpperCase()} ${aURL}` );
        }
    var pResponse =  await submitAPI( aURL, aMethod, pData, aAPI_KEY );

    var pJSON     = { }
//  if (pResponse.headers.get('Content-Type').match( /application\/json/ )) {
    if ( (new RegExp( /application\/json/  )).test( pResponse.headers.get( 'Content-Type' ) ) ) {

    var pJSON     =  await pResponse.json() // failing on DELETE: Cannot read properties of null (reading 'match') because 'Content-Type' not in headers
        } else {

  if ( (new RegExp( /text\/event-stream/ )).test( pResponse.headers.get( 'Content-Type' ) ) ) {

    var aJSON     =  await getReadableStream( pResponse )
    var pJSON     =  parseOpenAI_data( aJSON );                                                             // .(40323.03.1 RAM Use function)
        } else {

    var aJSON     =  await pResponse.text( )      // this is where it waits.  line 37 syncronously executes after await on line 34
    var pJSON_    =  parseOpenAI_data( aJSON );                                                             // .(40323.03.1 RAM Use function)
        pJSON     =  pJSON_                                                                                 // ?? return pJSON = { data: {"id":"7ca4db98-24d4-49c3-9343-b505c5d37b7d","type":"abort","textResponse":null,"sources":[],"close":true,"error":"No OpenAI API key was set."} }
        console.error(  `* Error:    ${aMethod} * API request failed with 401: ${ pJSON_.data.error }` );   // ?? return pJSON = { }
        } // eif Content-Type != 'text/event-stream'
//      --- ----- = ---  =  --------------------------------------------
      } // eif Content-Type != 'application/json'
//    - --- -----------  =  -----------------------------------------------

// if (!bQuiet) {
        console_log( `  Response: Status ${pResponse.status}`, bQuiet );                                    // (40330.01.1 RAM Use console_log)
//      console.log(    aText )
//      console.dir(    pJSON, { depth: 99 } )
//      console.log(    inspect( pJSON, { depth: 99 } ) )
    if (pJSON.data  &&  pJSON.data.type == 'abort' && pJSON.data.error.match( /code 401/ )) {               // .(40405.02.6 RAM Beg Add LLM_API_KEY)
    var aLLM_Key        = `LLM_API_KEY: '${OPENAI_API_KEY.substr(0,20)}...${OPENAI_API_KEY.slice(-3)}'`     // .(40405.02.7 RAM)
//      pJSON.data.error=  pJSON.data.error + `\n  Is LLM_API_KEY set and valid?`}
//      pJSON.data.error=  pJSON.data.error + ` for\n  '${aLLM_Key}'\n  Is it valid?`                       //#.(40410.02.2 RAM)
        pJSON.data.error=  pJSON.data.error + ` for\n     ${aLLM_Key}. Is it valid?`                        // .(40410.02.2 RAM)
        }
        console_log(    pJSON, bQuiet )                                                                     // (40330.01.2)
//      }
    } catch ( pError ) {

    if ((pResponse ? pResponse.ok : true) == false) {                                                       // .(40320.02.1 RAM Beg ??? if bQuiet ).(40330.01.3)
    var aMsg = `* Error:    ${aMethod}, * API request failed with ${pResponse.status}: ${pResponse.statusText}`              // .(40405.01.6)
//      console_log( `* Error:    ${aMethod}, * API request failed with ${pResponse.status}: ${pResponse.statusText}`, -2 ); //#.(40405.01.7)
        console_log( aMsg, -2 ); if (typeof(window) == 'undefined') { alert( aMsg ) }                       // .(40415.03.1).(40405.01.7)
    } else {
    var aMsg = `* Error:    ${aMethod}, ${pError.message}.\n`                                               // .(40405.01.3 RAM Beg)
             + `  URL:     '${ aURL }'. Is API for workspace working?\n`                                    // .(40415.03.2 RAM Was "Is it alive")
             + `  API_KEY: '${aAPI_KEY}'. Is it valid?`
        console_log( aMsg, -2 ); if (typeof(window) != 'undefined') { alert( aMsg ) }                       // .(40415.03.3).(40405.01.4 RAM End)
//      console_log( `* Error:    ${aMethod}, ${pError.message}. Is ${aURL} alive.`, -2 );                  //#.(40320.02.1 RAM End).(40405.01.4)
//      console_log( `  API_KEY:  ${aAPI_KEY}. Is it valid`, -2 )                                           //#.(40405.01.5)
        console_log( `  Data:     ${ fmtObj( pData || {} , { depth: 9 } ) }`, -2 )                          // .(40407.06.11)
 return pResponse                                                                                           // .(40320.02.2)
        } } // eoe catch( pError )
//      --- ----- = ---  =  --------------------------------------------
 return pJSON
      } // eof getAPI
//  --- --- -------  =  -----------------------------------------------------

  async function submitAPI( aURL, aMethod, pData, aAPI_KEY ) {
    	aAPI_KEY       =  aAPI_KEY ? aAPI_KEY : ANYLLM_API_KEY
    	aMethod        =  aMethod  ? aMethod  : 'GET'

	var pOptions       =      // Define request options
	     {  method:  aMethod.toUpperCase()
	     ,  headers:
	         { 'Content-Type':  'application/json'
	         , 'Authorization': `Bearer ${aAPI_KEY}`
	            }
	        };
	if (pData && aMethod.match( /POST|PUT/ )) {
	    pOptions.body   =  JSON.stringify( pData )
	    }
	var pResponse       =  await fetch( aURL, pOptions );

	if (!pResponse.ok) {
//  if (bQuiet) { return pResponse }                                                                                      //#.(40405.01.2)
//      throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );                      //#.(40405.01.1)
//  if (bQuiet) { return pResponse }                                                                                      //#.(40405.01.2)
//      throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );                      //#.(40405.01.1)
//      pResponse.message = `* API request failed with ${pResponse.status}: ${pResponse.statusText}`                      //#.(40409.02.1)
        pResponse.message = `* API request failed with error: ${pResponse.status || ''}: '${pResponse.statusText || ''}'` // .(40409.02.1 RAM Modify error msg)
//      throw new        pResponse;                                                                                       //#.(40405.01.2 RAM Throw the error if not ok).(40415.03.4)
//      throw new Error( pResponse );                                                                                     //#.(40405.01.2 RAM Throw it correctly).(40415.03.4)
        throw            pResponse;                                                                                       // .(40415.03.4).(40405.01.2 RAM Throw it correctly)
	    } // eif !pResponse.ok
//      --- ----- = ---  =  --------------------------------------------
 return pResponse;
  	} // eof submitAPI
//  --- --- -------  =  -----------------------------------------------------

  async function getReadableStream( response ) {    // Handle ReadableStream response
    if (response.body.readable) {
  const reader    =  response.body.getReader();
    let chunks    = [];

 while (true) {                                     // Read data chunks in a loop
const { done, value } =  await reader.read( );
    if (done) break;
        chunks.push(value);
        }
  const responseData =  new Blob(chunks);           // Combine chunks into a Blob
 return responseData;                               // You can further process responseData based on your data format (e.g., parse JSON)
    } else {                                        // Handle normal response (text/json)
 return await response.text();                      // Or use response.json() for JSON data
        }
      } // eof getReadableStream
//  --- --- -------  =  -----------------------------------------------------

function parseOpenAI_data( aText ) {
    try {
    var mData           =  aText.match( /data:/g )
    if (mData && mData.length == 1) {
    var aJSON           = "{ " + aText.replace( /data:/, '"data":' ) + "}"
    var pJSON           =  JSON.parse( aJSON )
        pJSON.response  =  pJSON.data.textResponse || ""                                                    // .(40411.06.1 RAM Opps, need to assign these)
        pJSON.finalize  =  ""                                                                               // .(40411.06.2)
        pJSON.sources   =  pJSON.data.sources      || []                                                    // .(40411.06.3)

    } else {
    var mJSON          =  aText.replace( /[\n\r]+/g, " ").split( /data:/ )
        mJSON          = (mJSON[0] == "") ? mJSON.slice(1) : mJSON
    if (mJSON.length > 1) {
    var mJSON           =  mJSON.map( aData => JSON.parse( aData ) ), pJSON = { }  // data stream
        pJSON.response  =  mJSON.filter( pData => ( pData.type == "textResponseChunk" ) ).map( pData => pData.textResponse )
        pJSON.finalize  =  mJSON.filter( pData => ( pData.type == "finalizeResponseStream" ) )[0]

//      pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 1 )[0].sources           //# failed
//      pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 0 )[0].sources           //# will fail is no sources elements
        pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 0 ) // [0].sources       //  will fail is no sources elements
//      pJSON.sources   =  pJSON.sources                      ? pJSON.sources[0] : [ "No Citations" ]       //#.(40410.02.1)
        pJSON.sources   = (pJSON.sources && pJSON.sources[0]) ? pJSON.sources[0] : [ "No Citations" ]       // .(40410.02.5 RAM Add [0]).(40410.02.2 RAM Pass something back)

        console_log(    `  Response: Found ${pJSON.response.length} chunks.`, bQuiet );
        pJSON.response  =  pJSON.response.join( "" )

    } else {
        console.error(  `* Error:    parseOpenAI_data didn't contain data: { } object(s).` )
        console.log(    `  aJSON:    ${ strip( aText, 1000 ) }` )

    var pJSON          = { response: aText }
      } }
    } catch( e ) {
        console.error( `* Error:    parseOpenAI_data failed with invalid JSON.` )
        console.log(   `  aJSON:    ${ strip( aText, 1000 ) }` )

    var pJSON          = { error: "Invalid OpenAI streaming data", textResponse: strip( aText, 250 ) }
         }
 return pJSON

 function strip(a,n) { return (a.substr(0,n) + "\n\n........\n\n" + a.substr( a.length - n, n)).replace( /[\n\r]+/g, "\n            " )}
      } // eof parseOpenAI_data
//  --- --- -------  =  -----------------------------------------------------

function setAPIoptions( pOptions ) {
        bQuiet = pOptions.bQuiet ? pOptions.bQuiet : bQuiet
      } // eof setAPIoptions
//  --- --- -------  =  -----------------------------------------------------

function getDirName( aPath ) {                                                                      // .(40407.05.8 RAM Rename dirName to getDirName)
        aPath = aPath ? aPath : import.meta.url
 return aPath.replace( aPath.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" )
      } // eof getDirName
//  --- --- -------  =  -----------------------------------------------------

function getAppDir( aApp ) {     var aPath = ""                                                     // .(40407.05.1 RAM Rename appDir to getAppDir)
    if (aApp.match( /^file:/ )) { aPath = aApp; aApp = "" }
    var aAPP_DIR  =  `${ getDirName( aPath ).replace( /\/[A-Z]:/, '' )}/${aApp}`                    // .(40407.05.2)
//      dotenv.config( { path: `${aAPP_DIR}/.env` } )                                               // .(40331.02.4 RAM End)
 return aAPP_DIR
      } // eof getAppDir
//  --- --- -------  =  -----------------------------------------------------

function isCalled( aCallee, aCaller ) {
    if (aCallee.match( /^http/) ) { return true }     // .(40331/02/1 RAM to work in browser)
        aCaller = aCaller ? aCaller : process.argv[1]
    var aCallee = aCallee.replace( /^.+[\\\/]/, '' ); // console.log( "aCallee: import.meta.url:", aCallee)
    var aCaller = aCaller.replace( /^.+[\\\/]/, '' ); // console.log( "aCaller: process.argv[1]:", aCaller)
//  var bCalled = aCaller != aCallee;                 // console.log( "bCalled:", bCalled)
//      console.log( "aCallee: import.meta.url:", import.meta.url );
//      console.log( "aCaller: process.argv:", inspect( process.argv, { depth:9 } ) );
//      process.exit()
 return aCaller != aCallee
      } // eof isCalled
//  --- --- -------  =  -----------------------------------------------------

//      console_log( "Hello:\n   ","foo", [-2,3], -2 )                                              //#.(40330.01.3)
//      console_log( "sdf",-2 ); console.log("-----" )                                              //#.(40330.01.3)
function console_log( aMsg, nQuiet ) {                                                              // .(40330.01.3 RAM Beg Write console_log)
//  var aMsg = Object.entries(arguments).join( " -- " )
    var nArgs = arguments.length -1, aMsg = "", nQuiet = 0                                          // .(40407.06.1 RAM Should we do all this before knowing whsat bQuiet is)
        Object.entries(arguments).forEach( (a) => {
//        console.log( a[0], "---", a[1] )
          if (String(a[1]).match(/^(-*[0-2]|true|false)$/) && a[0] == nArgs ) { nQuiet = a[1] * 1; return }
          if (typeof(a[1]) == 'object' ) { aMsg += fmtObj( a[1], { depth: 9 } ); return }           // .(40407.06.2 RAM inspect is not defined)
          aMsg += " " + String( a[1] )
          } )
//  var bQuiet = (nQuiet == -2) ? false : (typeof( nQuiet ) == 'boolean' ? nQuiet : false)
    var bQuiet = (nQuiet == -2) ? false : (nQuiet == 1); aMsg = aMsg.substr(1)                      // .(40409.01.2 RAM Remove leading space)
    if (bQuiet) { return }

//  if (typeof(aMsg) == 'object' ) { aMsg = "  " + inspect( aMsg, { depth: 9 } ) }
    if (nQuiet == -1) { aMsg  = "\n" + aMsg   }
    if (nQuiet == -2) { console.error( aMsg ) }
      else {            console.log(   aMsg ) }
        return
      } // eof console_log                                                                          // .(40330.01.3 RAM End)
//  --- --- -------  =  -----------------------------------------------------

    var APIfns = { getAPI, getDirName, getAppDir, isCalled, setAPIoptions, console_log }            // .(40407.05.3 RAM).(40330.01.5 RAM Add console_log)
        export default APIfns;

//----------------------------  =  --------------------------------- ------------------
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/
