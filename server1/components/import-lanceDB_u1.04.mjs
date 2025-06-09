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
#.(50603.02   6/02/25 CAI  6:00a| Rewite for LanceDb by ClaudeAI 
#.(50608.03   6/08/25 RAM  4:00p| ReWrite and use MWT.getConfig again
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

// query-lanceDB.mjs - Query tools to replicate your ChromaDB queries
// import-lanceDB.mjs
// import-lanceDB.mjs - Simplified LanceDB import (AnythingLLM style)
   import      ollama      from "ollama";
   import * as lancedb     from "@lancedb/lancedb";
// import * as lancedb     from "vectordb";
   import      path        from "path";
   import      fs          from "fs";

// Import your utility functions (adjust path as needed)
//    var   MWT = (await import('../../._2/MWTs/MWT01_MattFns_u2.05.mjs')).default;
   import   MWT            from '../../._2/MWTs/MWT01_MattFns_u2.05.mjs'                // .(50608.03.6)

//          Simple configuration
//     var  lanceDbPath    = "D:/data/lancedb";  // Change this to your preferred path
//     var  lanceDbPath    = "D:/Data/AI.vectors/lanceDB"
//     var  lanceDbPath    = "D:/Data/AI.vectors/lanceDB"                               //#.(50608.03.7)
//     var  lanceDbPath    =   MWT.getConfig( ).DBpath                                  //#.(50608.03.7)
       var  lanceDbPath    =   MWT.getConfig( ).DBpath                                  // .(50608.03.7)

