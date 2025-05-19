/*\
##=========+====================+================================================+
##RD        MWT01_MattFns       | Matt's Utility Functions
##RFILE    +====================+=======+===============+======+=================+
##FD   MWT01_MattFns_u1.03.mjs  |      0|  3/29/25  7:00|     0| u1.03`50329.0700
##FD   MWT01_MattFns_u1.03.mjs  |  18159|  4/02/25  7:20|   343| u1.03`50402.0720
##FD   MWT01_MattFns_u1.03.mjs  |  19735|  4/04/25 12:30|   343| u1.03`50404.1230
##FD   MWT01_MattFns_u1.03.mjs  |  20537|  4/05/25 16:45|   362| u1.03`50405.1645
##FD   MWT01_MattFns_u2.03.mjs  |  26141|  4/08/25 18:45|   446| u2.03`50408.1845
##FD   MWT01_MattFns_u2.05.mjs  |  31720|  4/19/25 17:15|   494| u2.05`50419.1715
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the utility functions for working with Matt
#             Williams example Ollama scripts written between 2/15/24 and 1/30/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
# async ion  ask4Text(   aPrompt ) {
# async ion  htmlToText( html ) {
#       ion  fmtText(    text ) {
#       ion  fmtResults( results ) {
#       ion  fmtStats(   stats, params ) {
#       ion  showHiddenChars( str ) {
# async ion  fmtStream(  stream ) {
# async ion  fmtStream(  stream ) {
#       ion  createUserInput( )
#       ion  getServerInfo( )
#       ion  wrap( )

##CHGS     .--------------------+----------------------------------------------+
#.(50329.02   3/29/25 XAI  7:00a| Created by Grok xAI
#.(50330.03   3/30/25 RAM  7:00p| Replace createUserInput with ask4Text
#.(50330.04   3/30/25 RAM  7:30p| Write and use getServerInfo
#.(50330.06   3/30/25 XAI  8:15p| Write and use wrap
#.(50330.06a  3/31/25 RAM  8:15a| Add indent to wrap
#.(50331.03   3/31/25 RAM 12:20p| Write and use savStats
#.(50331.04   3/31/25 RAM  1:50p| Write and use getVars
#.(50330.04b  3/31/25 RAM  4:45p| Add more server info
#.(50330.04c  3/31/25 RAM  7:35p| Add web searchPrompt
#.(50331.05   3/31/25 RAM  9:00p| Add ResponseFile to Stats and CSV
#.(50331.05c  3/31/25 RAM 11:00p| Fix Resp_Id for Stats and CSV
#.(50402.03   4/01/25 RAM  7:20a| Fix "Tokens Per Second" CSV heaading
#.(50403.02   4/03/25 RAM  1:40p| Move getEnvVars to AIC90_FileFns.mjs
#.(50403.04   4/03/25 RAM  2:45p| Save Stats to .tab file
#.(50404.01   4/04/25 RAM 12:30p| Write and use shoMsg
#.(50404.05   4/04/25 RAM  3:45p| Add lines and change Stats .tab widths
#.(50407.02   4/07/25 RAM  6:50p| Bump version to 2.03
#.(50407.03   4/07/25 RAM  7:15p| Add Query Prompt Code
#.(50408.06   4/08/25 RAM  6:20p| Write and use savStats_4JSON
#.(50408.10   4/08/25 RAM  6:11p| Write and use savStats_4MD
#.(50413.02   4/13/25 RAM  7:30a| Add new columns to spreadsheet
#.(50414.01   4/14/25 RAM  3:52a| Display a brief log messages
#.(50419.04   4/19/25 RAM  5:15p| Add tokens_per_sec to pStats
#.(50425.03   4/25/25 RAM 11:15a| Add extractTextFromPDF
#.(50428.01   4/28/25 RAM  8:10a| Add Matt's utilities.js fns 
#.(50428.02   4/28/25 CAI  8:35a| Write get1stFile
#.(50410.04c  4/30/25 RAM 10:35p| Write and use chop( 30, aStr )  
#.(40528.03b  5/01/25 RAM  6:20p| Fix fixPath. Add aDrv &&
#.(50408.06c  5/03/25 RAM  7:45p| Use pParms vars not chopped pStats vars
#.(50503.01   5/03/25 RAM  8:30p| Redo stats sheet fields
#.(50503.08   5/03/25 RAM 11:00p| Write and use sqzLines
#.(50505.08   5/05/25 RAM  8:15p| Sort files for get1stFile
#.(50505.11   5/06/25 RAM 10:30p| Remove : from FixPath 
#.(50331.05d  5/08/25 RAM  7:45a| Fix saving response file in pStats 
#.(50429.09d  5/10/25 RAM  2:35p| Accomodate pParms.resp_id for aApp2 
#.(50515.01   4/15/25 RAM  8:00a| Add none to shoMsg
#.(50517.01   5/17/25 RAM 10:30a| Write and use sayColor_Log
#.(50519.04   5/19/25 RAM 12:15p| Put aPC_CODE into THE_SERVER
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   inquirer             from 'inquirer'                                        // .(50330.03.1 RAM New console input)
   import   dotenv               from 'dotenv'                                          // .(50330.04.1 RAM Need this)
   import { dirname, join }      from 'path';
   import { fileURLToPath }      from 'url';
// import { ftruncate     }      from 'fs';                                             //#.(50425.03.1)
   import   path                 from "path";
   import   fs                   from 'fs';                                             // .(50425.03.2)
   import { readFile }           from "fs/promises";                                    // .(50428.02.1 RAM Add readFile. Why??)
   import { convert  }           from "html-to-text";                                   // .(50428.01.4)

// import   pdfParse             from 'pdf-parse';                                      // .(50425.03.3 RAM New PDF parser)
// import { PDFExtract }         from 'pdf.js-extract';                                 // .(50425.03.3 
   
// import { Readability   }      from '@mozilla/readability';
// import { JSDOM         }      from 'jsdom';

//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #

       var  aVer             = "u2.05"                                                  // .(50425.03.x).(50407.02.1 Was u0.03)

      var __dirname          =    dirname( fileURLToPath( import.meta.url ) );          // .(50330.04.2)
       var  aEnvDir          =  __dirname.replace( /\._2.*/, '._2' )                    // .(50330.04.3)
            dotenv.config( { path: join( aEnvDir, '.env'), override: true } );          // .(50330.04.4)

