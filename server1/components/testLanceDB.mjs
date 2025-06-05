 
// import * as lancedb from "@lancedb/lancedb";
   import * as lancedb from "vectordb";

   var lanceDbPath = "E:/anythingllm-data/lancedb";  // Match their pattern
   var lanceDB = await lancedb.connect(lanceDbPath);
// var  client = await lancedb.connect('storage/lancedb');

// Create table the AnythingLLM way - let LanceDB infer schema
const firstRecord = [{
  id: "test1",
  vector: Array.from({length: 768}, () => Math.random()),
  text: "test chunk",
  metadata: JSON.stringify({source: "test.txt"})
}];

const table = await lanceDB.createTable( "aCollection", firstRecord);

console.log( "table", table )


// npm uninstall @lancedb/lancedb
// npm install @lancedb/lancedb@0.4.0

/*
# Check what version they pin to
npm ls @lancedb/lancedb

# Common working versions mentioned in issues:
npm install @lancedb/lancedb@0.4.0
npm install @lancedb/lancedb@0.5.2
           "@lancedb/lancedb": "0.5.2",

# or
npm install vectordb@0.4.20  # (old package name)
*/