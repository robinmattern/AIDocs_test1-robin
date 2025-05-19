/*\
##=========+====================+================================================+
##RD        search              | Main Search and AI Response Script
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
##FD int...ive_search_u2.03.mjs |  37586| 4/08/25 18:45|   480| u2.03`50408.1845
##FD int...ive_search_u2.05.mjs |  59117| 4/22/25 10:25|   684| u2.05`50422.1025
##FD int...ive_search_u2.05.mjs |  59366| 4/23/25  6:55|   696| u2.05`50423.0655
##FD int...ive_search_u2.06.mjs |  53896| 4/23/25  7:15|   616| u2.06`50423.0715
##FD int...ive_search_u2.06.mjs |  53455| 4/27/25  6:05|   596| u2.06`50427.1805
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
#.(50409.02   4/09/25 RAM  5:00a| Replace PC_Name and mPrompts array
#.(50409.03   4/09/25 RAM 12:30p| Enable DocSearch and WebSearch
#.(50410.01   4/10/25 RAM  2:15p| Save .tab spreadsheet as .csv after mkdir
#.(50410.03   4/10/25 RAM  3:05p| Duplication mPrompts if necessary
#.(50410.04   4/10/25 RAM  3:25p| Add QPC to prompt output
#.(50410.04a  4/13/25 RAM  6:00a| Change UOC and Query to UsrPrompt
#.(50413.02   4/13/25 RAM  7:00a| Add new columns to spreadsheet
#.(50413.03   4/13/25 RAM  4:00p| Add SysPrompt Test loop
#.(50414.01   4/14/25 RAM  3:52a| Display a brief log messages
#.(50414.03   4/14/25 RAM  7:00a| Blank out aWebSearch
#.(50414.04   4/14/25 RAM  9:52a| Fix the TestId number for Group tests
#.(50415.01   4/15/25 RAM  6:42a| Add .envars DOIT, DEBUG and LOGGER from run-tests.sh
#.(50417.04   4/17/25 RAM  1:00p| Change PC_NAME to PC_CODE
#.(50414.04b  4/19/25 RAM  8:00p| RunId Test No. if running just one test
#.(50414.01b  4/20/25 RAM 10:45a| Add CTX and Temp to Log message
#.(50414.01c  4/20/25 RAM 11:00a| Fix bNoLog if aLog = "log"
#.(50422.02   4/22/25 RAM 10:25a| Keep aDocsDir aSessionName as t0#0 if ??
#.(50423.01   4/23/25 RAM  6:55a| Add comment lines for sections
#.(50423.02   4/22/25 RAM  6:55a| Break out runWebSearch and runDocSearch
#.(50404.01   4/29/25 RAM  8:20p| Edit position of shoMsg
#.(50427.06   4/27/25 RAM  7:30a| Move s41_bun-app to s13_search-rag-app
#.(50428.03   4/28/25 RAM  3:15p| Err msg for .env not found
#.(50428.04   4/28/25 RAM  5:15a| Get runDocSearch to work
#.(50429.01   4/29/25 RAM  9:25a| Add search-rag collections
#.(50429.09   4/29/25 RAM 10:00p| Accomodate aCollection and aApp2 
#.(50414.03b  4/30/25 RAM 10:10p| Don't re-assign aWebSearch for DOCs 
#.(50430.03   4/30/25 RAM  7:50p| Add Collection to JSON_Results
#.(50430.04   4/30/25 RAM  8:15p| Find first file in FILES_PATH 
#.(50429.09b  5/01/25 RAM  8:05p| Set aApp2 to aApp if no collection
#.(50501.01   5/01/25 RAM  8:15p| Fix reading aRawFileName
#.(50501.03   5/01/25 RAM  7:05p| Pass file names via .env, not process.env
#.(50501.04   5/01/25 RAM  7:30p| Catch error and add Attach debug
#.(50503.02   5/03/25 RAM  8:50p| Don't Prompt if not bNoLog
#.(50503.05   5/03/25 RAM  9.15p| Add aApp with an 'a' to aDocsDir
#.(50501.03b  5/03/25 RAM  9:30p| Improve pass of file names
#.(50429.09c  5/03/25 RAM  9:50p| Accomodate aApp2 in aRID
#.(50503.06   5/03/25 RAM 10:00p| Abort if not docs found
#.(50503.08   5/03/25 RAM 10:50p| Write and use sqzLines
#.(50503.09   5/03/25 RAM 11:00p| Add some lines 
#.(50506.01   5/06/25 RAM  6:30a| Move update NEXT_STEP
#.(50506.02   5/06/25 RAM  7:00a| Run multiple sysprompts even for t0x#
#.(50507.04   5/07/25 RAM  1:50p| Write isInVSCode and assign FRT.inVSCode
#.(50507.07   5/07/25 RAM  2:30p| Set bDoit default to 1??
#.(50507.08a  5/08/25 RAM  2:10p| Save and use TestIds for delayed score runs 
#.(50507.08b  5/09/25 RAM 10:10a| Save and use RespIds for delayed score runs 
#.(50510.01   5/10/25 RAM  8:45a| Display scores if no LOGGING
#.(50507.08d  5/11/25 RAM  9:30a| Start run-tests.txt MT
#.(50430.04b  5/11/25 RAM 11:10p| Check if FILES_PATH has been assigned
#.(50513.04   5/13/25 RAM  7:25p| Implement DRYRUN
#.(50513.05   5/13/25 RAM  7:30p| Implement bEnvs debug msgs
#.(50514.01   5/14/25 RAM  9:10a| Overide run-tests.sh parameters  
#.(50514.02   5/14/25 RAM  1:50p| Move 2 scripts to components folder
#.(50514.07   5/14/25 RAM  7:45p| Bump version from u2.09 to u2.10
#.(50405.02b  5/15/25 RAM  2:02p| Add century to DocsDir 
#.(50405.01c  5/17/25 RAM  1:04p| Put stats into a month folder  
#.(50514.01b  5/19/25 RAM 10:11a| Overide SEARCH_MODEL
#.(50409.03b  5/19/25 RAM 10:15a| Set searchPrompt = aWebSearch
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
// import { Stats } from "fs";
// import { doesNotReject } from "assert";

// Import modules using dynamic imports
// --  ---  --------  =  --  =  ------------------------------------------------------  #
       var  aVer             = "u2.10"  // search_{aVer}.mjs                            // .(50514.07.6).(50407.02.1 Was u2.02).(50402.02.1 RAM Add Version)

       var  aLog             =  process.env.LOGGER || ""                                // .(50414.01.1 RAM Do print Log)
            aLog             =  aLog == "log,inputs" ? "log" : aLog                     // .(50414.01c.1 RAM Fix if aLog = "log", was: '')
//     var  bDebug           =  process.env.DEBUG  || 0                                 // .(50415.01.1 RAM It gets checked later, Uncomment for S1201[ 116])
       var  bDoit            =  process.env.DOIT   || 1                                 // .(50415.01.2)
       var  bDryRun          =  process.env.DRYRUN || 0                                 // .(50513.04.3)
       var  bEnvs            =  process.env.ENVs   || 0                                 // .(50513.05.13)

//     var  aLog             = "log"                                                                        // .(50414.01.1 RAM Do print Log)
       var  bNoLog           =  aLog == "log" ? 0 : 1; global.bNoLog = bNoLog                               // .(50414.01.2 RAM Don't print shoMsg if 0)
            global.bQuiet    =  bNoLog == 0
        if (bDebug == 1) {
            console.log(   `  - S1201[ 156]  bDoit: '${bDoit}', aLog: '${aLog}', bNoLog: ${bNoLog}, bDebug: ${bDebug}, bQuiet: ${global.bQuiet}`) // process.exit()
            }    
                                 
            LIBs.MWT         =        () => "../../._2/MWTs"                                                // .(50405.06.6)
//     var  LIBs             = { MWT: () => "../../._2/MWTs" }                                              //#.(50405.06.6 RAM Error: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader.)
//     var  FRT              =( await import( `${LIBs.AIC()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50405.06.7)
       var  FRT              =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50405.06.8 RAM Call function: LIBS.MOD())
       var  MWT              =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default            // .(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)
//     var  pURLs            =( await import( `${LIBs.MWT()}/MWT04_runWebSearch_u2.06.mjs` ) ).default      //#.(50423.02.1 RAM Import MWT04_runWebSearch).(50514.02.3)
//     var  pDOCs            =( await import( `${LIBs.MWT()}/MWT06_runDocsSearch_u2.06.mjs`) ).default      //#.(50423.02.2 RAM Import MWT06_runDocsSearch).(50514.02.4)
       var  pURLs            =( await import( `../components/search-urls_u2.06.mjs`  ) ).default            // .(50514.02.3RAM Move to components).(50423.02.1 RAM Import MWT04_runWebSearch)
       var  pDOCs            =( await import( `../components/search-docs_u2.06.mjs`  ) ).default            // .(50514.02.4 RAM Move to components).(50423.02.2 RAM Import MWT06_runDocsSearch)
//      if (pDOCs.bLoaded == 0) { console.log( "  - S1201[ 179]  Can't use ChromaDB" ) }                    // .(50518.02.4 RAM ChromaDB may not be loaded

//                              FRT.writeFileSync( MWT.fixPath( FRT.__dirname, 'run-tests.txt' ), '' )      //#.(50507.08d.2 RAM Start MT, not here)
       var  aModel1
       var  nCTX_Size1

// Configure Debug Variables
// --  ---  --------  =  --  =  ------------------------------------------------------  #
  function  setDebugVars() {                                                                                // .(50405.03.1 RAM Write setDebugVars Beg)
        if (FRT.inVSCode) {                                                             // .(50507.04.4 RAM Set whatever here)  
       var  bDebug           =  process.env.Debug  || 0    // Debug Use current settings
//     var  bDebug           =  0                          // Debug flag for this function

     global.bDebug           =  bDebug                     // for all subscripts 
            bDoit            =  1                          // for this script 

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
       var  aModel1          = 'starcoder2:3b'             // 1.7  GB on rm228 // no results
       var  aModel1          = 'gemma2:2b'                 // 1.6  GB on rm231
       var  aModel1          = 'qwen2:7b'                  // 4.4  GB on rm228
       var  aModel1          = 'qwen2:0.5b'                //  .35 GB on rm228
       var  aModel1          = 'qwen2:1.5b'                //  .93 GB on rm228
//     var  aModel1          =  process.env.OLLAMA_MODEL_NAME || aModel1

       var  nCTX_Size1       =  4000
//     var  nCTX_Size1       =  16000

        if (bDebug) {
            nRunCount        =  1                                                                           // .(50403.03.1)
            aModel           =  aModel1
//          nCTX_Size        =  nCTX_Size1
//          pVars.SESSION_ID = 't009'
//          pVars.NEXT_POST  = '05'
//   global.aPrtSections     = 'parms,runid'                                                                // .(50404.01.27)
//   global.aPrtSections     = ''                                                                           // .(50404.01.27)
//   global.bInVSCode        =  true
            sayMsg(`S1201[ 224]*** bDebug: Using Model: ${aModel}, CTX_Size: ${nCTX_Size} ***`, 1 , 1 )     // .(50402.02.2)
            }                                                                                               // .(50331.04.3 End)
          }  // eif FRT.inVSCode                                                        // .(50507.04.5)  
         }; // eof setDebug Vars                                                                            // .(50405.03.1 End)
//     ---  --------  =  --  =  ------------------------------------------------------  #

// Setup environment variables and configuration
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()                     // .(50507.07.1 RAM bDoit = 0)

       var  aTS              =  FRT._TS
       var  shoMsg           =  MWT.shoMsg                                              // .(50404.01.28)

      var __basedir          =  FRT.__basedir
       var  aAppPath         =  FRT.__dirname
       var  aAppDir          =       aAppPath.split( /[\\\/]/ ).slice(-1)[0]            // Was splice
       var  aAppName         = 'a' + aAppDir.slice(1)                                   // .(50404.06.3 RAM Was aDocsDir).(50402.14.1 RAM Apps in docs have 'a' prefix)
//     var  aDocsDir         = `${aAppName}/${ FRT.getDate(-2) }/{TName}`               //#.(50405.02.1 RAM Was TNum).(50404.06.4 RAM Redefine aDocsDir)
       var  aMonth           = `20${ FRT.getDate(-2).slice(0,9)}`                       // .(50405.01c.1).(50405.02b.1 RAM Add century)
       var  aDocsDir         = `${aAppName}/${aMonth}/{SName}`                          // .(50405.01c.2).(50405.02b.2 RAM Add century).(50405.02.2 RAM Remove Day).(50405.02.1 RAM Was TNum).(50404.06.4 RAM Redefine aDocsDir)
       var  aApp             =  aAppDir.replace( /_.+/, '' )                            // .(50503.05.1 RAM We need it)

     global.aAppDir          =  aAppDir
   global.__basedir2         =  FRT.path( aAppPath )
            FRT.__basedir2   =  FRT.path( aAppPath )
//   global.bInVSCode        =  FRT.isNotCalled( import.meta.url )                      // .(50331.07.1).(50201.09c.1)
//   global.bInVSCode        =  process.env.VSCODE_INSPECTOR_OPTIONS ? 1 : 0            // .(50201.09c.1 RAM Try this).(50331.07.1 RAM ie. Is not called directly from Node)
//   global.bInVSCode        =  FRT.inVSCode                                            // .(50507.04.6 RAM See setDebugVars)
//   global.bInVSCode        =  FRT.setVars().InVSCode                                  // .(50507.04.7)

//     Display configuration if verbose output is enabled
//     ---  --------  =  --  =  ------------------------------------------------------  #

       var  bDoit            =  process.env.DOIT || 1;  FRT.bDoit = bDoit               // .(50507.07.2 RAM bDoit ??).(50415.01.3 RAM bDoit)
            bQuiet           =  0                                                       // .(50404.02.5)
        if (bQuiet == 2) {
            saysg(`A1201[ 253]  bDebug: ${global.bDebug}, bQuiet: ${global.bQuiet}, bDoit: ${FRT.bDoit}, bForce: ${FRT.bForce}, bIsCalled: ${FRT.isCalled(import.meta.url)}`, -1, 1 )
            }
            global.bQuiet    =  0                                                       // .(50404.02.6)
//          global.bNoLog    =  0; bNoLog = 0                                           // .(50507.04.2)
//          global.bDoit     =  0; bDoit  = 0                                           // .(50507.04.3)  

            sayMsg(`S1201[ 259]  APP: '${aApp}', bDoit: '${bDoit}, bDebug: '${bDebug}', DRYRUN: '${bDryRun}', SCORING: '${process.env.SCORING}', PC_CODE: '${process.env.PC_CODE}', aLog: '${aLog}', bNoLog: ${bNoLog}`, bEnvs ); // .(50513.05.14) // process.exit() 
       var  bDebug2          =  process.env.DEBUG; FRT.bDebug = bDebug2                 // .(50415.01.4 RAM bDebug2)
            global.bDebug    =  bDebug2 ? bDebug2 : global.bDebug;                      // .(50415.01.5)
//          bNoLog           = (bNoLog == 0) ? bNoLog : (bDebug2 ? -1 : bNoLog)         // .(50415.01.6)
            bNoLog           = (bNoLog == 0) ? bNoLog : (bDebug2 ?  1 : bNoLog)         // .(50415.01.6 RAM Change -1 to 1 )

            global.bQuiet    =  bNoLog == -1 ? 1 : global.bQuiet

            sayMsg(`A1201[ 267]  bDebug: ${global.bDebug}, bQuiet: ${global.bQuiet}, bDoit: ${bDoit}, bForce: ${FRT.bForce}, bIsCalled: ${FRT.isCalled(import.meta.url)}`, -1, 0 )
            sayMsg(`A1201[ 268]  aAppDir: ${ FRT.__dirname  }`, -1 ) 

//     Process .ENV Variables and command line arguments
//     ---  --------  =  --  =  ------------------------------------------------------  #
       var  pVars            =  FRT.getEnvVars( FRT.__dirname )                                             // .(50403.02.6 RAM Was MWT).(50331.04.3 RAM Get .env vars Beg)
       if (!pVars.PLATFORM) {                                                                               // .(50403.02.7 Beg)
       var  aEnvDir          =  FRT.__dirname.replace( /.+server1/, './server1').replace( /\\/, "/" )       // .(50428.03.1 RAM Fix path) 
            usrMsg( `* An .env file or it's variables do not exist in ${aEnvDir}.`)                         // .(50428.03.2 RAM New msg) 
            process.exit(1)
            }                                                                                               // .(50403.02.7 End)
       var  aWebSearch       =  pVars.WEB_SEARCH    || "roman empire"
       var  bUseWebURLs      =  pVars.USE_URLS == 1  ?  true : false                                        // .(50409.03.10 RAM Do Web Search)
       var  bUseDocFiles     =  pVars.USE_DOCS == 1  ?  true : false                                        // .(50409.03.11 RAM Do Docs Search)
       var  aDocFilePath     =  pVars.DOCS_DIR + "/" + (pVars.DOCS_FILENAME || "*.txt")                     // .(50409.03.12)
       var  aDocsCollection  =  pVars.DOCS_COLLECTION                                                       // .(50428.04.3)
       var  aApp2            =  aDocsCollection.replace( /_.+/, "" )  || aApp // Name.slice(0,3)            // .(50503.05.2 RAM Default to s13 not a13).(50429.09.12).(50429.09b.1)
       var  bUseRawFiles     = `${pVars.FILES_PATH}/${pVars.FILES_PATH}`.match(/{File/) == null             // .(50430.04b.1 RAM Check if FILES_PATH has been assigned)
       var  bUseRawFiles     =  bUseRawFiles && (pVars.USE_FILES == 1 ?  true : false)                      // .(50430.04b.2).(50430.04.3 RAM Add bUseRawFiles Beg)
        if (bUseRawFiles) {
       var  aFilesPath       =  pVars.FILES_PATH
       var  aFilesName       =  pVars.FILES_NAME.replace( /^\*/,"" ).replace( /\./g, "\\." )
       var  aRawFileName     =  FRT.firstFile( aFilesPath, aFilesName )                                     // .(50430.04.4 RAM Find first file in FILES_PATH) 
            bUseRawFiles     =  aRawFileName ? true : false
            }                                                                                               // .(50430.04.3 RAM Add bUseRawFiles End)

