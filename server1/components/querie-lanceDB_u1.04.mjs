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
#.(50602.03   6/02/25 CAI  5:45p| Rewite for LanceDb by ClaudeAI
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

// query-lanceDB.mjs - Query tools to replicate your ChromaDB queries
   import * as lancedb from '@lancedb/lancedb';
   import   ollama     from 'ollama';
   import   path       from 'path'

     const  lanceDB =  await  lancedb.connect( 'D:/Data/LanceDB' );
            process.env.RUST_LOG = "error";

// Run CLI if this is the main module
       var  __filename    = `${ process.argv[1].replace( /[\\\/]/g, '/' ) }`
       var  bNotImported  = (import.meta.url) === `file:///${ __filename }`
       var  bInVSCode     =  process.env.VSCODE_INSPECTOR_OPTIONS ? 1 : 0
//          console.log(  `  import.meta.url: "${import.meta.url}"\n       __filename: "file:///${ __filename }"` )
//          console.log(  `  bNotImported: ${bNotImported}, bInVSCode: ${bInVSCode}` )
        if (bInVSCode) {
//          process.argv[2] = 'collections'
            process.argv[2] = 'schema'
            process.argv[3] = 's13_apple-ipad'
            }
        if (bNotImported  || bInVSCode) {
              main().catch(  console.error );
              }

// --------------------------------------------------------------
// Equivalent of: ait chromaDB counts
// --------------------------------------------------------------
export async function showCounts() {
  try {
    const tables = await lanceDB.tableNames();
    console.log("\n  LanceDB Table Counts:");
    console.log("  Table                                Rows");
    console.log("  ------------------------------------ ----");

    for (const tableName of tables) {
      try {
        const table = await lanceDB.openTable(tableName);
        const count = await table.countRows();
        console.log(`  ${tableName.padEnd(36)} ${count.toString().padStart(4)}`);
      } catch (error) {
        console.log(`  ${tableName.padEnd(36)} err`);
      }
    }
  } catch (error) {
    console.error("* Error getting counts:", error.message);
  }
}
// --------------------------------------------------------------

export async function showSchema( aTableName ) {
       aTableName = aTableName ? aTableName : 's13_apple-ipad'                          // .(50605.02.x)
  try {
    const table = await lanceDB.openTable(aTableName);

    console.log(`\n  LanceDB Schema for '${aTableName}':`);
    console.log("  " + "=".repeat(50));

    // Method 1: Try to get schema directly
    try {
      const schema = await table.schema;
      console.log("  Schema object:", schema);

      if (schema && schema.fields) {
        console.log("\n  Fields from schema.fields:");
        console.log("  Field Name               Type                 Nullable");
        console.log("  ------------------------ -------------------- --------");

        schema.fields.forEach(field => {
          console.log(
            `  ${field.name.padEnd(24)} ${field.type.toString().padEnd(20)} ${field.nullable ? 'Yes' : 'No'}`
          );
        });
      }
    } catch (schemaError) {
      console.log("* Could not get schema directly:", schemaError.message);
    }

    // Method 2: Get a sample record and examine its structure
    try {
      console.log("\n  " + "=".repeat(50));
      console.log("  Sample Data Structure:");
      console.log("  " + "=".repeat(50));

      const sampleResults = await table
//           .query()
             .search( Array(768).fill(0) )
             .limit(1).toArray();

      if (sampleResults && sampleResults.length > 0) {
        const sample = sampleResults[0];
        console.log("\n  Available fields from sample record:");
        console.log("  Field Name               Sample Value");
        console.log("  ------------------------ ----------------------------------------");

        Object.keys(sample).forEach(key => {
          let value = sample[key];

          // Handle different data types for display
          if (Array.isArray(value)) {
            if (value.length > 5) {
              value = `[Array of ${value.length} items: ${value.slice(0, 2).join(', ')}...]`;
            } else {
              value = `[${value.join(', ')}]`;
            }
          } else if (typeof value === 'string' && value.length > 40) {
            value = value.substring(0, 37) + '...';
          } else if (typeof value === 'object' && value !== null) {
            value = `{Object: ${Object.keys(value).join(', ')}}`;
          }

          console.log(`  ${key.padEnd(24)} ${String(value).padEnd(40)}`);
        });

        console.log(`\n  Total fields: ${Object.keys(sample).length}`);
        console.log(`  Total records in table: ${await table.countRows()}`);

      } else {
        console.log("* No data found in table");
      }

    } catch (dataError) {
      console.log("* Could not get sample data:", dataError.message);
    }

    // Method 3: Try to get table info/metadata
    try {
      console.log("\n  " + "=".repeat(50));
      console.log("  Table Metadata:");
      console.log("  " + "=".repeat(50));

      // Try various metadata methods
      if (typeof table.version === 'function') {
        const version = await table.version();
        console.log(`  Table version: ${version}`);
      }

      if (typeof table.description === 'function') {
        const desc = await table.description();
        console.log(`  Table description:`, desc);
      }

    } catch (metaError) {
      console.log("* Could not get table metadata:", metaError.message);
    }

  } catch (error) {
    console.error(`* Error examining schema for ${aTableName}:`, error.message);
    console.error("  Full error:", error);
  }
}

