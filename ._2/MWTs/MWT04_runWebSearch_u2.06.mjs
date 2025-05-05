/*\
##=========+====================+================================================+
##RD        MWT04_runWebSearch  | Matt's Web Search Functions
##RFILE    +====================+=======+===============+======+=================+
##FD MWT04_runWeb..._u2.06.mjs  |   8799|  4/23/25  8:55|   135| p1.03`50423.0855
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the functions to search for URLs taken from Matt
#            Williams example Ollama scripts written between 2/15/24 and 1/30/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
# async ion  getNewsUrls( query ) {
# async ion  getCleanedText_fromURLs( urls ) {

##CHGS     .--------------------+----------------------------------------------+
#.(50329.02   3/29/25 XAI  7:00a| Created by Grok xAI
#.(50404.01   4/04/25 RAM  7:00a| Modified shoMsg('Search') Msgs
#.(50404.08   4/04/25 RAM  7:00a| Modified error messages
#.(50408.06   4/08/25 RAM  7:00a| Return WebResponse and URLs
#.(50408.07   4/08/25 MWT  7:00a| Only first 5 URL are returned
#.(50408.09   4/08/25 RAM  7:00a| Modify Search URLs
#.(50409.03   4/09/25 RAM  7:00a| Rename getCleanedText_fromURLs
#.(50423.02   4/23/25 RAM  8:55a| Break out runWebSearch and runDocSearch
#.(50404.01   4/29/25 RAM  8:20p| Edit position of shoMsg
#
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
       var  shoMsg           =  MWT.shoMsg                                              // .(50423.02.12)
/**
 * Fetches search result URLs from DuckDuckGo
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of URLs
 */
async function  getNewsUrls( query ) {
//   const  url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;                 //#.(50408.09.1))
     const  url =  pVars.WEB_SEARCH_URL.replace( /{WebSearch}/, encodeURIComponent(query) )                 // .(50408.09.1 RAM Use WEB_SEARCH_URL)
     const  fallbackURL = pVars.WEB_FALLBACK_URL                                                            // .(50408.09.2)

            usrMsg(`  Fetching from:   "${url.replace(/%20/g, "+")}"`                                                      , shoMsg('Parms' )  ) // .(50404.01.4)
  try {
     const  response = await fetch(url);
       if (!response.ok) {
            throw new Error( `HTTP error! Status: ${response.status}` );
            }
     const  text     =  await response.text();
       if (!text) {
            usrMsg("\n Empty response from Web Search URL.");                                               // .(50408.09.3 RAM Was DuckDuckGo)
//  return ["https://www.lexingtonvirginia.com/"];                                                          //#.(50408.09.4)
    return { WebResponse: {}, URLs: [ fallbackURL ] };                                                      // .(50408.09.4)
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
            usrMsg(`\n  Web Search Response:\n${ aResults.replace( /{/, "" ).replace(/\n}/, "") }`                         , shoMsg('Search')  ) // .(50404.01.7)

       var  results =                                                                                       // .(50408.07.1 MWT This has many more "results" than pResults above)
             [ ...( searchResultsJson.Results || [] )
             , ...( searchResultsJson.RelatedTopics || []).flatMap( item =>
                  "Topics" in item ? item.Topics : [item]
                   ),
               ].filter( item => item.FirstURL && item.Text);

        if (searchResultsJson.AbstractURL) {
            results.unshift( { FirstURL: searchResultsJson.AbstractURL, Text: "Overview" } );
            }
       var  urls = results.map( result => result.FirstURL ).slice(0, 5);                                    // .(50408.07.2 MWT He only returns the first 5 URLs)
        if (urls.length === 0) {
            usrMsg("\n* No URLs found, returning fallback.");
//  return         ["https://www.lexingtonvirginia.com/"];                                                  //#.(50408.09.6)
    return { WebResponse: {}, URLs: [ fallbackURL ] };                                                      // .(50408.09.6)
            }
            usrMsg(`\n  Found ${urls.length} URLs:`                                                                        , shoMsg('Search')  ) // .(50404.01.8)
    return { WebResponse: pResults, URLs: urls } ;                                                          // .(50408.06.10)

        } catch( error ) {
//          console.error(      "Error in getNewsUrls:", error);                        //#.(50404.08.1)
            sayMsg(`A1201[  99]* Error in getNewsUrls for query: '${query}'.`, 1, 1);   // .(50404.08.1)
            sayMsg(`${error}`.replace( /\n/, "\n    " ) );                              // .(50404.08.2)
//  return         ["https://www.lexingtonvirginia.com/"];                                                  //#.(50408.09.7)
    return { WebResponse: {}, URLs: [ fallbackURL ] };                                                      // .(50408.09.7)
             }
         }; // eof getNewsUrls
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/**
 * Fetches and cleans text content from URLs
 * @param {Array} urls - Array of URLs to fetch
 * @returns {Promise<Array>} - Array of cleaned text blocks
 */
  async function  getCleanedText_fromURLs( urls ) {                                                         // .(50409.03.39 RAM Renamed from getCleanedText)
       var  texts = [];
       for (var url of urls) {
       try {
            usrMsg( `    Fetching ${url}`                                                                                  , shoMsg('Search')  ) // .(50404.01.9) 
       var  response         =  await fetch( url );
       var  html             =  await response.text();
       var  text             =  await MWT.htmlToText( html );
            texts.push( `Source: ${url}\n${text}\n\n` );
        } catch( error ) {
//          console.error( `Error fetching ${url}:`, error );                           //#.(50404.08.2)
            sayMsg(    `\n* Error fetching url: '${url}'.`,   1 );                      // .(50404.08.3)
            sayMsg(    `${error}`.replace( /\n/, "\n    " ), -1 );                      // .(50404.08.4)
// return ["https://www.lexingtonvirginia.com/"];                                       //#.(50408.09.8)
   return [ pVars.WEB_FALLBACK_URL ];                                                   // .(50408.09.8)
            }
          }
    return  texts;
         }; // eof getCleanedText_fromURLs
// --  ---  --------  =  --  =  ------------------------------------------------------  #

    export  default {  // Export as default object with named functions                 // .(50423.02.13 Beg)
            getNewsUrls,
            getCleanedText_fromURLs
            };                                                                          // .(50423.02.13 End)
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/*========================================================================================================= #  ===============================  *\
#>      AIC90 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/