//     var  nRunCount        =  pVars.RUN_COUNT     ||  1                                                   //#.(50403.03.2).(50403.03.x)
       var  aStatsFmt        =  pVars.CSV_OR_TAB_STATS || 'csv'                                             // .(50403.04.4)
       var  aServer          = (pVars.THE_SERVER    || '').slice( 0, 11 ) || ''
//     var  aSvr             =  pVars.THE_PC_NAME    ?  pVars.THE_PC_NAME : aServer.slice(0,5)              //#.(50405.01.1 Use THE_PC_NAME).(50331.04.4 Beg).(50405.01b.1)
       var  aSvr             = (pVars.THE_PC_CODE    ?  pVars.THE_PC_CODE : aServer).slice(0,6)             // .(50417.04.2).(50405.01b.1 RAM Was 5 chars).(50405.01.1 Use THE_PC_NAME).(50331.04.4 Beg)
       var  bPrtSources      =  pVars.SHOW_SOURCES  ||  0          // Whether to print source content
     global.aPrtSections     =  pVars.SHOW_SECTIONS || 'all'                                                // .(50404.01.29)
       var  nWdt             = (pVars.WRAP_WIDTH    ||  145 ) * 1
       var  nLog             =  pVars.TO_SCREEN_OR_FILE || 1                                                // .(50331.04.4)

       var  aPlatform        =  pVars.PLATFORM.toUpperCase()                                                // .(50331.10.1 Use PLATFORM)