//   -- --- ---------------  =  ------------------------------------------------------  #
/*
//function  getEnvVars( aAppDir ) {                                                     //#.(50403.02.5 RAM Move to FileFns).(50331.04.1 RAM Write getVars Beg)
//          dotenv.config( { path: join( aAppDir, '.env'), override: true } );
//  return  process.env
//          }  */                                                                       //#.(50403.02.5).(50331.04.1 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  fixPath( aPath, aFile ) {                                                   // .(50425.03.1 RAM New Version)
       if (!aFile) { aPath = aPath.replace( /^['"]/, "" ).replace( /['"]$/, "" );       // Remove double-quotes
            aFile  = aPath.split( /[\\\/]/ ).slice(-1)[0]
            aPath  = aPath.split( /[\\\/]/ ).slice(0,-1).join( '/' )
            } 
       if (aPath.match( /^\.[\\\/]/) ) { aDrv = ""; aDir = aPath            
        } else {
//     var  aDrv  = (aPath || ".").match(   /^[\\\/]*([a-zA-Z]:)/ ); aDrv = aDrv[1] ? aDrv[1] : "";         //#.(40528.03.1)
       var  aDrv  = (aPath || ".").match(   /^[\\\/]*([a-zA-Z]:)/);                                         // .(50505.11.1 RAM Remove "*", require :)
            aDrv  = (aDrv && aDrv[1]) ? aDrv[1] : "";                                                       // .(40528.03.1 RAM Add aDrv &&).(40528.03.1 RAM May not contain a ":")
       var  aDir  = (aPath || ".").replace( /^[\\\/]*[a-zA-Z]:/, "");                                       // .(50505.11.2).(40528.03.2)
            }
       var  aFilePath = path.resolve( aDrv, aDir, aFile );
    return  aFilePath;
            }                                                                           // .(50425.03.1 RAM New Version)
// ---------------------------------------------------------------

// const config = JSON.parse( await readFile("./config.json", "utf-8"));

    export  async function  getConfig( aDir ) {                                         // .(50428.01.5 RAM Add getConfig Beg)
       var  aFilePath  =  fixPath( aDir, "config.json" );
   try {     
       var  config     =  JSON.parse( await readFile( aFilePath, "utf-8"));
    return  config;
   } catch( error ) {
            console.error("Error reading config.json:", error.message);
    return '';
            }
        }                                                                               // .(50428.01.5 End)
// ---------------------------------------------------------------

    export  async function  readText( path, file ) {                                    // .(50428.01.6 RAM Add readText Beg)
    //  Test if path is a local file or a remote URL
       var  protocol   =  path.split("://")[0];
        if (protocol === "http" || protocol === "https") {
        var text       =  await  fetch(path).then(x => x.text());
    return  convert( text );
        } else {
//     if (!file) { 
//          path       =  path.replace( /^['"]/, "" ).replace( /['"]$/, "" );  // Remove double-quotes
//          file       =  path.split( /[\\\/]/ ).slice(-1)[0]
//          path       =  path.split( /[\\\/]/ ).slice(0,-1).join( '/' )
//          }   
//      if (file) { 
//          path       =  fixPath( path, file ); }
       var aFilePath   =  fixPath( path, file );
//return                  await  fs.readFile(     aFilePath, "utf-8" );                 //#.(50428.01.7 RAM Use fs.readFile not defined )
  return                  await     readFile(     aFilePath, "utf-8" );                 // .(50428.01.7 RAM Use readFile )
//return                         fs.readFileSync( aFilePath, "utf-8" );                 //#.(50428.01.7 RAM Use fs)
           }
       }                                                                                // .(50428.01.6 End)
// ---------------------------------------------------------------
/**
 * Find the first file in a folder that starts with the specified string
 * @param   {string} aStr    - Starting string to match
 * @param   {string} aFolder - Folder path to search
 * @param   {string} [aExt]  - Optional file extension (without the dot)
 * @returns {string|null}    - Full path to the first matching file or null if none found
 * Example usage:
 *    const filePath = await get1stFile('config', './project', 'json');
 *      if (filePath) {
 *          console.log(`Found matching file: ${filePath}`);
 *      } else {
 *          console.log('No matching file found');
 *          }
 */
     async  function  get1stFile( aStr, aFolder, aExt = null ) {                        // .(50428.02.2 CAI Write get1stFile Beg)
            aFolder = fixPath( aFolder );                                               // .(50428.02.3 RAM Fix path)  
  try {
    if (!fs.existsSync(aFolder)) {  // Ensure the folder exists
      throw new Error(`Folder does not exist: ${aFolder}`);
            }
       var  items = fs.readdirSync(aFolder, { withFileTypes: true }); // Read directory contents
            items = items.sort((a,b) => a.name > b.name ? 1 : -1 )                       // .(50505.08.1 RAM Sort em)
 for (const item of items) { // Process files first
        if (item.isFile()) {
       var  fileName = item.name;
        if (fileName.startsWith(aStr)) { // Check if file starts with the specified string
          if (aExt) { // If extension is specified, check if the file has that extension
             var  fileExt = path.extname(fileName) // .slice(1);                        // .(50428.02.4 RAM Don't remove the dot).(50428.02.x CAI Remove the dot) 
              if (fileExt.toLowerCase() !== aExt.toLowerCase()) {
                  continue; // Skip if extension doesn't match
                  }
              }
//  return  fileName;                                                                   //#.(50428.02.5 RAM No need to pass aFolder back, although it has been fixed) )
    return  path.join( aFolder, fileName);                                              // .(50428.02.5 RAM Need to "Return the full path of the matching file" cuz of recursive calls 
          }
       }  }
   for (var item of items) { // If no matching file found, recursively check subdirectories
        if (item.isDirectory()) {
       var  subdirPath =  path.join(aFolder, item.name);
       var  result     =  await get1stFile(aStr, subdirPath, aExt);
        if (result) {
    return  result; // Return the first match found in subdirectories
            }
        } }
    return  null; // No matching file found
        } catch (error) {
            console.error(`Error in get1stFile: ${error.message}`);
    return  null;
            }
      } // eof get1stFile                                                               // .(50428.02.2 End)  
// ---------------------------------------------------------------

  function  sqzLines( aText ) {                                                         // .(50503.08.1 RAM Write sqzLines Beg)
    return  aText.replace(/^[ \t]*$/gm, '')                                             // First remove all whitespace-only lines
                 .replace(/(\r\n|\r|\n){3,}/g, '\n\n');                                 // Then normalize multiple blank lines
            } // eof sqzLines                                                           // .(50503.08.1  End)
// ---------------------------------------------------------------

  function  wrap( text, width, indent1,  indent2 ) {                                    // .(50330.06a.1).(50330.06.1 RAM Write wrap Beg)
            indent2       =    indent2 ? indent2 : 0;   indent1 = indent1 ? indent1 : 0 // .(50330.06a.2)
       if ((indent2 == 0)  &&  indent1 > 0) { indent2 = indent1;  indent1 = 0 }         // .(50330.06a.3 RAM If only one indent

     const  lines = text.split('\n');
     const  wrappedLines = lines.map(line => {
     const  words = line.split(' ');
       let  currentLine = '';
       let  result = [];

       for (const word of words) {
       if ((currentLine + word).length <= width) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            result.push(currentLine);
            currentLine = word;
            }
          }
        if (currentLine) result.push(currentLine);
    return  result.join( '\n'.padEnd( indent2 + 1 ) );                                  // .(50330.06a.4 RAM Add indent2)
            });
    return  wrappedLines.join( '\n'.padEnd( indent1 + 1 ) );                            // .(50330.06a.5 RAM Add indent1)
            }
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  wrap1( text, width, indent1,  indent2 ) {                                   // .(50330.05a.1).(50330.05.1 RAM Write wrap Beg)
            indent2       =    indent2 ? indent2 : 0;   indent1 = indent1 ? indent1 : 0 // .(50330.05a.2)
       if ((indent2 == 0)  &&  indent1 > 0) { indent2 = indent1;  indent1 = 0 }         // .(50330.05a.3 RAM If only one indent
    return  wrap_( text, width, indent1, indent2 )
       var  mLines = text.split( "\n" )
            mLines = mLines.map( aLine => wrap_( aLine, width, indent1, indent2 ) )
    return  mLines.join( '\n'.padEnd( indent1 + 1 ) );
            }

  function  wrap_( text, width, indent1, indent2 ) {                                    // .(50330.05a.1).(50330.05.1 RAM Write wrap Beg)
     const  words       =  text.split(' ');
       let  lines       =  [];

       let  indent      = ''.padEnd( indent1 )                                          // .(50330.05a.4)
       let  currentLine =  '';                                                          //#.(50330.05a.5 RAM Was '')

       for (const word  of words) {
       if ((currentLine +  word).length <= width) {
            currentLine += (currentLine ? ' ' : '' ) + word;                            //#.(50330.05a.6 RAM Was '')
        } else {
            lines.push( indent + currentLine );                                         // .(50330.05a.6 RAM Add indent)
            currentLine =  word;                                                        //#.(50330.05a.7 RAM Add indent )
            }
         }
        if (currentLine) { lines.push( indent + currentLine ); }                        // .(50330.05a.6 RAM Add indent)

//  return  indent + lines.join( '\n'.padEnd( indent2 + 1 ) );                          //#.(50330.05a.8 RAM Add indent )
    return           lines.join( '\n'.padEnd( indent2 + 1 ) );                          // .(50330.05a.8 RAM Add indent )
            } // eof wrap                                                               // .(50330.05.1 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  shoMsg( aSection ) {                                                        // .(50404.01.25 RAM Write shoMsg Beg)
        if (global.bNoLog == 0) { return false }                                        // .(50414.01.17 RAM aLog == 'log'
       var  aSections  = `,${global.aPrtSections.toLowerCase()},`
            aSection   = `,${aSection.toLowerCase()},`
        if (aSections == ',none,' || ',none,' == aSection) { return false }             // .(50515.01.2 RAM Add none)
        if (aSections == ',all,'  || ',all,'  == aSection) { return true }
