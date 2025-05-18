/*\
##=========+====================+================================================+
##RD        MWT04_runDocsSearch | Matt's Docs Search Functions
##RFILE    +====================+=======+===============+======+=================+
##FD MWT04_runDocs..._u2.06.mjs |   3112|  4/23/25  7:45|    58| p1.03`50408.1845
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the functions to search for Docs taken from Matt
#            Williams example Ollama scripts written between 2/15/24 and 1/30/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
# async ion  getDocs( mDocs ) {
# async ion  getCleanedText_fromDocs( mDocs ) {

##CHGS     .--------------------+----------------------------------------------+
#.(50329.02   3/29/25 XAI  7:00a| Created by Grok xAI
#.(50423.02   4/22/25 RAM  6:55a| Break out runWebSearch and runDocSearch
#.(50428.04   4/28/25 RAM  5:15a| Get runDocSearch to work
#.(50429.01   4/29/25 RAM  9:25a| Add search-rag collections
#.(50430.03   4/30/25 RAM  7:50p| Add Collection to JSON_Results
#.(50430.04   4/30/25 RAM  8:15p| Find first file in FILES_PATH 
#.(50503.06   5/03/25 RAM 10:00p| Abort if no docs found
#.(50511.02   5/11/25 RAM 10:15a| Change Chroma Port from 8000 to 8808
#.(50518.02   5/18/25 RAM 11:35a| Don't load ChromaClient if it doesn't exist

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #
       
   import   ollama          from "ollama";
   import   LIBs            from '../../._2/FRT_Libs.mjs'                                                   // .(50423.02.7)

// import { ChromaClient }  from "chromadb";                                            //#.(50518.02.1)
   try { var { ChromaClient } =  await import('chromadb' ), bLoaded = true              // .(50518.02.1 RAM Conditional load Beg)
     } catch(e) { console.log( "* Can't import chromadb" ); bLoaded = false 
         }
   if (bLoaded) {                                                                       // .(50518.02.1 End)

// import { getConfig    }  from "./utilities.js";
      var   aMeta        =  await import.meta.url; 
      var   __dirname    =  aMeta.replace( /file:\/\//, "" ).split( /[\\\/]/ ).slice(0,-1).join( '/' ); 

      var   CHROMA_PORT  =  8808                                                       // .(50511.02.1 RAM Change Chroma Port from 8000)

      var   FRT          =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default                // .(50423.02.8).(50405.06.8 RAM Call function: LIBS.MOD())
      var   MWT          =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default                // .(50423.02.9).(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)
      var   pVars        =  FRT.getEnvVars( FRT.__dirname )                                                 // .(50423.02.11).(50403.02.6 RAM Was MWT).(50331.04.3 RAM Get .env vars Beg)

      var   shoMsg       =  MWT.shoMsg                                                  // .(50423.02.12)
      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()                                         // .(50423.02.10)

//    var { embedmodel, mainmodel } = await MWT.getConfig( __dirname );                                     //#.(50428.04.1)
      var { embedmodel, mainmodel } = await MWT.getConfig( FRT.__dirname );                                 // .(50428.04.1)

      var   chroma       =  new ChromaClient({ path: `http://localhost:${CHROMA_PORT}` }); // Explicit http://
      } // eif bLoaded                                                                  // .(50518.02.2)
/*
       var  query = process.argv.slice(2).join(" ");
       var  query = "What are these documents about?";

       var  aCollection   = "buildragwithtypescript"                                    // .(50425.01.8)
//     var  aCollection   = "s13_search-rag-app"                                        // .(50425.01.9) 
       var  aCollection   = "buildragwithtypescript"                                    // .(50425.01.1)
       var  aCollection   = "s13_search-rag-app"                                        // .(50425.01.2) 
//     var  aCollection   = "s13a_apple-p"
//     var  aCollection   = "s13b_apple-pdfs"
//     var  aCollection   = "s13c_rag-architecture-doc"
//     var  aCollection   = "s13d_greenbook-docs"
//     var  aCollection   = "s13e_constitution-docs"
//     var  aCollection   = "s13f_eo-docs"

       var  aCollection   =  process.argv[2] ? process.argv[2] : aCollection
//          console.log( `\nCollection: ${aCollection}` ); process.exit()                

       var  pDocs = await getRelevantDocs( aCollection, query )                         // .(50425.01.10) 

            console.log( `\n  pDocs.length: ${pDocs.length}` )
//          console.log( `\n  Docs: ${pDocs.length}` )

      const modelQuery = `${query} - Answer that question using the following text as a resource: ${pDocs}`;

      try {
          const stream = await ollama.generate({ model: mainmodel, prompt: modelQuery, stream: true });
          for await (const chunk of stream) {
              process.stdout.write( chunk.response);
          }
      } catch (error) {
          console.error("Error generating response from ollama:", error.message);
      }
*/
// --------------------------------------------------------------

