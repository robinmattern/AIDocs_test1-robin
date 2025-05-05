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
#
##PRGM     +====================+===============================================+
##ID S1201. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

// import   fs              from 'fs/promises';
   import   path            from 'path';
   import { fileURLToPath } from 'url';

    const __filename         =  fileURLToPath(import.meta.url);
    const __dirname          =  path.dirname(__filename);

// --  ---  --------  =  --  =  ------------------------------------------------------  #
       var  aVer             = "u2.08"                                                  // .(50503.03.1 RAM Add Version)

//          LIBs.MWT         =( ) => "../../._2/MWTs"                                                       // .(50405.06.6)
       var  LIBs             ={ MWT: () => "../../._2/MWTs" }                                               //#.(50405.06.6 RAM Error: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader.)
       var  FRT              =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50405.06.8 RAM Call function: LIBS.MOD())
       var  MWT              =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default            // .(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)

       var  aAppPath         =  FRT.__dirname
       var  aAppDir          =       aAppPath.split( /[\\\/]/ ).slice(-1)[0]            
       var  aAppName         = 'a' + aAppDir.slice(1)                                   
       var  aApp             =  aAppDir.replace( /_.+/, "" )     

      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()
      var   exit_wCR         =  FRT.exit_wCR
            global.bQuiet    =  0                                                       // .(50503.04.1 RAM Was 2, quieting sayMsg)
   
// -----------------------------------------------------------------------------------------------------------

//          main ( parseArgs() )                                                        // .(50501.01.3 RAM Run "directly" below)

// -----------------------------------------------------------------------------------------------------------

  async function  main( pArgs ) {

       var  pArgs            =  parseArgs()
       var  aModel           =  pArgs.modelName || 'gemma2:2b'
       var  aOth_App         =  pArgs.app       || 's13'                                                    // .(50503.05.x Get Oth_App .env Beg)

       var  aModDir          = (aOth_App.slice(0,1) == "c" ? 'client' : 'server') + aOth_App.slice(1,2).replace( /0/, '' ) 
//          console.log( `Looking for: '${ FRT.__basedir}/${aModDir}', '${aOth_App}_*'` )
       var  aOth_AppDir      =  FRT.firstFile( `${FRT.__basedir}/${aModDir}`, `${aOth_App}_*` )  // .(50503.04.2 RAM Find first .env file for aOth_App)
       var  pOth_AppVars     =  FRT.getEnvVars( MWT.fixPath( `${FRT.__basedir}/${aModDir}`, aOth_AppDir ) )    
       var  aResponseFile    =  pOth_AppVars.JSON_RESPONSE
       var  aStatsSheetFile  =  pOth_AppVars.STATS_SHEET                                                    // .(50503.05.x End)
            aResponseFile    =  aResponseFile    || './docs/a13_search-rag-app/25.05.May/a13g_t041_qwen2;0.5b_1,1-test on rm228p/s13g_t041.01.4.50503.2109_Response.json'
            aStatsSheetFile  =  aStatsSheetFile  || `./docs/a13_search-rag-app/a13-saved-stats/a13_Stats-rm228p_${aVer}.csv`  // .(50503.03.2)

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
            prt1stMsg( aApp, aTestId )                                                  // .(50503.04.4 RAM Use prt1stMsg)

//     var  aSysPrompt       =  FRT.readFileSync( './s14_system-prompts.txt' ).slice(32).replace( /[ "\r\n]+$/, "");;
//     var  aUsrPrompt       =  FRT.readFileSync( './s14_user-prompts.txt'   ).slice( 6).replace( /[ "\r\n]+$/, "");
//     var  aResponse        =  FRT.readFileSync( './s14_response.txt'       );
       var  aScoringPrompt   =  FRT.readFileSync( './s14_scoring-prompt-template.txt' )
       
           // Evaluate response
      var { content: aEvaluation, pMetrics } = await evaluateResponse( aModel, aUsrPrompt, aSysPrompt, aResponse, aScoringPrompt );
       
       var  pScores = getScores( aEvaluation );
//    var { scores, totalScore, scoreCount, formattedEvaluation } = getScores( aEvaluation );

       var  pStats           =  pJSON_Response.ModelQuery.RunStats
            pStats.Accuracy  =  pScores.scores[0].score
            pStats.Quality   =  pScores.scores[1].score
            pStats.Relevance =  pScores.scores[2].score
            pStats.Overall   =  pScores.scores[3].score
            pJSON_Response.ModelQuery.Evaluation = pScores.formattedEvaluation
//          console.log(     `3 aResponseFile: '${ MWT.fixPath( FRT.__basedir, aResponseFile )  }'` )

                                FRT.writeFileSync( MWT.fixPath( FRT.__basedir, aResponseFile ), JSON.stringify( pJSON_Response, null, 2 ) )

            aVer             =  aStatsSheetFile.replace( /.+_u/,'').replace( /\.csv/, '')
       var  aTestId          =  path.basename(aResponseFile).match( /(s.+?\.[0-9s]{2,3})\./ )[1]
       var  mSpreadsheet     =  FRT.readFileSync(  MWT.fixPath( FRT.__basedir, aStatsSheetFile ) ).split( "\n") 
        if (aVer == "2.08") {
       var  aRow             =  mSpreadsheet.filter( aRow => aRow.split( "\t" )[0].trim() == aTestId )   // .(50503.03.3 RAM Add trim)
        if (aRow.length > 0) {
            aRow             =  aRow.splice(-1)[0]                                      // .(50503.03.4 RAM get the last one)
       var  mCols            =  aRow.split( "\t" )
            mCols[7]         = `${pStats.Accuracy}`.padStart(3)
            mCols[8]         = `${pStats.Quality}`.padStart(3)
            mCols[9]         = `${pStats.Relevance}`.padStart(3)
            mSpreadsheet[ mSpreadsheet.indexOf( aRow ) ] = mCols.join( "\t" )           // .(50503.03.5)
        } else {
            usrMsg  ( `\n* Opps, can't find a TestId, ${aTestId}, in spreadsheet file, '${path.basename( aStatsSheetFile )}'` )
            exit_wCR()
            }
        } // eif (aVer == "2.08")
        FRT.writeFileSync( MWT.fixPath( FRT.__basedir, aStatsSheetFile ), mSpreadsheet.join( "\n" ) )

        } catch (error) { 
            console.error('\n* Error:', error);
            process.exit(1);
            }
        } // eof main
