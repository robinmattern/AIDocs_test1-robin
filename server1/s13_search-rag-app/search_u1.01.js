/*\
##=========+====================+================================================+
##RD        search              | Main Search and AI Response Script
##RFILE    +====================+=======+===============+======+=================+
##FD search_u1.01.js            |   3620| 3/25/25 10:00|   103| u1.01.50325.1000
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script gets a "document" saved into ChromeDB by import.js
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(40408.01   4/08/24 MW   7:00a| Created by Matt Williama
#.(50323.01   3/31/25 CAI  8:30a| Converted to Javascript by Claude.AI
#.(50323.02   3/31/25 CAI  9:30a| Workedd on by Bruce Troutman
#.(50325.02   3/25/25 RAM  8:30a| Edited by Robin Mattern 
#.(50335.03   3/25/25 RAM 10:00a| Write fmtFinalStats
#
##PRGM     +====================+===============================================+
##ID S1102. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   ollama         from "ollama";
   import { ChromaClient } from "chromadb";
   import { getConfig }    from "./utilities.js";

const { embedmodel, mainmodel } = getConfig();

const chroma = new ChromaClient({ path: "http://localhost:8000" }); // Explicit http://

let collection;
try {
    collection = await chroma.getOrCreateCollection({ 
        name: "buildragwithtypescript", 
        metadata: { "hnsw:space": "cosine" } 
    });
    console.log( "\n  Collection ready.");                                              // .(50325.02.1 RAM Add 2 leading spaces)
} catch (error) {
    console.error( "* Error creating/getting collection:", error.message, "\n");        // .(50325.02.2 RAM Add \n and *)
    process.exit(1); // Exit if collection fails
}

const query = process.argv.slice(2).join(" ");
let queryembed;
try {
    queryembed = (await ollama.embeddings({ model: embedmodel, prompt: query })).embedding;
    if (!queryembed) throw new Error("\n* No embedding returned from ollama\n");
} catch (error) {
    console.error("\n* Error generating query embedding:", error.message, "\n");
    process.exit(1);
}


if (query == "") { console.log( "\n* Please enter a question on the command line.\n"); process.exit()  }    // .(50325.02.3)
    console.log( `\n  Asking Ollama model, ${mainmodel}: '${query}'\n` );                                   // .(50325.02.4 RAM Add Msg)

let relevantDocs;
try {
    relevantDocs = (await collection.query({ queryEmbeddings: [queryembed], nResults: 5 })).documents[0].join("\n\n");
} catch (error) {
    console.error("\n* Error querying collection:", error.message, "\n");
    process.exit(1);
}

const modelQuery = `${query} - Answer that question using the following text as a resource: ${relevantDocs}`;

let finalStats = null;
let isNewLine = true; // Track if we're at the start of a line
let aResult="" 
try {
    const stream = await ollama.generate({ model: mainmodel, prompt: modelQuery, stream: true });
    for await (const chunk of stream) {
      if (isNewLine) {
          aResult = `${aResult}${chunk.response}`
          process.stdout.write(`    ${chunk.response}`); // Indent only at line start
      } else {
          aResult = `${aResult}${chunk.response}`
          process.stdout.write(chunk.response); // No extra indent mid-line
          }
          // Update new line status: true if chunk ends with \n
          isNewLine  = chunk.response.endsWith("\n");
          finalStats = chunk;
        }
} catch (error) {
    console.error( "\n* Error generating response from ollama:", error.message, "\n" );
}

  function fmtFinalStats( pStats ) {                                                    // .(50325.03.1 RAM Write fmtFinalStats Beg)
       var  mStats = []
            mStats.push( `  Ollama Run Statistics:`);
            mStats.push( `    Total Duration:    ${ ( pStats.total_duration / 1e9).toFixed(2)} seconds`);
            mStats.push( `    Prompt Eval Count: ${   pStats.prompt_eval_count } tokens`);
            mStats.push( `    Eval Count:        ${   pStats.eval_count        } tokens`);
            mStats.push( `    Eval Duration:     ${ ( pStats.eval_duration / 1e9 ).toFixed(2)} seconds`);
            mStats.push( `    Tokens per Second: ${ ( pStats.eval_count / ( pStats.eval_duration / 1e9 ) ).toFixed(2)}`);
    return  mStats       
            }                                                                           // .(50525.03.1 End)
     
    console.log( "\n", fmtFinalStats( finalStats ).join( "\n "), "\n" )                  
    console.log( "  The answer is:\n    ", aResult.replace( /\n/, ) )
    console.log( "" )

/*========================================================================================================= #  ===============================  *\
#>      S1102 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/
