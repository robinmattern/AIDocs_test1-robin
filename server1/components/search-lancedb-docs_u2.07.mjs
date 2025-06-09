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
#.(50605.01   6/05/25 CAI 10:15a| Rewrite search-lancedb-docs from search-docs
#.(50605.03   6/05/25 CAI  6:00p| Rewrite and use MWTs.getConfig
#.(50608.03   6/08/25 RAM  4:00p| ReWrite and use MWT.getConfig again

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   ollama           from "ollama";
   import   LIBs             from '../../._2/FRT_Libs.mjs'                                                  // .(50423.02.7)
   import * as LanceDbClient from '@lancedb/lancedb';                                                       // .(50605.01.5)

// import { ChromaClient }   from "chromadb";                                           //#.(50518.02.1)
// try { var { ChromaClient } =  await import('chromadb' ), bLoaded = true              // .(50518.02.1 RAM Conditional load Beg)
//   } catch(e) { console.log( "* Can't import chromadb" ); bLoaded = false
//       }
 var   bLoaded = true                                                                                       // .(50605.01.6 RAM It's loaded/imported)
   if (bLoaded) {                                                                       // .(50518.02.1 End)

// import { getConfig    }  from "./utilities.js";
       var  aMeta        =  await import.meta.url;
       var  __dirname    =  aMeta.replace( /file:\/\//, "" ).split( /[\\\/]/ ).slice(0,-1).join( '/' );

//     var  CHROMA_PORT  =  8808                                                                            //#.(50511.02.1 RAM Change Chroma Port from 8000).(50605.01.7)

       var  FRT          =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default                // .(50423.02.8).(50405.06.8 RAM Call function: LIBS.MOD())
       var  MWT          =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default                // .(50423.02.9).(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)
       var  pVars        =  FRT.getEnvVars( FRT.__dirname )                                                 // .(50423.02.11).(50403.02.6 RAM Was MWT).(50331.04.3 RAM Get .env vars Beg)

       var  shoMsg       =  MWT.shoMsg                                                  // .(50423.02.12)
      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()                                         // .(50423.02.10)

//    var { embedmodel, mainmodel } = await MWT.getConfig( __dirname );                                     //#.(50428.04.1)
//    var { embedmodel, mainmodel } = await MWT.getConfig( FRT.__dirname );                                 //#.(50428.04.1).(50605.03.1)  
//     var  pVectorDB_Config        = await MWT.getConfig( FRT.__dirname )                                  //#.(50605.03.1 Beg).(50608.03.10)  
       var  pVectorDB_Config        = await MWT.getConfig( )                                                // .(50608.03.10).(50605.03.1 Beg)  
//     var  pVectorDB_Config        = await MWT.getConfig( `${ FRT.__basedir}/Data/config.jsonc` )          //#.(50608.03.11).(50605.03.1 Beg)  

       var  embedmodel   =  pVectorDB_Config.EmbedModel || 'nomic-embed-text'                               // .(50605.03.2)  

        if (pVectorDB_Config.DBname == "chromaDB") {
       var  chroma       =  new    ChromaClient({ path: `http://localhost:${CHROMA_PORT}` });               //#.(50605.03.3).(Use explicit http://)
        } else {
        if (pVectorDB_Config.DBname != "") {
//     var  lanceDB      =  await  LanceDbClient.connect( 'D:/Data/LanceDB' );                              //#.(50605.03.4)
       var  lanceDB      =  await  LanceDbClient.connect( pVectorDB_Config.DBpath );                        // .(50605.03.4)
        } else {
            usrMsg( `* No Vector DB path or config.json can be found.` )
            process.exit()      
         }  } // eif LanceDB                                                                                // .(50605.03.1 End)  
      } // eif bLoaded                                                                  // .(50518.02.2)
            usrMsg( `AI13[  82]  Using ${pVectorDB_Config.DBname} at '${pVectorDB_Config.DBpath}`, 1 )
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

async function getRelevantDocs(aCollection, query) {
    let table;  // Changed from 'collection' to 'table'
    try {
        // Changed: Open LanceDB table instead of ChromaDB collection
        table = await lanceDB.openTable( aCollection );
        // console.log(`Table '${aCollection}', ready.`);
    } catch (error) {
        console.error(`Error opening table: ${aCollection}`, error.message);
        process.exit(1);
    }

    // --------------------------------------------------------------
    usrMsg(`  Fetching from table: ${aCollection}`, shoMsg('Parms'));

    let queryembed;
    try {
        queryembed = (await ollama.embeddings({ model: embedmodel, prompt: query })).embedding;
        if (!queryembed) throw new Error("No embedding returned from ollama");
    } catch (error) {
        console.error("Error generating query embedding:", error.message);
        process.exit(1);
    }

    // ------------------------------------------------------------------------------------------------

    try {
        // Changed: LanceDB search instead of ChromaDB query
        var queryResults = await table
            .search(queryembed)  // Vector similarity search
            .limit(5)            // Equivalent to nResults: 5
            .toArray();          // Get results as array

    } catch (error) {
        console.error("Error querying table:", error.message);
        process.exit(1);
    }

    usrMsg("----------------------------------------------------------------------------------------------", shoMsg('Search'));
    usrMsg("Response from LanceDB Vector Database:", shoMsg('Search'));

    // Changed: LanceDB returns different structure than ChromaDB
    // ChromaDB: queryResults.documents[0] and queryResults.metadatas[0]
    // LanceDB: queryResults is directly the array of records

    var mRelevantDocs = queryResults.map(result => result.chunk_text);  // Extract text content
    var mRelevantMetadata = queryResults.map((result, i) => {
        return {
            text: mRelevantDocs[i],
            // Map LanceDB fields to your expected structure
            position: result.chunk_position_str,  // "0 + 2244" format
            source: result.document_path,         // Document path
            // Create URL for source viewing
            url: (() => {
                var nBeg = result.chunk_start;     // Direct access to start position
                var nLen = result.chunk_length;    // Direct access to length
                var aFile = result.document_path.replace(/.+data/, "data");
                return `/source?start=${nBeg}&length=${nLen}&file=${aFile}`;
            })()
        };
    });

    if (mRelevantDocs.length == 0) {
        usrMsg(`\n* No Relevant Documents were returned from the Vector DB for the Table: ${aCollection}.`, 1);
        sayMsg(`MWT06[ 150]* No Relevant Documents were returned from the Vector DB for the Table: ${aCollection}.`, -1);
        return { DocsResponse: [], DOCs: [], Texts: [] }
    }

    // Rest of the function remains exactly the same
    mRelevantDocs = mRelevantDocs.map(aDoc => { return aDoc.replace(/[ \r\n]+/g, " ") });
    var aRelevantDocs = mRelevantDocs.map((aDoc, i) => {
        var aDoc = MWT.wrap(aDoc, 100, 7);
        return ` ${`${i + 1}.`.padStart(3)} ${aDoc.replace(/\n/, "\n")}`;
    });
    var aRelevantDocs = aRelevantDocs.join(`\n${"--------".padEnd(100, "-")}\n\n`);
    usrMsg(`  Relevant sources:\n${"--------".padEnd(100, "-")}`, shoMsg('Search'));
    usrMsg(`\n  ${aRelevantDocs}\n${"--------".padEnd(100, "-")}`, shoMsg('Search'));
    var mDocs = mRelevantMetadata.map((pDoc, i) => { return pDoc.url });
    usrMsg(`\n  Relevant documents:\n    ${mDocs.join('\n    ')}`, shoMsg('Search'));

    return { DocsResponse: mRelevantMetadata, DOCs: mDocs, Texts: mRelevantDocs };
}

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