//          aModel           =  pVars.MODEL       ||  aModel                                                //#.(50331.10.2)
            aModel           =  pVars[`${aPlatform}_MODEL_NAME` ] || aModel1                                // .(50331.10.2)
            nCTX_Size1       = (pVars[`${aPlatform}_CTX_SIZE`   ] || nCTX_Size1 ) * 1                       // .(50415.03.x RAM Was nCTX_Size).(50331.10.3)
       var  nTemperature     = (pVars[`${aPlatform}_TEMPERATURE`] || .07        ) * 1                       // .(50331.10.4)

       var  mArgs            =  process.argv.slice(2)
       var  aModel           =  mArgs[0] ? mArgs[0] : aModel
       var  nCTX_Size        = (mArgs[1] ? mArgs[1] : nCTX_Size) * 1

//     ---  --------  =  --  =  ------------------------------------------------------  #

//                              usrMsg(   "----------------".padEnd( nWdt +  1, "-" ), bNoLog )             //#.(50414.01b.1).(50414.01.3).(50404.05.9)
                                setDebugVars()                                          // .(50507.04.8 RAM Sets whatever).(50405.03.2 RAM Set them here)

        if (process.env.SEARCH_MODEL) {                                                 // .(50514.01b.1 RAM Overide SEARCH_MODEL)  
            aModel           =  process.env.SEARCH_MODEL                                // .(50514.01b.2)                                                         
            }                                                                           // .(50514.01b.3)  
        if (process.env.SCORING_MODEL && aApp == "s14") {                               // .(50514.01b.4 RAM S.B. SCORING_MODEL)
            aModel           =  process.env.SCORING_MODEL                               // .(50514.01.16 RAM Overide OLLAMA_MODEL_NAME parameter)                          
            }
        if (process.env.SYSTEM_PROMPT) {
      pVars.SYS_PROMPT       =  process.env.SYSTEM_PROMPT                               // .(50514.01.17 RAM Overide SYS_PROMPT parameter)                          
      pVars.SYS_RUN_COUNT    =  1
      pVars.SYS_PROMPT_CD    = "GKN0-INPT"
  pVars.USE_SYS_PROMPTS_FILE =  0
            }
        if (process.env.RAG_COLLECTIONS) {                                              // .(50514.01.18 RAM Overide SHOW_SECTIONS parameter)      
            aDocsCollection  =  process.env.RAG_COLLECTIONS
            }                                          
        if (process.env.USER_PROMPT) {
      pVars.USR_PROMPT       =  process.env.USER_PROMPT                                 // .(50514.01.19 RAM Overide USR_PROMPT parameter)                          
      pVars.USR_RUN_COUNT    =  1
      pVars.USR_PROMPT_CD    = "AA0"
  pVars.USE_USR_PROMPTS_FILE =  0
            }
        if (process.env.SECTIONS) {                                                     // .(50514.01.20 RAM Overide SHOW_SECTIONS parameter)      
     global.aPrtSections     =  process.env.SECTIONS  
//          bNoLog           =  1 
            }                                          