// -----------------------------------------------------------------------------------------------------------

// Function to evaluate response using Ollama
async function  evaluateResponse( modelName, userPrompt, systemPrompt, response, scoringPrompt ) {
//   const  evaluationPrompt = `` 
       var  evaluationPrompt =  scoringPrompt.replace(  /{SystemPrompt}/, systemPrompt )
            evaluationPrompt =  evaluationPrompt.replace( /{UserPrompt}/, userPrompt )
            evaluationPrompt =  evaluationPrompt.replace(   /{Response}/, response )
       var  aScoringPromptFile = `${aApp}_scoring-prompt.txt`
            FRT.writeFileSync( `${FRT.__dirname}/${aScoringPromptFile}`, evaluationPrompt )

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
         await import( `./search_${aVer}.mjs` )                                         // .(50503.03.6)

//       process.env.JSON_RESPONSE = "/E:/Repos/Robin/AIDocs_/dev01-robin/docs/a14_grading-app/25.05.May/_t001_gemma2;2b'_1,1-test on rm228p/a14_t001.13.4.50502.0905_Response.json"
//                                     E:\Repos\Robin\AIDocs_\dev01-robin\docs\a14_grading-app\25.05.May\_t001_gemma2;2b_1,1-test on rm228p\a14_t001.13.4.50502.0905_Response.json

    var  pJSON_Response =  JSON.parse( FRT.readFileSync( MWT.fixPath( FRT.__basedir, process.env.JSON_RESPONSE ) ) ) // .(50505.03.1 RAM Add __basedir)
    var  aResponse      =  pJSON_Response.ModelQuery.Response
    var  pMetrics       =  pJSON_Response.ModelQuery.RunStats

//  return { content: pResult.message.content, metrics: pResult };
    return { content: aResponse, metrics: pMetrics };

  } catch (error) {
    throw new Error(`Error evaluating response with Ollama: ${error.message}`);
  }
} // eof evaluateResponse
// ------------------------------------------------------------------------------

