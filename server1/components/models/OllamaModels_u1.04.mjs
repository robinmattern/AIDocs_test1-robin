   import ollama from "ollama";
   import dotenv from 'dotenv';
   dotenv.config();

     if (process.argv[2] == )
class OllaModels {

//    constructor() {
    static  Platform         = 'Ollama'
    static  Client =  {
//           {  Url          :  pVars[`${aPlatform}_API_URL`] // 'http://localhost:11434/api/generate'   
               };
// ------------------------------------------------------------------ 

    static  AIModels = 
             {  default    : { rates: [ 0,0 ], id: "qwen2:0.5b"               , maxTokens: 4096 } 
             ,  qwen20     : { rates: [ 0,0 ], id: "qwen2:0.5b"               , maxTokens: 4096 } 
             ,  qwen21     : { rates: [ 0,0 ], id: "qwen2:1.5b"               , maxTokens: 4096, use: 1 } 

             ,  gemma22    : { rates: [ 0,0 ], id: "gemma2:2b"                , maxTokens: 4096 } 
             ,  gemma22i   : { rates: [ 0,0 ], id: "gemma2:2b-instruct-q4_0"  , maxTokens: 4096 } 
             ,  gemma31    : { rates: [ 0,0 ], id: "gemma3:1b"                , maxTokens: 4096 } 
             ,  gemma31q   : { rates: [ 0,0 ], id: "gemma3:1b-it-q4_K_M"      , maxTokens: 4096, use: 1 } 
             ,  gemma34    : { rates: [ 0,0 ], id: "gemma3:4b"                , maxTokens: 4096 } 

             ,  granite33  : { rates: [ 0,0 ], id: "granite3.3:2b"            , maxTokens: 4096, use: 1 } 
             ,  granite338 : { rates: [ 0,0 ], id: "granite3.3:8b"            , maxTokens: 4096 } 

             ,  internlm2  : { rates: [ 0,0 ], id: "internlm2:latest"         , maxTokens: 4096 } 

             ,  llama31    : { rates: [ 0,0 ], id: "llama3.1:8b"              , maxTokens: 4096 } 
             ,  llama32    : { rates: [ 0,0 ], id: "llama3.2:3b"              , maxTokens: 4096, use: 1 } 

             ,  mistral7   : { rates: [ 0,0 ], id: "mistral:7b"               , maxTokens: 4096 } 
             ,  mistral7i  : { rates: [ 0,0 ], id: "mistral:7b-instruct"      , maxTokens: 4096 } 
             ,  nomicembed : { rates: [ 0,0 ], id: "nomic-embed-text"         , maxTokens: 4096 } 
             ,  phi4       : { rates: [ 0,0 ], id: "phi4-mini"                , maxTokens: 4096 } 
             ,  phi4q      : { rates: [ 0,0 ], id: "phi4-mini:3.8b-q4_K_M"    , maxTokens: 4096, use: 1 } 
                }
//          } // eof constructor    
// ------------------------------------------------------------------ 

            getPlatform( ) { return this.constructor.Platform } 
        
// ----------------------------------------------------------------------       

           #getModel( aModel ) {     // Private method
    return  this.getModelRates( aModel ).id;
            }
// ----------------------------------------------------------------------       

            getModelRates( aModel ) {
    return  this.constructor.AIModels[ aModel ] || this.constructor.AIModels[ 'default' ];
            }
// ----------------------------------------------------------------------       

            help() {
            console.log( "Commands: ")    
            console.log( "  list: ")    
            console.log( "  runModel: ")    
            }
// ----------------------------------------------------------------------       

            list() {
            console.log( JSON.stringify( this.constructor.AIModels ) )   
            }
// ----------------------------------------------------------------------       

// -------------------------------------------------------------------------------------

     async  runModel( aModel, pConfig ) {
            pConfig                = (typeof( pConfig ) == 'string') ? { prompt: pConfig } : pConfig;

       var  aModelId               =  this.#getModel( aModel )
       var  pPayload =  
           {  model                :  aModelId
//         ,  max_tokens           :  Math.min( pConfig.max_tokens || 250, pConfig.max_tokens )
           ,  prompt               :  pConfig.prompt || "What is this about?"
           ,  stream               :  false    
           ,  options: 
               {  temperature      :  pConfig.temperature || 0.5
//             ,  top_p            :  pConfig.top_p || 0.9
//             ,  top_k            :  pConfig.top_k || 40
               ,  num_ctx          :  Math.min( pConfig.max_tokens || 2048, pConfig.max_tokens )
                  }
              }; // eoo pPayload

       try {

       var  aStream                =  await  ollama.generate( pPayload );                                           
       var[ pStats, aResult ]      =  await   this.fmtStream( aStream  );                                           


       var  pUsage                 =  pResponse.usage; delete pResponse.usage
            pUsage.max_tokens      =  pPayload.max_tokens 

       var  pResult = 
             {  model              :  aModel
             ,  modelId            :  aModelId
             ,  platform           :  this.getPlatform()
             ,  prompt             :  JSON.stringify( pPayload.messages[0].content )  
             ,  messages           :  JSON.stringify( pPayload.messages )
             ,  JSON_Request       :  JSON.stringify( pPayload )
             ,  JSON_Response      :  pResponse
             ,  textResponse       :  pResponse.content[0].text
             ,  usage              :  pUsage  
             ,  rates              :  this.getModelRates( aModel ).rates
             ,  errorMessage       :  ''
             ,  timestamp          :  new Date().toLocaleString()
             ,  success            : true
                };

       } catch( error ) {
           var  nStatus            =  error.status;
           var  aErrorMessage      =  error.message;
//              console.log( "** error:", JSON.stringify( error, null, 2 ) );
            if (nStatus == 429) {
           var  aMsg               = 'Rate limit exceeded';
           var  aErrorMessage      = `HTTP Error ${nStatus}: ${aMsg}`;
                }
//              console.log( "   aErrorMessage:", aErrorMessage)

           var  pResult = 
                 {  model          :  aModel
                 ,  modelId        :  aModelId
                 ,  errorMessage   :  aErrorMessage
                 ,  timestamp      :  new Date().toLocaleString()
                 ,  success        :  false
                    };
            } // catch( error )  
        return  pResult;
        } // eof runModel 