// Also create a function to list available table methods
export async function showTableMethods(aTableName) {
       aTableName = aTableName ? aTableName : 's13_apple-ipad'                          // .(50605.02.x)
  try {
    const table = await lanceDB.openTable(aTableName);

    console.log(`\n  Available methods for table '${aTableName}':`);
    console.log("  " + "=".repeat(50));

    // Get all methods
    const methods = [];
    let obj = table;
    while (obj) {
      Object.getOwnPropertyNames(obj).forEach(name => {
        if (typeof table[name] === 'function' && !methods.includes(name)) {
          methods.push(name);
        }
      });
      obj = Object.getPrototypeOf(obj);
    }

    methods.sort().forEach(method => {
      console.log(  `  ${method}()`);
    });

  } catch (error) {
    console.error(`* Error getting methods for ${aTableName}:`, error.message);
  }
}
// --------------------------------------------------------------
// Equivalent of: ait chromaDB collections
// --------------------------------------------------------------
export async function showCollections() {
  try {
    const tables = await lanceDB.tableNames();
    console.log("\n  LanceDB Collections Summary:");
    console.log("  collection_name            chunks  documents  created_range");
    console.log("  -------------------------  ------  ---------  ----------------------------------------");

    for (const tableName of tables) {
      try {
        const table = await lanceDB.openTable(tableName);

        // Get basic stats
        const totalChunks = await table.countRows();

        // Get unique documents and date range
        const results = await table
//        .query()
          .search( Array(768).fill(0) )
          .select(['document_path', 'created_at'])
          .toArray();

        const uniqueDocs = [...new Set(results.map(r => r.document_path))];
        const dates      = results.map(r => r.created_at).sort();
        const dateRange  = dates.length > 0 ?
          `${dates[0].substring(0,19)} - ${dates[dates.length-1].substring(0,19)}` :
          'no data';

        console.log(
          `  ${tableName.padEnd(25)}  ${totalChunks.toString().padStart(6)}  ${uniqueDocs.length.toString().padStart(9)}  ${dateRange}`
            );

      } catch (error) {
        console.log(`* ${tableName.padEnd(25)} error reading table`);
      }
    }
  } catch (error) {
    console.error("* Error getting collections:", error.message);
  }
}

// --------------------------------------------------------------
// Equivalent of: ait chromaDB documents
// --------------------------------------------------------------
export async function showDocuments( collectionName = null) {
  try {
    const tables = collectionName ? [ collectionName ] : await lanceDB.tableNames();

    console.log("\n  LanceDB Documents:");
    console.log("  collection_name            document_name                                                 chunks  chunk_range");
    console.log("  -------------------------  ------------------------------------------------------------  ------  -----------");

    for (const tableName of tables) {
      try {
        const table = await lanceDB.openTable(tableName);

        // Group by document
        const results = await table
          .search( Array(768).fill(0) )
//        .query()
          .select(['document_path', 'document_name', 'chunk_index', 'seq_id'])
          .toArray();

        // Group by document_path
        const docGroups = results.reduce((groups, row) => {
          const key = row.document_path;
          if (!groups[key]) groups[key] = [];
          groups[key].push(row);
          return groups;
        }, {});

        Object.entries(docGroups).forEach(([docPath, chunks]) => {
          const chunkIds   = chunks.map(c => c.seq_id).sort((a, b) => a - b);
          const chunkRange = `${chunkIds[0]}-${chunkIds[chunkIds.length-1]}`;
          const docName    = chunks[0].document_name;

          console.log(
            `  ${tableName.padEnd(25)}  ${docName.padEnd(60)}  ${chunks.length.toString().padStart(6)}  ${chunkRange}`
          );
        });

      } catch (error) {
        console.log(`* Error reading table ${tableName}:`, error.message);
      }
    }
  } catch (error) {
    console.error("* Error getting documents:", error.message);
  }
}

