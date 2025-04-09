/*\
##=========+====================+================================================+
##RD        interactive_search  | Main Web Search and AI Response Script
##RFILE    +====================+=======+===============+======+=================+
##FD interactive_search.ts      |   3620|10/01/24  7:00|   103| u1.00.41001.0700
##FD int...ive_search_u1.00.mjs |   8752| 3/27/25  8:30|   211| u1.00`50327.0830
##FD int...h_u1.01-byClaude.mjs |   7230| 3/29/25 11:34|   225| u1.01`50329.1134
##FD int...h_u1.01-byGrok.mjs   |   4541| 3/30/25 11:23|   140| u1.01`50330.1123
##FD int...ive_search_u1.10.mjs |  10659| 3/30/25 15:32|   230| u1.10`50330.1532
##FD int...ive_search_u1.11.mjs |  19206| 3/31/25 20:00|   332| u1.11`50331.2000
##FD int...ive_search_u1.12.mjs |  19862| 4/02/25  7:15|   342| u1.12`50402.0715
##FD int...ive_search_u2.01.mjs |  20382| 4/02/25  9:55|   346| u2.01`50402.0955
##FD int...ive_search_u2.02.mjs |  25816| 4/04/25 13:55|   381| u2.02`50404.1355
##FD int...ive_search_u2.02.mjs |  30875| 4/05/25 14:45|   422| u2.02`50405.1445
##FD int...ive_search_u2.03.mjs |  37586| 4/08/25 18:45|   480| u2.02`50408.1845
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script gets a "document" from an internet search.  It then
#            submits a prompt query against it using a selected AI model
#            It was originally written by Matt Williams on 10/01/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
#            setDebugVars()
# async ion  main( ) {
# async ion  getNewsUrls( query ) {
# async ion  getCleanedText( urls ) {
# async ion  answerQuery( query, texts ) {
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(51001.01  10/01/24 MW   7:00a| Created by Matt Williama
#.(50327.01   3/29/25 RAM  8:30a| Cleaned up output
#.(50329.01   3/30/25 CAI 11:34a| Re-writtem by Claude AI
#.(50330.01   3/30/25 XAI 11:43a| Re-writtem by Grok AI
#.(50330.02   3/30/25 RAM  4:15p| Add Documentation
#.(50330.03   3/30/25 RAM  7:00p| Replace createUserInput with ask4Text
#.(50330.06   3/30/25 XAI  3:32p| Write and use wrap
#.(50331.01   3/31/25 XAI  7:55a| Add first URL as "document"
#.(50330.06a  3/31/25 RAM  8:15a| Add indent to wrap
#.(50331.02   3/31/25 RAM 10:00a| Save logs to docs
#.(50331.04   3/31/25 RAM  3:00p| Write and use getVars
#.(50331.04b  3/31/25 RAM  7:15p| Update StatsFile name
#.(50330.04c  3/31/25 RAM  7:35p| Add web searchPrompt
#.(50331.05   3/31/25 RAM  9:00p| Add ReponseFile to Stats and CSV
#.(50331.07   3/31/25 RAM  9:30p| Don't prompt when inVSCode
#.(50331.08   3/31/25 RAM 10:00p| Write and use setEnv
#.(50402.02   4/02/25 RAM  7:15a| Add bDebug Model warning
#.(50402.11   4/02/25 RAM  9:15a| Save log files to docs a12 from server1
#.(50402.14   4/02/25 RAM  9:55a| Set aDocsApp with 'a' prefix
#.(50403.01   4/03/25 RAM  1:20p| Add Ollama Options parameter docs
#.(50403.02   4/03/25 RAM  1:40p| Move getEnvVars to AIC90_FileFns.mjs
#.(50403.03   4/03/25 RAM  2:35p| Implement run count loop
#.(50403.04   4/03/25 RAM  3:05p| Save Stats to .tab file
#.(50404.01   4/04/25 RAM 12:30p| Write and use shoMsg
#.(50404.02   4/04/25 RAM  1:55p| Fiddle with bQuiet
#.(50404.05   4/04/25 RAM  3:45p| Add lines and change Stats .tab widths
#.(50404.06   4/04/25 RAM  5:55p| Add Subfolders for Response files
#.(50404.05   4/04/25 RAM  9:45p| Re-ajust line widths
#.(50404.07   4/04/25 RAM 10:00p| Return -1 if sayMsg an error msg
#.(50404.08   4/04/25 RAM 10:30p| Disaplay nicer error messages
#.(50405.01   4/05/25 RAM 10:40a| Change name of Stats file
#.(50405.02   4/05/25 RAM 11:15a| Add Session Title
#.(50403.03a  4/05/25 RAM 12:55p| Add FRT.exit_wCR to end of run loop
#.(50405.01a  4/05/25 RAM  2:35p| Change '-' to '_' in Stats file name
#.(50405.06   4/05/25 RAM  4:35p| Major change to FRT_Libs.mjs
#.(50404.05b  4/05/25 RAM  5:65p| Change 2nd line with to nWdt - 12
#.(50405.01b  4/07/25 RAM  6:05p| Modify Stats dir and file name
#.(50407.02   4/07/25 RAM  6:50p| Bump version to 2.03
#.(50407.03   4/07/25 RAM  7:15p| Add Query Prompt Code
#.(50408.05   4/08/25 RAM  6:05p| Loop through Query Prompts file
#.(50408.06   4/08/25 RAM  6:20p| Write and use savStats_4JSON
#.(50408.08   4/08/25 RAM  6:25p| Change Query to UsrPrompt
#.(50408.09   4/08/25 RAM  6:30p| Change fallbackURL to .env from DuckDuckGo
#.(50408.10   4/08/25 RAM  6:11p| Write and use savStats_4MD
#
##PRGM     +====================+===============================================+
##ID S1201. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   ollama              from "ollama";
// import { createInterface }   from 'readline';
// import * as readline         from 'readline';
// import { createInterface }   from 'node:readline/promises';
   import   LIBs                from '../../._2/FRT_Libs.mjs'
   import { Stats } from "fs";

// Import modules using dynamic imports
// --  ---  --------  =  --  =  ------------------------------------------------------  #
       var  aVer             = "u2.03"                                                  // .(50407.02.1 Was u2.02).(50402.02.1 RAM Add Version)

            LIBs.MWT         = () => "../../._2/MWTs"                                                       // .(50405.06.6)
//     var  FRT              =( await import( `${LIBs.AIC()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50405.06.7)
       var  FRT              =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50405.06.8 RAM Call function: LIBS.MOD())
       var  MWT              =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.03.mjs`) ).default            // .(50407.03.1).(50405.06.9)

// Configure Debug Variables
// --  ---  --------  =  --  =  ------------------------------------------------------  #
  function  setDebugVars() {                                                                                // .(50405.03.1 RAM Write setDebugVars Beg)
       var  bDebug           =  0               // Debug flag

//     var  aModel1          = 'llama3'                    // 4.7  GB on rm231
//     var  aModel1          = 'llama3.1'                  // 4.7  GB on rm231
//     var  aModel1          = 'llama3.2'                  // 2.0  GB on rm231
//     var  aModel1          = 'gemma2:2b'                 // 1.6  GB on rm231
//     var  aModel1          = 'granite3-dense:2b'         // 1.6  GB on rm231
//     var  aModel1          = 'qwen2:0.5b'                //  .35 GB on rm231          //#.(50327.05.1 RAM Smallest. Runs if dbugging or no command args given )
//     var  aModel1          = 'qwen2-robin:latest'        //  .35 GB on rm231

       var  aModel1          = 'llama3.1:8b-instruct-q8_0' // 8.5  GB on rm228
       var  aModel1          = 'llama3.1:latest'           // 4.9  GB on rm228
       var  aModel1          = 'llama3'                    // 4.7  GB on rm231
       var  aModel1          = 'llama3.1:8b-instruct-q2_K' // 3.2  GB on rm228 // wierd results
       var  aModel1          = 'llama3.2'                  // 2.0  GB on rm231
       var  aModel1          = 'gemma2:2b'                 // 1.6  GB on rm231
       var  aModel1          = 'qwen2:7b'                  // 4.4  GB on rm228
       var  aModel1          = 'qwen2:0.5b'                //  .35 GB on rm228
       var  aModel1          = 'starcoder2:3b'             // 1.7  GB on rm228 // no results

       var  nCTX_Size1       =  8000
//     var  nCTX_Size1       =  16000

        if (bDebug) {
            nRunCount        =  1                                                                           // .(50403.03.1)
            aModel           =  aModel1
            nCTX_Size        =  nCTX_Size1
            pVars.SESSION_ID = 't009'
            pVars.NEXT_POST  = '05'
     global.aPrtSections     = 'parms,runid'                                                                // .(50404.01.27)
     global.aPrtSections     = ''                                                                           // .(50404.01.27)
//   global.bInVSCode        =  true
            sayMsg(`S1201[ 118]*** bDebug: Using Model: ${aModel}, CTX_Size: ${nCTX_Size} ***`, 1 , 1 )     // .(50402.02.2)
            }                                                                                               // .(50331.04.3 End)
         }; // eof setDebug Vars                                                                            // .(50405.03.1 End)
//     ---  --------  =  --  =  ------------------------------------------------------  #

// Setup environment variables and configuration
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()
       var  aTS              =  FRT._TS
       var  shoMsg           =  MWT.shoMsg                                              // .(50404.01.28)

      var __basedir          =  FRT.__basedir
       var  aAppPath         =  FRT.__dirname
       var  aAppDir          =       aAppPath.split( /[\\\/]/ ).slice(-1)[0]            // Was splice
       var  aAppName         = 'a' + aAppDir.slice(1)                                   // .(50404.06.3 RAM Was aDocsDir).(50402.14.1 RAM Apps in docs have 'a' prefix)
//     var  aDocsDir         = `${aAppName}/${ FRT.getDate(-2) }/{TName}`               //#.(50405.02.1 RAM Was TNum).(50404.06.4 RAM Redefine aDocsDir)
       var  aDocsDir         = `${aAppName}/${ FRT.getDate(-2).slice(0,9) }/{SName}`    // .(50405.02.2 RAM Remove Day).(50405.02.1 RAM Was TNum).(50404.06.4 RAM Redefine aDocsDir)

     global.aAppDir          =  aAppDir
   global.__basedir2         =  FRT.path( aAppPath )
            FRT.__basedir2   =  FRT.path( aAppPath )
     global.bInVSCode        =  FRT.isNotCalled( import.meta.url )                      // .(50201.09c.3).(50331.07.1)

// Display configuration if verbose output is enabled
// --  ---  --------  =  --  =  ------------------------------------------------------  #
            bQuiet           =  0                                                       // .(50404.02.5)
        if (bQuiet == 2) {
            saysg(`S1201[ 145]  bDebug: ${global.bDebug}, bQuiet: ${global.bQuiet}, bDoit: ${FRT.bDoit}, bForce: ${FRT.bForce}, bIsCalled: ${FRT.isCalled(import.meta.url)}`, 1, 1 )
            }
            global.bQuiet    =  0                                                       // .(50404.02.6)

// Process .ENV Variables and command line arguments
       var  pVars            =  FRT.getEnvVars( FRT.__dirname )                                             // .(50403.02.6 RAM Was MWT).(50331.04.3 RAM Get .env vars Beg)
       if (!pVars.PLATFORM) {                                                                               // .(50403.02.7 Beg)
            usrMsg( `* An .env file does not exist in ${ FRT.__dirname.replace( /.+server1/, './server1') }.`)
            process.exit(1)
            }                                                                                               // .(50403.02.7 End)
       var  aWebSearch       =  pVars.WEB_SEARCH    || "Lexington Va"

       var  nRunCount        =  pVars.RUN_COUNT     ||  1                                                   // .(50403.03.2)
       var  aStatsFmt        =  pVars.CSV_OR_TAB_STATS || 'csv'                                             // .(50403.04.4)
       var  aServer          = (pVars.THE_SERVER    || '').slice( 0, 11 )
//     var  aSvr             =  pVars.THE_PC_NAME    ?  pVars.THE_PC_NAME : aServer.slice(0,5)              //#.(50405.01.1 Use THE_PC_NAME).(50331.04.4 Beg).(50405.01b.1)
       var  aSvr             = (pVars.THE_PC_NAME    ?  pVars.THE_PC_NAME : aServer).slice(0,6)             // .(50405.01b.1 RAM Was 5 chars).(50405.01.1 Use THE_PC_NAME).(50331.04.4 Beg)
       var  bPrtSources      =  pVars.SHOW_SOURCES  ||    0          // Whether to print source content
     global.aPrtSections     =  pVars.SHOW_SECTIONS || 'all'                                                // .(50404.01.29)
       var  nWdt             = (pVars.WRAP_WIDTH    ||  145 ) * 1
       var  nLog             =  pVars.TO_SCREEN_OR_FILE || 1                                                // .(50331.04.4)

       var  aPlatform        =  pVars.PLATFORM.toUpperCase()                                                // .(50331.10.1 Use PLATFORM)
//          aModel           =  pVars.MODEL       ||  aModel                                                //#.(50331.10.2)
            aModel           =  pVars[`${aPlatform}_MODEL_NAME` ] || aModel1                                // .(50331.10.2)
            nCTX_Size        = (pVars[`${aPlatform}_CTX_SIZE`   ] || nCTX_Size1 ) * 1                       // .(50331.10.3)
       var  nTemperature     = (pVars[`${aPlatform}_TEMPERATURE`] || .07       ) * 1                        // .(50331.10.4)

       var  mArgs            =  process.argv.slice(2)
       var  aModel           =  mArgs[0] ? mArgs[0] : aModel
       var  nCTX_Size        = (mArgs[1] ? mArgs[1] : nCTX_Size) * 1

                                usrMsg("\n----------------".padEnd( nWdt +  1, "-" ) )                      // .(50404.05.9)
                                setDebugVars()                                                              // .(50405.03.2 RAM Set them here)

// Setup Model Query Prompts and loop through RUN_COUNT
// --  ---  --------  =  --  =  ------------------------------------------------------  #

       var  nRunCount        =  pVars.RUN_COUNT        || 1
       var  bUsePromptFile   =  pVars.USE_PROMPTS_FILE || 0                                                 // .(50408.05.1 RAM Use Prompts file Beg)
        if (bUsePromptFile != 1) {
       var  mPrompts         =
             { QPC           :  pVars.QUERY_PROMPT_CD  || ''                                                // .(50407.03.2 RAM Add QPC)
             , Prompt        :  pVars.QUERY_PROMPT     || "What are the city's restaurants?"
               }
        } else {
       var  mPrompts         =  FRT.readFileSync( `${aAppPath}/${pVars.SEARCH_PROMPTS}` ).split( "\n" )
            mPrompts         =  mPrompts.map(  aPrompt => { return {
               QPC           :  aPrompt.slice( 0, 3 )
             , Prompt        :  aPrompt.slice( 4 ).replace(/^[. '"]+/, "" ).trim().replace(/[ '"]+$/, "" )
               } } )
            }                                                                                               // .(50408.05.1 End)
       var  aSysPrompt       =  pVars.SYS_PROMPT || "Please use the information in the following text"      // .(50331.09.1)

       for (let iRun = 0; iRun < nRunCount; iRun++) {                                                       // .(50403.03.3)
       var  aQPC             =  mPrompts[ iRun ].QPC                                                        // .(50408.05.2)
       var  aUsrPrompt       =  mPrompts[ iRun ].Prompt                                                     // .(50408.05.3

       var  aTitle           = `${pVars.SESSION_TITLE}` || ''                                               // .(50405.02.2)
       var  aSessionName     = `${pVars.SESSION_ID}${ aTitle ? `_${aTitle}` : '' }`                         // .(50405.02.3)
       var  aRunId           = `${aAppName.slice(0,3)}_${pVars.SESSION_ID}.${pVars.NEXT_POST}`              // .(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId)
       var  aNextPost        = `${ 1 + pVars.NEXT_POST * 1 }`.padStart( 2, "0" )                            // .(50331.08.4 RAM Set Next_Post)
//                              FRT.setEnv( "NEXT_POST", aNextPost, FRT.__dirname)                          // .(50331.08.5)
// Setup logfile
//          aDocsDir         =  aDocsDir.replace( /{TNum}/, `_${pVars.SESSION_ID}` )                        //#.(50404.06.6).(50405.02.4)
            aDocsDir         =  aDocsDir.replace( /{SName}/, `_${aSessionName}` )                           // .(50405.02.4).(50404.06.6)
//     var  aLogFile         =      `./${aAppDir}/${aAppDir.slice(0,3)}_t001.01.4.${aTS}_Response.txt`      //#.(50331.02.5)
       var  aLogFile         = `./docs/${aDocsDir}/${aRunId}.4.${aTS}_Response.txt`                         // .(50402.14.3).(50331.08.6).(50331.02.5 RAM put it in /docs)
                                FRT.setSay( nLog, aLogFile )                                                // .(50331.04.5 RAM nLog was 3)

//     var  aStatsDir        = `./docs/${ aDocsDir.replace( /_t.+/, "") }`                                  //#.(50405.01b.2 RAM Was: docs/${aAppName}/YY.MM.Mth/)
       var  aStatsDir        = `./docs/${aAppName}/${aAppName.slice(0,3)}-saved-stats/`                     // .(50405.01b.2 RAM Was: docs/${aAppName}/a##-saved-stats/)
//     var  aStatsFile       =  FRT.join( __basedir, `./docs/${aAppDir}/${aAppDir.slice(0,3)}_Stats.csv` )
//     var  aStatsFile       = `${aDocsDir.slice(0,3)}_Stats_u${aTS.slice(0,5)}-${aSvr}.${aStatsFmt}`       //#.(50403.04.5).(50402.14.4).(50331.04b.1 RAM Update StatsFile name)(50405.01.1)
       var  aStatsFile       = `${aAppName.slice(0,3)}_Stats-${aSvr}_u${aVer.slice(1)}.${aStatsFmt}`        // .(50405.01b.2 RAM Add Stats-).(50405.01.2 RAM Add aVer).(50403.04.5).(50402.14.4).(50331.04b.1 RAM Update StatsFile name)
       var  aStatsFile       =  FRT.join( __basedir, `${aStatsDir}${aStatsFile}` )                          // .(50402.14.5).(50331.04b.2)

// Configure prompt and Ollama parameters
//     var  aSysPrompt       = "Summarize the information and provide an answer. Use only the information in the following articles to answer the question:"
       var  ollamaUrl        =  pVars[`${aPlatform}_API_URL`] // 'http://localhost:11434/api/generate'      // .(50331.09.2 Adjust if Ollama runs elsewhere)

       var  pParms           =
             {  model        :  aModel
             ,  prompt       : `{Query}.${aSysPrompt} {Docs}`
             ,  stream       :  true
             ,  options      :{ num_ctx:        nCTX_Size            // Set the context size <int>          // .(50403.01.1 Beg)
//                            , temperature:    nTemperature         // Set creativity level <float>        // .(50331.11.1 RAM Temperature has problems)
//                            , num_predict:    <int>                // Max number of tokens to predict
//                            , top_k:          <int>                // Pick from top k num of tokens
//                            , top_p:          <float>              // Pick token based on sum of probabilities
//                            , min_p:          <float>              // Pick token based on top token probability * min_p
//                            , repeat_penalty: <float>              // How strongly to penalize repetitions
//                            , repeat_last_n:  <int>                // Set how far back to look for repetitions
//                            , num_gpu:        <int>                // The number of layers to send to the GPU
//                            , seed:           <int>                // Random number seed
//                            , stop:           <string> <string>    // Set the stop parameters             // .(50403.01.1 End)
                                }
             ,  runid        : `${aRunId},${iRun+1} of ${nRunCount}`                                        // .(50403.03.4)
             ,  qpc          :  aQPC                                                                        // .(50407.03.3)
                } // eoo pParms
// --  ---  --------  =  --  =  ------------------------------------------------------  #

                                usrMsg(  "----------------".padEnd( nWdt - 12, "-" ), shoMsg( "all" ) )     // .(50404.05b.1 RAM Was 25).(50404.05.10)

                                await main( pParms )
                                FRT.setEnv( "NEXT_POST", aNextPost, FRT.__dirname )
                                } // eol Run loop                                       // .(50403.03.5)

                                usrMsg("\n----------------".padEnd( nWdt +  1, "-" ) )                      // .(50404.05.11)
                                FRT.exit_wCR()                                          // .(50403.03a.1)
// Main execution
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

     async  function  main( pParms ) {
       let  searchPrompt, aiPrompt; // Prompt user for search and AI queries

        if (bDebug == true || bInVSCode ) {                                             // .(50201.09c.4).(50331.07.2)
            searchPrompt     =  aWebSearch    // "Lexington Va";                                                                             // .(50331.04.6)
            aiPrompt         =  aUsrPrompt    // "The city's restaurants";                                                                   // .(50331.04.7)
        } else {
            usrMsg( "" )
//          searchPrompt     =( await MWT.ask4Text( "Enter your search prompt (e.g., '${aWebSearch)Lexington VA'): " ) ) || "Lexington Va";  //#.(50330.03.6).(50331.04.8)
            searchPrompt     =( await MWT.ask4Text( `Enter your search prompt (e.g., '${aWebSearch}'): `    ) ) ||  aWebSearch;              // .(50331.04.8).(50330.03.6)
//          aiPrompt         =( await MWT.ask4Text( "Enter your AI prompt (e.g., 'Tell me about tourism'): ") ) || "Tell me about tourism";  //#.(50330.03.7).(50331.04.9)
            aiPrompt         =( await MWT.ask4Text( `Enter your AI prompt (e.g., '${aUsrPrompt}'): `        ) ) ||  aUsrPrompt;              // .(50331.04.9).(50330.03.7)
            }
            usrMsg(""                                    , shoMsg('Parms' ) )           // .(50404.01.1)
            usrMsg(`Web Search Prompt: "${searchPrompt}"`, shoMsg('Parms' ) )           // .(50404.01.2)
//          usrMsg(`  AI Prompt:       "${aiPrompt}"`    , shoMsg('Parms' ) )           // .(50404.01.3)

                                usrMsg(  "----------------".padEnd(        57, "-" ), shoMsg('Parms') )     // .(50404.05.12)

// --  ---  --------  =  --  =  ------------------------------------------------------  #

//     var  urls             =  await  getNewsUrls( searchPrompt );                                         //#.(50408.06.6)
       var  pJSON_Results    =  await  getNewsUrls( searchPrompt );                                         // .(50408.06.6)
       var  urls             =  pJSON_Results.URLs                                                          // .(50408.06.7)
       var  alltexts         =  await  getCleanedText( urls );
       pJSON_Results.Docs    =  alltexts                                                                    // .(50408.06.8)
//                              await  answerQuery( aiPrompt, alltexts, urls[0], searchPrompt )             //#.(50330.04c.1 RAM Add searchPrompt).(50331.01.1 RAM Add first  URL).(50408.06.9)
                                await  answerQuery( aiPrompt, pJSON_Results, searchPrompt )                 // .(50408.06.9).(50330.04c.1 RAM Add searchPrompt).(50331.01.1 RAM Add first  URL)
            }; // eof main
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
/**
 * Fetches search result URLs from DuckDuckGo
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of URLs
 */
