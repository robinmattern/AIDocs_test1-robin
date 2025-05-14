/*\
##=========+====================+================================================+
##RD        import              | ChromaDB Import Script
##RFILE    +====================+=======+===============+======+=================+
##FD   import.js                |      0|  3/01/25  7:00|     0| p1.03`50301.0700
##FD   import_u1.01.mjs         |      0|  3/29/25  7:00|     0| p1.03`50329.0700
##FD   import_u1.03.mjs         |      0|  4/28/25  8:10|     0| p1.03`50428.0810
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script imports files into the Chroma vector database from Matt
#             Williams' example Ollama scripts written between 2/15/24 and 1/30/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Data-formR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |

##CHGS     .--------------------+----------------------------------------------+
#.(50101.01   1/01/25 MW   7:00a| Created by Matt Williams
#.(50329.02   3/29/25 XAI  7:00a| Rewritten as .mjs by Grok xAI
#.(50427.05   4/27/25 MW   7:00a| Use aCollection in importCollection
#.(50427.06   4/27/25 MW   7:30a| Move s41_bun-app to s13_search-rag-app
#.(50428.01   4/28/25 RAM  8:10a| Add Matt's utilities.js fns 
#.(50505.07   5/06/25 RAM  8:08a| Add aBasedir to imported local file path
#.(50514.03   5/14/25 RAM  1:30p| Add checkCollection before deleting it 
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   ollama                 from "ollama";
   import { ChromaClient }         from "chromadb";
// import { getConfig, readText }  from "./utilities.js";                               //#.(50428.01.1 RAM Use MWT01_MattFns)
   import { chunkTextBySentences } from "matts-llm-tools";
// import { readFile }             from "fs/promises";
// import   LIBs                   from '../../._2/FRT_Libs.mjs'
//          LIBs.MWT         = () => "../../._2/MWTs"                                                       // .(50405.06.6)
      var   LIBs             = { MWT: () => "../../._2/MWTs" }                                              // .(50405.06.6)
      var   MWT              = ( await  import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default          // .(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)

       var  CHROMA_PORT      =  8808                                                                        // .(50511.02.2)

       var     aMeta         =  await  import.meta.url; 
       var   __dirname       =  aMeta.replace( /file:\/\//, "" ).split( /[\\\/]/ ).slice(0 ,-1).join( '/' ); 
       var   __basedir       =  __dirname.replace( /[\\\/](client|server)[0-9]*.+/,""); // .(50427.05.1 RAM Add __basedir)
       var    aBasedir       =  __basedir                                               // .(50505.07.2 RAM Fix bizarre scopping issue)
       var  aDataDir         =  MWT.fixPath( `${__basedir}/data` )                      // .(50427.05.2 RAM Add aDataDir)
       var  aTestFilesDir    =  MWT.fixPath( `${__basedir}/data/AI.testR.4u/files` )    //#.(50427.05.3 RAM Add aTestFilesDir)
//          console.log('After definition: ', typeof __basedir, typeof aBasedir, typeof __dirname, typeof MWT);
//                              if (typeof( __basedir) == 'string') { console.log( "it is defined" ) }
    
//     var  chroma           =  new ChromaClient({ path: "http://localhost:8000" });                        //  Explicitly use http://
       var  chroma           =  new ChromaClient({ path: `http://localhost:${CHROMA_PORT}` });              // .(50511.02.3)
   
       var  aCollection      = "buildragwithtypescript"                                 // .(50425.01.1)
//     var  aCollection      = "s13_search-rag-app"                                     // .(50425.01.2)   
//     var  aCollection      = "s13a_apple-pages"
//     var  aCollection      = "s13b_apple-pdfs"
//     var  aCollection      = "s13c_rag-architecture-doc"
       var  aCollection      = "s13d_greenbook-docs"
//     var  aCollection      = "s13e_constitution-docs"
//     var  aCollection      = "s13f_eo-docs"
       var  aCollection      = "s13a"
   
       var  aCollection      =  process.argv[2] ? process.argv[2] : aCollection;  
       var  aCollection      = (await MWT.get1stFile( aCollection, aDataDir, ".txt")).replace( /\.txt/,'' ) // .(50427.05.4)
     
//          aCollection      =  aCollection.slice( aDataDir.length ).replace( /^[\\\/]/, "")                // .(50427.05.5)
            aCollection      =  aCollection.replace( aDataDir, '').replace( /^[\\\/]/, "")
//          console.log(       `\nCollection: ${aCollection}` ); process.exit ()                
            
//     var  aSourceDocs      = "sourcedocs.txt"                                         // .(50425.02.1)
//     var  aSourceDocs      = "s13a_apple-pages.txt"
//     var  aSourceDocs      = "s13b_apple-pages.txt"
//     var  aSourceDocs      = "s13c_rag-architure-doc.txt"
//     var  aSourceDocs      = "s13d_greenbook-pdf.txt"
//     var  aSourceDocs      = "s13e_greenbook-txt.txt"
//     var  aSourceDocs      = "s13f_constitution-docs.txt"
//     var  aSourceDocs      = "s13g_eo-docs.txt"
//     var  aSourceDocs      = `${aCollection.split( /[\\\/] ).slice(-1)[0] }.txt`
       var  aSourceDocs      = `${aCollection}.txt` // ok to contain subdir path
       var  aCollection      = `${aCollection.split( /[\\\/]/ ).slice(-1)[0] }`

            await  deleteCollection( aCollection );                                     // .(50425.01.4)
            await  importCollection( aCollection );                                     // .(50425.01.5)
//          await  importCollection( aCollection, true );                               // .(50425.01.6 RAM true = bQuiet, i.e. Don't show every chunk)
            console.log( `\nCollection, '${aCollection}', import complete.`);
           
// --------------------------------------------------------------

  async   function checkCollection( aCollectionName ) {                                 // .(50514.03.1 RAM Write checkCollection)
       var  aCollectionCode =  aCollectionName.replace( /_.*/, '' ) // /s[0-9][0-9][a-z]*_/
       var  mCollections    =  await chroma.listCollections();
       // Filter collections using regex
       var  rRegEx          =  new RegExp( `${aCollectionCode}_*.*`, 'i'); // 'i' for case-insensitive
       var  mCollections    =  mCollections.filter( aCollection => aCollection.match( rRegEx ) != null )
    return  mCollections.length 
         }                                                                              // .(50514.03.1 End)
