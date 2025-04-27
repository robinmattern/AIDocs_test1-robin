/*\
##=========+====================+================================================+
##RD        MWT04_runDocsSearch | Matt's Docs Search Functions
##RFILE    +====================+=======+===============+======+=================+
##FD MWT04_runDocs..._u2.06.mjs |   3112|  4/23/25  7:45|    58| p1.03`50408.1845
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the functions to search for Docs taken from Matt
#            Williams example Ollama scripts written between 2/15/24 and 1/30/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
# async ion  getDocs( mDocs ) {
# async ion  getCleanedText_fromDocs( mDocs ) {

##CHGS     .--------------------+----------------------------------------------+
#.(50329.02   3/29/25 XAI  7:00a| Created by Grok xAI
#.(50423.02   4/22/25 RAM  6:55a| Break out runWebSearch and runDocSearch

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   LIBs                from '../../._2/FRT_Libs.mjs'                                               // .(50423.02.7)
       var  FRT              =( await import( `${LIBs.MWT()}/AIC90_FileFns_u1.03.mjs`) ).default            // .(50423.02.8).(50405.06.8 RAM Call function: LIBS.MOD())
       var  MWT              =( await import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default            // .(50423.02.9).(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)
      var { sayMsg, usrMsg, bDebug, bQuiet, bDoit } = FRT.setVars()                                         // .(50423.02.10)
       var  pVars            =  FRT.getEnvVars( FRT.__dirname )                                             // .(50423.02.11).(50403.02.6 RAM Was MWT).(50331.04.3 RAM Get .env vars Beg)
       var  shoMsg           =  MWT.shoMsg                                                                  // .(50423.02.12)
/**
 * Does a vector search to get source Doc Files
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of Doc File Names
 */
async function  getDocs( mDocs ) {
    return  [ '' ];
    }; // eof getDocs
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/**
* Fetches and cleans text content from Docs
* @param {Array} mDocs - Array of docs to fetch
* @returns {Promise<Array>} - Array of cleaned text blocks
*/
  async  function  getCleanedText_fromDocs( mDocs ) {
    return  [ '' ];
       }; // eof getCleanedText_Docs
// --  ---  --------  =  --  =  ------------------------------------------------------  #

    export  default {  // Export as default object with named functions                 // .(50423.02.14 Beg)
            getDocs,
            getCleanedText_fromDocs
            };                                                                          // .(50423.02.14 End)
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/*========================================================================================================= #  ===============================  *\
#>      AIC90 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/