// Path setup (matching your original script)
       var  aMeta          =  await import.meta.url;
       var __dirname       =  aMeta.replace(/file:\/\//, "").split(/[\\\/]/).slice(0, -1).join('/');
       var __basedir       = __dirname.replace(/[\\\/](client|server)[0-9]*.+/, "");
       var  aBasedir       = __basedir;
       var  aDataDir       =  path.resolve(`${__basedir}/data`);
       var  aDataFilesDir  =  MWT.fixPath( `${__basedir}/data/AI.testR.4u/files` );

// Get collection name from command line
       var aCollection     = "s13_apple-ipad-txt";
           aCollection     =  process.argv[2] ? process.argv[2] : aCollection;

// Ensure LanceDB directory exists
try {
  fs.mkdirSync( lanceDbPath, { recursive: true });
  console.log(`LanceDB directory: ${lanceDbPath}`);
} catch (error) {
  console.error(`Cannot create directory ${lanceDbPath}:`, error.message);
  process.exit(1);
}

// Connect to LanceDB (AnythingLLM style - simple path)
var lanceDB = await lancedb.connect(lanceDbPath);

// Main execution
await deleteCollection(aCollection);
await importCollection(aCollection);
console.log(`\nCollection '${aCollection}' import to LanceDB complete.`);

if (process.platform.slice(0, 3) != "Win") { console.log("") }

// --------------------------------------------------------------

async function checkCollection(aCollectionName) {
  try {
    const tables = await lanceDB.tableNames();
    return tables.includes(aCollectionName) ? 1 : 0;
  } catch (error) {
    return 0;
  }
}

// --------------------------------------------------------------

async function deleteCollection(aCollectionName) {
  if (await checkCollection(aCollectionName) == 0) { return }
  try {
    await lanceDB.dropTable(aCollectionName);
    console.log(`Deleted LanceDB table: '${aCollectionName}'.`);
  } catch (error) {
    console.error(`Error deleting table: ${aCollectionName}`, error.message);
  }
}

// --------------------------------------------------------------

async function importCollection(aCollection, bQuiet) {
  var aSourceDocs = `${aCollection}.txt`;
  var allChunks = []; // Collect all chunks before creating table
  
  console.log(`Preparing LanceDB table: '${aCollection}'.`);

  // Models configuration
  var [ embedmodel, mainmodel ] = ["nomic-embed-text", "llama3"];

  // Read documents to import
  var docstoimport = (await MWT.readText(aDataFilesDir, aSourceDocs)).split("\n");
  docstoimport = docstoimport.filter(doc => doc.match(/^ *[#\/]+/) == null).filter(doc => doc);

  var globalSeqId = 1; // Global sequence counter across all documents

  // Process each document
  for (var doc of docstoimport) {
    doc = doc.trim().replace(/^"/, "").replace(/"$/, "");
    console.log(`\nEmbedding chunks from: '${doc}'`);

    // Resolve document path
    var originalDoc = doc;
    doc = doc.match(/^http/) ? doc : path.join(aBasedir, doc);
    
    // Extract text based on file type
    var text;
    if (doc.match(/\.pdf/)) {
      text = await MWT.extractTextFromPDF(doc);
    } else {
      text = await MWT.readText(doc);
    }
    
    // Create chunks
    var chunks = MWT.chunkTextBySentences(text.trim(), 7, 0);
    
    // Process each chunk
    var currentPosition = 0;
    for (var [index, chunk] of chunks.entries()) {
      try {
        // Generate embedding
        var embed = (await ollama.embeddings({ model: embedmodel, prompt: chunk })).embedding;
        if (!embed) throw new Error("No embedding returned");

        console.log(`Embedding chunk ${index} at position: ${currentPosition} + ${chunk.length}`);

        // Create single LanceDB record with ALL data (no separate tables)
        var chunkRecord = {
          // Primary identifiers
          id: `${originalDoc}_${index}`,          // Unique chunk ID
          seq_id: globalSeqId++,                  // Global sequence number
          
          // Collection info  
          collection: aCollection,                // Collection name
          
          // Document info
          document_path: originalDoc,             // Original document path
          document_name: path.basename(originalDoc),
          document_type: getDocumentType(originalDoc),
          document_size: text.length,
          
          // Chunk info
          chunk_index: index,                     // Chunk number within document
          chunk_text: chunk,                      // The actual text content
          chunk_start: currentPosition,           // Start position in document
          chunk_length: chunk.length,             // Length of chunk
          chunk_position_str: `${currentPosition} + ${chunk.length}`, // ChromaDB compatible format
          
          // Vector data
          vector: embed,                          // Embedding vector
          vector_dimension: embed.length,         // Vector dimensions
          
          // Processing metadata
          embed_model: embedmodel,                // Embedding model used
          sentences_per_chunk: 7,                 // Chunking parameters
          chunk_overlap: 0,
          
          // Timestamps
          created_at: new Date().toISOString(),   // When this chunk was created
          imported_at: new Date().toISOString(),  // When imported to LanceDB
          
          // Additional searchable fields
          content_hash: hashString(chunk),        // For deduplication
          language: "en",                         // Could be detected
          
          // Custom metadata (extensible)
          tags: JSON.stringify([]),               // Empty for now
          custom_metadata: JSON.stringify({       // Additional custom data
            source_collection: aCollection,
            processing_version: "1.0"
          })
        };

        allChunks.push(chunkRecord);
        currentPosition = currentPosition + chunk.length;
        
        if (bQuiet) { process.stdout.write(".") };
        
      } catch (error) {
        console.error(`\nError embedding chunk ${index} from ${doc}:`, error.message);
      }
    } // end chunks loop
  } // end documents loop

  // Create table with all chunks at once (AnythingLLM approach)
  if (allChunks.length > 0) {
    try {
      // Let LanceDB infer schema from the data (no explicit schema needed)
      const table = await lanceDB.createTable(aCollection, allChunks);
      console.log(`\nCreated LanceDB table '${aCollection}' with ${allChunks.length} chunks.`);
      
      // Verify the table was created
      const count = await table.countRows();
      console.log(`Verified: Table contains ${count} rows.`);
      
    } catch (error) {
      console.error(`Error creating LanceDB table:`, error.message);
      throw error;
    }
  } else {
    console.log("No chunks to import.");
  }
}

// --------------------------------------------------------------
// Utility Functions
// --------------------------------------------------------------

function getDocumentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.pdf': return 'pdf';
    case '.txt': return 'txt';
    case '.md': return 'markdown';
    case '.docx': return 'docx';
    case '.html': return 'html';
    default: return 'unknown';
  }
}

function hashString(str) {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString();
}

// --------------------------------------------------------------
// Search Functions (for testing)
// --------------------------------------------------------------

export async function searchCollection(collectionName, queryVector, options = {}) {
  try {
    const table = lanceDB.openTable(collectionName);
    
    let query = table.search(queryVector);
    
    // Apply filters using LanceDB's SQL-like syntax
    if (options.limit) query = query.limit(options.limit);
    if (options.documentType) {
      query = query.where(`document_type = '${options.documentType}'`);
    }
    if (options.documentName) {
      query = query.where(`document_name LIKE '%${options.documentName}%'`);
    }
    
    const results = await query.toArray();
    
    // Format results for easy consumption
    return results.map(result => ({
      id: result.id,
      text: result.chunk_text,
      score: 1 - result._distance, // Convert distance to similarity score
      document: {
        name: result.document_name,
        path: result.document_path,
        type: result.document_type
      },
      chunk: {
        index: result.chunk_index,
        position: result.chunk_position_str,
        length: result.chunk_length
      },
      metadata: {
        created_at: result.created_at,
        embed_model: result.embed_model,
        collection: result.collection
      }
    }));
    
  } catch (error) {
    console.error(`Error searching collection ${collectionName}:`, error.message);
    throw error;
  }
}

export async function getCollectionStats(collectionName) {
  try {
    const table = lanceDB.openTable(collectionName);
    const totalChunks = await table.countRows();
    
    // Get unique documents
    const results = await table.select(['document_path', 'document_name', 'document_type']).toArray();
    const uniqueDocs = [...new Set(results.map(r => r.document_path))];
    
    // Get document type breakdown
    const typeBreakdown = results.reduce((acc, r) => {
      acc[r.document_type] = (acc[r.document_type] || 0) + 1;
      return acc;
    }, {});
    
    return {
      collection_name: collectionName,
      total_chunks: totalChunks,
      unique_documents: uniqueDocs.length,
      document_types: typeBreakdown,
      documents: uniqueDocs
    };
  } catch (error) {
    console.error(`Error getting stats for ${collectionName}:`, error.message);
    throw error;
  }
}

// Export utility functions
export {
  importCollection,
  deleteCollection,
  checkCollection
};

// --------------------------------------------------------------
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
/*========================================================================================================= #  ===============================  *\
#>      S1201 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/