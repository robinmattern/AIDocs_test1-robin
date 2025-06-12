/*\
##=========+====================+================================================+
##RD        AIC09_store-in-mysql| Save Test Run Stats to MySQL
##RFILE    +====================+=======+===============+======+=================+
##FD   AIC09_store-in-mysql.mjs |      0|  6/02/25  7:00|     0| u1.01`50601.0700
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script inserts the Stats data fields to a MySQL Database 
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
# async ion  insertScore( aSQL ) { ... }
# async ion  savStats_in_mySQL( pStats, aResponseFile, aBaseDir ) { ... }
#       ion  fmtValue( aVal ) { ... }
#       ion  noQQ( aVal ) { ... }
#
##CHGS     .--------------------+----------------------------------------------+
#.(50601.01   6/01/25 XAI  7:00a| Created by Robin Mattern 
#.(50601.01b  6/02/25 XAI  6:20a| Cleaned it up
#.(50608.02   6/08/25 RAM  3:00p| Write getStatsMap
#.(50608.03   6/08/25 RAM  4:00p| ReWrite and use MWT.getConfig again
#.(50611.03   6/11/25 RAM 12:01p| Minor changes 
#.(50612.01   6/12/25 RAM  7:01a| Add seconds to UpdatedAt
#.(50612.02   6/12/25 RAM  7:52a| Change Temperature to float
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #
   import   mysql from 'mysql2/promise'; 

   import   MWT   from './MWT01_MattFns_u2.05.mjs'
   import   FRT   from './AIC90_FileFns_u1.03.mjs'

      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()
       var  exit_wCR         =  FRT.exit_wCR   

//     var  pConfig          =  MWT.getJSON( './Data/config.jsonc' )                    //#.(50608.03.1)
       var  pConfig          =  MWT.getJSON( `${FRT.__basedir}/Data/config.jsonc` )     // .(50608.03.1)
       var  pDB_Config       =  pConfig[ pConfig.STATS_DB ]
       var  pDB_Config       =  Object.fromEntries( Object.entries( pDB_Config ).map(([key, value]) => [ key.toLowerCase(), value ] ) );       

       var  isNotCalled      =  FRT.isNotCalled(import.meta.url)
        if (isNotCalled  && FRT.inVSCode) {
            global.bQuiet    =  0 
                        sayMsg( `AIC09[  46]* Do you want to re-create the MySQL table while debugging.`, 1 )
//                      await  makTable() 
                        process.exit() 
            }
// --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- # 

  async function  makTable( ) {
             var  mStatsMap  =  getStatsMap() 
//           var  mFlds      =  Object.entries( mStatsMap ).map( mFld => mFld[1] ? mFld[0] : '' ).filter( aFld => aFld )
             var  mFlds      =  mStatsMap.map( mFld => (mFld[0] && mFld[1] ) ? fmtFld( mFld ) : '' ).filter( aFld => aFld )
             var  aSQL       = 'CREATE TABLE `Scores`\n ( '
                             +     mFlds.join( ',\n   ' ) + ',\n' 
                             + '   PRIMARY KEY (`Id`),\n   UNIQUE KEY `RunKey` (`CreatedAt`,`TestId`,`PCode`)\n   )\n'
                             + 'ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4' 
            try { 
                         await  execSQL( "DROP TABLE IF EXISTS Scores" )                            
                         await  execSQL(  aSQL )  
            } catch( error ) {
                 sayMsg( `AIC09[  61]  Error creating table Scores.\n${error}`, 1 )
                 process.exit()
                 }
                 sayMsg( `AIC09[  58]  Created Table Scores`, -1)
                 usrMsg( `  Created  Tavle Scores` ) 
                 
function fmtFld( mFld ) { return `${mFld[0].padEnd(20)} ${mFld[2].padEnd(10)} ${mFld[3].toUpperCase()}` }                  
                  }    
// --  ---  --------  =  --  =  ------------------------------------------------------  #
                  
  async function  savStats_in_mySQL( pStats, aResponseFile, aBaseDir ) {                                    // .(50601.01.5 RAM Write savStats_in_mySQL Beg)

       var  aResponseJSON  =  FRT.readFileSync( `${aBaseDir}/${ aResponseFile }` )
       var  aResponseTXT   =  FRT.readFileSync( `${aBaseDir}/${ aResponseFile.replace( /\.json/, '.txt' ) }` )

       var  mValues1  = [     pStats[ "RespId" ].trim( )       /*  2 runID               */
                      ,       pStats[ 'PCode'            ]     /*  3 pc_no              */
                      ,       pStats[ "ModelName"        ]     /*  4 modelName           */
                   // ,               ""                       /*    responseFileName    */
                      ,       pStats[ "ContextSize" ]          /*  5 contextSize         */
                      ,       pStats[ "Temperature" ]          /*  6 temperature         */
                      ,       pStats[ "DateTime" ].trim( )     /*  7 runAT               */
                      ,       pStats[ "Score1"           ]     /*  8 accurateScore       */
                      ,       pStats[ "Score2"           ]     /*  9 relevantScore       */
                      ,       pStats[ "Score3"           ]     /* 10 organizationScore   */
                  //  ,       pStats[ "ScoreTotal"       ]     /*    totalScore          */
                      ,       pStats[ "ScoreWeighted"    ]     /* 11 weightedScore       */
                      ,       pStats[ "Duration"         ]     /* 12 totalDuration       */
                   // ,                ""                      /*    loadDuration        */
                      ,       pStats[ "PromptEvalTokens" ]     /* 13 promptEvalCount     */
                   // ,               ""                       /*    promptEvalDuration  */
                   // ,               ""                       /*    promptEvalRate      */
                      ,       pStats[ "EvalTokens"       ]     /* 14 evalCount           */
                      ,       pStats[ "EvalDuration"     ]     /* 15 evalDuration        */
                      ,       pStats[ "TokensPerSecond"  ]     /* 16 evalRate            */
                   // ,               ""                       /*    timestamp           */
                      ,                aResponseFile           /* 17 fileName            */
                      ,          noQQ( aResponseJSON )         /* 18 responseJSON        */
                      ,          noQQ( aResponseTXT  )         /* 19 responseTXT         */
                              ]

       var  mValues2  = [`"${ pStats[ 'RespId' ].trim()    }"  /*  2 runID              */`
                      ,  `"${ pStats[ 'PCode'            ] }"  /*  3 pc_no              */`
                      ,  `"${ pStats[ 'ModelName'        ] }"  /*  4 modelName          */`
                  //  ,  `"${         ''                   }"  /*    responseFileName   */`
                      ,  ` ${ pStats[ 'ContextSize' ]      }   /*  5 contextSize        */`
                      ,  ` ${ pStats[ 'Temperature' ]      }   /*  6 temperature        */`
                      ,  `"${ pStats[ 'DateTime' ].trim()  }"  /*  7 runAT              */`
                      ,  ` ${ pStats[ 'Score1'           ] }   /*  8 accurateScore      */`
                      ,  ` ${ pStats[ 'Score2'           ] }   /*  9 relevantScore      */`
                      ,  ` ${ pStats[ 'Score3'           ] }   /* 10 organizationScore  */`
                  //  ,  ` ${ pStats[ 'ScoreTotal'       ] }   /*    totalScore         */`
                      ,  ` ${ pStats[ 'ScoreWeighted'    ] }   /* 11 weightedScore      */`
                      ,  ` ${ pStats[ 'Duration'         ] }   /* 12 totalDuration      */`
                  //  ,  ` ${          ''                  }   /*    loadDuration       */`
                      ,  ` ${ pStats[ 'PromptEvalTokens' ] }   /* 13 promptEvalCount    */`
                  //  ,  ` ${         ''                   }   /*    promptEvalDuration */`
                  //  ,  ` ${         ''                   }   /*    promptEvalRate     */`
                      ,  ` ${ pStats[ 'EvalTokens'       ] }   /* 14 evalCount          */`
                      ,  ` ${ pStats[ 'EvalDuration'     ] }   /* 15 evalDuration       */`
                      ,  ` ${ pStats[ 'TokensPerSecond'  ] }   /* 16 evalRate           */`
                  //  ,  `"${         ''                   }"  /*    timestamp          */`
                      ,  `"${         aResponseFile        }"  /* 17 fileName           */`
                      ,  `'${   noQQ( aResponseJSON )      }'  /* 18 responseJSON       */`
                      ,  `'${   noQQ( aResponseTXT  )      }'  /* 19 responseTXT        */`
//                    ,  `'${   'ResponseJSON'             }'  /* 18 responseJSON       */`
//                    ,  `'${   'ResponseTXT'              }'  /* 19 responseTXT        */`
                              ]
       var  mStatsMap =  getStatsMap()                       
       var  aSQL2     = 'INSERT INTO scoredResponses.scores \n' 