//     var  nSection = global.aPrtSections.split(',').indexOf(aSection) + 1 || 0;       //#.(50517.01.4 RAM Set nSection)
     global.aCurrentSection = aSection                                                  // .(50517.01.4 RAM Set aSection to global)
//  return  nSection                                                                    //#.(50517.01.5 RAM return nSection)
    return  aSections.match( aSection ) ? 1 : 0                                         // .(50517.01.5 RAM no change)
             } // eof shoMsg                                                            // .(50404.01.25 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

async  function  ask4Text( aPrompt ) {                                                  // .(50330.03.2 RAM Write ask4Text Beg)
  var  pResponse = await inquirer.prompt([
   {
       type:   'input',
       name:   'aResponse',
       message: aPrompt,
       theme: { prefix: '' } // Removes the '?' prefix
       }
  ]);
 var   aAnswer = pResponse.aResponse;
return aAnswer;
       } // eof ask4Text                                                                // .(50330.03.2 End)
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Converts HTML content to plain text using Mozilla's Readability
 * @param {string} html - HTML content to convert
 * @returns {string} - Extracted text content
 */
async  function  htmlToText(html) {
  const { Readability } = await import('@mozilla/readability');
  const { JSDOM       } = await import('jsdom');

  const dom  = new JSDOM(html);
  const doc  = dom.window.document;
  const text = new Readability(doc).parse();
  return text.textContent;
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Converts aPDF content to plain text using  pdf-parse 
 * @param {string} pdf - PDF content to convert
 * @returns {string} - Extracted text content
 * data.pages[0].content[0]
 *   dir      = 'ltr'
 *   fontName = 'g_d0_f1'
 *   str      = 'iPad'
 *   width    =  56.06982180375733
 *   height   =  26.999998875
 *   x        =  35.9999985
 *   y        = 164.99999312500006
 * 
 */
async function extractTextFromPDF( pdfPath ) {
    const { PDFExtract } =  await  import( 'pdf.js-extract' );                          // .(50425.03.1 RAM New PDF parser)
    const   pdfExtract   =  new PDFExtract();
    const   options      = { }; // Default options
try {
       var  aFilePath    =  fixPath( pdfPath ) 
       var  data         =  await  pdfExtract.extract( aFilePath );
       var  mPages       =  data.pages.map( page => page.content.map( item => item.str ).join(' ') )
    return  mPages.join('\n');
   } catch( error) {
            console.error(`Error extracting PDF: ${error.message}`);
     throw  error;
            }
     };                                                                                 //#.(50425.03.2) 
//   -- --- ---------------  =  ------------------------------------------------------  #

async function extractTextFromPDF1( pdfPath ) {                                         //#.(50425.03.2 RAM Write extractTextFromPDF Beg)
//const { pdfParse } =  await import( 'pdf-parse' );                                    // .(50425.03.1 RAM New PDF parser)

   const  dataBuffer =  fs.readFileSync( pdfPath );
   const  data       =  await pdfParse( dataBuffer );
  return  data.text;
  }                                                                                     //#.(50425.03.2) 
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
* Converts aPDF content to plain text using  pdf-parse 
* @param {string} pdf - PDF content to convert
* @returns {string} - Extracted text content
* Usage
#   const pdfPath   = 'path/to/your/document.pdf';
#   const outputDir = 'extracted_images';
#   extractImagesFromPDF(pdfPath, outputDir)
#     .then(count => console.log(`Successfully extracted ${count} images`))
#     .catch(err => console.error('Extraction failed:', err));
*/
async function extractImagesFromPDF( pdfPath, outputDir ) {
    const { PDFExtract } =  await import( 'pdf.js-extract' );                           // .(50425.03.1 RAM New PDF parser)
    const   pdfExtract = new PDFExtract();
    const   options = {}; // Default options
    
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync( outputDir )) {
         fs.mkdirSync(  outputDir, { recursive: true });
    }
    
    // Extract data from PDF
    const data = await pdfExtract.extract(pdfPath, options);
    let imageCount = 0;
    
    // Process each page
    data.pages.forEach((page, pageIndex) => {
      // Check for content items that are images
      if (page.content) {
        page.content.forEach((item) => {
          if (item.image) {
            imageCount++;
            const imageFileName = `${outputDir}/image_p${pageIndex + 1}_${imageCount}.png`;
            
            // Save the image
            fs.writeFileSync(imageFileName, item.image);
            console.log(`Extracted image saved to: ${imageFileName}`);
          }
        });
      }
    });
    
    console.log(`Total images extracted: ${imageCount}`);
    return imageCount;
  } catch (error) {
    console.error(`Error extracting images from PDF: ${error.message}`);
    throw error;
  }
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats text by cleaning up excessive whitespace and newlines
 * @param {string} text - Text to format
 * @returns {string} - Formatted text
 */
