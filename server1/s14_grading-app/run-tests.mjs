  import  main from '../components/score_u2.09.mjs'       // .(50507.05.2 RAM Put script into components)

//    process.argv[2] =  "search"
  if (process.argv[2] == "search") {
      process.argv[2] =  "" 

      await import( '../components/search_u2.09.mjs' )          // .(50507.05.1 RAM Put script into components)

  } else {  
  // main( ...process.argv.slice(2) )
          process.env.Debug   =  0  
          process.env.SCORING =  1
          process.env.LOGGER  = "log,inputs"
          process.argv[2] = process.argv[2] ? process.argv[2] : "qwen2:0.5b"  // for debugging 
          process.argv[3] = process.argv[3] ? process.argv[3] : "s13"
//        process.argv[4] = process.argv[4] ? process.argv[4] : "r55,3"                 // .(50510.02.7 RAM Run score for a sheet rows)
//        process.argv[4] = process.argv[4] ? process.argv[4] : "r55"                   // .(50510.02.8 RAM Run score using run-tests file in Stats dir )
//        process.argv[4] = process.argv[4] ? process.argv[4] : ""                      // .(50510.02.9 RAM Run score using run-tests file in App dir )
//        process.argv[4] = process.argv[4] ? process.argv[4] : "s11_t041.01,s11_t042.02" //#.(50507.08a.8) 
   await  main( )  
//   if (process.platform.slice(0,3) != "win") { console.log( "" ) }                   //#.(50511.01.3)
     }
debugger 
