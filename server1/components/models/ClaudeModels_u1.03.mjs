   import Anthropic from '@anthropic-ai/sdk';
   import dotenv from 'dotenv';
   dotenv.config();

class ClaudeModels {

//    constructor() {

    static  client = new Anthropic(
             {  
             
             
                    apiKey:          process.env.ANTHROPIC_API_KEY // Get from https://console.anthropic.com

               } );
// ------------------------------------------------------------------ 

    static  models = 
             {  default  : { rates: [ 0.00025, 0.00125 ], id: 'claude-3-haiku-20240307',    maxTokens: 4096 }
             ,  haiku3   : { rates: [ 0.00025, 0.00125 ], id: 'claude-3-haiku-20240307',    maxTokens: 4096 }
             ,  sonnet35 : { rates: [ 0.00300, 0.01500 ], id: 'claude-3-5-sonnet-20241022', maxTokens: 8192 }
             ,  opus4    : { rates: [ 0.01500, 0.07500 ], id: 'claude-3-opus-20240229',     maxTokens: 4096 }
                };





//          } // eof constructor    
// ------------------------------------------------------------------ 

            getPlatform( ) { return "Claude" } 
        
// ----------------------------------------------------------------------       

           #getModel( aModel ) {     // Private method
    return  this.getModelRates( aModel ).id;
            }
// ----------------------------------------------------------------------       

            getModelRates( aModel ) {
    return  this.constructor.models[ aModel ] || this.constructor.models[ 'default' ];
            }
// ----------------------------------------------------------------------       

//  AnthropicModels() { return this.constructor.models }
//  AnthropicModels() { return { platform: "Claude, models: this.constructor.models } }

// -------------------------------------------------------------------------------------

     async  runModel( aModel, pConfig ) {
            pConfig                = (typeof( pConfig ) == 'string') ? { prompt: pConfig } : pConfig;

       var  aModelId               =  this.#getModel( aModel )
       var  pPayload =  
           {  model                :  aModelId
           ,  max_tokens           :  Math.min( pConfig.max_tokens || 250, pConfig.max_tokens )
           ,  messages: [             
               {  role             : "user"
               ,  content          :  pConfig.prompt || "What is this about?"
                  } ]
              }; // eoo pPayload
       try {

//     var  pResponse              =  await   AnthropicModels.client.send( pCommand );            // ? Need class name, or 
       var  pResponse              =  await  this.constructor.client.messages.create( pPayload ); // ? Alternative


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
     } // eoc ClaudeModels
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