//     Setup Model User Prompts
//     ---  --------  =  --  =  ------------------------------------------------------  #
       var  nRunCount        =  pVars.USR_RUN_COUNT        || 1                                             // .(50403.03.x)
       var  bUsrPromptFile   =  pVars.USE_USR_PROMPTS_FILE || 0                                             // .(50408.05.1 RAM Use Prompts file Beg)
        if (bUsrPromptFile != 1) {
       var  mUsrPrompts      =  [                                                                           // .(50409.02.1 RAM Put into array)
             { QPC           :  pVars.USR_PROMPT_CD  || ''                                                  // .(50410.04a.1 RAM Was QUERY_PROMPT).(50407.03.2 RAM Add QPC)
             , UsrPrompt     :  pVars.USR_PROMPT     || "What do you know?"                                 // .(50410.04a.2)
               } ]                                                                                          // .(50409.02.2)
       for (var i = 0; i < nRunCount - 1; i++ ) { mUsrPrompts.push( mUsrPrompts[0] ) }                      // .(50410.03.1 RAM Duplicate mUsrPrompt[0] if not using user-prompts file)

          } else {
       var  mUsrPrompts      =  FRT.readFileSync( `${aAppPath}/${pVars.USR_PROMPTS_FILE}` ).split( "\n" )
            mUsrPrompts      =  mUsrPrompts.map(  aUsrPrompt => { return {
               QPC           :  aUsrPrompt.slice( 0, 3 )
             , UsrPrompt     :  aUsrPrompt.slice( 4 ).replace(/^[. '"]+/, "" ).trim().replace(/[ '"]+$/, "" )
               } } )
            } // eif mUsrPrompts                                                                                              // .(50408.05.1 End)
//          --------  =  --  =  --------------------------------------------  #

//     Setup Model System Prompts and Loop through RUN_COUNT
//     ---  --------  =  --  =  ------------------------------------------------------  #
       var  nSysCount        =  pVars.SYS_RUN_COUNT        || 1                                             // .(50403.03.x)
//     var  aSysPrompt       = "Summarize the information and provide an answer. Use only the information in the following articles to answer the question:"  // .(50413.03.x)
       var  bSysPromptFile   =  pVars.USE_SYS_PROMPTS_FILE || 0                                             // .(50408.05.1 RAM Use Prompts file Beg)
        if (bSysPromptFile != 1) {
       var  mSysPrompts      =  [
             { SysPmtCd      :  pVars.SYS_PROMPT_CD || "GKN0-SIMP"
             , Temperature   : (pVars[`${aPlatform}_TEMPERATURE`] || .07        ) * 1
             , SysPrompt     :  pVars.SYS_PROMPT    || "Please use the information in the following text."
               } ]
       for (var i = 0; i < 8; i++ ) { mSysPrompts.push( mSysPrompts[0] ) }

          } else {
       var  mSysPrompts      =  FRT.readFileSync( `${aAppPath}/${pVars.SYS_PROMPTS_FILE}` ).split( "\n" )
            mSysPrompts      =  mSysPrompts.map(  aSysPrompt => {                                           // .(50415.03.1 RAM Major overhaul Beg)
               var mPrompt   =  aSysPrompt.replace( /".+/,  "").replace(   /[ ,]+$/, "" ).split( ',' ).map( a => a.trim() )
               var aPrompt   =  aSysPrompt.replace( /.+?"/, "").replace( /^[. '"]+/, "" ).trim().replace(/[ '"]+$/, "" )
               var pPrompt =
                    { SysPmtCd      :  mPrompt[2]            // aSysPrompt.slice( 14, 23 )
                    , Temperature   : (mPrompt[3] || .7) * 1 // (aSysPrompt.slice( 26, 29 ) || .07 ) * 1
                    , CTX_Size      : (mPrompt[4] ||  0) * 1 // may not exist                               // .(50415.03.2
                    , SysPrompt     :  aPrompt               // aSysPrompt.slice( 31 ).replace(/^[. '"]+/, "" ).trim().replace(/[ '"]+$/, "" )
                      }
            return pPrompt                                                                                  // .(50415.03.1 End
               } )
            } // eif mSysPrompts                                                                            // .(50408.05.1 End)
//          --------  =  --  =  --------------------------------------------  #

//     Loop through System Prompts
//     ---  --------  =  --  =  ------------------------------------------------------  #
       var  aSessionId       =  pVars.SESSION_ID || 't001'                                                  // .(50405.02.3)
       var  aTitle           = `${pVars.SESSION_TITLE}` || ''

       var  bJustOneSysPmt   =  aSessionId.slice(-1) != "0"  && nSysCount == 1                              // .(50506.02.1 RAM Do multiple Sys tests in nSyscount > 1)
//          nSysCount        = (aSessionId.slice(-1) == "0" ) ? nSysCount : 1                               // .(50410.03.2 RAM Was nSysCount)
            aSessionId       =  nSysCount == 1 && bJustOneSysPmt ? aSessionId :`t${aSessionId.slice(1,3)}0` // .(50506.02.2 RAM Reset count ??) 

   for (let iTest = 0; iTest < nSysCount; iTest++) {                                                        // .(50403.03.3)
//     var  nTest            =  iTest // bJustOneSysPmt ? aSessionId.slice(-1) - 1 : iTest                  //#.(50414.04.1 RAM Which is it?)
       var  nTest            =  bJustOneSysPmt ? aSessionId.slice(-1) - 1 : iTest                           // .(50414.04b.1 RAM Use RunId Test # if running just one)
       var  aSysPmtCd        =  mSysPrompts[ nTest ].SysPmtCd
//          console.log( `-- bJustOneSysPmt: ${bJustOneSysPmt}, nTest: ${nTest}, aSysPmtCd: ${aSysPmtCd}`)  // .(50414.04.2)
       var  aSysPrompt       =  mSysPrompts[ nTest ].SysPrompt
            nTemperature     =  mSysPrompts[ nTest ].Temperature
            nCTX_Size        =  mSysPrompts[ nTest ].CTX_Size || nCTX_Size1                                 // .(50415.03.2

       var  aTitle           =  aTitle.replace( /{Model}/,  aModel ? aModel    : "Model" )                  // .(50409.02.3 )
            aTitle           =  aTitle.replace( /{Cnt}/, nRunCount ? nRunCount : "1"     )                  // .(50413.03.3)
            aTitle           =  aTitle.replace( /{PC_Code}/,  aSvr ? aSvr      : "MyPC"  )                  // .(50417.04.3).(50413.03.4)

        if (bJustOneSysPmt == 0) {                                                                          // .(50414.04.3)
            aSessionId       = `${ aSessionId.slice(0,3)}${ 1 + aSessionId.slice(-1) * 1 }`                 // .(50414.04.4)
            pVars.NEXT_POST  = '01'                                                                         // .(50414.04.5)
            }                                                                                               // .(50414.04.6)
//     var  aSessionName     = `${pVars.SESSION_ID}${ aTitle ? `_${aTitle}` : '' }`                         //#.(50405.02.3).(50413.03.5)
//     var  aSessionName     = `${aSessionId}${ aTitle ? `_${aTitle}` : '' }`                               //#.(50413.03.5).(50405.02.3).(50422.02.6)
       var  aSessionName     = `${pVars.SESSION_ID}${ aTitle ? `_${aTitle}` : '' }`                         // .(50422.02.6 RAM Keep 0#0 Maybe).(50413.03.10).(50405.02.3)

//     var  aRunId           = `${aAppName.slice(0,3)}_${pVars.SESSION_ID}.${pVars.NEXT_POST}`              //#.(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId).(50413.03.6)
//     var  aRunId           = `${aAppName.slice(0,3)}_${aSessionId}.${pVars.NEXT_POST}`                    //#.(50413.03.6).(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId).(50429.09.13)
       var  aRunId           = `${aApp2}_${aSessionId}.${pVars.NEXT_POST}`                                  // .(50429.09.13 RAM Virual AppId).(50413.03.6).(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId)

            sayMsg( `A1201[ 399]  bDoit: '${bDoit}',  aLog: '${aLog}', bNoLog: ${bNoLog}, bDebug: '${bDebug}', global.bDebug: '${global.bDebug}', global.bQuiet: '${global.bQuiet}', global.aPrtSections: '${global.aPrtSections}' `, -1 ); // process.exit()
            sayMsg( `A1201[ 340]  ${aSessionName}  ${nTemperature}  ${nCTX_Size} ${aSysPmtCd}  ${aSysPrompt.slice(0,66) }...`, -1 )                   // .(50414.01.3)
//          }  // eol nSysCount                                                                             //#.(50413.03.7 Do the full double loop)
//          --------  =  --  =  --------------------------------------------  #

//     Loop through User Prompts
//     ---  --------  =  --  =  ------------------------------------------------------  #
   for (let iRun  = 0; iRun < nRunCount; iRun++) {                                                          // .(50403.03.3)

            usrMsg( "----------------".padEnd( nWdt +  1, "-" ), bNoLog )               // .(50414.01b.1)

       var  aQPC             =  mUsrPrompts[ iRun ].QPC                                                     // .(50408.05.2)
       var  aUsrPrompt       =  mUsrPrompts[ iRun ].UsrPrompt                                               // .(50408.05.3

//     var  aTitle           = `${pVars.SESSION_TITLE}` || ''
            aTitle           =  aTitle.replace( /{Model}/,  aModel ? aModel    : "Model" )                  // .(50409.02.3 )
            aTitle           =  aTitle.replace( /{Cnt}/, nRunCount ? nRunCount : "1"     )                  // .(50413.03.8)
            aTitle           =  aTitle.replace( /{PC_Code}/,  aSvr ? aSvr      : "MyPC"  )                  // .(50417.04.4).(50413.03.9)
//     var  aSessionName     = `${pVars.SESSION_ID}${ aTitle ? `_${aTitle}` : '' }`                         //#.(50405.02.3).(50413.03.10)
//     var  aSessionName     = `${aSessionId}${ aTitle ? `_${aTitle}` : '' }`                               //#.(50413.03.10).(50405.02.3).(50422.02.6)
       var  aSessionName     = `${pVars.SESSION_ID}${ aTitle ? `_${aTitle}` : '' }`                         // .(50422.02.6 RAM Keep 0#0 Maybe).(50405.02.3)

//     var  aRunId           = `${aAppName.slice(0,3)}_${pVars.SESSION_ID}.${pVars.NEXT_POST}`              //#.(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId).(50413.03.12)
//     var  aRunId           = `${aAppName.slice(0,3)}_${aSessionId}.${pVars.NEXT_POST}`                    //#.(50413.03.12).(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId).(50429.09.14)
       var  aRunId           = `${aApp2}_${aSessionId}.${pVars.NEXT_POST}`                                  // .(50429.09.14).(50413.03.12).(50404.06.5).(50402.14.2).(50331.08.3 RAM Get RespId)
       var  aNextPost        = `${ 1 + pVars.NEXT_POST * 1 }`.padStart( 2, "0" )                            // .(50331.08.4 RAM Set Next_Post)
//                              FRT.setEnv( "NEXT_POST", aNextPost, FRT.__dirname)                          // .(50331.08.5)
//          Setup logfile
//          --------  =  --  =  --------------------------------------------  #
//          aDocsDir         =  aDocsDir.replace( /{TNum}/, `_${pVars.SESSION_ID}` )                        //#.(50404.06.6).(50405.02.4)
            aDocsDir         =  aDocsDir.replace( /{SName}/, `a${aApp.slice(1)}_${aSessionName}` )          // .(50503.05.3 RAM Add aApp to aDocsDir).(50404.06.6)
            aDocsDir         =  aDocsDir.replace( /:/, `;` )                                                // .(50413.03.13 RAM Model nameshave ":"
//     var  aLogFile         =      `./${aAppDir}/${aAppDir.slice(0,3)}_t001.01.4.${aTS}_Response.txt`      //#.(50331.02.5)
       var  aLogFile         = `./docs/${ aDocsDir}/${aRunId}.4.${aTS}_Response.txt`                        // .(50402.14.3).(50331.08.6).(50331.02.5 RAM put it in /docs)
                                FRT.setSay( nLog, aLogFile )                                                // .(50331.04.5 RAM nLog was 3)

//     var  aStatsDir        = `./docs/${ aDocsDir.replace( /_t.+/, "") }`                                  //#.(50405.01b.2 RAM Was: docs/${aAppName}/YY.MM.Mth/)
//     var  aStatsDir        = `./docs/${aAppName}/${aAppName.slice(0,3)}-saved-stats`                      //#.(50405.01b.2 RAM Was: docs/${aAppName}/a##-saved-stats/).(50405.01c.3)
       var  aStatsDir        = `./docs/${aAppName}/${aMonth}_${aAppName.slice(0,3)}-saved-stats`            // .(50405.01c.3 RAM Add aMonth).(50405.01b.2 RAM Was: docs/${aAppName}/a##-saved-stats/)
//     var  aStatsFile       =  FRT.join( __basedir, `./docs/${aAppDir}/${aAppDir.slice(0,3)}_Stats.csv` )
//     var  aStatsFile       = `${aDocsDir.slice(0,3)}_Stats_u${aTS.slice(0,5)}-${aSvr}.${aStatsFmt}`       //#.(50403.04.5).(50402.14.4).(50331.04b.1 RAM Update StatsFile name)(50405.01.1).(50429.09.15)
       var  aStatsFile       = `${aAppName.slice(0,3)}_Stats-${aSvr}_u${aVer.slice(1)}.csv`                 // .(50429.09.15 RAM No change).(50410.01.1 RAM Was ${aStatsFmt}).(50405.01b.2 RAM Add Stats-).(50405.01.2 RAM Add aVer).(50403.04.5).(50402.14.4).(50331.04b.1 RAM Update StatsFile name)
                                FRT.makDirSync( FRT.join( __basedir, aStatsDir ), true );                   // .(50410.01.2)
       var  aStatsFile       =  FRT.join( __basedir, `${aStatsDir}/${aStatsFile}` )                         // .(50402.14.5).(50331.04b.2)

//          Configure Prompts and Ollama Parameters
//          --------  =  --  =  --------------------------------------------  #
//     var  aSysPrompt       = "Summarize the information and provide an answer. Use only the information in the following articles to answer the question:"  // .(50413.03.14)
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
             ,  datetime     :  FRT.getDate( -1 )                                                           // .(50413.02.9)
             ,  qpc          :  aQPC                                                                        // .(50407.03.3)
             ,  usrprompt    :  aUsrPrompt                                                                  // .(50413.02.10)
             ,  spc          :  aSysPmtCd                                                                   // .(50413.02.11)
             ,  sysprompt    :  aSysPrompt                                                                  // .(50413.02.12)
             ,  pccode       :  aSvr                                                                        // .(5050503.06.1 RAM Need pccode)
                } // eoo pParms
//          --------  =  --  =  --------------------------------------------  #

            sayMsg( `A1201[ 474]  global.bNoLog: ${global.bNoLog}  ${nTemperature}  ${nCTX_Size} ${aSysPmtCd}  ${aSysPrompt.slice(0,66) }...`, -1 )   // .(50414.01.4)

                                usrMsg(   "----------------".padEnd( nWdt - 12, "-" )                                      , shoMsg("all")     ) // .(50404.05b.1 RAM Was 25).(50404.05.10)

        if (global.bNoLog == 0 && bEnvs != 1) {                                                                                                  // .(50414.01.5 RAM Do log it)
//     var  aRIDs            =  pParms.runid.slice(0,11).replace( /_/, "  ")                                                                     //#.(50429.09c.1)
       var  aRIDs            =  pParms.runid.split( /[_,]/ ).slice(0,2).map( (a,i) => i==0 ? a.padEnd(5) : a ).join('')                          // .(50429.09c.1 RAM Accomodate aApp2)
       var  aPIDs            = `${pParms.spc}  ${pParms.qpc}  ${ `${nCTX_Size}`.padStart(6) }  ${nTemperature}`                                  // .(50414.01b.1 RAM Add CTX and Temp) .(50414.01.6)
            if (pVars.NEXT_POST== "01") { console.log( "") }
            console.log(       `${FRT.getDate(3,5)}.${FRT.getDate(13,7)}  ${aRIDs}  Starting ${pParms.model.padEnd(19)}  ${aPIDs}` )             // .(50414.01.7)
            }
//          --------  =  --  =  --------------------------------------------  #

        if (bDoit == 1 || bDryRun == 1) {                                                                   // .(50513.04.4)
                                sayMsg( `A1201[ 487]  Calling main( pParms ) for model: '${pParms.model}'`, -1 ); 
            try {                                                                                           // .(50501.04.3)
                                await  main( pParms )

            } catch( err ) {    sayMsg( `A1201[ 491]  Error: ${err}`, -1);  }                               // .(50501.04.4)
                                sayMsg( `A1201[ 492]  Completed test run:   ${pParms.runid.replace( /,/, ", ") }.`, -1 ); // .(50501.04.5)
//                              FRT.setEnv( "NEXT_POST", aNextPost, FRT.__dirname )                         //#.(50506.01.1)
            }
//          --------  =  --  =  --------------------------------------------  #
                                
                                FRT.setEnv( "NEXT_POST", aNextPost, FRT.__dirname )                         // .(50506.01.1 RAM Set even if bDoit = 0)
            if (global.bNoLog == 0&& bEnvs != 1) {                                                                                               // .(50414.01.5 
       var  aSecs            = `in ${pParms.secs} secs, ${pParms.tps} tps`; aRIDs = "            "                                               // .(50414.01.9)                                                        // .(50414.01.x RAM Do log it)
            console.log(       `${FRT.getDate(3,5)}.${FRT.getDate(13,7)}  ${aRIDs}  Finished ${pParms.model.padEnd(17)} ${aSecs}` )              // .(50414.01.10)
            }                                                                                                                                    // .(50414.01.11)
                                } // eol Run User Prompt loop                                               // .(50403.03.5)
//          --------  =  --  =  --------------------------------------------  #
                         } // eol Test System Prompt loop                                                   // .(50413.03.7 End of test loop)
//     ---  --------  =  --  =  ------------------------------------------------------  #

//                              usrMsg( "\n----------------".padEnd( nWdt +  1, "-" ), bNoLog )             // .(50414.01.12).(50404.05.11)
                                usrMsg(  "========== ------".padEnd( nWdt +  1, " ===== ------" ), bNoLog ) // .(50414.01.12).(50404.05.11)
//                              FRT.exit_wCR()                                                              // .(50403.03a.1).(50403.03b.1)
//                              usrMsg(  "" )                                                               // .(50403.03b.1)

// Main Execution
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

     async  function  main( pParms ) {

       let  searchPrompt     = ''                                                       // .(50414.03.1 RAM Blank if not using WebSearch)
       let  aiPrompt         =  pParms.usrprompt;                                       // .(50414.03.2 XAI Prompt user for search and AI queries)

        if (bDebug == true  ||  bInVSCode || global.bNoLog == "0") {                                        // .(50503.02.1 RAM Don't Prompt if not bNoLog).(50201.09c.4).(50331.07.2)
            searchPrompt     =  aWebSearch    // "roman empire";                                                                                 // .(50331.04.6)
//      var searchDocFile    =  aDocFilePath                                                                                                     //#.(50409.03.13).(50428.04.4)
//          aiPrompt         =  aUsrPrompt          // "The city's restaurants";                                                                 //#.(50331.04.7).(50413.02.13)
            aiPrompt         =  pParms.usrprompt    // "The city's restaurants";                                                                 // .(50413.02.13)
        } else { 
//          usrMsg( "" ) 
       if (!bUsrPromptFile) {                                                                                                                    // .(50409.03b.1 RAM Don't ask if bUsrPromptFile)
        if (bUseWebURLs) {                                                                                                                       // .(50409.03.14)
//          searchPrompt     =( await MWT.ask4Text( "Enter your search prompt (e.g., '${aWebSearch)Lexington VA'): " ) ) || "Lexington Va";      //#.(50330.03.6).(50331.04.8)
            searchPrompt     =( await MWT.ask4Text( `Enter a Web Search prompt (e.g., '${aWebSearch}'): `      ) ) ||  aWebSearch;               // .(50331.04.8).(50330.03.6)
            }                                                                                                                                    // .(50409.03.15)
        if (bUseDocFiles) {                                                                                                                      // .(50409.03.16)
//          searchDocFile    =( await MWT.ask4Text( `Enter a Doc File path (e.g., '${aDocFilePath}'): `        ) ) ||  aDocFilePath;             //#.(50409.03.17).(50428.04.5)
            aDocsCollection  =( await MWT.ask4Text( `Enter a ChromaDB Docs Collection name (e.g. '${aDocsCollection}'): `)) || aDocsCollection;  // .(50428.04.5).(50409.03.17)
            }                                                                                                                                    // .(50409.03.18)
//          aiPrompt         =( await MWT.ask4Text( "Enter your AI prompt (e.g., 'Tell me about tourism'): "   ) ) || "Tell me about tourism";   //#.(50330.03.7).(50331.04.9)
            aiPrompt         =( await MWT.ask4Text( `Enter an AI Model Query Prompt (e.g., '${aUsrPrompt}'): ` ) ) ||  aUsrPrompt;               // .(50409.03.19).(50331.04.9).(50330.03.7)
            } // eof interactive                                                                                                                 // .(50409.03b.2)
        }  // not inVSCode  
        if (bUseWebURLs) {                                                                                                                       // .(50409.03.20)
            searchPrompt     = aWebSearch                                                                                                        // .(50409.03b.3 RAM Set searchPrompt = aWebSearch)
            usrMsg(""                                                                                                      , shoMsg('Parms')   ) // .(50404.01.1)
            usrMsg(`Web Search Prompt: "${searchPrompt}"`                                                                  , shoMsg('Parms')   ) // .(50404.01.2)
//          usrMsg(`  AI Prompt:       "${aiPrompt}"`                                                                      , shoMsg('Parms')   ) // .(50404.01.3)
            } 
        if (bUseDocFiles) {                                                                                                                      // .(50409.03.16)
            usrMsg(""                                                                                                      , shoMsg('Parms')   ) // .(50429.01.13)
            usrMsg(`RAG Search Prompt: "${aiPrompt}"`                                                                      , shoMsg('Parms')   ) // .(50404.01.2)
            searchPrompt     = ''                                                       // .(50414.03.3 RAM Blank if not using WebSearch)
            }                                                                                                                                    // .(50409.03.21)
        if (bUseRawFiles) {                                                                                                                      // .(50430.04.5 Beg)
            usrMsg(""                                                                                                      , shoMsg('Parms')   ) 
            usrMsg(`Files Search Prompt: "${aiPrompt}"`                                                                    , shoMsg('Parms')   ) 
            searchPrompt     = ''                                                       
            }                                                                                                                                    // .(50430.04.x End)
                                usrMsg(  "----------------".padEnd(        57, "-" )                                       , shoMsg('Parms')   ) // .(50404.05.12)

// --  ---  --------  =  --  =  ------------------------------------------------------  #

       var  alltexts         = [ ]                                                                                                               // .(50409.03.22)
//     var  pJSON_Results    = { WebResponse: {}, URLs: [], DocResponse: {}, Files: [], DOCs: [] }                                               //#.(50409.03.23).(50430.04.x) 
       var  pJSON_Results    = { WebResponse: {}, URLs: [], DocResponse: [], Files: [], DOCs: [] }                                               // .(50430.04.5).(50409.03.23)

        if (bUseDocFiles) {                                                                                 // .(50409.03.29)
       var  pResults                  =  await  pDOCs.getRelevantDocs( aDocsCollection, aiPrompt );         // .(50428.04.6 RAM Was searchPrompt).(50423.02.5)
        if (pResults.DOCs.length == 0) { process.exit(1) }                                                  // .(50503.06.4 RAM Abort?)
//          searchPrompt              =  aiPrompt                                                           // .(50414.03b.1 RAM aka webBearch).(50428.04.7 RAM ???) 
            pJSON_Results.DocResponse =  pResults.DocsResponse                                              // .(50409.03.30)
            pJSON_Results.DOCs        =  pResults.DOCs                                                      // .(50430.03.3).(50409.03.31).(50428.04.x)
//          pJSON_Results.URLs        =[ aDocsCollection, ...pResults.URLs ]                                //#.(50428.04.8 RAM Was pResults.Docs. [0] is 1st URL).(50409.03.31).(50430.03.4)
            pJSON_Results.Collection  =  aDocsCollection                                                    // .(50430.03.4 RAM Add Collection to JSON_Results)
//     var  alltexts                  =  await  pDOCs.getCleanedText_fromDOCs( pJSON_Results.DOCs );        // .(50423.02.6)
       var  mAllTexts                 =  pResults.Texts  // .join( "\n");                                   // .(50430.03.5).(50428.04.9 )
        } else {                                                                                            // .(50430.04.6)
//          pJSON_Results             = { DocResponse: [], DOCs: [] }                                       //#.(50430.04.7)
       var  mAllTexts                 = [ ]                                                                 // .(50430.04.8)
            }                                                                                               // .(50409.03.32 End)

        if (bUseWebURLs) {                                                                                                                       // .(50409.03.24)
//     var  urls                      =  await  getNewsUrls( searchPrompt );                                //#.(50408.06.6)
       var  pResults                  =  await  pURLs.getNewsUrls( searchPrompt );                          // .(50423.02.3).(50408.06.6)
            pJSON_Results.WebResponse =  pResults.WebResponse                                               // .(50409.03.25)
            pJSON_Results.URLs        =  pResults.URLs                                                      // .(50409.03.26)
//     var  urls                      =  pJSON_Results.URLs                                                 //#.(50408.06.7 RAM [0] is 1st URL).(50430.03.2)
       var  mAllTexts                 =  await  pURLs.getCleanedText_fromURLs( pJSON_Results.URLs );        // .(50430.03.2).(50423.02.4).(50409.03.27)
            }                                                                                               // .(50409.03.28 RAM Add bUseDocFiles Beg)

        if (bUseRawFiles) {                                                                                 // .(50430.04.9 RAM Add bUseRawFiles)
        var pResults                  = { }        
       var  nDoc                      =  mAllTexts.length + 1                                               // .(50430.04.10)
//     var  aRawFileName              = `${aApp2}_${aSessionId}.${nDoc}.txt`                                                                     //#.(50429.01.14).(50430.04.11)       
            pJSON_Results.Files       = `${ aFilesPath }/${ aRawFileName }`
        var aText                     =  FRT.readFileSync( MWT.fixPath( FRT.__dirname, aRawFileName ) )     // .(50501.01.1)
//          aText                     =  aText.replace( /[ \r\n]+/g, " " )                                  //#.(50501.01.1).(50501.02.2)
//          aText                     =  aText.replace( /^\s*$(?:\r\n?|\n){2,}/gm, "\n")                    //#.(50501.01.1).(50501.02.2)
            aText                     =  MWT.sqzLines( aText )                          // .(50503.08.3 RAM Preserve paragraphs).(50501.01.2)
            usrMsg(`\n  Reading from file: ${pJSON_Results.Files}`                                                         , shoMsg('Parms' )  ) // .(50429.01.15)
            usrMsg("---------------------------------------------------------------------------------------------- "       , shoMsg('Search')  ) // .(50429.01.16)
//          usrMsg("File contents:"                                                                                        , shoMsg('Search')  ) // .(50429.01.17)
            usrMsg(`  File sources:\n${ "--------".padEnd( nWdt, "-") }`                                                   , shoMsg('Search')  ) // .(50429.01.18)
            usrMsg(`${nDoc}. ${ MWT.wrap( aText, nWdt, 5, 5 ) }\n${ "--------".padEnd( nWdt, "-") }`                       , shoMsg('Search')  ) // .(50429.01.19)
       var  mDocs                     = [ `/source?start=0&length=${ aText.length }&file=${ pJSON_Results.Files }` ] 
            usrMsg(`\n  Files:\n    ${ mDocs.join('\n    ') }`                                                             , shoMsg('Search')  ) // .(50429.01.20)

            pResults.DocResponse      = { position: `0 + ${aText.length}`, source: pJSON_Results.Files, text: aText }  
            pResults.DOCs             =   mDocs
            pJSON_Results.DOCs.push(      pResults.DOCs )
            pJSON_Results.DocResponse.push( pResults.DocResponse )
            mAllTexts.push(               aText ) 
            }                                                                                               // .(50430.04.9 End)

            pJSON_Results.Text        =  mAllTexts                                                          // .(50408.06.8)

//                                await  answerQuery( aiPrompt, alltexts, urls[0], searchPrompt )           //#.(50330.04c.1 RAM Add searchPrompt).(50331.01.1 RAM Add first  URL).(50408.06.9)
                                  await  answerQuery( aiPrompt, pJSON_Results, searchPrompt )               // .(50408.06.9).(50330.04c.1 RAM Add searchPrompt).(50331.01.1 RAM Add first  URL)
            }; // eof main
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
/**
 * Processes query with Ollama model using provided text sources
 * @param {string} query - User query
 * @param {Array} texts - Array of text sources
 */
// async function  answerQuery( query, texts, document, webSearch ) {                                       //#.(50330.04c.2).(50331.01.2).(50408.06.11)
     async  function  answerQuery( query, pJSON_Results,  aWebSearch ) {                                    // .(50408.06.11).(50330.04c.2).(50331.01.2)
//     var  texts     =  pJSON_Results.Docs                                                                 // .(50408.06.12)
       var  texts     =  pJSON_Results.Text  || []                                                          // .(50430.04.12).(50408.06.12)
//     var  document  =  pJSON_Results.URLs[0] || ''                                                        //#.(50408.06.13).(50430.03.6)
       var  document  =  bUseWebURLs  ?  pJSON_Results.URLs[0]    || ''   : ''       // aka 1st Web URL     // .(50430.03.6)
       var  document  =  bUseDocFiles ?  pJSON_Results.Collection || ''   : document // aka 1st Doc Path    // .(50430.03.7)
       var  document  =  bUseRawFiles ? `${ document ? `collection, '${document}', and file, '${aRawFileName}'`                                  // .(50430.03.8)
                                                     : `file, '${aRawFileName }'` }` : `collection, '${document}'`                               // .(50430.03.8)

//          sayMsg( `A1201[ 608]  nLog: '${nLog}', global.aPrtSections: '${global.aPrtSections}'`, 1)       // .(50414.01.14)
        if (texts.length == 0) {
//  return  usrMsg( "\n* No text content for the AI model to query or summarize." );                        //#.(50404.07.2 RAM Return -1 if error).(50409.03.40)
            usrMsg(   "* No text content for the AI model to query or summarize.", bNoLog );                // .(50414.01.13).(50409.03.40 RAM OK for plain search).(50404.07.2 RAM Return -1 if error)
            }
        var aRunStr          = "RunId: " + pParms.runid.replace( ',', ", No: " )   // .(504                 // .(50404.01.9)
            usrMsg( `\nCombined Prompt for Model: ${pParms.model}  (${aRunStr})`                                           , shoMsg('Parms')   ) // .(50404.01.10)
            usrMsg( "---------------------------------------------------------------------------------------------- "      , shoMsg('Parms')   ) // .(50404.01.11)
            sayMsg( `A1201[ 616]  bNoLog: '${bNoLog}', pParms.model: '${pParms.model}', global.aPrtSections: '${global.aPrtSections}'`, -1)      // .(50414.01.14)

       var  aSources           =  texts.map((a, i) => `${i+1}.${MWT.fmtText(a)}`).join("\n"), s = texts.length == 1 ? "" : "s"                   // .(50430.04.13).(50408.06.14)    
            pJSON_Results.Docs = `${texts.length} Source${s}, ${ `${aSources.length}`.padStart(0) } bytes from ${document}.`                     // .(50430.04.14)
       if (bPrtSources == 1 && aSources > '') {                                                            // .(50409.03.41 RAM Don't display if empty)
            usrMsg( `\n  Docs: \n${ MWT.wrap( aSources, nWdt, 2, 4 ) }`)                // .(50330.06a.6 RAM Add indent).(50331.01.3 RAM Was Texts).(50330.06.2 RAM Use Wrap)
            usrMsg(   `  Docs:       End of Sources`)                                   // .(50331.01.4)
        } else {
//          usrMsg(   `  Docs:      "${texts.length} Sources,${ `${aSources.length}`.padStart(6) } bytes from ${document}"`, shoMsg('Parms')   ) // .(50404.01.12).(50331b.01.5).(50331.01.5 RAM Add documents).(50430.04.15)
            usrMsg(   `  Docs:      "${pJSON_Results.Docs}"`                                                               , shoMsg('Parms')   ) // .(50430.04.16).(50404.01.12).(50331b.01.5).(50331.01.5 RAM Add documents)
            }
            usrMsg(   `  SysPrompt: "${ pParms.prompt.replace( /{Docs}/, "" ).replace( /{Query}\./, "" ) }"`               , shoMsg('Parms')   ) // .(50404.01.13)
//          usrMsg(   `  Query:     "${query}"`                                                                            , shoMsg('Parms')   ) //#.(50404.01.14).(50408.08.1)
//          usrMsg(   `  UsrPrompt: "{Query}: ${query}"` )  // aka aiPrompt, Model Query Prompt                            , shoMsg('Parms')   ) // .(50408.08.1 Was Query).(50404.01.14)
            usrMsg(   `  UsrPrompt: "${pParms.qpc}: ${query}"`                                                             , shoMsg('Parms')   ) // .(50410.04a.3).(50408.08.1 Was Query).(50404.01.14)
//          usrMsg(   `  Prompt:    "{Query}. {SysPrompt}, {Docs}"`                                                        , shoMsg('Parms')   ) //#.(50404.01.15)(50410.04a.4)
            usrMsg(   `  Prompt:    "{UsrPrompt}. {SysPrompt}, {Docs}"`                                                    , shoMsg('Parms')   ) // .(50410.04a.4).(50404.01.15)

            pParms.prompt    =  pParms.prompt.replace( /{Query}/, query )
            pParms.prompt    =  pParms.prompt.replace( /{Docs}/,  texts.join("\n\n" ))

            pJSON_Results.PromptTemplate = "{Query}. {SysPrompt}, {Docs}"
            pJSON_Results.Prompt         =  pParms.prompt
            pJSON_Results.Platform       =  pVars.PLATFORM
            pJSON_Results.SysPrompt      =  pParms.sysprompt // pVars.SYS_PROMPT                            // .(50413.03.x)

//          usrMsg( `\n  Running Model: ${          pParms.model}  (${aRunStr})`                                           , shoMsg('RunId')   ) //#.(50404.01.16).(50403.03.7)
            usrMsg( `\nOllama Response for Model: ${pParms.model}  (${aRunStr})`                                           , shoMsg('Results') ) // .(50404.01.16).(50403.03.7)
//          usrMsg(   "---------------------------------------------------------------------------------------------- "    , shoMsg('Results') ) //#.(50404.01.17).(50503.09.1)
            usrMsg(   `${ "--------".padEnd( nWdt, "-") }`                                                                 , shoMsg('Results') ) // .(50503.09.1).(50404.01.17)
    try {
        if (bDryRun == 0) {                                                                                 // .(50513.04.5 RAM Don't run model)
       var  stream           =  await  ollama.generate( pParms );                                           // .(50408.16.1 RAM Run the Model)
       var[ pStats, aResult ]=  await    MWT.fmtStream( stream );                                           // .(50408.16.2 RAM Capture the Results and Stats)
        } else {                                                                                            // .(50513.04.6)
       var[ pStats, aResult ]= [ [], '']                                                                    // .(50513.04.7)
            }                                                                                               // .(50513.04.8)
            pJSON_Results.Response       =  aResult                                                         // .(50408.06.14)

//      if (global.nLog   != 1) {                                                                           //#.(50510.01.3)
//      if (global.bNoLog != 1) {                                                                           // .(50510.01.3 RAM Opps, will it mattern)
        if (global.bNoLog == 1) {                                                                           // .(50510.01.3 RAM Opps, it does mattern)
                     aResult          =  MWT.wrap( MWT.sqzLines( aResult ), nWdt, 4 )                                // .(50503.02.x RAM Remove dup blank lines).(50330.06a.7).(50330.06.3)
            usrMsg( aResult                                                                                                , shoMsg('Results') ) // .(50404.01.18).(50330.06a.7).(50330.06.3)
            usrMsg(   `${ "--------".padEnd( nWdt, "-") }`                                                                 , shoMsg('Results') ) // .(50503.09.2) 
            }
            pStats.query     =  query                                                   // .(50331.03.4 Beg)
            pStats.url       =  document.replace( /collection, |file, /g, "").replace( /',*/g, "" )         // .(50430.03.9)
            pParms.websearch =  aWebSearch                                              // .(50330.04c.3 RAM Add)
            pStats.docs      = `${texts.length} Source${s}, ${aSources.length} bytes`                       // .(50430.04.17 RAM Add ${s})
            pParms.logfile   = `${FRT.__basedir}/${aLogFile}`                           // .(50331.05.6 RAM Add logfile)
            pParms.jsonfile  =  pParms.logfile.replace( /.txt/, '.json' )                                   // .(50408.06.15 RAM Use ...response.json)
            pParms.mdfile    =  pParms.logfile.replace( /.txt/, '.md'   )                                   // .(50408.10.3 RAM Use ...response.md)
            pParms.temp      =  nTemperature
            
            usrMsg( "\n----------------------------------------------------------------------------------------------"     , shoMsg('Stats')   ) // .(50404.01.19)
            usrMsg(             MWT.fmtStats(   pStats, pParms ).join("\n")                                                , shoMsg('Stats')   ) // .(50404.01.20)
            usrMsg( "\n---------------------------------------------------------------------------------------------- "    , shoMsg('Stats')   ) // .(50404.01.21)

            pParms.secs      = (pStats.total_duration / 1e9).toFixed(2)                                                                          // .(50414.01.14)
            pParms.tps       =  pStats.tokens_per_sec                                                                                            // .(50414.01.15)

            sayMsg( `A1201[ 700]  bNoLog: '${bNoLog}', pParms.model: '${pParms.model}', global.aPrtSections: '${global.aPrtSections}'`, -1)      // .(50414.01.14)
            usrMsg(   `\n    > Ran Model: ${           pParms.model} in ${pParms.secs} secs (${aRunStr})\n`                , shoMsg('RunId')   ) // .(50404.01.23).(50403.03.8)
//      if (global.bNoLog == 0) {                                                                                                                //#.(50414.01.16 RAM Do log it)
//     var  aRIDs         = pParms.runid.slice(0,11).replace( /_/, "  "), aPIDs = `${pParms.spc}  ${pParms.qpc}`                                 //#.(50414.01.16)
//          console.log( `${FRT.getDate(3,5)}.${FRT.getDate(13,7)}  ${aRIDs}  Finished ${pParms.model}  ${aPIDs}` )                              //#.(50414.01.16)
//          }                                                                                                                                    // .(50414.01.16)
  var [ pStats_JSON, mRec ]  =  MWT.savStats4Text( pStats, pParms, aStatsFmt )                              // .(50408.06.16 RAM Was: savStats).(50403.04.6 RAM Add aStatsFmt)

       var  bNotExists       =  FRT.checkFileSync( aStatsFile ).exists == false
        if (bNotExists) {       FRT.writeFile(     aStatsFile, `${mRec[0]}\n` ) }
                                FRT.appendFile(    aStatsFile, `${mRec[1]}\n` )           // .(50331.03.4 RAM Use it End)
       var  aJSON_Results    =  MWT.savStats4JSON( pStats_JSON,     pJSON_Results, pParms )                 // .(50408.06.17)
                                FRT.writeFile(     pParms.jsonfile, aJSON_Results )                         // .(50408.06.18)
//     var  aMD_Results      =  MWT.savStats4MD(   pStats_JSON,     pJSON_Results ) // , pParms )           // .(50408.10.4)
//                              FRT.writeFile(     pParms.mdfile,   aMD_Results   )                         // .(50408.10.5)
//                              process.env.JSON_RESPONSE = pParms.jsonfile                                                                      //#.(50501.03.1 RAM Pass JSON file name to parent script).(50501.03b.1)
                                FRT.setEnv('JSON_RESPONSE', pParms.jsonfile.replace(               /.+[\\\/]docs/, "./docs" ), FRT.__dirname, 1 ) // .(50501.03b.1).(50501.03.1 RAM Pass JSON file name to parent script)
//                              process.env.STATS_SHEET   = aStatsFile                                                                           //#.(50501.03.2).(50501.03b.2)
                                FRT.setEnv('STATS_SHEET',   aStatsFile.replace(/[\\\/]/g, "/").replace(/.+\/docs/, "./docs" ), FRT.__dirname, 0 ) // .(50501.03b.2 Don't skip).(50501.03.2)

//                              console.log( `This_App EnvDir: '${ FRT.__dirname }'` )
//                              console.log( `aResponseFile:   '${ pParms.jsonfile.replace( /.+[\\\/]docs/, "./docs" ) }'`)      

       var  aRunTestsFile    =  MWT.fixPath(   FRT.__dirname, "run-tests.txt" )                             // .(50507.08a.3 RAM Save TestIds Beg) 

       var  aRunTests = ""; if (FRT.checkFileSync( aRunTestsFile ).exists) {                            
            aRunTests        =  FRT.readFileSync(  aRunTestsFile )  }                                           
//          aRunTests        =                     aRunTests + `\n${ pParms.runid.replace( /,.+/, '' ) } `  //#.(50507.08b.5)
            aRunTests        =                     aRunTests + `\n${ pParms.resp_id }`                      // .(50507.08b.5)
                                FRT.writeFile(     aRunTestsFile,  aRunTests.replace( /^\n/, '' ) )         // .(50507.08a.3 End)    

        } catch( error ) {
//          console.error(        "Error in answerQuery:", error);                                          //#.(50404.08.5)
            sayMsg(`A1201[ 733]*** Error in answerQuery fetching Ollama model: ${pParms.model}.`, 1, 1 )    // .(50404.08.5)
//          sayMsg(`A1201[ 734]  ${error}:`.replace( /\n/, "\n    " ), 1 );                                 //#.(50404.08.6)
            sayMsg(`A1201[ 735]    Ollama ${error.name}: ${error.message}`, 1 );                            // .(50404.08.6)
            sayMsg(`${ error.stack.replace( /\n */g, "\n    - " ) }`, -1 );             // .(50415.01.6)
            FRT.exit_wCR(1)                                                                                 // .(50409.03.42)
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