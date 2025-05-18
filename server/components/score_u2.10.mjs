/*\
##=========+====================+================================================+
##RD        score               | Main Score Response Script
##RFILE    +====================+=======+===============+======+=================+
##FD    gradeResponse_v1.01.mjs |  13324| 4/30/25 23:33|   596| u2.06`50430.2333|
##FD    gradeResponse_v1.02.mjs |  10630| 5/01/25  9:00|   596| u2.06`50501.0900|
##FD   search-n-score_v2.06.mjs |  14665| 5/02/25  9:41|   596| u2.06`50502.0941|
##FD            score_v2.07.mjs |  10314| 5/03/25 17:57|   596| u2.06`50503.1757|
##FD            score_v2.08.mjs |  11817| 5/03/25 20:05|   596| u2.06`50503.2005|
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script scores or grades a model run.  It get the response from
#            the previous model run and submits a "grading" prompt an AI model
#            It was originally written by Bruce and Claude on 4/26/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
# async ion  main( ) {
# async ion  evaluateResponse( modelName, userPrompt, systemPrompt, response, scoringPrompt ) {
#       ion  getScores( evaluation ) { 
#       ion  parseArgs( ) {}
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50426.01   4/26/25 CAI  8:15a| Originally written 
#.(50503.03   5/03/25 RAM  8:45p| Add Version
#.(50503.04   5/03/25 RAM  9:15p| Write and use prt1stMsg 
#.(50503.05   5/03/25 RAM  9.15p| Add aApp with an 'a' to aDocsDir
#.(50505.03   5/05/25 RAM  9:35a| Fix reading RESPONSE_JSON file error
#.(50507.01   5/07/25 RAM  8:23a| New way to pass App arg
#.(50503.04b  5/08/25 RAM  9:25a| Add aOth_TestId to bNoLog Msg 
#.(50507.05   5/08/25 RAM  9:45a| Debug attempts to call search script
#.(50507.04   5/07/25 RAM  1:50p| Write isInVSCode and assign FRT.inVSCode
#.(50507.08a  5/08/25 RAM  2:10p| Save and use TestIds for delayed score runs 
#.(50507.08b  5/09/25 RAM 10:10a| Save and use RespIds for delayed score runs 
#.(50508.01   5/09/25 RAM 10:45a| Skip if SCORING != 1
#.(50510.01   5/10/25 RAM  8:45a| Display scores if no LOGGING
#.(50510.02   5/10/25 RAM  9:00a| Add ability to score rowNos
#.(50510.04   5/10/25 RAM 10:00a| Deal with missing scores
#.(50507.08d  5/11/25 RAM  9:30a| Start run-tests.txt MT
#.(50511.01   5/11/25 RAM 10:30a| Do "\n" after run for bNoLog
#.(50513.05   5/13/25 RAM  7:30p| Implement bEnvs debug msgs
#.(50514.07   5/14/25 RAM  7:45p| Bump version from u2.09 to u2.10
#.(50513.05b  5/15/25 RAM  9:15a| More bEnvs 
#
##PRGM     +====================+===============================================+
##ID S1201. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

// import   fs              from 'fs/promises';
   import   path            from 'path';
   import { fileURLToPath } from 'url';
// import { pathToFileURL } from 'url';                                                                     //#.(50507.05.3 RAM Attempt to run scearch script)
   
    const __filename         =  fileURLToPath( import.meta.url );
    const __dirname          =  path.dirname(__filename);               // components 

// --  ---  --------  =  --  =  ------------------------------------------------------  #

       var  aVer             = "u2.10"    // score_{aVer}.mjs                           // .(50514.07.4).(50503.03.1 RAM Add Version)
       var  bEnvs            =  process.env.ENVs || 0                                   // .(50513.05.10)

//          LIBs.MWT         =( ) => "../../._2/MWTs"                                                       // .(50405.06.6)
       var  LIBs             ={ MWT: () => "../../._2/MWTs" }                                               //#.(50405.06.6 RAM Error: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader.)
       var  FRT              =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50405.06.8 RAM Call function: LIBS.MOD())
       var  MWT              =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default            // .(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)

                                FRT.writeFileSync( MWT.fixPath( FRT.__dirname, 'run-tests.txt' ), '' )      // .(50507.08d.1 RAM Start MT)
       var  aAppPath         =  FRT.__dirname
       var  aAppDir          =       aAppPath.split( /[\\\/]/ ).slice(-1)[0]            
       var  aAppName         = 'a' + aAppDir.slice(1)                                   
       var  aApp             =  aAppDir.replace( /_.+/, "" )     
       var  aModel

      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()
      var   exit_wCR         =  FRT.exit_wCR
            global.bQuiet    =  0                                                       // .(50503.04.1 RAM Was 2, quieting sayMsg)
  
//          await import( './test.mjs' )
//          await import( './search_${aVer}.mjs' )
//          await import( `./search_${aVer}.mjs` )
//          process.exit()  

//          process.argv[3]  = "--app:s11"                                              //#.(50507.04.9 RAM For debugging) 
// -----------------------------------------------------------------------------------------------------------

//          main ( parseArgs() )                                                        // .(50501.01.3 RAM Run "directly" below)

// -----------------------------------------------------------------------------------------------------------

  async function  main( pArgs ) {  // score.mjs 

        if (process.env.SCORING != "1") {                                               // .(50508.01.1 RAM Skip if SCORING != 1 Beg)
            sayMsg( "AIT14[  95]  Skipping scoring run" )
            exit_wCR()
            process.exit()
            }                                                                           // .(50508.01.1 End)
       var{ bDebug, bDoit }  =  FRT.setVars()
            global.bQuiet    =  0                                                       // .(50503.04.1 RAM Was 2, quieting sayMsg)
            global.bNoLog    = (process.env.LOGGING || '').match( /log/ ) == null                           // .(50510.01.1)
            sayMsg( `S1401[ 102]  APP: '${aApp}', bDoit: '${bDoit}, bDebug: '${bDebug}', DRYRUN: '${process.env.DRYRUN}', SCORING: '${process.env.SCORING}', PC_CODE: '${process.env.PC_CODE}', aLog: '${"   "}', bNoLog: '${global.bNoLog ? 1 : 0}'`, bEnvs ); // .(50513.05.11) // process.exit() 

       var  pArgs            =  parseArgs()
            aModel           =  pArgs.modelName || 'gemma2:2b'
       var  aOth_App         =  pArgs.app       || 's13'                                                    // .(50503.05.x Get Oth_App .env Beg)
       var  aOth_App2        = `a${pArgs.app.slice(1)}`                                                     // .(50510.02.1)
//     var  mTestIds         = (pArgs.testIds   || 't041').split( /[ ,]/ )                                  //#.(50507.08a.1) 
       var  mRowNos          = (pArgs.rowNos    || '').split( /[ ,]/ )                                      // .(50510.02.2) 

       var  aModDir          = (aOth_App.slice(0,1) == "c" ? 'client' : 'server') + aOth_App.slice(1,2).replace( /0/, '' ) 
       var  aOth_AppDir      =  FRT.firstFile( `${FRT.__basedir}/${aModDir}`, `${aOth_App}_*` )  // .(50503.04.2 RAM Find first .env file for aOth_App)
       var  pOth_AppVars     =  FRT.getEnvVars( MWT.fixPath( `${FRT.__basedir}/${aModDir}`, aOth_AppDir ) )    

//     var  aResponseFile    =  pOth_AppVars.JSON_RESPONSE
       var  aStatsSheetFile  =  pOth_AppVars.STATS_SHEET                                                    // .(50503.05.x End)
//          aResponseFile    =  aResponseFile    || './docs/a13_search-rag-app/25.05.May/a13g_t041_qwen2;0.5b_1,1-test on rm228p/s13g_t041.01.4.50503.2109_Response.json'
            aStatsSheetFile  =  aStatsSheetFile  || `./docs/a13_search-rag-app/a13-saved-stats/a13_Stats-rm228p_${aVer}.csv`  // .(50503.03.2)
        if (FRT.checkFileSync( MWT.fixPath( FRT.__basedir, aStatsSheetFile) ).exists == false) {
       var  mStatsSheet      =  [] 
        } else {
       var  mStatsSheet      =  FRT.readFileSync( MWT.fixPath( FRT.__basedir, aStatsSheetFile ) ).split( '\n' ) 
            }
        if (mRowNos.length && mRowNos[1]) { var  nRow, mResponseFiles = []                                  // .(50510.02.3 RAM Use Row no and nRows of mRowNos Beg)
       var  nRow1            =  mRowNos[0].replace( /^r/, '' ) - 1, nRow2 = nRow1 + (mRowNos[1] - 1)   
       for (nRow = nRow1; nRow <= nRow2; nRow++) {
              var  mStatRow  =  mStatsSheet[ nRow ].split( '\t' )
                                mResponseFiles.push( mStatRow[26].trim() ) }
        } else {                                                                                            // .(50510.02.3 RAM Use aRunTestsFile End)
        if (mRowNos.length && mRowNos[0]) {                                                                 // .(50510.02.4 RAM Use just Row no of mRowNos Beg)
       var  aTestFile        =  `${aOth_App2}_Tests_${mRowNos[0]}`, aDir1 = `${aOth_App2}-saved-stats`
       var  aTestsDir        =  MWT.fixPath( FRT.__basedir, `./docs/a${aOth_AppDir.slice(1)}/${aDir1}/`)    // .(50510.02.5 RAM Use saved TestIds file in Stats dir) 
       var  aRunTestsFile    = (await MWT.get1stFile( aTestFile, aTestsDir, ".txt"))                        
       } else {
       var  aRunTestsFile    =  MWT.fixPath( `${FRT.__basedir}/${aModDir}/${aOth_AppDir}`, "run-tests.txt") // .(50507.08a.1 RAM Use save TestIds file in App dir) 
            }                                                                                               // .(50510.02.4 End)      
      var   mRespIds = [];  if (FRT.checkFileSync( aRunTestsFile ).isFile) {                            
            mRespIds         =  FRT.readFileSync(  aRunTestsFile ).trim().split( '\n' )  }                                           
                                FRT.sayMsg( `AIT14[ 130]  Looking for these RunIds, '${ mRespIds.join( ', ') }'.`, -1 )
//     var  mResponseFiles   =  mStatsSheet.filter( findTestIds )                                           //#.(50507.08b.1 RAM Don't use findTestIds)
//          mResponseFiles   =  mResponseFiles.map( aRow => aRow.split('\t')[26].replace(/\.txt/, '.json')) //#.(50507.08b.1)
       var  mResponseFiles   =  findRespIds( mStatsSheet, mRespIds )                                        // .(50507.08b.1 RAM Do Use findRespIds)
            } // eif nRowNos                                                                                // .(50510.02.3 End) 

        if (mResponseFiles.length == 0 && bEnvs != 1) {                                 // .(50513.05.12)
            usrMsg( `\n* Opps, can't find any test runs in, '${ path.basename( aStatsSheetFile) }', for the last model run` )
            usrMsg(   `        in order to score these RunIds, '${ mRespIds.join( ', ') }'.` )
            exit_wCR() 
        } else { var  s      =  mResponseFiles.length == 1 ? '' : 's'  
                                FRT.sayMsg( `AIT14[ 141]  Found ${mResponseFiles.length} statsheet row${s}.`, -1 )
            }                                                                                               // .(50507.08a.1 End)
//          --------------------------------------------------------------

//                                               mResponseFiles.forEach( await scoreTest )                  // .(50507.03.x RAM No workie)
              var i=0; for (var aResponseFile of mResponseFiles) { await scoreTest( aStatsSheetFile, aResponseFile, i++ ) }

            } // eof main 
// ---------------------------------------------------------------------------

async  function  scoreTest( aStatsSheetFile, aResponseFile, i ) {
//          console.log( `  ${i}: '${aResponseFile}'`); return 
//          console.log( `Looking for: '${ FRT.__basedir}/${aModDir}', '${aOth_App}_*'` )
//     var  aResponseFile    =  pOth_AppVars.JSON_RESPONSE
//     var  aStatsSheetFile  =  pOth_AppVars.STATS_SHEET                                                    // .(50503.05.x End)
//          aResponseFile    =  aResponseFile    || './docs/a13_search-rag-app/25.05.May/a13g_t041_qwen2;0.5b_1,1-test on rm228p/s13g_t041.01.4.50503.2109_Response.json'
//          aStatsSheetFile  =  aStatsSheetFile  || `./docs/a13_search-rag-app/a13-saved-stats/a13_Stats-rm228p_${aVer}.csv`  // .(50503.03.2)

//          console.log( `aOth_App EnvDir: '${ aOth_AppDir }'` )
//          console.log( `  FRT.__basedir: '${ FRT.__basedir }'` )
//          console.log( `1 aResponseFile: '${ MWT.fixPath( FRT.__basedir, aResponseFile )  }'` )
//          console.log( `aStatsSheetFile: '${ aStatsSheetFile }'` )
     try {
        if (!aResponseFile) { 
            usrMsg( "\n* Opps, can't find JSON Response.json files for last model run" )
            exit_wCR() 
        } else {
       var  pJSON_Response   =  FRT.readFileSync( MWT.fixPath( FRT.__basedir, aResponseFile ) ) 
            pJSON_Response   =  JSON.parse( pJSON_Response )
       var  pPrompts         =  pJSON_Response.ModelQuery.CompinedPrompt
       var  aSysPrompt       =  pPrompts.SysPrompt.replace( /[ "\r\n]+$/, "");
//     var  aUsrPrompt       =  pPrompt.UsrPrompt.replace( /[ "\r\n]+$/, "");
       var  aUsrPrompt       =  pPrompts.Prompt.replace( /[ "\r\n]+$/, "").replace( aSysPrompt, ' -- ');
       var  aResponse        =  pJSON_Response.ModelQuery.Response.replace( /[ "\r\n]+$/, "");
            }

       var  pVars            =  FRT.getEnvVars( FRT.__dirname )    
       var  aTestId          =  pVars.SESSION_ID                                        // .(50503.04.3 RAM Current s14 TestId)
            prt1stMsg( aApp, aTestId, pJSON_Response.RunId.trim() )                     // .(50503.04b.2).(50503.04.4 RAM Use prt1stMsg)

//     var  aSysPrompt       =  FRT.readFileSync( './s14_system-prompts.txt' ).slice(32).replace( /[ "\r\n]+$/, "");;
//     var  aUsrPrompt       =  FRT.readFileSync( './s14_user-prompts.txt'   ).slice( 6).replace( /[ "\r\n]+$/, "");
//     var  aResponse        =  FRT.readFileSync( './s14_response.txt'       );
       var  aScoringPrompt   =  FRT.readFileSync( './s14_scoring-prompt-template.txt' )
       
           // Evaluate response
      var { content: aEvaluation, pMetrics } = await evaluateResponse( aModel, aUsrPrompt, aSysPrompt, aResponse, aScoringPrompt );
       
       var  pScores = getScores( aEvaluation );
//    var { scores, totalScore, scoreCount, formattedEvaluation } = getScores( aEvaluation );

       var  pStats           =  pJSON_Response.ModelQuery.RunStats
       var  mNotFound        =  []                                                      // .(50510.04.1 Beg)
//          pStats.Accuracy  =  pScores.scores[0].score || 0                            //#.(50510.04.1 RAM They might not have been found)
//          pStats.Quality   =  pScores.scores[1].score || 0                            //#.(50510.04.1 RAM First attempt to deal with missing scores)
//          pStats.Relevance =  pScores.scores[2].score || 0      
//          pStats.Overall   =  pScores.scores[3].score || 0      
            pStats.Accuracy  =  getScore( 'Accuracy'    )                               // .(50510.04.2 RAM Position in pScores.scores array wasn't cutting it)
            pStats.Quality   =  getScore( 'Quality'     )                  
        if(!pStats.Quality)  {  pStats.Quality = getScore( 'Coherence'   ) }            // .(50510.04.3 RAM ??) 
            pStats.Relevance =  getScore( 'Relevance'   )                  
            pStats.Overall   =  getScore( 'Total Score' )                  
        if(!pStats.Overall)  {  pStats.Overall = getScore( 'TotalScore' ) }             // .(50510.04.4 RAM ??) 

                                mNotFound = []                                          // .(50510.04.5 RAM Override those found in getScore)
        if (!pStats.Accuracy ){ mNotFound.push( "Accuracy"  ) }            
        if (!pStats.Quality  ){ mNotFound.push( "Quality"   ) }            
        if (!pStats.Relevance){ mNotFound.push( "Relevance" ) }                         // .(50510.04.1 End)

//      if (mNotFound.length > 0) {                                                     //#.(50510.04.6 Beg)
//          usrMsg(            `* These scores were not found: ${ mNotFound.join( ", " ) }.` )
//          sayMsg( `AIT14[ 203]* These scores were not found: ${ mNotFound.join( ", " ) }.` )
//          }                                                                           //#.(50510.04.6 End)
            pJSON_Response.ModelQuery.Evaluation = pScores.formattedEvaluation
//          console.log(     `3 aResponseFile: '${ MWT.fixPath( FRT.__basedir, aResponseFile )  }'` )

                                FRT.writeFileSync( MWT.fixPath( FRT.__basedir, aResponseFile ), JSON.stringify( pJSON_Response, null, 2 ) )

       var  aSheetVer        =  aStatsSheetFile.replace( /.+_u/,'').replace( /\.csv/, '')                    // .(50507.10.1 RAM Big error. Was aVer)
       var  aTestId          =  path.basename( aResponseFile).match( /(s.+?\.[0-9s]{2,3})\./ )[1]
       var  mSpreadsheet     =  FRT.readFileSync(  MWT.fixPath( FRT.__basedir, aStatsSheetFile ) ).split( "\n") 

        if (aSheetVer == "2.08" || aSheetVer == "2.09" || aSheetVer == "2.10" ) {       // .(50514.07.5).(50507.10.1 RAM Big error)
       var  aRow             =  mSpreadsheet.filter( aRow => aRow.split( "\t" )[0].trim() == aTestId )      // .(50503.03.3 RAM Add trim)
        if (aRow.length > 0) {
            aRow             =    aRow.splice(-1)[0]                                    // .(50503.03.4 RAM get the last one)
       var  mCols            =    aRow.split( "\t" )
            mCols[7]         = `${pStats.Accuracy }`.padStart(3)
            mCols[8]         = `${pStats.Quality  }`.padStart(3)
            mCols[9]         = `${pStats.Relevance}`.padStart(3)
       var  aScore           = `with these scores of ${mCols[7].trim()}, ${mCols[8].trim()}, ${mCols[9].trim()}` 
            mSpreadsheet[ mSpreadsheet.indexOf( aRow ) ] = mCols.join( "\t" )           // .(50503.03.5)
        } else {
            usrMsg  ( `\n* Opps, can't find a TestId, ${aTestId}, in spreadsheet file, '${path.basename( aStatsSheetFile )}'` )
            exit_wCR()
            }
        } // eif (aVer == "2.08")
            FRT.writeFileSync(    MWT.fixPath( FRT.__basedir, aStatsSheetFile ), mSpreadsheet.join( "\n" ) )

//      if (global.bNoLog == 0) {                                                                           //#.(50510.01b.1 RAM Always display scores).(50510.01.2 RAM Display scores Beg)
        if (bEnvs != 1) {                                                                                   // .(50513.05b.3 RAM If not bEnvs)
        if (global.bNoLog == 1) {                                                                           // .(50510.01b.2)
            usrMsg( "" ) }                                                                                  // .(50510.01b.3 RAM But add a blank line if bNoLog)
       var  aRIDs = aTestId.split("_"); aRIDs = `${aRIDs[0].padEnd(4)} ${aRIDs[1]}`
            usrMsg(            `${FRT.getDate(3,5)}.${FRT.getDate(13,7)}  ${aRIDs}  Finished ${aScore}\n`)  // .(50511.01.1 RAM Do "\n" after run)  
            }                                                                                               // .(50510.01b.4).(50510.01.2 End)
        } catch (error) { 
            console.error('\n* Error:', error);
            process.exit(1);
            }
            
        if (mNotFound.length > 0 && bEnvs != 1) {                                                           // .(50513.05b.4).(50510.04.6 Beg)
            usrMsg(            `* These scores were not found: ${ mNotFound.join( ", " ) }.` )
            sayMsg( `AIT14[ 262]* These scores were not found: ${ mNotFound.join( ", " ) }.` )
            }                                                                           // .(50510.04.6 End)

  function  getScore( aCriteria ) {                                                     // .(50510.04.7 RAM Write getScore Beg)
       var  mScore =  pScores.scores.filter( pScore => pScore.criteria == aCriteria )
       var  nScore =  mScore && mScore[0] && mScore[0].score || 0 
       if (!nScore) { mNotFound.push( aCriteria ) }
    return  nScore
            }                                                                           // .(50510.04.7 End)
        } // eof scoreTest
// -----------------------------------------------------------------------------------------------------------

// Function to evaluate response using Ollama
async function  evaluateResponse( modelName, userPrompt, systemPrompt, response, scoringPrompt ) {
//   const  evaluationPrompt   = `` 
       var  evaluationPrompt   =  scoringPrompt.replace(  /{SystemPrompt}/, systemPrompt )
            evaluationPrompt   =  evaluationPrompt.replace( /{UserPrompt}/, userPrompt )
            evaluationPrompt   =  evaluationPrompt.replace(   /{Response}/, response )
       var  aScoringPromptFile = `${aApp}_scoring-prompt.txt`
            FRT.writeFileSync( `${FRT.__dirname}/${aScoringPromptFile}`, evaluationPrompt )

            FRT.sayMsg( 'AIT14[ 268]  Setting .Env variables', -1 )
            FRT.setEnv( "FILES_PATH",        ".",                FRT.__dirname )
            FRT.setEnv( "FILES_NAME",        aScoringPromptFile, FRT.__dirname )
            FRT.setEnv( "OLLAMA_MODEL_NAME", modelName,          FRT.__dirname )
  try {
/*     var  pParms        = 
           {  model     :  modelName
           ,  messages  : [ { role: 'user', content: evaluationPrompt } ]
              }
    var  ollama         = (await import( 'ollama' )).default
    var  pResult        =  await ollama.chat( pParms );
    var  aResponse      =  pResult.message.content
    var  pMetrics       =  pResult.metrics
*/  
//       process.env.Debug = 1
//       await import( `./search_${aVer}.mjs` )                                                             //#.(50503.03.6).(50507.05.3)
                                                                                                            //#.(50507.05.3 RAM None of this was the problem Beg)