function  fmtText(text) {
     let formattedText = text.replace(/[\n\r]\s*\n/g, "\n");
         formattedText = formattedText.replace(/    /g, " ");
  return formattedText;
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats search results for display
 * @param {Array} results - Array of result objects
 * @returns {string} - Formatted results as string
 */
function  fmtResults(results) {
  if (results.length === 0) { return ''; }
//const urls = results.map(    result => `${result.FirstURL.trim()}\n       ${ result.Text }`);                                     //#.(50408.07.1)
  const urls = results.filter( result =>    result.FirstURL ).map(result => `${result.FirstURL.trim()}\n       ${result.Text}`);    // .(50408.07.1 RAM Add filter to searchResultsJson )
  return "\n     " + urls.join("\n     ");
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats Ollama model run statistics
 * @param {Object} stats - Statistics object from Ollama response
 * @param {Object} params - Parameters used for the model
 * @returns {Array} - Array of formatted statistics lines
 */
  function  fmtStats( stats, parms ) {
//    var [ aServer, aCPU_GPU_RAM ] = getServerInfo();                                  //#.(50330.04.5 RAM Use it).(50330.04b.1)
//          parms.resp_id  = parms.logfile.split( /[\\\/]/ ).pop().slice(0,24)          //#.(50331.05c.1).(50331.05.1).(50429.09c.1)
            parms.resp_id  = path.basename( parms.logfile ).replace( /_Response.+/, '') // .(50429.09c.1 RAM Accomodate parms.resp_id for aApp2).(50331.05c.1).(50331.05.1)
            
            stats.tokens_per_sec = (stats.eval_count / (stats.eval_duration / 1e9)).toFixed(2)              // .(50419.04.1)
      var [ aServer, aCPU_GPU, aRAM, aPC_Model, aOS ]  = getServerInfo();               // .(50330.04b.1)
       var  statLines = [];
            statLines.push(`Ollama Run Statistics:`);
            statLines.push(`---------------------------------------------------------`);
            statLines.push(`    Server: ${aServer}` )                                   // .(50330.04.6)
            statLines.push(`    Operating System:       ${ aOS }` )                     // .(50330.04b.2)
            statLines.push(`    CPU/GPU/RAM:            ${ aCPU_GPU }, ${aRAM}` )       // .(50330.04b.3).(50330.04.7)
            statLines.push(`    Computer:               ${ aPC_Model }` )               // .(50330.04b.4)
            statLines.push(`    Session.Post ID:        ${ parms.resp_id }` );          // .(50331.05.2)
            statLines.push(`    Model Name:             ${ parms.model }` );
            statLines.push(`    Temperature:            ${ parms.temp }` );             // .(50331.05.3)
            statLines.push(`    Context Window:         ${ parms.options.num_ctx   } bytes`);
            statLines.push(`    Total Duration:         ${(stats.total_duration / 1e9).toFixed(2) } seconds`);
            statLines.push(`    Eval Count:             ${ stats.eval_count        } tokens`);
            statLines.push(`    Eval Duration:          ${(stats.eval_duration  / 1e9).toFixed(2) } seconds`);
            statLines.push(`    Prompt Eval Count:      ${ stats.prompt_eval_count } tokens`);
            statLines.push(`    Tokens per Second:      ${ stats.tokens_per_sec } tps`);                    // .(50419.04.2)
//          statLines.push(`    Factual Accuracy:       ${ stats.Score1 || 0 }` )       //#.(50503.01.1 RAM No scores yet Beg) // "Your answer must be grounded in historical evidence. Avoid speculation unless explicitly presented as such.
//          statLines.push(`    Multiple Perspectives:  ${ stats.Score2 || 0 }` )       //                                     // "Consider the various perspectives and debates among historians regarding the reasons for Rome's decline. Mention at least two major competing theories.
//          statLines.push(`    Structured Response:    ${ stats.Score3 || 0 }` )       //                                     // "Organize your response into clear paragraphs, with headings for clarity.
//          statLines.push(`    Actionable Suggestions: ${ stats.Score4 || 0 }` )       //                                     // "Propose concrete and realistic measures that the Roman emperors might have taken to mitigate the problems, even if they are ultimately speculative. Explain why those measures might have been effective or ineffective based on the historical context.
//          statLines.push(`    Reflection:             ${ stats.Score5 || 0 }` )
//          statLines.push(`    Total Score:            ${ stats.Score1 + stats.Score2 + stats.Score3 + stats.Score4 + stats.Score5 || 0}` ) //#.(50503.01.1 End)
    return  statLines;
            }
//   -- --- ---------------  =  ------------------------------------------------------  #

//          getServerInfo(); debugger
//    var [ aServer, aCPU_GPU_RAM ] = getServerInfo();
//          console.log( `  CPU/GPU/RAM: ${aCPU_GPU_RAM}` ); debugger

  function  getServerInfo( ) {                                                          // .(50330.04.8 RAM Write getServerInfo Beg)
       var  aPC_CODE         =  (process.env.THE_PC_CODE || '').toLowerCase()           // .(50519.04.1 RAM)
       var  aServer          =   process.env.THE_SERVER  || ''
       var  aServer          ="${aPC_CODE}-${ aServer.replace( /^.+-/, '' ) }"          // .(50519.04.2 RAM Put aPC_CODE into THE_SERVER)
       var  aCPU_GPU         =`${process.env.THE_CPU}${                                 // .(50330.04b.5 Beg)
                                (process.env.THE_CPU != process.env.THE_GPU)
                          ? `, ${process.env.THE_GPU}` : '' }`
       var  aModel           =   process.env.THE_PC_MODEL
       var  aOS              =   process.env.THE_OS
       var  aRAM             =   process.env.THE_RAM
   return [ aServer, `${aCPU_GPU}`, aRAM, aModel, aOS ]                                 // .(50330.04b.5 Add aModel, aOS End)
// return { THE_SERVER       :  aServer
//        , CPU_GPU_RAM      : `${aCPU_GPU}, ${aRAM}`
//          }
            } // eof getServerInfo                                                      // .(50330.04.8 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  savStats_4JSON( pStats, pResults, pParms ) {                                // .(50408.06.1 RAM Write savStats_4JSON Beg)
//     var  pJSON            =  savStats4Text( pStats, pParms )
//     var  pJSON            =  pResults
//          pJSON.URLs       =  pResults.URLs
//          pJSON.Docs       =  pResults.Docs
//          pJSON.Stats      =  pStats

        var pWebSearch       =  { }                                                     // .(50409.03.x)
        if (pResults.URLs.length) {                                                     // .(50409.03.x)
        var pWebSearch =                                                                // .(50409.03.x)
                { URL:                pStats.WebSearchURL      // pResults.URLs[0]
                , Prompt:             pParms.websearch                                   // .(50408.06c.1 RAM Was: pStats.WebSearch ) // "roman empire")
                , Response:
                   { AbstractURL:     pResults.WebResponse.AbstractURL  //  "https://en.wikipedia.org/wiki/Roman_Empire_(disambiguation)",
                   , Results:         pResults.WebResponse.Results
                   , RelatedTopics:   pResults.WebResponse.RelatedTopics
                   , URLs:            pResults.URLs
                     }
                  }
            }                                                                           // .(50409.03.x)
        var pDocSearch       =  { }                                                     // .(50409.03.x)
        if (pResults.Files.length) {                                                    // .(50409.03.x)
        var pDocSearch =
                { DocsPath:           pResults.DocsPath
                , Response:
                   { AbstractURL:     pResults.DocResponse.AbstractURL                  //  "https://en.wikipedia.org/wiki/Roman_Empire_(disambiguation)",
                   , Results:         pResults.DocResponse.Results
                   , RelatedTopics:   pResults.DocResponse.RelatedTopics
                   , URLs:            pResults.Docs
                     }
                  }
            }                                                                           // .(50409.03.x)
       var  pJSON =
             { RunId:                 pStats.RespId
             , WebSearch:             pWebSearch                                        // .(50409.03.x)
             , DocSearch:             pDocSearch                                        // .(50409.03.x)
             , ModelQuery:
                { Model:              pParms.model.trim()                               // .(50408.06c.2 RAM Was: pStats.ModelName )
                , Platform:           pResults.Platform
                , CompinedPrompt:
                   { UsrPromptCode:   pStats.QPC                                        // .(50410.04a.5)
                   , UsrPrompt:       pParms.usrprompt                                  // .(50408.06c.3 RAM Was: pStats.UsrPrompt ).(50413.02.1 RAM Was QueryPrompts)
                   , SysPromptCode:   pResults.SysPmtCd                                 // .(50413.02.2)
                   , SysPrompt:       pParms.sysprompt                                  // .(50408.06c.4 RAM Was: pResults.SysPrompt?? not pStats.SysPrompt)
                   , Documents:       pStats.Docs
                   , PromptTemplate:  pResults.PromptTemplate                           //  "{UsrPrompt}. {SysPrompt}, {Docs}"
                   , Prompt:          pResults.Prompt
                     }
                , Response:           pResults.Response
                , RunStats:           {}
                  }
             , Files:
                { TextResponse:       pStats.ResponseFile.replace( /.+docs/i, './docs' )
                , JSONResponse:       pStats.ResponseFile.replace( /.+docs/i, './docs' ).replace( /.txt$/, '.json' )
                  }
               }
//          delete pJSON.ModelQuery.RunStats.ResponseFile
            delete pStats.ResponseFile
            delete pStats.WebSearchURL
            delete pStats.WebSearch
            delete pStats.SysPrompt                                                     // .(50413.02.1)
            delete pStats.UsrPrompt                                                     // .(50413.02.1)
            delete pStats.Docs
            delete pStats.QPC

//          pJSON.ModelQuery.RunStats.ModelName = pJSON.ModelQuery.RunStats.ModelName.trim()
            pStats.ModelName        = pStats.ModelName.trim()
            pStats.ContextSize      = pStats.ContextSize      * 1 //
            pStats.Temperature      = pStats.Temperature      * 1 // "0.07"
            pStats.Duration         = pStats.Duration         * 1 // "  12.49"
            pStats.EvalTokens       = pStats.EvalTokens       * 1 // "  336"
            pStats.EvalDuration     = pStats.EvalDuration     * 1 // "  12.21"
            pStats.PromptEvalTokens = pStats.PromptEvalTokens * 1 // "   555"
            pStats.TokensPerSecond  = pStats.TokensPerSecond  * 1 // " 27.52"
            pStats.RAM              = pStats.RAM              * 1 // "16"

            pJSON.ModelQuery.RunStats  = pStats

    return  JSON.stringify( pJSON, '', 2 )
            }                                                                           // .(50408.06.1 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  savStats_4MD( pStats, pResults, pParms ) {                                  // .(50408.10.1 RAM Write savStats_4MD Beg)
//     var  pJSON            =  savStats4Text( pStats, pParms )
       var  pJSON            =  pResults
            pJSON.URLs       =  pResults.URLs
            pJSON.Docs       =  pResults.Docs
            pJSON.Stats      =  pStats
            }                                                                           // .(50408.10.1 End)
  //   -- --- ---------------  =  ------------------------------------------------------  #

  function  chop( nLen, aStr) {                                                         // .(50410.04c.1 RAM Write chop Beg)
    return  aStr.length > nLen ? `${ aStr.slice( 0, nLen-3 ) }...` : aStr.padEnd( nLen) 
            }                                                                           // .(50410.04c.1
  function  take( nLen, aStr, bSoft) {                                                  // .(50503.01.2 RAM Write take Beg)
            aStr = String( aStr ); if (nLen == 0 ) { return aStr }    
    return  bSoft ? (nLen > aStr.length ? aStr.padEnd( nLen ) : aStr)
                  : (nLen < 0 ? aStr.slice( nLen ).padStart( -nLen )  : aStr.slice( 0, nLen ).padEnd( nLen ) )
            }                                                                           // .(50503.01.x End)