// --------------------------------------------------------------

  async  function  deleteCollection( aCollectionName ) {                                // .(50425.01.3 RAM Use Collection name)
     if (await checkCollection( aCollectionName ) == 0) { return }                      // .(50514.03.2 RAM Check if it exists)
    try {
         await chroma.deleteCollection({ name: aCollectionName });
         console.log(`Deleted collection: '${aCollectionName}'.`);
     } catch (error) {
         console.error(`Error deleting collection: ${aCollectionName}`, error.message);
         }
     } // eol deleteCollection
// ----------------------------------------------------------------------------------

  async  function  importCollection( aCollection, bQuiet ) {                            // .(50425.01.3 RAM Use Collection name)
//    console.log('on first line of function:', typeof __basedir, typeof aBasedir, typeof __dirname, typeof MWT);
//    if (typeof( __basedir) == 'string') { console.log( "it is defined" ) }
       

    let  collection;
   try {
         collection = await chroma.getOrCreateCollection( 
          { name:        aCollection                                                    // .(50425.01.5) 
          , metadata: { "hnsw:space": "cosine" } 
            } );
         console.log(`Collection ready:   '${aCollection}'.`);                          // .(50425.01.6) 
     } catch (error) {
         console.error(`Error creating/getting collection: ${aCollection}`, error.message);  // .(50425.01.7) 
         process.exit(1); // Exit if collection fails
         }
// --------------------------------------------------------------

   var { embedmodel, mainmodel } =  await MWT.getConfig( __dirname );                   // .(50428.01.2).(50424.02.x RAM)

//  var  docstoimport            = (await     readFile( "sourcedocs.txt", "utf-8" ) ).split("\n");
    var  docstoimport            = (await MWT.readText( aDataDir, aSourceDocs    ) ).split("\n");                         // .(50427.05.6 RAM Add aDataDir).(50428.01.3).(50425.02.3)
         docstoimport            =  docstoimport.filter( doc => doc.match( /^ *[#\/]+/ ) == null ).filter( doc => doc );  // .(50425.02.4)

for (var doc of docstoimport) {
         doc    =  doc.trim().replace( /^"/, "" ).replace( /"$/, "" );                  // .(50425.02.5)
         console.log(`\nEmbedding chunks from: '${doc}'`);
         doc    =  doc.match( /^http/ ) ?  doc : MWT.fixPath( aBasedir, doc )           // .(50505.07.3 RAM Fix path is a local file)
     if (doc.match( /\.pdf/ )) {
    var  text   =  await MWT.extractTextFromPDF( doc );    
     } else {
    var  text   =  await MWT.readText( doc );                                           // .(50427.05.7 RAM Use MWT.readText. Ok if starts with './data/...)
         }
    var  chunks =  chunkTextBySentences( text.trim(), 7, 0 );                           // .(50425.01.2 RAM Avoid Error embedding chunk 19 from E:\Repos\Robin\AIDocs_\dev01-robin\data\AI.testR.4u\files\txts\constitution-bt.txt: Collection expecting embedding with dimension of 768, got 0)
    var  currentPosition = 0;                                                           // .(50424.01.1 RAM)
    for (var [index, chunk] of chunks.entries()) {
    try {
         var  embed = (await ollama.embeddings( { model: embedmodel, prompt: chunk })).embedding;
         if (!embed) throw new Error("No embedding returned");
         if (!bQuiet) { 
              console.log(`Embedding chunk ${index} at position: ${currentPosition} + ${chunk.length}`);  
              }
/*         await collection.add({
                ids: [doc + index], 
                embeddings: [embed], 
                metadatas: { source: doc }, 
                documents: [chunk] 
                }); */
         var  pData = 
               { ids:        [doc + index] 
               , embeddings: [embed] 
               , metadatas:  { source: doc 
//                           , position: { beg: currentPosition, end : currentPosition + chunk.length,  len: chunk.length }
                             , position: `${currentPosition} + ${chunk.length}`
                               }
               , documents:  [chunk] 
                 }
     await  collection.add( pData )
            currentPosition = currentPosition + chunk.length
        if (bQuiet) { process.stdout.write(".") };
        } catch (error) {
            console.error(`\nError embedding chunk ${index} from ${doc}:`, error.message);
            }
          }
        } // eol docstoimport 
// --------------------------------------------------------------
       } // eof importCollection 
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
/*========================================================================================================= #  ===============================  *\
#>      S1201 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/