//  var  aSearchScript  =  MWT.fixPath( FRT.__dirname.replace( /s14.*/, `components/search_${aVer}.mjs` ) ) //#.(50507.05.3 RAM Can't be a windows path)
//  var  aSearchScript  = `../components/search_${aVer}.mjs`                                                
//  var  aSearchScript  =  aSearchScript.replace( /[\\\/]/g, '/' )                                          
//  var  aSearchScript  =  fileURLToPath( aSearchScript )                                                   
//  var  aSearchScript  =  path.resolve('E:', 'Repos', 'Robin', 'AIDocs_', 'test1-robin', 'server1', 'components', 'search_u2.09.mjs');  
//  var  aSearchScript  =  pathToFileURL(aSearchScript).href;
    try {                                                                                                   // .(50507.05.3 RAM Debug attempts to call search script Beg)
    var  aCacheBuster   =  Date.now();    
    var  aSearchScript  = `./search_${aVer}.mjs?cache=${aCacheBuster}`                                     // .(50507.05.4 RAM Add Cache Buster)
                           FRT.sayMsg( `AIT14[ 294]  Attempting to load script: ${aSearchScript}\n`, -1 );
//       const module = await import(aSearchScript);
                           process.env.OLLAMA_MODEL_NAME = aModel
                           await import( aSearchScript );
//                         await import( './test.mjs' )
//                         await import( './search_${aVer}.mjs' )
//                         await import( './search_u2.09.mjs' )
                           FRT.sayMsg( `AIT14[ 300]  Load of search script successful!`, -1 );
     } catch( error ) {    FRT.sayMsg( `AIT14[ 301]  Load of search script failed error:\n                 ${error}`, -1);
         }                                                                                                  // .(50507.05.3 End)
               