//          console.log( '     ',               "'1234567890123456789012345678'"       )
//          console.log( '23   ', `'${ take( 23, "1234567890123456789012345678"    )}'` )
//          console.log( '23, 1', `'${ take( 23, "1234567890123456789012345678", 1 )}'` )
//          console.log( ' 6   ', `'${ take(  6, "1234567890123456789012345678"    )}'` )
//          console.log( '-8   ', `'${ take( -8, "1234567890123456789012345678"    )}'` )
//          console.log( ' 6, 1', `'${ take(  6, "123", 1                          )}'` )
//          console.log( ' 6   ', `'${ take(  6, "123"                             )}'` )
//          console.log( '-8   ', `'${ take( -8, "123"                             )}'` )
//          process.exit() 
//          makFlds() 
  function  makFlds(  ) {                                                               // .(50503.01.3 RAM Write makFlds Beg)    
    
// TPS|                         -6
//   Duration|                  -7    
//   Web Search Prompt    |     27 chop

    var aTemplate= `
RespId       |                13
HW CD |                        5
Model Name                 |  27 chop
Context|                      -7
 Temp|                        -5
TPS|                          -6
   Duration|                  -7
 Sc|                          -3
 or|                          -3
 es|                          -3
      Date Time   |          -18
UPC|                           3
Model User Prompt|            27 chop
 Eval Duration|               -6
Eval Tokens|                  -5
Prompt Eval Tokens|           -6
SysPmtCd|                      9
Model System Prompt|          35 chop
  Web Search Prompt     |     27 chop
Doc-File Name          |      23 min
Web Search URL         |      23
CPU_GPU                |      23
RAM|                          -3
OS       |                     9
Computer |                     9
Server                               | 37
Response File|  
`
       var  mTemplate = aTemplate.split( "\n" )
//     var  mFlds = [] 
   function fmtFld( aRow, i ) {
//          console.log (i, aRow )
//          mFlds.push( aRow.replace( /\|.+/, '' ) )
    return  aRow.replace( /\|.+/, '' ) 
            }
//          mTemplate.forEach( fmtFld )
       var  mFlds =  mTemplate.map( fmtFld ).slice(1)
//          console.log( mFlds.join( '\t' ) )
    return  mFlds 
        } // eof makFlds                                                                // .(50503.01.3 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  savStats_4Text_v208( stats, parms, aExt ) {                                 // .(50503.01.4 RAM Write new version Beg)
      var [ aServer, aCPU_GPU, aRAM, aPC_Model, aOS ]  = getServerInfo();               // .(50330.04b.6)
       var  pStats  = {};
            pStats.RespId           = take(  13,  parms.resp_id.replace(/\.[0-9]\..+/,"")) // .(50429.09.17) 
            pStats.PCode            = take(   6,  parms.pccode )                        // .(50503.01.5)
            pStats.ModelName        = chop(  27,  parms.model )                         // .(50429.09.18 RAM Remove leading space).(50404.05.01 RAM Make model width 25)
            pStats.ContextSize      = take(  -7,  parms.options.num_ctx )               // .(50404.05.02)
            pStats.Temperature      = take(  -5,  parms.temp )                          // .(50404.05.03)
            pStats.TokensPerSecond  = take(  -6, (stats.eval_count / (stats.eval_duration / 1e9)).toFixed(2) )    // .(50404.05.08)
            pStats.Duration         = take(  -7, (stats.total_duration/1e9).toFixed(2)) // .(50404.05.04)
            pStats.Accuracy         = take(  -3,  0 )                                   // .(50503.01.6)
            pStats.Relevance        = take(  -3,  0 )                                   // .(50503.01.7)
            pStats.Coherence        = take(  -3,  0 )                                   // .(50503.01.8)
            pStats.DateTime         = take( -18,  parms.datetime )                      // .(50413.02.3)
            pStats.UPC              = take(   3,  parms.qpc )                           // .(50410.04a.6 Was QPC).(50407.03.4 RAM Add QPC)
            pStats.EvalTokens       = take(  -5,  stats.eval_count * 1 )                // .(50404.05c.01 RAM Save 'NaN, not 'undefined').(50404.05.05)
            pStats.UsrPrompt        = chop(  27,  parms.usrprompt )                     // .(50410.04c.1).(50410.04b.1 Was stats.query).(50407.03.5 RAM Was Query)
            pStats.EvalDuration     = take(  -6, (stats.eval_duration /1e9).toFixed(2)) // .(50404.05.06)
            pStats.PromptEvalTokens = take(  -5,  stats.prompt_eval_count * 1 )         // .(50404.05c.02).(50404.05.07)
            pStats.SysPmtCd         = take(   9,  parms.spc )                           // .(50413.02.4)
            pStats.SysPrompt        = chop(  35,  parms.sysprompt )                     // .(50410.04c.2).(50413.02.5)
            pStats.WebSearch        = chop(  27,  parms.websearch )                     // .(50410.04c.3).(50330.04c.4)
            pStats.Docs             = take(  23,  stats.docs, 1 )                       // .(50503.01.8 RAM Soft take, i.e. just pad )
            pStats.WebSearchURL     = take(  23,  stats.url, 1 )                        // .(50503.01.9).(50407.03.6)
            pStats.CPU_GPU          = take(  23,  aCPU_GPU, 1 )                         // .(50503.01.10).(50330.04b.7 Beg)
            pStats.RAM              = take(  -3,  aRAM.replace( / *GB/, '' ) )
            pStats.OS               = take(   9,  aOS )
            pStats.Computer         = take(   9,  aPC_Model )                           // .(50330.04b.7 End)
            pStats.Server           = take(  37,  aServer, 1 )