// --------------------------------------------------------------
// Equivalent of: ait chromaDB chunks [collection]
// --------------------------------------------------------------
export async function showChunks(collectionName) {
  try {
    const table = await lanceDB.openTable(collectionName);

    console.log(`\n  LanceDB Chunks for '${collectionName}':`);
    console.log("  seq_id  created_at           chunk_idx  document_name                                                       position");
    console.log("  ------  -------------------  ---------  ------------------------------------------------------------------  ----------------");

    const results = await table
//    .query()
      .search( Array(768).fill(0) )
//    .select(['seq_id', 'created_at', 'chunk_index', 'document_name', 'chunk_position'])
      .select(['seq_id', 'created_at', 'chunk_index', 'document_name', 'chunk_position_str'])

      .toArray();

    // Sort by seq_id
    results.sort((a, b) => a.seq_id - b.seq_id);

    results.forEach(row => {
      console.log(
        `  ${row.seq_id.toString().padStart(6)}  ${row.created_at.substring(0,19)}  ${row.chunk_index.toString().padStart(9)}  ${row.document_name.padEnd(66)}  ${row.chunk_position_str}`
      );
    });

  } catch (error) {
    console.error(`* Error getting chunks for ${collectionName}:`, error.message);
  }
}

// --------------------------------------------------------------
// Equivalent of: ait chromaDB metadata [collection]
// --------------------------------------------------------------
export async function showMetadata(collectionName) {
  try {
    const table = await lanceDB.openTable(collectionName);

    console.log(`\nLanceDB Metadata for '${collectionName}':`);
    console.log("seq_id  document_name             content_hash  custom_metadata");
    console.log("------  ------------------------  ------------  --------------------------------------------------------------------------------------------------");

    const results = await table
//    .query()
      .search( Array(768).fill(0) )
//    .select(['seq_id', 'document_name', 'document_path', 'chunk_position_str', 'embed_model', 'vector_dimension', 'metadata_json'])
//    .select(['seq_id', 'document_name', 'document_path', 'chunk_position_str', 'embed_model', 'vector_dimension', 'custom_metadata'])                //#.(50605.01.x)
      .select(['seq_id', 'document_name', 'document_path', 'chunk_position_str', 'embed_model', 'vector_dimension', 'custom_metadata', 'chunk_text' ]) // .(50605.01.x)
      .toArray();

    // Sort by seq_id
    results.sort((a, b) => a.seq_id - b.seq_id);

    results.forEach(row => {
      // Show key metadata fields (equivalent to ChromaDB's key-value pairs)
      const metadata = [
        ['chunk_text',  row.chunk_text.replace( /[\n\r ]+/g, " " ) ],                      // .(50605.01.x)
        ['position',    row.chunk_position_str ],
        ['source',      row.document_path ],
//      ['embed_model', row.embed_model],
//      ['vector_dim',  row.vector_dimension.toString()]
      ];

      metadata.forEach(([key, value], index) => {  // value = value || ''
        const seqId          = index === 0        ? row.seq_id.toString().padStart(6) : '      ';
//      const docName        = index === 0        ?       row.document_name.padEnd(24) : ' '.repeat(24);
        const docName        = index === 0        ? chop( row.document_name, 24 )      : ' '.repeat(24);
        const truncatedValue = value.length > 98 ? value.substring(0, 95) + '...' : value;

        console.log(`${seqId}  ${docName}  ${key.padEnd(12)}  ${truncatedValue}`);
      });
    });

  } catch (error) {
    console.error(`Error getting metadata for ${collectionName}:`, error.message);
  }
}
// --------------------------------------------------------------
function chop(a,n) { return a.length > n ? `${a.slice(0,n-3)}...` : a.padEnd(n) }

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
// Search function (equivalent to ChromaDB collection.query())
// --------------------------------------------------------------
export async function searchText( collectionName, queryText, options = {} ) {
  try {
    // Generate embedding for query text
    const queryEmbed = (await ollama.embeddings(
           {  model: options.embedModel || "nomic-embed-text"
           ,  prompt: queryText
              } ) ).embedding;

    const table = lanceDB.openTable(collectionName);
    let query = table.search(queryEmbed);

    // Apply options
    if (options.limit) query = query.limit(options.limit);
    if (options.documentPath) {
      query = query.where(`document_path LIKE '%${options.documentPath}%'`);
    }

    const results = await query.toArray();

    console.log(`\nSearch Results for "${queryText}" in '${collectionName}':`);
    console.log("score   seq_id  chunk_idx  document_name                                    text_preview");
    console.log("------  ------  ---------  -----------------------------------------------  ----------------------------------------");

    results.forEach(row => {
      const score = (1 - row._distance).toFixed(3); // Convert distance to similarity
      const preview = row.chunk_text.replace(/\s+/g, ' ').substring(0, 40) + '...';

      console.log(
        `${score.padStart(6)}  ${row.seq_id.toString().padStart(6)}  ${row.chunk_index.toString().padStart(9)}  ${row.document_name.padEnd(47)}  ${preview}`
      );
    });

    return results;

  } catch (error) {
    console.error(`Error searching in ${collectionName}:`, error.message);
    throw error;
  }
}

