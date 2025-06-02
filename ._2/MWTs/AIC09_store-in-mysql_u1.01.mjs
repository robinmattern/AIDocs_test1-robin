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
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #
   import   FRT   from './AIC90_FileFns_u1.03.mjs'
   import   mysql from 'mysql2/promise'; 
      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()
       var  exit_wCR         =  FRT.exit_wCR   
      

  async function  savStats_in_mySQL( pStats, aResponseFile, aBaseDir ) {                                    // .(50601.01.5 RAM Write savStats_in_mySQL Beg)

       var  aResponseJSON  =  FRT.readFileSync( `${aBaseDir}/${ aResponseFile }` )
       var  aResponseTXT   =  FRT.readFileSync( `${aBaseDir}/${ aResponseFile.replace( /\.json/, '.txt' ) }` )

       var  mValues1  = [     pStats[ 'PCode'            ]     /*  2 pc_no              */
                      ,       pStats[ "ModelName"        ]     /*  3 modelName           */
                   // ,               ""                       /*  4 responseFileName    */
                      ,       pStats[ "DateTime" ].trim( )     /*  5 runAT               */
                      ,       pStats[ "Score1"           ]     /*  6 accurateScore       */
                      ,       pStats[ "Score2"           ]     /*  7 relevantScore       */
                      ,       pStats[ "Score3"           ]     /*  8 organizationScore   */
                      ,       pStats[ "ScoreTotal"       ]     /*  9 totalScore          */
                      ,       pStats[ "ScoreWeighted"    ]     /* 10 weightedScore       */
                      ,       pStats[ "Duration"         ]     /* 11 totalDuration       */
                   // ,                ""                      /* 12 loadDuration        */
                      ,       pStats[ "PromptEvalTokens" ]     /* 13 promptEvalCount     */
                   // ,               ""                       /* 14 promptEvalDuration  */
                   // ,               ""                       /* 15 promptEvalRate      */
                      ,       pStats[ "EvalTokens"       ]     /* 16 evalCount           */
                      ,       pStats[ "EvalDuration"     ]     /* 17 evalDuration        */
                      ,       pStats[ "TokensPerSecond"  ]     /* 18 evalRate            */
                   // ,               ""                       /* 19 timestamp           */
                      ,                aResponseFile           /* 20 fileName            */
                      ,          noQQ( aResponseJSON )         /* 21 responseJSON        */
                      ,          noQQ( aResponseTXT  )         /* 22 responseTXT         */
                      ,       pStats[ "RespId" ].trim( )       /* 23 runID               */
                      ,       pStats[ "ContextSize" ]          /* 24 contextSize         */
                      ,       pStats[ "Temperature" ]          /* 25 temperature         */
                              ]

       var  mValues2  = [`"${ pStats[ 'PCode'            ] }"  /*  2 pc_no              */`
                      ,  `"${ pStats[ 'ModelName'        ] }"  /*  3 modelName          */`
                  //  ,  `"${         ''                   }"  /*  4 responseFileName   */`
                      ,  `"${ pStats[ 'DateTime' ].trim()  }"  /*  5 runAT              */`
                      ,  ` ${ pStats[ 'Score1'           ] }   /*  6 accurateScore      */`
                      ,  ` ${ pStats[ 'Score2'           ] }   /*  7 relevantScore      */`
                      ,  ` ${ pStats[ 'Score3'           ] }   /*  8 organizationScore  */`
                      ,  ` ${ pStats[ 'ScoreTotal'       ] }   /*  9 totalScore         */`
                      ,  ` ${ pStats[ 'ScoreWeighted'    ] }   /* 10 weightedScore      */`
                      ,  ` ${ pStats[ 'Duration'         ] }   /* 11 totalDuration      */`
                  //  ,  ` ${          ''                  }   /* 12 loadDuration       */`
                      ,  ` ${ pStats[ 'PromptEvalTokens' ] }   /* 13 promptEvalCount    */`
                  //  ,  ` ${         ''                   }   /* 14 promptEvalDuration */`
                  //  ,  ` ${         ''                   }   /* 15 promptEvalRate     */`
                      ,  ` ${ pStats[ 'EvalTokens'       ] }   /* 16 evalCount          */`
                      ,  ` ${ pStats[ 'EvalDuration'     ] }   /* 17 evalDuration       */`
                      ,  ` ${ pStats[ 'TokensPerSecond'  ] }   /* 18 evalRate           */`
                  //  ,  `"${         ''                   }"  /* 19 timestamp          */`
                      ,  `"${         aResponseFile        }"  /* 20 fileName           */`
                      ,  `'${   noQQ( aResponseJSON )      }'  /* 21 responseJSON       */`
                      ,  `'${   noQQ( aResponseTXT  )      }'  /* 22 responseTXT        */`
                      ,  `"${ pStats[ 'RespId' ].trim()    }"  /* 23 runID              */`
                      ,  ` ${ pStats[ 'ContextSize' ]      }   /* 24 contextSize        */`
                      ,  ` ${ pStats[ 'Temperature' ]      }   /* 25 temperature        */`
                              ]
       var  aSQL2     = 'INSERT  INTO scoredResponses.scores \n' 
                      + '     (  pc_no, modelName, runAT \n'
                      + '     ,  accurateScore, relevantScore, organizationScore, totalScore, weightedScore, totalDuration \n'
                      + '     ,  promptEvalCount, evalCount, evalDuration, evalRate \n'
                      + '     ,  fileName, responseJSON, responseTXT \n'
                      + '     ,  runID, contextSize, temperature \n'
                      + '     )  VALUES ( {Values} \n'
//                    + '     )  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \n'
                      + '        )' 

       var  aValues   =  mValues2.map( fmtValue ).join( '\n     , ' )
       var  aSQL      =  aSQL2.replace( /{Values}/, aValues )
       var  aSQL      =  aSQL.replace( /\n +/, '' )

 //         console.log( aSQL )
            sayMsg( `AIC09[ 105]  Saving scores for Stats: ${pStats[ 'RespId' ].trim()}`, -1)
       var  nID       =  await insertScore( aSQL,  mValues1 );
            usrMsg( `Inserted record no. ${nID} for Stats RunId: ${ pStats[ 'RespId' ].trim() }`, shoMsg( 'stats' ) )

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
      
       let  connection;

     const  dbConfig  = 
             { host:     '45.32.219.12'
             , user:     'nimdas'
             , password: 'FormR!1234'
             , port:      3306
             , database: 'scoredResponses'
               };
    try {
        //  Create connection
            connection = await mysql.createConnection( dbConfig )
            sayMsg( 'AIC09[ 139]  Connected to MySQL', -1 );

        //  Execute the query
//     var [result]  =  await connection.execute( aSQL, mValues );
       var [result]  =  await connection.execute( aSQL );   
       var  nID      =  result.insertId
            sayMsg( `AIC09[ 145]  Insert successful as ID: ${result.insertId}`, -1);
        } catch (error) {
       var  nID      =  0
            sayMsg( `AIC09[ 148]* Database error:\n${error}`, -1 );
    } finally {
        if (connection) {
            await connection.end();
            sayMsg( 'AIC09[ 152]  Connection closed', -1 );
            }
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
      , "weightedScore"    : 'weightedScore'      // 10
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
      , "responseJSON"     : 'responseJSON'       // 21
      , "responseJSON"     : 'responseTXT'        // 22
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
*/
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
