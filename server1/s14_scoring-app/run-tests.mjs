  import  main from '../components/score_u2.11.mjs'       // .(50522.02b.11).(50514.07.10).(50507.05.2 RAM Put script into components)

//    process.argv[2] =  "search"
  if (process.argv[2] == "search") {
      process.argv[2] =  "" 

      await import( '../components/search_u2.11.mjs' )    // .(50522.02b.12).(50514.07.11).(50507.05.1 RAM Put script into components)

  } else {  
//        main( ...process.argv.slice(2) )
//        process.env.Debug   =  0                                                      //#.(50531.08.1 RAM Why was it set to 0)
      if (process.env.Debug   == 1 || process.env.VSCODE_INSPECTOR_OPTIONS ? 1 : 0) {    
          process.env.SCORING          =  1
          process.env.Doit             =  1                                             // .(50608.04.1 RAM It defaults to 0 if not set in run-tests.sh) 
          process.env.DOIT             =  1                                             // .(50608.04.2) 
//        process.env.Debug            =  1                                             //#.(50608.04.3).(50612.04.6) 
          process.env.DEBUG            =  1                                             // .(50612.04.6 RAM Was .env.Debug) 
//        process.env.SCORING_SECTIONS =  "Results,Log"
//        process.env.SCORING_SECTIONS =  "All"
//        process.env.LOGGER           =  "log,inputs"

     var  aScoringModel   =  process.env.SCORING_MODEL        || "qwen2:0.5b "          //.(50531.09.2) 
//        process.argv[2] =  process.argv[2] ? process.argv[2] : "qwen2:0.5b"           // for debugging 
          process.argv[2] =  process.argv[2] ? process.argv[2] :  aScoringModel         //.(50531.09.3 RAM Use as set in run-tests.sh 

          process.argv[3] =  process.argv[3] ? process.argv[3] : "s11"
//        process.argv[4] =  process.argv[4] ? process.argv[4] : "r002,2"               // .(50510.02.7 RAM Run score for a sheet rows)
//        process.argv[4] =  process.argv[4] ? process.argv[4] : "r55"                  // .(50510.02.8 RAM Run score using run-tests file in Stats dir )
//        process.argv[4] =  process.argv[4] ? process.argv[4] : ""                     // .(50510.02.9 RAM Run score using run-tests file in App dir )
          }
   await  main( )  
//   if (process.platform.slice(0,3) != "win") { console.log( "" ) }                    //#.(50511.01.3)
     } // eif ../components/score_u2.11.mjs
debugger 
