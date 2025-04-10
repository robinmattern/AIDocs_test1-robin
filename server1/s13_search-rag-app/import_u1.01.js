/*\
##=========+====================+================================================+
##RD        import              | Main Document Import Script
##RFILE    +====================+=======+===============+======+=================+
##FD import_u1.01.js            |   3620| 3/23/25   9:30|   103| u1.01.50323.0930
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script saves a "document" into ChromeDB vectore database 
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
#.(50323.02   3/31/25 CAI  9:30a| Worked on by Bruce Troutman
#
##PRGM     +====================+===============================================+
##ID S1101. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

// process.noDeprecation = true;
   import   ollama from "ollama";
   import { ChromaClient } from "chromadb";
   import { getConfig, readText } from "./utilities.js";
   import { chunkTextBySentences } from "matts-llm-tools";
   import { readFile } from "fs/promises";

const chroma = new ChromaClient({ path: "http://localhost:8000" }); // Explicitly use http://

try {
    await chroma.deleteCollection({ name: "buildragwithtypescript" });
    console.log("Deleted existing collection (if any).");
} catch (error) {
    console.error("Error deleting collection:", error.message);
}

let collection;
try {
    collection = await chroma.getOrCreateCollection({ 
        name: "buildragwithtypescript", 
        metadata: { "hnsw:space": "cosine" } 
    });
    console.log("Collection ready.");
} catch (error) {
    console.error("Error creating/getting collection:", error.message);
    process.exit(1); // Exit if collection fails
}

const { embedmodel, mainmodel } = getConfig();

const docstoimport = (await readFile("sourcedocs.txt", "utf-8")).split("\n");
for (const doc of docstoimport) {
    console.log(`\nEmbedding chunks from ${doc}`);   // remove training \n 
    const text     =  await readText(doc);
    const chunks   =  chunkTextBySentences(text, 7, 0);

    for (const [index, chunk] of chunks.entries()) {
        try {
            const embed = (await ollama.embeddings({ model: embedmodel, prompt: chunk })).embedding;
            if (!embed) throw new Error("No embedding returned");
            await collection.add({

                ids: [doc + index], 
                embeddings: [embed], 
                metadatas: { source: doc }, 
                documents: [chunk] 
            });
            process.stdout.write(".");
        } catch (error) {
            console.error(`Error embedding chunk ${index} from ${doc}:`, error.message);  // remove leading \n 
        }
    }
}
/*========================================================================================================= #  ===============================  *\
#>      S1201 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/