function getScores( evaluation ) {    
  // Parse and reformat scores
  var scoreRegex = /\*\*(\w+\s*\w*)\*\*: (\d+)(?:\s*\/\s*10)?/g;
  let totalScore = 0;
  let scoreCount = 0;
  let formattedEvaluation = evaluation;
  const scores = [];

  // Collect scores and reformat
  let match;
  while ((match = scoreRegex.exec(evaluation)) !== null) {
    // Skip "Total Score" during the regex collection phase
    if (match[1] !== 'Total Score') {
      const score = parseInt(match[2], 10);
      totalScore += score;
      scoreCount++;
      scores.push({ criteria: match[1], score });

      // Create a new regex pattern for each match to avoid double "/10"
      const fullPattern   =  new RegExp(`\\*\\*${match[1]}\\*\\*: ${match[2]}(?:\\s*\\/\\s*10)?`, 'g');
      formattedEvaluation =  formattedEvaluation.replace( fullPattern, `**${match[1]}**: ${score}/10` );
      }
  } // eol Collect scores and reformat
//var pTotalScore = { criteria: "TotalSCore", score: totalScore }
      scores.push(  { criteria: "TotalSCore", score: totalScore } )
// return { scores: ...scores, totalScore, scoreCount, formattedEvaluation }; 
// return { scores: { ...scores, totalScore: totalScore }, scoreCount, formattedEvaluation }; 
// return { scores: { ...scores, ...{ criteria: "TotalSCore", score: totalScore } }, scoreCount, formattedEvaluation }; 
// return { scores: { ...scores, pTotalScore }, scoreCount, formattedEvaluation }; 
   return { scores, totalScore, scoreCount, formattedEvaluation }; 

} // eol getScores
// ---------------------------------------------------------------------

  function  parseArgs() {
     const  args = 
              {  modelName         :  null
              ,  showJustification :  true
                 };
       for (let i = 2; i < process.argv.length; i++) {
//                 console.log( i, process.argv[i] )
               if (process.argv[i].slice(0,6) === '--app:' ) {
            args.app               =  process.argv[i].slice(6)
        } else if (process.argv[i] === '--no-justification') {
            args.showJustification =  false;
        } else if (!args.modelName) {
            args.modelName         =  process.argv[i];
            }
         }
    return  args;
        }  // eof parseArgs 
// ------------------------------------------------------------------------------

  function  prt1stMsg( aApp, aTestId ) {                                                // .(50503.04.5 RAM Write prt1stMsg Beg)
       var  aLog    =  process.env.LOGGER || ""                                
            aLog    =  aLog == "log,inputs" ? "log" : aLog                     
       var  bNoLog  = (aLog == "log" || aLog == "" ) ? 0 : 1; global.bNoLog = bNoLog                               
       //      if (bNoLog) {
//          sayMsg( `\n${FRT.TS}  ${aApp}           Running test: ${aTestId}` )
//      } else {
//          sayMsg( `\n  Running test, '${aTestId}', for app ${aApp}.` )
//          }
        if (bNoLog == 0) {
        var aTS = `${FRT.getDate(3,5)}.${FRT.getDate(3,7).slice(-2)}`
            sayMsg( `\n${aTS}  ${aApp}  ${aTestId}     Running ${path.basename( __filename) }` )                         
            } // eif show log   
        } // prt1stMsg                                                                  // .(50503.04.5 End)
// ------------------------------------------------------------------------------

// If this file is being run directly (not imported)
// if (import.meta.url === `file://${process.argv[1]}`) {
//  var aPath = fileURLToPath( import.meta.url )
//  var aFile = `file:///${process.argv[1].replace( /[\\\/]/g, "/")}`)
//  var aFile = process.argv[1]
if (fileURLToPath( import.meta.url) === process.argv[1]) {
    process.argv[2] = process.argv[2] || 'gemma2:2b';
    process.argv[3] = process.argv[3] || '--no-justification';
    await main()
      .catch(error => {
         console.error('Unhandled exception:', error);
         process.exit(1);
        } );
   }
// ------------------------------------------------------------------------------

//  Export the main function
    export default main;