//          pStats.ResponseFile     = take( `file:///${parms.logfile}`                  //#.(50331.05c.3).(50331.05.5)
            pStats.ResponseFile     = take(   0,  parms.logfile.replace( /.+[\\\/]docs/, "./docs")) // .(50331.05d.1).(50331.05c.3).(50331.05.5)
       if (!aExt) { return pStats }                                                     // .(50408.06.3 RAM Just the Stats Jack)
       var  mStats                  =  Object.entries( pStats ).map( pStat => pStat[1] )
       var  mFlds                   =  makFlds() 
       var  aDelim                  =  aExt.match( /tab/ ) ? "\t" : '","',  aQQ = aDelim == "\t" ? '' : '"'
       var  aFlds                   =  mFlds.join( aDelim )
       var  aRow                    =  aQQ + mStats.join( aDelim ) + aQQ                // .(50403.04.2 End)
   return [ pStats, [ aFlds, aRow ] ]                                                   // .(50503.01.4 End).(50403.04.3 RAM Was aCSV)
            }
// ----------------------------------------------------------------------

  function  savStats_4Text_v207( stats, parms, aExt ) {                                 // .(50408.06.2 RAM Was: savStats).(50403.04.1 RAM Add aExt).(50331.03.1 RAM Write savStats)
      var [ aServer, aCPU_GPU, aRAM, aPC_Model, aOS ]  = getServerInfo();               // .(50330.04b.6)
       var  pStats  = {};
//          pStats.RespId           =     parms.resp_id.slice( 0, 11 )                  //#.(50331.05c.2).(50331.05.4).(50429.09.19) 
            pStats.RespId           =     parms.resp_id.replace( /\.[0-9]\..+/, "" )    // .(50429.09.19) 
//          pStats.ModelName        =` ${(parms.model.padEnd( 25 ) )}`                  // .(50404.05.01 RAM Make model width 25).(50429.09.20) 
            pStats.ModelName        = `${(parms.model.padEnd( 25 ) )}`                  // .(50429.09.20 RAM Remove leading space).(50404.05.01 RAM Make model width 25)
            pStats.ContextSize      = `${ parms.options.num_ctx                 }`.padStart(5)                        // .(50404.05.02)
            pStats.Temperature      = `${ parms.temp}`.padStart(4)                                                    // .(50404.05.03)
            pStats.Duration         = `${(stats.total_duration / 1e9).toFixed(2)}`.padStart(7)                        // .(50404.05.04)
            pStats.DateTime         =     parms.datetime.padStart(18)                                                 // .(50413.02.3)
            pStats.EvalTokens       = `${ stats.eval_count                      }`.padStart(5)                        // .(50404.05.05)
            pStats.UPC              =     parms.qpc                                                                   // .(50410.04a.6 Was QPC).(50407.03.4 RAM Add QPC)
//          pStats.QueryPrompt      =     stats.query.length > 27                                                     //#.(50407.03.5 RAM Was Query).(50410.04a.7)
//          pStats.UsrPrompt        =     stats.query.length > 27                                                     //#.(50410.04a.7 Was QueryPrompt).(50407.03.5 RAM Was Query).(50410.04b.1)
            pStats.UsrPrompt        =     chop( 27, parms.usrprompt )                                                  // .(50410.04c.1).(50410.04b.1 Was stats.query).(50407.03.5 RAM Was Query)
//                                  ? `${ parms.usrprompt.slice(0,27)}...` : stats.query.padEnd(27)                   //#.(50410.04b.2)(50407.03.5 RAM Add ...).(50410.04c.1)
            pStats.EvalDuration     = `${(stats.eval_duration  / 1e9).toFixed(2)}`.padStart(7)                        // .(50404.05.06)
            pStats.PromptEvalTokens = `${ stats.prompt_eval_count               }`.padStart(6)                        // .(50404.05.07)
            pStats.TokensPerSecond  = `${(stats.eval_count / (stats.eval_duration / 1e9)).toFixed(2)}`.padStart(6)    // .(50404.05.08)
            pStats.SysPmtCd         =     parms.spc                                                                   // .(50413.02.4)
            pStats.SysPrompt        =     chop( 27, parms.sysprompt )                                                 // .(50410.04c.2).(50413.02.5)
//                                  ? `${ parms.sysprompt.slice(0,27)}...` : parms.sysprompt.padEnd(27)               //#.(50413.02.6).(50410.04c.2)
            pStats.WebSearch        =     chop( 28, parms.websearch )                                               // .(50410.04c.3).(50330.04c.4)
            pStats.WebSearchURL     =     stats.url                                     // .(50407.03.6)
            pStats.Docs             =     stats.docs
            pStats.CPU_GPU          =  aCPU_GPU                                         // .(50330.04b.7 Beg)
            pStats.RAM              =  aRAM.replace( / *GB/, '' )
            pStats.OS               =  aOS
            pStats.Computer         =  aPC_Model                                        // .(50330.04b.7 End)
            pStats.Server           =  aServer
            pStats.ResponseFile     =  `file:///${parms.logfile}`                       // .(50331.05c.3).(50331.05.5)

       if (!aExt) { return pStats }                                                     // .(50408.06.3 RAM Just the Stats Jack)
       var  mStats                  =  Object.entries( pStats ).map( pStat => pStat[1] )
//     var  aCSV                    = `"${ mStats.join( '","' ) }"`                     //#.(50403.04.2 Beg)
//     var  aFlds                   = `Model,URL,Docs,Query,Context,Duration,PromptEvalCount,EvalCount,EvalDuration,TokensPerSecond,Server,CPU_GPU_RAM`
//     var  aFlds                   = `Model,Context,Temperature,Duration,EvalTokens,URL,Docs,Query,EvalDuration,PromptEvalTokens,TokensPerSecond,Server,CPU_GPU_RAM`
//     var  aFlds                   = `RespId,Model,Context,Temperature,Duration,"Eval Tokens",Query,"Eval Duration","Prompt Eval Tokens","Tokens Per Second","Web Search",Docs,URL,CPU_GPU,RAM,OS,Computer,Server,"Response File"`
//     var  mFlds                   =["RespId","Model","Context","Temperature","Duration","Eval Tokens","Query","Eval Duration","Prompt Eval Tokens","Tokens Per Second","Web Search","Docs","URL","CPU_GPU","RAM","OS","Computer","Server","Response File" ]  //#.(50407.03.7)
//     var  mFlds                   =["RespId     ","Model Name               ","Context","Temp","Duration","Eval Tokens","QPC","Model Query Prompt","Eval Duration","Prompt Eval Tokens","Tokens Per Second","Web Search","Docs","Web Search URL","CPU_GPU","RAM","OS","Computer","Server","Response File" ]              //#.(50407.03.7 RAM Add QPC column).(50413.02.7)
       var  mFlds                   =["RespId     ","Model Name               ","Context","Temp","Duration","Date Time","Eval Tokens","UPC","Model User Prompt","Eval Duration","Prompt Eval Tokens","Tokens Per Second","SysPmtCd","Model SYstem Prompt","Web Search","Docs","Web Search URL","CPU_GPU","RAM","OS","Computer","Server","Response File" ]  // .(50413.02.7).(50407.03.7 RAM Add QPC column)

       var  aDelim                  =  aExt.match( /tab/ ) ? "\t" : '","',  aQQ = aDelim == "\t" ? '' : '"'
       var  aFlds                   =  mFlds.join( aDelim )
       var  aRow                    =  aQQ + mStats.join( aDelim ) + aQQ                // .(50403.04.2 End)
   return [ pStats, [ aFlds, aRow ] ]                                                   // .(50403.04.3 RAM Was aCSV)
            }                                                                           // .(50331.03.1)
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Shows hidden characters in a string (useful for debugging)
 * @param {string} str - String to analyze
 * @returns {string} - String with visible representations of hidden characters
 */