async  function  getRelevantDocs( aCollection, query ) {                                                    // .(50428.04.2).(50425.01.11) 
        let collection;
        try {
            collection = await chroma.getOrCreateCollection( {
                name:        aCollection,                                                                   // .(50425.01.12) 
                metadata: { "hnsw:space": "cosine" } 
                } );
//          console.log(`Collection '${aCollection}', ready.`);                                             //#.(50425.01.13).(50429.01.1) 
        } catch (error) {
            console.error(`Error creating/getting collection: ${aCollection}`, error.message);              // .(50425.01.14) 
            process.exit(1); // Exit if collection fails
            }
// --------------------------------------------------------------       

            usrMsg(`  Fetching from collection: ${aCollection}`                                                            , shoMsg('Parms' )  ) // .(50429.01.2)

        let queryembed;
        try {
            queryembed = (await ollama.embeddings({ model: embedmodel, prompt: query })).embedding;
            if (!queryembed) throw new Error("No embedding returned from ollama");
        } catch (error) {
            console.error("Error generating query embedding:", error.message);
            process.exit(1);
            }
//      console.log( `\n  Query: ${query}`);

// ------------------------------------------------------------------------------------------------

       var  relevantDocs;
       var  pConfig = 
             {  queryEmbeddings: [queryembed]
             ,  nResults: 5
             ,  includemetadata: true  // This is the key addition
//           ,  include: ["metadatas", "documents", "distances", "data"]
             ,  include: ["metadatas", "documents"]
             ,  whereMetadata: { "$exists": "chroma:document" } // This might he
                };
      try {
//          relevantDocs = (await collection.query({ queryEmbeddings: [queryembed], nResults: 5 })).documents[0].join("\n\n");
       var  queryResults =  await collection.query( pConfig )

        } catch (error) {
            console.error("Error querying collection:", error.message);
            process.exit(1);
            }
            usrMsg("---------------------------------------------------------------------------------------------- "       , shoMsg('Search')  ) // .(50429.01.3)
            usrMsg("Response from Chroma Vector Database:"                                                                 , shoMsg('Search')  ) // .(50429.01.4)

// Access documents and metadata separately
       var  mRelevantDocs    =  queryResults.documents[0];
       var  mRelevantMetadata=  queryResults.metadatas[0];
            mRelevantMetadata=  mRelevantMetadata.map( (pDoc, i) => {                   // .(50429.01.5 RAM Was item beg)
                  pDoc.text  =  mRelevantDocs[i] 
             var  nBeg       =  pDoc.position.replace( /\+.+/, "" ).trim() * 1
             var  nLen       =  pDoc.position.replace( /.+\+/, "" ).trim() * 1
             var  aFile      =  pDoc.source.replace( /.+data/, "data" )                 // .(50429.01.6) 
//                item.url   = `${item.source}?start=${nBeg}&length=${nLen}`            //#.(50429.01.7) 
//                item.url   = `/source?file=${aFile}&start=${nBeg}&length=${nLen}`     //#.(50429.01.7) 
                  pDoc.url   = `/source?start=${nBeg}&length=${nLen}&file=${aFile}`     // .(50429.01.7) 
          return  pDoc                                                                  // .(50429.01.5) End 
                  } )

              if (mRelevantDocs.length == 0 ) {                                                             // .(50503.06.3 RAM If no docs are returned)
                  usrMsg(`\n* No Relevant Documents were returned from the Vector DB for the Collection: ${aCollection}.`   , 1 ) // shoMsg('Search') )   
                  sayMsg(  `MWT06[ 150]* No Relevant Documents were returned from the Vector DB for the Collection: ${aCollection}.`, -1 )                    
         return { DocsResponse: [], DOCs: [], Texts: [] }
                  }
// You can now use both
            mRelevantDocs    =  mRelevantDocs.map(  aDoc    => { return aDoc.replace( /[ \r\n]+/g, " ") } )                                      // .(50429.01.8 Beg)  
       var  aRelevantDocs    =  mRelevantDocs.map( (aDoc,i) => {    var aDoc = MWT.wrap( aDoc, 100, 7 )                                                                               
                                                                 return ` ${ `${i+1}.`.padStart(3) } ${ aDoc.replace( /\n/, "\n" ) }` } )                                                                                
       var  aRelevantDocs    =  aRelevantDocs.join(`\n${ "--------".padEnd(100,"-") }\n\n`)                                                      // .(50429.01.8 End)
            usrMsg(  `  Relevant sources:\n${ "--------".padEnd(100,"-") }`                                                , shoMsg('Search')  ) // .(50430.04.1)
//          usrMsg(  `  Relevant sources:\n${ aRelevantDocs }\n${ "--------".padEnd(100,"-") }`                            , shoMsg('Search')  ) //#.(50429.01.9).(50430.04.2)
            usrMsg(`\n  ${ aRelevantDocs }\n${ "--------".padEnd(100,"-") }`                                               , shoMsg('Search')  ) // .(50430.04.2).(50429.01.9)
       var  mDocs            =  mRelevantMetadata.map( (pDoc,i) => { return pDoc.url } )                    // .(50429.01.10)  
            usrMsg(`\n  Relevant documents:\n    ${ mDocs.join('\n    ') }`                                                , shoMsg('Search')  ) // .(50429.01.11)
//          return  relevantDocs

//    return { DocsResponse: mRelevantDocs,     Docs: mDocs } ;                                             //#.(50429.01.12)
//    return { DocsResponse: { URLs: mDocs, ...mRelevantMetadata, Docs: mRelevantDocs } ;                   //#.(50429.01.12)
//    return { DocsResponse: mRelevantMetadata, URLs: mDocs, Docs:  mRelevantDocs }                         //#.(50429.01.12).(50430.03.1)
      return { DocsResponse: mRelevantMetadata, DOCs: mDocs, Texts: mRelevantDocs }                         // .(50430.03.1).(50429.01.12)

            } // eof getRelevantDocs   
