   import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
   import   dotenv from 'dotenv';
            dotenv.config();

class BedrockModels {

//    constructor() {

    static  client = new BedrockRuntimeClient(      
             {  region:              process.env.AWS_REGION || 'us-east-1'
             ,  credentials: 
                 {  accessKeyId:     process.env.AWS_ACCESS_KEY_ID
                 ,  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                    }
                } );
// ------------------------------------------------------------------ 

    static  models  =  
             {  default  : { rates: [ 0.00030, 0.0006 ], id: 'cohere.command-r-v1:0' }
             ,  cohere   : { rates: [ 0.00030, 0.0006 ], id: 'cohere.command-r-v1:0' }
             ,  haiku3   : { rates: [ 0.00080, 0.0040 ], id: 'anthropic.claude-3-haiku-20240307-v1:0' }
             ,  deepseek : { rates: [ 0.00135, 0.0054 ], id: 'deepseek-R1' }
//           ,  sonnet35 : { rates: [ 0.00300, 0.0150 ], id: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0' }
             ,  sonnet35 : { rates: [ 0.00300, 0.0150 ], id: 'anthropic.claude-3-5-sonnet-20240620-v1:0' }
//           ,  sonnet35 : { rates: [ 0.00300, 0.0150 ], id: 'anthropic.claude-3-5-sonnet-20241022-v2:0' }

                }    

//          } // eof constructor    
// ------------------------------------------------------------------ 

            getPlatform( ) { return "Bedrock"  }
            
// ----------------------------------------------------------------------       

           #getModel( aModel ) {     // Private method 
    return  this.getModelRates( aModel ).id;
            }     
// ----------------------------------------------------------------------       

            getModelRates( aModel ) {     
    return  this.constructor.models[ aModel ] || this.constructor.models[ 'default' ];
            }     
// ----------------------------------------------------------------------       

//  BedrockModels() { return                                this.constructor.models   }
//  BedrockModels() { return { platform: "Bedrock", models: this.constructor.models } }

// -------------------------------------------------------------------------------------

     async  runModel( aModel, pConfig ) {
            pConfig                = (typeof( pConfig ) == 'string') ? { prompt: pConfig } : pConfig; 

       var  aModelId               =  this.#getModel( aModel )
       var  pPayload  = 
             {  anthropic_version  :  pConfig.anthropic_version || "bedrock-2023-05-31"
             ,  max_tokens         :  Math.min( pConfig.max_tokens || 250, pConfig.max_tokens )
             ,  messages: [ 
                 {  role           : "user"
                 ,  content        :  pConfig.prompt || "What is this about?"
                    } ]
                }; // eoo pPayload
       try {
       var  pCommand               =  new InvokeModelCommand(
             {  modelId            :  aModelId 
             ,  body               :  JSON.stringify( pPayload )
                } ); // eoe new InvokeModelCommand

//     var  pResponse              =  await     BedrockModels.client.send( pCommand ); // ✅ Need class name, or 
       var  pResponse              =  await  this.constructor.client.send( pCommand ); // ✅ Alternative

       var  pResponseBody          =  JSON.parse( new TextDecoder().decode( pResponse.body ) );

       var  pUsage                 =  pResponseBody.usage; delete pResponseBody.usage
            pUsage.max_tokens      =  pPayload.max_tokens 

       var  pResult = 
             {  model              :  aModel 
             ,  modelId            :  aModelId
             ,  platform           :  this.getPlatform()
             ,  prompt             :  JSON.stringify( pPayload.messages[0].content )  
             ,  messages           :  JSON.stringify( pPayload.messages )
             ,  JSON_Request       :  JSON.stringify( pPayload )
             ,  JSON_Response      :  pResponseBody
             ,  textResponse       :  pResponseBody.content[0].text
             ,  usage              :  pUsage
             ,  rates              :  this.getModelRates( aModel ).rates
             ,  errorMessage       : '' 
             ,  timestamp          :  new Date().toLocaleString()
             ,  success            :  true
                };

       } catch( error ) {
           var  nStatus            =  error.$metadata.httpStatusCode;
           var  aErrorMessage      =  error.message; 
//              console.log( "** error:", JSON.stringify( error, null, 2 ) );
            if (nStatus == 429) {
           var  aMsg               = `${error.name} totalRetryDelay ${error.$metadata.totalRetryDelay}`;
           var  aErrorMessage      = `HTTP Error ${nStatus}: ${aMsg}`;
                }
//              console.log( "   aErrorMessage:", aErrorMessage)

       var  pResult = 
             {  model              :  aModel 
                 ,  modelId        :  aModelId
             ,  errorMessage       :  aErrorMessage
             ,  timestamp          :  new Date().toLocaleString()
             ,  success            :  false
                };
            } // catch( error )  
    return  pResult;
            } // eof runModel 