// --------------------------------------------------------------
// CLI Interface (like your ait commands)
// --------------------------------------------------------------
async function main() {
  const command = process.argv[2];
  const param   = process.argv[3];

  switch (command) {
    case 'counts':        await  showCounts();              break;
    case 'schema':        await  showSchema( param );       break;
    case 'methods':       await  showTableMethods( param ); break;
    case 'collections':   await  showCollections();         break;
    case 'documents':     await  showDocuments( param );    break;
    case 'delete':        await  deleteCollection( param ); break;
    case 'chunks':
     if (!param) {        console.error( "\n* Usage: ait lancedb query chunks <collection_name>");        process.exit(1);      }
                          await  showChunks( param );       break;
    case 'metadata':
      if (!param) {       console.error( "\n* Usage: ait lancedb query metadata <collection_name>");        process.exit(1);      }
                          await  showMetadata(param);       break;
    case 'search':
      const collection = param;
      const searchQuery = process.argv[4];
      if (!collection || !searchQuery) {
                          console.error( "\n* Usage: ait lancedb query search <collection_name> \"<search_text>\"");  process.exit(1); }
                          await  searchText(collection, searchQuery, { limit: 5 });  break;
    default:

      console.log("  Usage: aitestr lancedb query {Command}" )
      console.log( "" )
      console.log("    Command     Args                           Description")
      console.log("    ----------- -----------------------------  -------------------------------------------------" )
      console.log("    counts                                     - Show table row counts");
      console.log("    schema                                     - Show table schema");
      console.log("    methods                                    - Show table methods");
      console.log("    collections                                - Show collection summary");
      console.log("    documents   [collection]                   - Show documents in collection(s)");
      console.log("    chunks      <collection>                   - Show chunks in collection");
      console.log("    metadata    <collection>                   - Show metadata for collection");
      console.log("    search      <collection> \"<query_text>\"    - Search collection");
      console.log("    delete      <collection>                   - Delete collection");
      console.log("");
      console.log("  Examples:");
      console.log("    ait lancedb query counts");
      console.log("    ait lancedb query chunks s13_apple-ipad");
      console.log("    ait lancedb query search s13_apple-ipad \"iPad features\"");
       }

       } // eof main
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
/*========================================================================================================= #  ===============================  *\
#>      S1201 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/