//       process.env.JSON_RESPONSE = "/E:/Repos/Robin/AIDocs_/dev01-robin/docs/a14_grading-app/25.05.May/_t001_gemma2;2b'_1,1-test on rm228p/a14_t001.13.4.50502.0905_Response.json"
//                                     E:\Repos\Robin\AIDocs_\dev01-robin\docs\a14_grading-app\25.05.May\_t001_gemma2;2b_1,1-test on rm228p\a14_t001.13.4.50502.0905_Response.json

    var  pJSON_Response =  JSON.parse( FRT.readFileSync( MWT.fixPath( FRT.__basedir, process.env.JSON_RESPONSE ) ) ) // .(50505.03.1 RAM Add __basedir)
    var  aResponse      =  pJSON_Response.ModelQuery.Response
    var  pMetrics       =  pJSON_Response.ModelQuery.RunStats

//  return { content: pResult.message.content, metrics: pResult };
    return { content: aResponse, metrics: pMetrics };

     } catch (error) {     FRT.sayMsg( `AIT14[ 330]  Error evaluating response with Ollama:\n                 ${error.message}`, -1 );
         throw new Error( 'Error' );
         }
} // eof evaluateResponse
// ------------------------------------------------------------------------------

function getScores( evaluation ) {    
      // Parse and reformat scores
//  var  scoreRegex = /\*\*(\w+\s*\w*)\*\*: (\d+)(?:\s*\/\s*10)?/g;                     //#.(50510.04.8)
    var  scoreRegex = /\*\*(\w+\s*\w*)\*\*:\s*(\d+)(?:\s*\/\s*\d+)?/g;                  // .(50510.04.8 CAI new RegExp to match 10/10)
    let  totalScore = 0;
    let  scoreCount = 0;
    let  formattedEvaluation = evaluation;
  const  scores = [];
  
    let  match;                                             // Collect scores and reformat
 while ((match = scoreRegex.exec(evaluation)) !== null) {
        FRT.sayMsg( `AIT14[ 347]  getScores found: ${match}`, -1 )
     if (match[1] !== 'Total Score') {                       // Skip "Total Score" during the regex collection phase
    var  score = parseInt(match[2], 10);
         totalScore += score;
         scoreCount++;
         scores.push({ criteria: match[1], score });

     //  Create a new regex pattern for each match to avoid double "/10"
    var  fullPattern   =  new RegExp(`\\*\\*${match[1]}\\*\\*: ${match[2]}(?:\\s*\\/\\s*10)?`, 'g');
         formattedEvaluation =  formattedEvaluation.replace( fullPattern, `**${match[1]}**: ${score}/10` );
         }
      } // eol Collect scores and reformat

//  var  pTotalScore = { criteria: "TotalSCore", score: totalScore }
         scores.push(  { criteria: "TotalSCore", score: totalScore } )
// return { scores: ...scores, totalScore, scoreCount, formattedEvaluation }; 
// return { scores: { ...scores, totalScore: totalScore }, scoreCount, formattedEvaluation }; 
// return { scores: { ...scores, ...{ criteria: "TotalSCore", score: totalScore } }, scoreCount, formattedEvaluation }; 
// return { scores: { ...scores, pTotalScore }, scoreCount, formattedEvaluation }; 
return { scores, totalScore, scoreCount, formattedEvaluation }; 

         } // eol getScores