// ----------------------------------------------------------------------------
/**
 * Fetches and cleans text content from DOCs
 * @param {Array} urls - Array of URLs to fetch
 * @returns {Promise<Array>} - Array of cleaned text blocks
 */
      async function  getCleanedText_fromDOCs( pDocs ) {                                // .(50409.03.39 RAM Renamed from getCleanedText)
       var  texts = [];
       for (var url of urls) {
        try {
            usrMsg( `    Fetching ${url}`                                                                                  , shoMsg('Search' ) )          
       var  response         =  await fetch( url );
       var  html             =  await response.text();
       var  text             =  await MWT.htmlToText( html );
            texts.push( `Source: ${url}\n${text}\n\n` );
        } catch( error ) {
      //          console.error( `Error fetching ${url}:`, error );                     
            sayMsg(    `\n* Error fetching url: '${url}'.`,   1 );                      
            sayMsg(    `${error}`.replace( /\n/, "\n    " ), -1 );                      
      
   return [ pVars.WEB_FALLBACK_URL ];                                                  
            }
          }
    return  texts;
            }; // eof getCleanedText_fromDOCs
// --  ---  --------  =  --  =  ------------------------------------------------------  #

    export  default      // Export as default object with named functions               // .(50423.02.14 Beg)
//           { getDocs
             { getRelevantDocs
             , getCleanedText_fromDOCs
             , bLoaded                                                                  // .(50518.02.3) 
               };                                                                       // .(50423.02.14 End)
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/*========================================================================================================= #  ===============================  *\
#>      AIC90 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/