function  showHiddenChars( str ) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code === 10) result += "[\\n]";      // Newline
    else if (code === 13) result += "[\\r]"; // Carriage return
    else if (code ===  9) result += "[\\t]";  // Tab
    else if (code === 32) result += "[ ]";   // Space
    else result += str[i];
  }
  return result;
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats the streaming response from Ollama
 * @param {Stream} stream - Ollama response stream
 * @returns {Promise<Array>} - Promise resolving to array containing [stats, result]
 */
async function  fmtStream(stream) {
  let isNewLine = true;
  let result = "";
  let finalStats = null;

  for await (const chunk of stream) {
    if (isNewLine) {
      result += chunk.response;
      if (global.nLog == 1) {
        process.stdout.write(`    ${chunk.response}`);
      }
    } else {
      result += chunk.response;
      if (global.nLog == 1) {
        process.stdout.write(chunk.response);
      }
    }
    isNewLine = chunk.response.endsWith("\n");
    finalStats = chunk;
  }
  return [finalStats, result];
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Creates a readline interface for user input
 * @returns {Object} - Object with promptUser method
 *//*
function  createUserInput() {                             //#.(50330.03.3 RAM Remove createUserInput Beg)
  const { createInterface } = require('readline');

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Function to prompt user asynchronously
  const promptUser = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  return {
    promptUser,
    close: () => rl.close()
  };                                                      //#.(50330.03.3 End)
} */
//   -- --- ---------------  =  ------------------------------------------------------  #

    export  default {  // Export as default object with named functions
            ask4Text,                                     // .(50330.03.4)
//          createUserInput                               //#.(50330.03.5)
            extractTextFromPDF,                           // .(50425.03.2) 
            extractImagesFromPDF,                         // .(50425.03.3)
            fmtText,
            fixPath,                                      // .(50425.03.4
            getConfig,                                    // .(50428.01.8)  
            get1stFile,                                   // .(50428.02.6)  
            fmtStream,
            htmlToText,
            fmtResults,
            fmtStats,
            readText,                                     // .(50428.01.9)
//          savStats      : savStats_4Text,               //#.(50408.06.4).(50331.03.3)
            savStats4Text : savStats_4Text_v208,          // .(50503.01.11).(50408.06.4)
            savStats4JSON : savStats_4JSON,               // .(50408.06.5)
//          savStats4MD   : savStats_4MD,                 // .(50408.10.2)
//          getEnvVars,                                   //#.(50403.02.6).(50331.04.2)
            showHiddenChars,
            shoMsg,                                                                     // .(50404.01.26)
            sqzLines,                                     // .(50503.08.2)
            wrap                                          // .(50330.05.2)
            };
// --  ---  --------  =  --  =  ------------------------------------------------------  #
/*========================================================================================================= #  ===============================  *\
#>      AIC90 END
\*===== =================================================================================================== */
/*\
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
\*/