// ---------------------------------------------------------------------
  function  findTestIds( aStatRow, i ) {                                                                    // .(50507.08a.2 RAM Write findTestIds Beg) 
       var  aStatRunId       =  aStatRow.split( '\t' )[0].trim()
       var  nStatRow         =  mTestIds.findIndex( aTestId => aStatRunId.match( aTestId ) )         
       var  aFound           = (nStatRow == -1) ? "Not Found" : `Found in mTestIds index, ${ nStatRow }`                      
//                              FRT.sayMsg( `AIT14[ 113]  Looking for RunId, '${aStatRunId}, in row ${i}': ${aFound}`, 1 )
//      if (nStatRow > -1) { debugger }
   return  nStatRow > -1    // aTestId found if findIndex returns valid row number 
            }                                                                                               // .(50507.08a.2 End) 
//          --------------------------------------------------------------

  function  findRespIds( mStatsRows, mRespIds ) {                                                           // .(50507.08b.2 RAM Write findRespIds Beg) 
            mStatsRows       =  mStatsRows.sort( (a,b) => {                                                 // .(50507.08b.3 RAM Sort in reverse chron order)
                                  return a.slice( 98, 114) > b.slice( 98, 114) ? -1 : 1 } )     
       var  mFoundFiles      = []
            mRespIds.forEach(   findRespId ) 
  function  findRespId( aRespId, i ) { var nRow = -1, aStatRow
//          mStatsRows.forEach( (aStatRow, i) => { 
      for  (aStatRow of mStatsRows) { nRow++
        if (aStatRow) {
       var  mStatRow         =  aStatRow.split( '\t' )
       var  aStatTestId      =  mStatRow[0].trim()
//     var  aStatTS          =  mStatRow[10].trim()                                                         //#.(50507.08b.4 RAM May not be the same as ResponseFile TS)
       var  aResponseFile    =  mStatRow[26].trim()
//     var  aStatTesdId      =  aStatRespId.slice(0,6)
//    if (`${aStatTestId}.4.${FRT.getDate( aStatTS )}` == aRespId) { ... }                                  //#.(50507.08b.4 RAM Dob't use aStatTS)
       var  aStatRespId      =  aResponseFile.match( `${aStatTestId}[.0-9]+` );                             // .(50507.08b.4 RAM Extract aStatRestId to match. May fail)
            aStatRespId      =  aStatRespId ? aStatRespId[0] : ''                       
        if (aStatRespId == aRespId) { 
            FRT.sayMsg( `AIT14[ 398]  Found ${nRow}: ${ path.basename( aResponseFile ) }.`, -1 )
            mFoundFiles.push(   aResponseFile.replace( /\.txt$/, '.json' ) )
            break 
            }               
        } } } // eof findTestId
    return  mFoundFiles             
            } // eof findRespIds                                                                            // .(50507.08b.2 End) 
