  import  main from '../components/score_u2.10.mjs'       // .(50514.07.10).(50507.05.2 RAM Put script into components)

//    process.argv[2] =  "search"
  if (process.argv[2] == "search") {
      process.argv[2] =  "" 

      await import( '../components/search_u2.10.mjs' )    // .(50514.07.11).(50507.05.1 RAM Put script into components)

  } else {  
  // main( ...process.argv.slice(2) )
          process.env.Debug   =  0  
      if (process.env.Debug   == 1 || process.env.VSCODE_INSPECTOR_OPTIONS ? 1 : 0) {    
          process.env.SCORING =  1
//        process.env.LOGGER  = "log,inputs"
          process.argv[2] = process.argv[2] ? process.argv[2] : "gemma2:2b"             // for debugging 
          process.argv[3] = process.argv[3] ? process.argv[3] : "s12"
//        process.argv[4] = process.argv[4] ? process.argv[4] : "r002,2"                // .(50510.02.7 RAM Run score for a sheet rows)
//        process.argv[4] = process.argv[4] ? process.argv[4] : "r55"                   // .(50510.02.8 RAM Run score using run-tests file in Stats dir )
//        process.argv[4] = process.argv[4] ? process.argv[4] : ""                      // .(50510.02.9 RAM Run score using run-tests file in App dir )
          }
   await  main( )  
//   if (process.platform.slice(0,3) != "win") { console.log( "" ) }                    //#.(50511.01.3)
     }
debugger 