// -----------------------------------------------------------------------        

/**
 * Formats the streaming response from Ollama
 * @param {Stream} stream - Ollama response stream
 * @returns {Promise<Array>} - Promise resolving to array containing [stats, result]
 */
async fmtStream(stream) {
  let isNewLine = true;
  let result = "";
  let finalStats = null;

  for await (const chunk of stream) {
    if (isNewLine) {
      result += chunk.response;
      if (global.nLog == 1) {
        process.stdout.write(`    ${chunk.response}`);
      }
    } else {
      result += chunk.response;
      if (global.nLog == 1) {
        process.stdout.write(chunk.response);
      }
    }
    isNewLine = chunk.response.endsWith("\n");
    finalStats = chunk;
  }
  return [finalStats, result];
}
//   -- --- ---------------  =  ------------------------------------------------------  #

     } // eoc OllamaModels
// --------------------------------------------------------------------------------

// Test code (same as your original)

            console.log( "" )
        var __filename   = `${ import.meta.url.replace( /[\\\/]/g, "/" ).split( /\// ).slice(-1) }`;  // .(50614.01.1 RAM Add __dirname)
//          console.log( `  import.meta.url: ${ import.meta.url.replace( /%20/g, ' ' ) }` ) 
//          console.log( `  process.argv[1]: file:///${process.argv[1].replace( /[\\\/]/g, "/") }` )
        var bNotImported = (import.meta.url.replace( /%20/g, ' ' ) == `file:///${process.argv[1].replace( /[\\\/]/g, "/") }` ) ? 1 : 0;
        var bInVDebugger = (process.env.VSCODE_INSPECTOR_OPTIONS != null) ? 1 : 0;
//          console.log(`   bNotImported: ${bNotImported} >= bInVDebugger: ${bInVDebugger} = ${bNotImported >= bInVDebugger ? 'Run here' : "Don't run here" }` ); // process.exit()
            console.log(`   bNotImported: ${bNotImported} >= bInVDebugger: ${bInVDebugger} = ${bNotImported                 ? `  Run ${__filename} here` : `  Don't run ${__filename} here` }` ); // process.exit()
//          process.exit()

//          console.log(`  bNotImported: ${bNotImported} >= bInVDebugger: ${bInVDebugger} = ${bNotImported ? `Run ${__filename} here` : `Don't run ${__filename} here`}`);

        if (bNotImported) {
//      if (bNotImported >= bInVDebugger) {        
        
       var  pClaudeModels =  new ClaudeModels();
       var  pModels          =  pClaudeModels;
    
            console.log("1. Basic instance:",         pModels );                                                        // Better ways to inspect the object:
            console.log("2. runModel method exists:", typeof pModels.runModel === 'function' );                         // Check if runModel method exists
            console.log("3. All methods:",            Object.getOwnPropertyNames( Object.getPrototypeOf( pModels ) ));  // List all methods
            console.log("4. Object keys:",            Object.keys( pModels ));                                          // More detailed object inspection
            console.log("5. Constructor name:",       pModels.constructor.name );

// ---------------------------------------------------------------------------------

    async function testRunModel( aModel, aPrompt ) { // Test the method (you'll need valid AWS credentials and model ID)
        try {
            console.log("6. Testing runModel method...");
            
        var aModel        =  aModel  || "haiku3";
        var pPayload      = 
             {  prompt    :  aPrompt || "Hello, this is a test message"
             ,  max_tokens: 100
                };
            
        var pResult      =  await pModels.runModel( aModel, pPayload );
        
            console.log("7. Test result:", JSON.stringify( pResult, null, 2) );
            
        } catch (error) {
            console.log("7. Test error (expected if credentials not set):", error.message);
            }
        } // eof testRunModel
// ---------------------------------------------------------------------------------
 
//          await testRunModel( 'sonnet35' ); // Uncomment the line below to actually test the method
            await testRunModel( );            // Defaults to 'haiku3' 
    
            debugger 
    } // eof 
//--------------------------------------------------------------------------------------------------

export default ClaudeModels;