/*                    + '     (  pc_no, modelName, runAT \n'
                      + '     ,  accurateScore, relevantScore, organizationScore, totalScore, weightedScore, totalDuration \n'
                      + '     ,  promptEvalCount, evalCount, evalDuration, evalRate \n'
                      + '     ,  fileName, responseJSON, responseTXT \n'
                      + '     ,  runID, contextSize, temperature \n' */ 
//                    +          Object.entries( mStatsMap ).filter( aFld => pStatsMap[ aFld ] )    
                      + '      ( ' + mStatsMap.map( mFld => (mFld[0] && mFld[1]) ? mFld[0] : '' ).filter( aFld => aFld ).slice(1).join( ', ' ) + '\n' 
                      + '         )\n VALUES\n      ( {Values} \n'
//                    + '     )  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \n'
                      + '         )' 

       var  aValues   =  mValues2.map( fmtValue ).join( '\n      , ' )
       var  aSQL2     =  aSQL2.replace( /{Values}/, aValues )
       var  aSQL      =  aSQL2.replace( /\n +/g, '' )

//                       console.log( " --[6]--- aSQL:",  aSQL  )
//                       console.log( " aSQL2:\n", aSQL2 )

            sayMsg( `AIC09[ 153]  Saving scores for Stats: ${pStats[ 'RespId' ].trim()}`, -1 )
       var  nID       =  await insertScore( aSQL,  mValues1 );
        if (nID) {
            usrMsg( `Inserted record no. ${nID} for Stats RunId: ${ pStats[ 'RespId' ].trim() }`, shoMsg( 'stats' ) )
            }