// -----------------------------------------------------------------------
        } // eoc BedrockModels
// --------------------------------------------------------------------------------
        
// Test code (same as your original)
        
            console.log( "" )
       var  __filename   = `${ import.meta.url.replace( /[\\\/]/g, "/" ).split( /\// ).slice(-1) }`;  // .(50614.01.1 RAM Add __dirname)
//          console.log( `  import.meta.url: ${ import.meta.url.replace( /%20/g, ' ' ) }` ) 
//          console.log( `  process.argv[1]: file:///${process.argv[1].replace( /[\\\/]/g, "/") }` )
       var  bNotImported = (import.meta.url.replace( /%20/g, ' ' ) == `file:///${process.argv[1].replace( /[\\\/]/g, "/") }` ) ? 1 : 0;
       var  bInVDebugger = (process.env.VSCODE_INSPECTOR_OPTIONS != null) ? 1 : 0; 
//          console.log(`   bNotImported: ${bNotImported} >= bInVDebugger: ${bInVDebugger} = ${bNotImported >= bInVDebugger ? 'Run here' : "Don't run here" }` ); // process.exit()
            console.log(`   bNotImported: ${bNotImported} >= bInVDebugger: ${bInVDebugger} = ${bNotImported                 ? `  Run ${__filename} here` : `  Don't run ${__filename} here` }` ); // process.exit()
//          process.exit()

//          console.log(`  bNotImported: ${bNotImported} >= bInVDebugger: ${bInVDebugger} = ${bNotImported ? `Run ${__filename} here` : `Don't run ${__filename} here`}`);

//          bNotImported      bInVDebugger  Call it here
//          -------------     ------------  --------------
//                1       >=      0              1         // called from console
//                1       >=      1              1         // called from console via --inspect  
//                1       >=      1              1         // called from this script and from VSCode Debugger
//                1       >=      0              1         // called from this script
//                0       >=      0              0         // called from parent script
//                0       >=      1              1         // called from parent script and from VSCode Debugger

        if (bNotImported) {
//      if (bNotImported >= bInVDebugger) {

       var  pBedrockModels = new BedrockModels();
       var  pModels          =  pBedrockModels;
    
            console.log("1. Basic instance:",         pModels );                                                        // Better ways to inspect the object:
            console.log("2. runModel method exists:", typeof pModels.runModel === 'function' );                         // Check if runModel method exists
            console.log("3. All methods:",            Object.getOwnPropertyNames( Object.getPrototypeOf( pModels ) ));  // List all methods
            console.log("4. Object keys:",            Object.keys( pModels ));                                          // More detailed object inspection
            console.log("5. Constructor name:",       pModels.constructor.name );
    
// ---------------------------------------------------------------------------------
    
    async function testRunModel( aModel, aPrompt ) {  // Test the method (you'll need valid AWS credentials and model ID)
        try {
            console.log("6. Testing runModel method...");
            
       var  aModel        =  aModel  || "haiku3";
       var  pPayload      =  
             {  prompt    :  aPrompt || "Hello, this is a test message"
             ,  max_tokens: 100
                };
                        
       var  pResult      =  await pModels.runModel( aModel, pPayload );
       
            console.log("7. Test result:", JSON.stringify( pResult, null, 2) );
            
        } catch (error) {
            console.log("7. Test error (expected if credentials not set):", error.message);
            }
        } // eof testRunModel
// ---------------------------------------------------------------------------------

//          await testRunModel( 'sonnet35' ); // Uncomment the line below to actually test the method
            await testRunModel(  );           // Defaults to 'haiku' 
    
            debugger
      } // eof 
//--------------------------------------------------------------------------------------------------


export default BedrockModels;