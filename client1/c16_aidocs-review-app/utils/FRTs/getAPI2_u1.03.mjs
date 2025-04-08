    import { inspect } from 'util'
//  import   APIfns from '../JPTs/getAPI_u1.02.mjs'
    import   APIfns from '../../c16_aidocs-review-app/utils/FRTs/getAPI_u1.04.mjs'  

    var aANYLLM_API_KEY = "6Q5P8YR-JXAMFGB-KGGEZ6T-W94PXE3"
//      process.env.ANYLLM_API_KEY = aANYLLM_API_KEY

    var aHOST      = "http://155.138.193.41:3001"
    var aWorkspace = "visitor1-workspace"
    var aAPIfmt    = "/api/v1/workspace/{Workspace}/chat"
    
    var aPrompt    = "How will the Biden administration Cut wasteful spending?"
    var aPrompt    = "How will the Biden administration Make the wealthy and corporations pay more tax?"
    var aPrompt    = "What is the gross receipts tax? How does it work?"
    var aMode      = "query"

//  var aURL       = "http://155.138.193.41:3001/api/v1/workspace/visitor1-workspace/chat"
    var aAPI       =  aAPIfmt.replace( /{Workspace}/, aWorkspace )
    var aURL       = `${aHOST}${aAPI}`
    var aAPI_KEY   =  aANYLLM_API_KEY

//  var aCREDs     = "credentials": "same-origin"
    var pHeaders   =
         { "accept": "application/json"
         , "Authorization": `Bearer ${aAPI_KEY}`
         , "Content-Type" : "application/json"
            }
    var aMethod    = "POST"
    var aBody      = "{\n  \"message\": \"What is AnythingLLM?\",\n  \"mode\": \"query\"\n}"
    var pData      =  { "message": aPrompt, "mode": aMode }

      console.log( `  ${aMethod}:     ${aURL}` )
      console.log( `  pData:\n  ${ inspect( pData, { depth: 9 } ) }` )
      console.log( `  aAPI_KEY: ${aAPI_KEY}` )

//  var pResponse  =  await getAPI( aURL, aMethod, pData, aAPI_KEY )

    var pResponse  =  await APIfns.getAPI( aURL, pData, aANYLLM_API_KEY )
        console.log( inspect( pResponse ) )
     
// --------------------------------------------------------------------------

  async function getAPI( aURL, aMethod, pData, aAPI_KEY ) {
try {
        console.log(   `  Request:  ${aMethod.toUpperCase()} ${aURL}` );

    var pResponse =  await submitAPI( aURL, aMethod, pData, aAPI_KEY );

    var pJSON     =  { }
    if ( (new RegExp( /application\/json/  )).test( pResponse.headers.get( 'Content-Type' ) ) ) {

    var pJSON     =  await pResponse.json() // failing on DELETE: Cannot read properties of null (reading 'match') because 'Content-Type' not in headers
        } else {

    if ( (new RegExp( /text\/event-stream/ )).test( pResponse.headers.get( 'Content-Type' ) ) ) {

    var aJSON     =  await getReadableStream( pResponse )
    var pJSON     =  parseOpenAI_data( aJSON );                                                               // .(40323.03.1 RAM Use function)
        } else {

    var aJSON     =  await pResponse.text( )      // this is where it waits.  line 37 syncronously executes after await on line 34
    var pJSON_    =  parseOpenAI_data( aJSON );                                                             // .(40323.03.1 RAM Use function)
        pJSON = pJSON_                                                                                      // ?? return pJSON = { data: {"id":"7ca4db98-24d4-49c3-9343-b505c5d37b7d","type":"abort","textResponse":null,"sources":[],"close":true,"error":"No OpenAI API key was set."} }
        console.error( `* Error:    ${aMethod} * API request failed with 401: ${ pJSON_.data.error }` );    // ?? return pJSON = { }
        } // eif Content-Type != 'text/event-stream'
        } // eif Content-Type != 'application/json'

        console.log( `  Response: Status ${pResponse.status}`);                                    // (40330.01.1 RAM Use console_log)
//      console.log(    aText )
        console.log(    inspect( pJSON , {depth: 9 } ) )                                                                     // (40330.01.2)
    } catch ( pError ) {

    if ((pResponse ? pResponse.ok : true) == false) {                                                       // .(40320.02.1 RAM Beg ???) 
        console.error( `* Error:    ${aMethod}, * API request failed with ${pResponse.status}: ${pResponse.statusText}` );
    } else {
        console.error( `* Error:    ${aMethod}, ${pError.message}` ); }                                   // .(40320.02.1 RAM End)
        console.error( `  API_KEY:  ${aAPI_KEY}` )
        console.error( `  Data:     ${ inspect( pData || {} , { depth: 9 } ) }` )
 return pResponse                                                                                           // .(40320.02.2)
        }
 return pJSON
        }
// --------------------------------------------------------------

async function submitAPI( aURL, aMethod, pData, aAPI_KEY ) {
        aAPI_KEY  =  aAPI_KEY ? aAPI_KEY : ANYLLM_API_KEY
        aMethod   =  aMethod  ? aMethod  : 'GET'

    var pOptions  =      // Define request options
         {  method:  aMethod.toUpperCase()
         ,  headers:
             { 'Content-Type':  'application/json'
             , 'Authorization': `Bearer ${aAPI_KEY}`
                }
            };
    if (pData && aMethod.match( /POST|PUT/ )) {
        pOptions.body =  JSON.stringify( pData )
        }
    var pResponse     =  await fetch( aURL, pOptions );

    if (!pResponse.ok) {
        throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
        return pResponse 
        }
 return pResponse;
    } // eof submitAPI
// --------------------------------------------------------------

  async function getReadableStream( response ) {    // Handle ReadableStream response
    if (response.body.readable) {
  const reader = response.body.getReader();
    let chunks = [];

 while (true) {                                     // Read data chunks in a loop
const { done, value } = await reader.read( );
    if (done) break;
        chunks.push(value);
        }
  const responseData = new Blob(chunks);            // Combine chunks into a Blob
 return responseData;                               // You can further process responseData based on your data format (e.g., parse JSON)
    } else {                                        // Handle normal response (text/json)
 return await response.text();                      // Or use response.json() for JSON data
        }
    } // eof getReadableStream
// --------------------------------------------------------------

function parseOpenAI_data( aText ) {
    try {
    var mData     =  aText.match( /data:/g )
    if (mData && mData.length == 1) {
    var aJSON     = "{ " + aText.replace( /data:/, '"data":' ) + "}"
    var pJSON     =  JSON.parse( aJSON )

    } else {
    var mJSON     =  aText.replace( /[\n\r]+/g, " ").split( /data:/ )
        mJSON     = (mJSON[0] == "") ? mJSON.slice(1) : mJSON
    if (mJSON.length > 1) {
    var mJSON           =  mJSON.map( aData => JSON.parse( aData ) ), pJSON = { }  // data stream
        pJSON.response  =  mJSON.filter( pData => ( pData.type == "textResponseChunk" ) ).map( pData => pData.textResponse )
        pJSON.finalize  =  mJSON.filter( pData => ( pData.type == "finalizeResponseStream" ) )[0]
//      pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 1 )[0].sources
        pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 0 )[0].sources  // will fail is no sources elements
        console.log(    `  Response: Found ${pJSON.response.length} chunks.`);
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
    }
// --------------------------------------------------------------