//     for (var aStat in pStatsMap) {
//          console.log( `  ${ pStatsMap[ aStat ].padEnd(20) } = ${ aStat.padEnd(20) } : ${pStats[ aStat ]}` )
//          aValues =    `  ${ pStatsMap[ aStat ].padEnd(20) } = ${ aStat.padEnd(20) } : ${pStats[ aStat ]}` )
//          }
// --  ---  --------  =  --  =  ------------------------------------------------------  #

  function  shoMsg( aSection ) {
        if (global.bNoLog == 0) { return false }                                       
       var  aSections = `,${global.aPrtSections.toLowerCase()},`
            aSection  = `,${aSection.toLowerCase()},`
        if (aSections == ',none,' || ',none,' == aSection) { return false }            
     global.aCurrentSection = aSection                                                  
        if (aSections == ',all,'  || ',all,'  == aSection) { return true }
    return  aSections.match(  aSection ) ? 1 : 0                                         
            } // eof shoMsg                                                            
// --  ---  --------  =  --  =  ------------------------------------------------------  #

  async function  insertScore( aSQL, mValues ) {
             var  nID  = await execSQL( aSQL, mValues )
              if (nID) {
                  sayMsg( `AIC09[ 181]  Insert successful as ID: ${nID}`, -1 );
              } else {
                  sayMsg( `AIC09[ 183]* Insert was NOT successful`, 1 );
                  }    
          return  nID
            } // eof insertScore 
// --  ---  --------  =  --  =  ------------------------------------------------------  #

  function  fmtValue( aVal ) {
       var  nPos   = aVal.match( /\/\*/  ).index;
       var  aValue = aVal.slice( 0, nPos ).padEnd(50)
                   + aVal.slice(    nPos )
    return  aValue
            }