//          --------------------------------------------------------------

  function  parseArgs() {
     const  args = 
              {  modelName         :  null
//            ,  showJustification :  true                                                                                       // .(50507.01.1)
                 };
       for (let i = 2; i < process.argv.length; i++) {
//                 console.log( i, process.argv[i] )
               if (process.argv[i].slice(0,6) === '--app:'            ) { args.app               =  process.argv[i].slice(6)
        } else if (process.argv[i].match( /[acs][0-9][0-9]/          )) { args.app               =  process.argv[i].slice(0,3);  // .(50507.01.2)
        } else if (process.argv[i].match( /^t[0-9]{3}(,t[0-9]{3})*$/ )) { args.testIds           =  process.argv[i];             // .(50507.01.3)
        } else if (process.argv[i].match( /^r[0-9]/ )) {                  args.rowNos            =  process.argv[i];             // .(50510.02.6)
        } else if (process.argv[i] === '--no-justification'           ) { args.showJustification =  false;
        } else if (!args.modelName) {                                     args.modelName         =  process.argv[i];
            }
         }
    return  args;
        }  // eof parseArgs 
// ------------------------------------------------------------------------------

  function  prt1stMsg( aApp, aTestId, aOthTestId ) {                                    // .(50503.04b.2).(50503.04.5 RAM Write prt1stMsg Beg)
       var  aLog    =  process.env.LOGGER || ""                                
            aLog    =  aLog == "log,inputs" ? "log" : aLog                     
       var  bNoLog  = (aLog == "log" || aLog == "" ) ? 0 : 1; global.bNoLog = bNoLog                               
       //      if (bNoLog) {
//          usrMsg( `\n${FRT.TS}  ${aApp}           Running test: ${aTestId}` )
//      } else {
//          usrMsg( `\n  Running test, '${aTestId}', for app ${aApp}.` )
//          }
//      if (bNoLog == 0) {                                                                                  //#.(50510.01b.4).(50515.01.3)
//          usrMsg( "" ) }                                                                                  //#.(50510.01b.5 RAM But add a blank line if bNoLog).(50515.01.2)
//      if (bNoLog == 0 && process.env.SECTIONS != 'none') {                                                //#.(50515.01.3).(50513.05b.5)
        if (bNoLog == 0 && bEnvs != 1) {                                                                    // .(50513.05b.5)
            usrMsg( "" )                                                                                    // .(50510.01b.5 RAM But add a blank line if bNoLog)
        var aTS = `${FRT.getDate(3,5)}.${FRT.getDate(3,7).slice(-2)}`
        var forOthTestId = aOthTestId ? ` for ${aOthTestId}` : '' 
            usrMsg( `${aTS}  ${aApp}  ${aTestId}     Running ${path.basename( __filename)}${forOthTestId}`) // .(50511.01.2 RAM not before)                      
            usrMsg( "" )                                                                                    // .(50510.01b.5 RAM But add a blank line if bNoLog)
            } // eif show log   
        } // prt1stMsg                                                                  // .(50503.04.5 End)
// ------------------------------------------------------------------------------

// If this file is being run directly (not imported)
// if (import.meta.url === `file://${process.argv[1]}`) {
    var aPath = fileURLToPath( import.meta.url )  // now 'E:\\Repos\\Robin\\AIDocs_\\test1-robin\\server1\\components\\score_u2.08.mjs'
    var aFile = process.argv[1]                   // now 'E:\\Repos\\Robin\\AIDocs_\\test1-robin\\server1\\s14_grading-app\\run-tests.mjs'
//  var aFile = `file:///${aFile.replace( /[\\\/]/g, "/")}`)
    
//if (fileURLToPath( import.meta.url) === process.argv[1]) {
   if (aPath === aFile) {     
          process.argv[2] = process.argv[2] || 'gemma2:2b';
          process.argv[3] = process.argv[3] || '--no-justification';
  await main()
         .catch( error => { console.error('Unhandled exception:', error);
          process.exit(1);
          } );
   }
// ------------------------------------------------------------------------------

//  Export the main function
    export default main;
