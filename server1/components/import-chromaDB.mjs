/*\
##=========+====================+================================================+
##RD        import              | ChromaDB Import Script
##RFILE    +====================+=======+===============+======+=================+
##FD   import.js                |      0|  3/01/25  7:00|     0| p1.03`50301.0700
##FD   import_u1.01.mjs         |      0|  3/29/25  7:00|     0| p1.03`50329.0700
##FD   import_u1.03.mjs         |      0|  4/28/25  8:10|     0| p1.03`50428.0810
##FD   import-lanceDB.mjs       |      0|  6/02/25 17:45|     0| p1.04`50602.1745
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script imports files into the LanceDB vector database from Matt
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

       var  MWT              =( await  import( './MWT01_MattFns_u2.05.mjs`) ).default )

       var  CHROMA_PORT      =  8808

       var     aMeta         =  await  import.meta.url;
       var __dirname       =  aMeta.replace(/file:\/\//, "").split(/[\\\/]/).slice(0, -1).join('/');
       var __basedir       = __dirname.replace(/[\\\/](client|server)[0-9]*.+/, "");
       var  aBasedir       = __basedir;
       var  aDataDir       =  path.resolve(`${__basedir}/data`);
       var  aTestFilesDir    =  path.resolve( `${__basedir}/data/AI.testR.4u/files` )

       var  chroma           =  new ChromaClient({ path: `http://localhost:${CHROMA_PORT}` });

//     var  aCollection      = "buildragwithtypescript"
       var  aCollection      = "s13_apple-ipad-txt"
//     var  aCollection      = "s13a_apple-pages"
//     var  aCollection      = "s13b_apple-os-pdfs"
//     var  aCollection      = "s13c_rag-architecture-doc"
//     var  aCollection      = "s13d_greenbook-docs"
//     var  aCollection      = "s13e_constitution-docs"
//     var  aCollection      = "s13f_eo-docs"

       var  aCollection      =  process.argv[2] ? process.argv[2] : aCollection;
       var  aCollection      = (await MWT.get1stFile( aCollection, aDataDir, ".txt")).replace( /\.txt/,'' ) // .(50427.05.4)

            await  deleteCollection( aCollection );

            await  importCollection( aCollection );
            console.log( `\nCollection, '${aCollection}', import complete.`);

        if (process.platform.slice(0,3) != "Win") { console.log("") }

// --------------------------------------------------------------

  async   function checkCollection( aCollectionName ) {
       var  aCollectionCode =  aCollectionName.replace( /_.*/, '' ) // /s[0-9][0-9][a-z]*_/
       var  mCollections    =  await chroma.listCollections();
       var  rRegEx          =  new RegExp( `${aCollectionCode}_*.*`, 'i'); // Filter collections using regex
       var  mCollections    =  mCollections.filter( aCollection => aCollection.match( rRegEx ) != null )
    return  mCollections.length
         } // eof checkCollection
// --------------------------------------------------------------

  async  function  deleteCollection( aCollectionName ) {
     if (await checkCollection( aCollectionName ) == 0) { return }
    try {
         await chroma.deleteCollection({ name: aCollectionName });
         console.log(`Deleted collection: '${aCollectionName}'.`);
     } catch (error) {
         console.error(`Error deleting collection: ${aCollectionName}`, error.message);
         }
     } // eol deleteCollection
// ----------------------------------------------------------------------------------

  async  function  importCollection( aCollection, bQuiet ) {
    let  collection;
    var  aSourceDocs = `${aCollection}.txt`
   try {
         collection = await chroma.getOrCreateCollection(
          { name:        aCollection
          , metadata: { "hnsw:space": "cosine" }
            } );
         console.log(`Collection ready:   '${aCollection}'.`);
     } catch (error) {
         console.error(`Error creating/getting collection: ${aCollection}`, error.message);
         process.exit(1); // Exit if collection fails
         }
// --------------------------------------------------------------

   var { embedmodel, mainmodel } =  [ "nomic-embed-text", "llama3" ];

    var  docstoimport            = (await MWT.readText( aDataDir, aSourceDocs ) ).split("\n");
         docstoimport            =  docstoimport.filter( doc => doc.match( /^ *[#\/]+/ ) == null ).filter( doc => doc );

//     --------------------------------------------------------------

  for (var doc of docstoimport) {

         doc    =  doc.trim().replace( /^"/, "" ).replace( /"$/, "" );
         console.log(`\nEmbedding chunks from: '${doc}'`);

         doc    =  doc.match( /^http/ ) ?  doc : path.join( aBasedir, doc )
     if (doc.match( /\.pdf/ )) {
    var  text   =  await MWT.extractTextFromPDF( doc );
     } else {
    var  text   =  await MWT.readText( doc );
         }
    var  chunks =        MWT.chunkTextBySentences( text.trim(), 7, 0 );

//      ------------------------------------------

    var  currentPosition = 0;
    for (var [index, chunk] of chunks.entries()) {
    try {
    var  embed = (await ollama.embeddings( { model: embedmodel, prompt: chunk })).embedding;
    if (!embed) throw new Error("No embedding returned");

         console.log(`Embedding chunk ${index} at position: ${currentPosition} + ${chunk.length}`);
    var  pData =
          { ids:        [doc + index]
          , embeddings: [ embed ]
          , metadatas:  { source: doc
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
          } // eol chunks
//      ------------------------------------------
        } // eol docstoimport
//     --------------------------------------------------------------
       } // eof importCollection
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