async function  getNewsUrls( query ) {
//   const  url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;                 //#.(50408.09.1))
     const  url =  pVars.WEB_SEARCH_URL.replace( /{WebSearch}/, encodeURIComponent(query) )                 // .(50408.09.1 RAM Use WEB_SEARCH_URL)
     const  fallbackURL = pVars.WEB_FALLBACK_URL                                                            // .(50408.09.2)

            usrMsg(`  Fetching from:   "${url.replace(/%20/g, "+")}"`, shoMsg('Parms')) // .(50404.01.4)
  try {
     const  response = await fetch(url);
       if (!response.ok) {
            throw new Error( `HTTP error! Status: ${response.status}` );
            }
     const  text     =  await response.text();
       if (!text) {
            usrMsg("\n Empty response from Web Search URL.");                                               // .(50408.09.3 RAM Was DuckDuckGo)
//  return ["https://www.lexingtonvirginia.com/"];                                                          //#.(50408.09.4)
    return { URLs: [ fallbackURL ] };                                                                       // .(50408.09.4)
            }
     const  searchResultsJson = JSON.parse(text);

            usrMsg("---------------------------------------------------------------------------------------------- "       , shoMsg('Search')  ) // .(50404.01.5)
            usrMsg("Response from Web Search URL:"                                                                         , shoMsg('Search')  ) // .(50408.09.5 RAM Was DuckDuckGo).(50404.01.6)
       var  pResults =
             {  AbstractURL:             searchResultsJson.AbstractURL
             ,  Results: MWT.fmtResults( searchResultsJson.Results )
             ,  RelatedTopics:           searchResultsJson.RelatedTopics
                       ? MWT.fmtResults( searchResultsJson.RelatedTopics )
                       : []
                }
       var  aResults =  JSON.stringify(pResults, null, 2).replace(/\\n     /g, "\n     ").replace(/\\n       /g, "\n       ")
            usrMsg(`\n  Web Search Response:\n${ aResults.replace( /{/, "" ).replace(/\n}/, "") }`                         , shoMsg('Search' ) ) // .(50404.01.7)

       var  results =                                                                                       // .(50408.07.2 RAM This has many more "results" than pResults above)
             [ ...( searchResultsJson.Results || [] )
             , ...( searchResultsJson.RelatedTopics || []).flatMap( item =>
                  "Topics" in item ? item.Topics : [item]
                   ),
               ].filter( item => item.FirstURL && item.Text);

        if (searchResultsJson.AbstractURL) {
            results.unshift( { FirstURL: searchResultsJson.AbstractURL, Text: "Overview" } );
            }
       var  urls = results.map( result => result.FirstURL ).slice(0, 5);                                    // .(50408.07.2 RAM He only returns the first 5 URLs)
        if (urls.length === 0) {
            usrMsg("\n* No URLs found, returning fallback.");
//  return         ["https://www.lexingtonvirginia.com/"];                                                  //#.(50408.09.6)
    return { URLs: [ fallbackURL ] };                                                                       // .(50408.09.6)
            }
            usrMsg(`\n  Found ${urls.length} URLs:`      , shoMsg('Search' ) )          // .(50404.01.8)
    return  { WebResponse: pResults, URLs: urls } ;                                                         // .(50408.06.10)

        } catch( error ) {
//          console.error(      "Error in getNewsUrls:", error);                        //#.(50404.08.1)
            sayMsg(`A1201[ 313]* Error in getNewsUrls for query: '${query}'.`, 1, 1);   // .(50404.08.1)
            sayMsg(    `${error}`.replace( /\n/, "\n    " ) );                          // .(50404.08.2)
//  return         ["https://www.lexingtonvirginia.com/"];                                                  //#.(50408.09.7)
    return { URLs: [ fallbackURL ] };                                                                       // .(50408.09.7)
             }
         }; // eof getNewsUrls
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/**
 * Fetches and cleans text content from URLs
 * @param {Array} urls - Array of URLs to fetch
 * @returns {Promise<Array>} - Array of cleaned text blocks
 */
  async function  getCleanedText( urls ) {
       var  texts = [];
       for (var url of urls) {
       try {
            usrMsg( `    Fetching ${url}`                , shoMsg('Search' ) )          // .(50404.01.9);   ););
       var  response         =  await fetch( url );
       var  html             =  await response.text();
       var  text             =  await MWT.htmlToText( html );
            texts.push( `Source: ${url}\n${text}\n\n` );
        } catch( error ) {
//          console.error( `Error fetching ${url}:`, error );                           //#.(50404.08.2)
            sayMsg(    `\n* Error fetching url: '${url}'.`);                            // .(50404.08.3)
            sayMsg(    `${error}`.replace( /\n/, "\n    " ) );                          // .(50404.08.4)
// return ["https://www.lexingtonvirginia.com/"];                                       //#.(50408.09.8)
   return [ pVars.WEB_FALLBACK_URL ];                                                   // .(50408.09.8)
            }
          }
    return  texts;
         }; // eof getCleanedText
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/**
 * Processes query with Ollama model using provided text sources
 * @param {string} query - User query
 * @param {Array} texts - Array of text sources
 */