// --  ---  --------  =  --  =  ------------------------------------------------------  #

//function  noQQ( aStr ) { return aStr.replace( /"/g, '\\"' ) }
  function  noQQ( aStr ) { return aStr.replace( /'/g, "''"  ) }

       } // eof savStats_in_mySQL                                                                           // .(50601.01.5 End
// --  ---  --------  =  --  =  ------------------------------------------------------  #

  async function  execSQL( aSQL, mValues ) {
      
       let  connection;
//          global.bDebug = 1 

/*   const  dbConfig  = 
             { host:     '45.32.219.12'
             , user:     'nimdas'
             , password: 'FormR!1234'
             , port:      3306
             , database: 'scoredResponses'
               };
*/
    try {
        //  Create connection
            connection = await mysql.createConnection( pDB_Config )                     // .(50608.03.2 RAM Was: dbConfig)
            sayMsg( 'AIC09[ 210]  Connected to MySQL', -1 );

        //  Execute the query
//     var [result]  =  await connection.execute( aSQL, mValues );
       var [result]  =  await connection.execute( aSQL );   
       var  nID      =  result.insertId ? result.insertId : result
//          sayMsg( `AIC09[ 224]  Insert successful as ID: ${result.insertId}`, -1);
        } catch (error) {
       var  nID      =  0
            sayMsg( `AIC09[ 227]* Database error:\n${''.padEnd(17)}${error}`, 1 );
    } finally {
        if (connection) {
            await connection.end();
            sayMsg( 'AIC09[ 231]  Connection closed', -1 );
            }
        }
    return  nID        
            } // eof execSQL 
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/*
 var  pStatsMap =
      { ""                 : 'id'                 //  1
      , "PCode"            : 'pc_no'              //  2
      , "ModelName"        : 'modelName'          //  3
      , ""                 : 'responseFileName'   //  4
      , "DateTime"         : 'runAT'              //  5
      , "Accuracy"         : 'accurateScore'      //  6
      , "Relevance"        : 'relevantScore'      //  7
      , "Coherence"        : 'organizationScore'  //  8
      , "Total"            : 'totalScore'         //  9
      , "WeightedScore"    : 'weightedScore'      // 10
      , "Duration"         : 'totalDuration'      // 11
      , ""                 : 'loadDuration'       // 12
      , "PromptEvalTokens" : 'promptEvalCount'    // 13
      , ""                 : 'promptEvalDuration' // 14
      , ""                 : 'promptEvalRate'     // 15
      , "EvalTokens"       : 'evalCount'          // 16
      , "EvalDuration"     : 'evalDuration'       // 17
      , "TokensPerSecond"  : 'evalRate'           // 18
      , ""                 : 'timestamp'          // 19
      , "ResponseFile"     : 'fileName'           // 20
      , "ResponseJSON"     : 'responseJSON'       // 21
      , "ResponseJSON"     : 'responseTXT'        // 22
      , "RespId"           : 'runID'              // 23
      , "ContextSize"      : 'contextSize'        // 24
      , "Temperature"      : 'temperature'        // 25
      , "Computer"         : ''
      , "CPU_GPU"          : ''
      , "OS"               : ''
      , "RAM"              : ''
      , "Server"           : ''
      , "SysPmtCd"         : ''
      , "SysPrompt"        : ''
      , "UPC"              : ''
      , "UsrPrompt"        : ''
      , "WebSearch"        : ''
      , "WebSearchURL"     : ''
      , "Docs"             : ''
         }
*//*
   function  getStatsMap1( ) {                                                          //#.(50608.02.1 RAM Write getStatsMap)     
var  pStatsMap =
      { ""                 : 'id'                 //  1
      , "RespId"           : 'runID'              //  2
      , "PCode"            : 'pc_no'              //  3
      , "ModelName"        : 'modelName'          //  4
      , "ContextSize"      : 'contextSize'        //  5
      , "Temperature"      : 'temperature'        //  6
//    , ""                 : 'responseFileName'   //   
      , "CreatedAt"        : 'runAT'              //  7
      , "Accurate"         : 'accurateScore'      //  8
      , "Relevant"         : 'relevantScore'      //  9
      , "Organized"        : 'organizationScore'  // 10
//    , "Total"            : 'totalScore'         //   
      , "WeightedScore"    : 'weightedScore'      // 11
      , "Duration"         : 'totalDuration'      // 12
//    , ""                 : 'loadDuration'       // 
      , "PromptEvalTokens" : 'promptEvalCount'    // 13
      , ""                 : 'promptEvalDuration' // 
      , ""                 : 'promptEvalRate'     // 
      , "EvalTokens"       : 'evalCount'          // 14
      , "EvalDuration"     : 'evalDuration'       // 15
      , "TokensPerSecond"  : 'evalRate'           // 16
//    , ""                 : 'timestamp'          // 
      , "ResponseFile"     : 'fileName'           // 17
      , "ResponseJSON"     : 'responseJSON'       // 18
      , "ResponseJSON"     : 'responseTXT'        // 19
      , "Computer"         : ''
      , "CPU_GPU"          : ''
      , "OS"               : ''
      , "RAM"              : ''
      , "Server"           : ''
      , "SysPmtCd"         : ''
      , "SysPrompt"        : ''
      , "UPC"              : ''
      , "UsrPrompt"        : ''
      , "WebSearch"        : ''
      , "WebSearchURL"     : ''
      , "Docs"             : ''
         }
return  pStatsMap                                                                       //#.(50608.02.2)     
        } // eof getStatsMap                                                            //#.(50608.02.1 End)     
 */
   function  getStatsMap( ) {                                                           // .(50608.02.1 RAM Write getStatsMap)     
var  mStatsMap =
      [ [ "Id"               , 'id'                 , 'integer'   , '    NOT NULL AUTO_INCREMENT' ] //  1
      , [ "TestId"           , 'runID'              , 'char(12)'  , '    not null' ] //  2
      , [ "PCode"            , 'pc_no'              , 'char( 6)'  , 'default null' ] //  3
      , [ "ModelName"        , 'modelName'          , 'char(15)'  , 'default null' ] //  4
      , [ "ContextSize"      , 'contextSize'        , 'integer'   , 'default null' ] //  5
      , [ "Temperature"      , 'temperature'        , 'float'     , 'default null' ] //  6   // .(50612.02.1 RAM Was Integer) 
//    , [ ""                 , 'responseFileName'   , 'integer'   , 'default null' ] //  
      , [ "CreatedAt"        , 'runAT'              , 'char(19)'  , 'default null' ] //  7   // .(50612.01.6 RAM Was char(18))
      , [ "Accurate"         , 'accurateScore'      , 'integer'   , 'default null' ] //  8
      , [ "Relevant"         , 'relevantScore'      , 'integer'   , 'default null' ] //  9
      , [ "Organized"        , 'organizationScore'  , 'integer'   , 'default null' ] // 10
//    , [ "Total"            , 'totalScore'         , 'integer'   , 'default null' ] //   
      , [ "WeightedScore"    , 'weightedScore'      , 'integer'   , 'default null' ] // 11
      , [ "Duration"         , 'totalDuration'      , 'float'     , 'default null' ] // 12
//    , [ ""                 , 'loadDuration'       , 'integer'   , 'default null' ] // 
      , [ "PromptEvalTokens" , 'promptEvalCount'    , 'integer'   , 'default null' ] // 13
      , [ ""                 , 'promptEvalDuration' , 'integer'   , 'default null' ] // 
      , [ ""                 , 'promptEvalRate'     , 'integer'   , 'default null' ] // 
      , [ "EvalTokens"       , 'evalCount'          , 'integer'   , 'default null' ] // 14
      , [ "EvalDuration"     , 'evalDuration'       , 'float'     , 'default null' ] // 15
      , [ "TokensPerSecond"  , 'evalRate'           , 'float'     , 'default null' ] // 16
//    , [ ""                 , 'timestamp'          , 'integer'   , 'default null' ] // 
      , [ "ResponseFile"     , 'fileName'           , 'char(255)' , 'default null' ] // 17
      , [ "ResponseJSON"     , 'responseJSON'       , 'longblob'  , 'default null' ] // 18
      , [ "ResponseTEXT"     , 'responseTXT'        , 'longblob'  , 'default null' ] // 19
      , [ "Computer"         , ''                   , 'char( 9)'  , 'default null' ] //  
      , [ "CPU_GPU"          , ''                   , 'char(23)'  , 'default null' ] //  
      , [ "OS"               , ''                   , 'char( 9)'  , 'default null' ] //  
      , [ "RAM"              , ''                   , 'integer'   , 'default null' ] //  
      , [ "Server"           , ''                   , 'char(37)'  , 'default null' ] //  
      , [ "SysPmtCd"         , ''                   , 'char( 9)'  , 'default null' ] //  
      , [ "SysPrompt"        , ''                   , 'char(35)'  , 'default null' ] //  
      , [ "UPC"              , ''                   , 'char( 3)'  , 'default null' ] //  
      , [ "UsrPrompt"        , ''                   , 'char(27)'  , 'default null' ] //  
      , [ "WebSearch"        , ''                   , 'char(27)'  , 'default null' ] //  
      , [ "WebSearchURL"     , ''                   , 'char(23)'  , 'default null' ] //  
      , [ "Docs"             , ''                   , 'char(23)'  , 'default null' ] //  
           ]
return  mStatsMap                                                                       // .(50608.02.2)     
        } // eof getStatsMap                                                            // .(50608.02.1 End)     
// --------------------------------------------------------------------------------------
/*
    runID               pStats.RespId           = take(  13,  parms.resp_id )
    pc_no               pStats.PCode            = take(   6,  parms.pccode )
    modelName           pStats.ModelName        = chop(  27,  parms.model )
                        pStats.ContextSize      = take(  -7,  parms.options.num_ctx )
                        pStats.Temperature      = take(  -5,  parms.temp )
    evalRate            pStats.TokensPerSecond  = take(  -6,  stats.eval_count / stats.eval_duration )
    totalDuration       pStats.Duration         = take(  -7,  stats.total_duration )
    accurateScore       pStats.Accuracy         = take(  -3,  0 )
    relevantScore       pStats.Relevance        = take(  -3,  0 )
    organizationScore   pStats.Coherence        = take(  -3,  0 )
    totalScore          pStats.Total            = take(  -3,  0 )
    weightedScore
    runAT               pStats.DateTime         = take( -18,  parms.datetime )
                        pStats.UPC              = take(   3,  parms.qpc )
    promptEvalCount     pStats.PromptEvalTokens
    promptEvalDuration
    promptEvalRate
    evalCount           pStats.EvalTokens       = take(  -5,  stats.eval_count )
                        pStats.UsrPrompt        = chop(  27,  parms.usrprompt )
    evalDuration        pStats.EvalDuration     = take(  -6,  stats.eval_duration )
                        pStats.PromptEvalTokens = take(  -5,  stats.prompt_eval_count )
                        pStats.SysPmtCd         = take(   9,  parms.spc )
                        pStats.SysPrompt        = chop(  35,  parms.sysprompt )
                        pStats.WebSearch        = chop(  27,  parms.websearch )
                        pStats.Docs             = take(  23,  stats.docs, 1 )
                        pStats.WebSearchURL     = take(  23,  stats.url, 1 )
                        pStats.CPU_GPU          = take(  23,  aCPU_GPU, 1 )
                        pStats.RAM              = take(  -3,  aRAM )
                        pStats.OS               = take(   9,  aOS )
                        pStats.Computer         = take(   9,  aPC_Model )
                        pStats.Server           = take(  37,  aServer, 1 )
    fileName            pStats.ResponseFile     = take(   0,  parms.logfile
    responseJSON
    responseTXT
*/
// --  ---  --------  =  --  =  ------------------------------------------------------  #

   export default savStats_in_mySQL

// --  ---  --------  =  --  =  ------------------------------------------------------  #
/*========================================================================================================= #  ===============================  *\
#>      AIC90 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/