// async function  answerQuery( query, texts, document, webSearch ) {                                       //#.(50330.04c.2).(50331.01.2).(50408.06.11)
   async function  answerQuery( query, pJSON_Results, document, webSearch ) {                               // .(50408.06.11).(50330.04c.2).(50331.01.2)
       var  texts     =  pJSON_Results.Docs                                                                 // .(50408.06.12)
       var  document  =  pJSON_Results.URLs[0]                                                              // .(50408.06.13)
        if (texts.length === 0) {
    return  usrMsg( "\n* No text content available to summarize.");                                         // .(50404.07.2 RAM Return -1 if error)
            }
        var aRunStr          = "RunId: " + pParms.runid.replace( ',', ", No: " )   // .(504                 // .(50404.01.9)
            usrMsg( `\nCompined Prompt for Model: ${pParms.model}  (${aRunStr})`                                           , shoMsg('Parms')   ) // .(50404.01.10)
            usrMsg( "---------------------------------------------------------------------------------------------- "      , shoMsg('Parms')   ) // .(50404.01.11)

       var  aSources         =  texts.map((a, i) => `${i+1}.${MWT.fmtText(a)}`).join("\n")
        if (bPrtSources == 1) {
            usrMsg( `\n  Docs: \n${ MWT.wrap( aSources, nWdt , 2, 4 ) }`)               // .(50330.06a.6 RAM Add indent).(50331.01.3 RAM Was Texts).(50330.06.2 RAM Use Wrap)
            usrMsg(   `  Docs:       End of Sources`)                                   // .(50331.01.4)
        } else {
            usrMsg(   `  Docs:      "${texts.length} Sources,${ `${aSources.length}`.padStart(6) } bytes from ${document}"`, shoMsg('Parms')   ) // .(50404.01.12).(50331b.01.5).(50331.01.5 RAM Add documents)
            }
            usrMsg(   `  SysPrompt: "${ pParms.prompt.replace( /{Docs}/, "" ).replace( /{Query}\./, "" ) }"`               , shoMsg('Parms')   ) // .(50404.01.13)
//          usrMsg(   `  Query:     "${query}"`                                                                            , shoMsg('Parms')   ) //#.(50404.01.14).(50408.08.1)
            usrMsg(   `  UsrPrompt: "{Query}: ${query}"` )  // aka aiPrompt, Model Query Prompt                            , shoMsg('Parms')   ) // .(50408.08.1 Was Query).(50404.01.14)
            usrMsg(   `  Prompt:    "{Query}. {SysPrompt}, {Docs}"`                                                        , shoMsg('Parms')   ) // .(50404.01.15)

            pParms.prompt    =  pParms.prompt.replace( /{Query}/, query )
            pParms.prompt    =  pParms.prompt.replace( /{Docs}/,  texts.join("\n\n" ))

            pJSON_Results.PromptTemplate = "{Query}. {SysPrompt}, {Docs}"
            pJSON_Results.Prompt         =  pParms.prompt
            pJSON_Results.Platform       =  pVars.PLATFORM
            pJSON_Results.SysPrompt      =  pVars.SYS_PROMPT

//          usrMsg( `\n  Running Model: ${          pParms.model}  (${aRunStr})`                                           , shoMsg('RunId')   ) //#.(50404.01.16).(50403.03.7)
            usrMsg( `\nOllama Response for Model: ${pParms.model}  (${aRunStr})`                                           , shoMsg('Results') ) // .(50404.01.16).(50403.03.7)
            usrMsg(   "---------------------------------------------------------------------------------------------- "    , shoMsg('Results') ) // .(50404.01.17))
    try {
       var  stream           =  await  ollama.generate( pParms );
       var[ pStats, aResult ]=  await  MWT.fmtStream( stream );
      pJSON_Results.Response = aResult                                                                      // .(50408.06.14)

        if (global.nLog != 1) {
            aResult          =  MWT.wrap( aResult, nWdt, 4 )                            // .(50330.06a.7).(50330.06.3)
            usrMsg( aResult                             , shoMsg('Results' ) )          // .(50404.01.18).(50330.06a.7).(50330.06.3)
            }
            pStats.query     =  query                                                   // .(50331.03.4 Beg)
            pStats.url       =  document
            pParms.websearch =  aWebSearch                                               // .(50330.04c.3 RAM Add)
            pStats.docs      = `${texts.length} Sources, ${aSources.length} bytes`
            pParms.logfile   = `${FRT.__basedir}/${aLogFile}`                           // .(50331.05.6 RAM Add logfile)
            pParms.jsonfile  =  pParms.logfile.replace( /.txt/, '.json' )                                   // .(50408.06.15 RAM Use ...response.json)
            pParms.mdfile    =  pParms.logfile.replace( /.txt/, '.md'   )                                   // .(50408.10.3 RAM Use ...response.md)
            pParms.temp      =  nTemperature

            usrMsg( "\n----------------------------------------------------------------------------------------------\n"   , shoMsg('Stats')   ) // .(50404.01.19)
            usrMsg(             MWT.fmtStats(   pStats, pParms ).join("\n")                                                , shoMsg('Stats')   ) // .(50404.01.20)
            usrMsg( "\n---------------------------------------------------------------------------------------------- "    , shoMsg('Stats')   ) // .(50404.01.21)
       var  nSecs            = (pStats.total_duration / 1e9).toFixed(2)                                                                          // .(50404.01.22)
            usrMsg(   `\n    > Ran Model: ${          pParms.model} in ${nSecs} secs (${aRunStr})`                         , shoMsg('RunId')   ) // .(50404.01.23).(50403.03.8)

  var [ pStats_JSON, mRecs ] =  MWT.savStats4Text( pStats, pParms, aStatsFmt )                              // .(50408.06.16 RAM Was: savStats).(50403.04.6 RAM Add aStatsFmt)
       var  bNotExists       =  FRT.checkFileSync( aStatsFile ).exists == false
        if (bNotExists) {       FRT.writeFile(     aStatsFile, `${mRecs[0]}\n` ) }
                                FRT.appendFile(    aStatsFile, `${mRecs[1]}\n` )           // .(50331.03.4 RAM Use it End)
       var  aJSON_Results    =  MWT.savStats4JSON( pStats_JSON,     pJSON_Results ) // , pParms )           // .(50408.06.17)
                                FRT.writeFile(     pParms.jsonfile, aJSON_Results )                         // .(50408.06.18)
//     var  aMD_Results      =  MWT.savStats4MD(   pStats_JSON,     pJSON_Results ) // , pParms )           // .(50408.10.4)
//                              FRT.writeFile(     pParms.mdfile,   aMD_Results   )                         // .(50408.10.5)
        } catch( error ) {
//          console.error(        "Error in answerQuery:", error);                                          //#.(50404.08.5)
            sayMsg(`A1201[ 400]*** Error in answerQuery fetching Ollama model: ${pParms.model}.`, 1, 1 )    // .(50404.08.5)
//          sayMsg(`A1201[ 401]  ${error}:`.replace( /\n/, "\n    " ), 1 );                                 //#.(50404.08.6)
            sayMsg(`A1201[ 402]    Ollama ${error.name}: ${error.message}`, 1 );                            // .(50404.08.6)
            }
         }; // eof answerQuery
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
/*========================================================================================================= #  ===============================  *\
#>      S1201 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/