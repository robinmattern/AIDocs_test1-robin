
   import   pCities      from './Cities_c23.mjs'
   import   pCountries   from './Countries_c23.mjs'

   import { divToggle }  from './Section3_Excel.mjs'

       var  ThePort3     =  50133
       var  TheHost3     = `http://localhost:${ThePort3}`
       var  TheHost4     = `http://localhost:50144`                                                     // .(31109.02.4 RAM Add Server4/s44 MySQL app)
       var  TheSQLchgd   =  false                                                                       // .(31115.03.1 RAM Track if User edited the SQL)

//  ------  ------------------------------------------------------------------------------------

//                                   setListeners( TheHost3 )       // set Listeners for six fields and buttons below
  $( document ).ready( function( ) { setListeners( TheHost3 ) } )                                       // .(31115.02.1 RAM Use jQuery's ready()) 

//  ------  --------------------------------------------------

  function  setListeners( aHost ) {

            $( '#btnShoAccess'   ).click(  function( ) { btnShoAccess_Form_onClick( ) } )   

            $( '#selGetData'     ).change( function( ) { btnSelGetData_onChange()  } )                  // .(31113.03.1 RAM Added)
            $( '#fldPopulation'  ).change( function( ) { fldPopulation_onChange()  } )                  // .(31114.01.1)
            $( '#radPopAbove'    ).change( function( ) { fldPopulation_onChange()  } )                  // .(31114.01.2)
            $( '#radPopBelow'    ).change( function( ) { fldPopulation_onChange()  } )                  // .(31114.01.3)
            $( '#fldSQLquery'    ).change( function( ) { TheSQLchgd = true         } )                  // .(31115.03.2)
    
//          $( '#btnGetData'     ).click(  function( ) { btnGetData_onClick( ) } )  

//          $( '#frmGetData'     ).action                     = `${aHost}/access/cities`
            $( '#frmGetData'     ).on( "submit",                 frmGetData_onClick        )            // .(31114.01.4 RAM So why does this work??)
//          $( '#frmGetData'     ).on( "submit", function(   ) { frmGetData_onClick(   ) } )            //#.(31114.01.4 RAM Actually it doesn't. But it did.)
//          $( '#frmGetData'     ).on( "submit", function( e ) { frmGetData_onClick( e ) } )            //#.(31114.01.4 RAM Should we pass event object?)

         }; // eof setListeners
//  ------  --------------------------------------------------------------------

     async  function  doCountries23( aDiv, aURL ) {
       var  aDiv =  aDiv ? aDiv : `divTable3b`
       var  aURL =  aURL ? aURL : `${TheHost3}/access/world/countries`  // or any valid path
//     var  aURL =                `${TheHost3}/excel/world/countries`   // or any valid path
            aURL =  aURL.replace( / /g, "%20" )                                                         // .(31107.02.3 RAM Can't send spaces)

       var  aSvr =  aURL.match( TheHost3 ) ? "Access" : "MySQL"                                         // .(31109.02.4 RAM For the Error msg)
       var  bOk  =  await  pCountries.fmtCountries( aDiv, aURL )        // See fmtCountries() in './components/Cities_c23.mjs'

       if (!bOk) {  alert( `Make sure the Express ${aSvr} Server is running at URL:\n  ${aURL}.` )      // .(31109.02.5)
                    window.location.reload();
            }
         }; // eof doCountries23
//  ------  --------------------------------------------------------------------

     async  function  doCities23( aDiv, aURL ) {
       var  aDiv =  aDiv ? aDiv : `divTable3b`
       var  aURL =  aURL ? aURL : `${TheHost3}/access/world/cities`     // or any valid path
//     var  aURL =                `${TheHost3}/excel/world/cities`      // or any valid path
            aURL =  aURL.replace( / /g, "%20" )                                                         // .(31107.02.4 RAM Can't send spaces)
//          aURL =  aURL.replace( /\?SQL.*/, "" )                                                       //#.(31107.02.5 RAM Remove ?SQL=select ... )

       var  aSvr =  aURL.match( TheHost3 ) ? "Access" : "MySQL"                                         // .(31109.02.5 RAM For the Error msg)
       var  bOk  =  await  pCities.fmtCities( aDiv, aURL )              // See fmtCities() in './components/Countries_c23.mjs'
       if (!bOk) {  alert( `Make sure the Express ${aSvr} Server is running at URL:\n  ${aURL}.` )      // .(31109.02.x)

                    window.location.reload();
            }
         }; // eof doCities23
//  ------  --------------------------------------------------------------------

  function  chkSQL( aForm, aTable ) {                                                                   // .(31114.01.5 RAM Beg Write / Use function)

       if (!aTable) {                                                                                   // .(31114.03.1 RAM Beg Define aTable here)
       var  pLocation   =  $('#selGetData')[0];
       var  aLocation   = `${ pLocation[ pLocation.selectedIndex ].innerText.substring(1) }`
       var  aTable      =  aLocation.match( /countries/) ? "country" : "city"
            }                                                                                           // .(31114.03.1 RAM End)
       var  pForm       =  $( aForm )[0]                                                                // .(31114.01.6 RAM Was: $( '#frmGetData' )[0])

        if (TheSQLchgd ==  false) {                                                                     // .(31115.03.3)

       var  nPopulation =  pForm.fldPopulation.value.replace( /,/g, "" )
        if (nPopulation.replace( /[0-9]*/, "" ) != "" ) {
            alert(        " * The Population must be a number." )
            return 'SQL-NotOK'                                                                          // .(31114.01.7)
            }
       var  aCondition  =  pForm.radPopulation.value // == "above" ? ">=" : "<="
            aCondition  = (aCondition == "" && nPopulation > 0) ? 'above' : aCondition                  // .(31107.03.2 RAM )
            pForm.radPopulation.value = aCondition                                                      // .(31107.03.3 RAM )

       var  aSQL        =  pForm.fldSQLquery.value
        if (aSQL == "") {
            aSQL        = `select * from ${aTable}`
        } else {                                                                                        // .(31114.04.1 RAM Beg Use existing SQL if present)
            aSQL = `${aSQL} `.replace( /from (.+?)[\n ]+[\w\W]*/g, 'from $1' )
            }                                                                                           // .(31114.04.1 RAM End)
        if (aCondition != '') {
        if (nPopulation > 0 || aCondition == "above") {                                                 // .(31115.03.4 RAM Don't add belore zero)
            aCondition  = (aCondition == "above") ? ">=" : "<="
            aSQL       += `\n where Population ${aCondition} ${nPopulation * 1}`
            }  }                                                                                        // .(31115.03.5)
//          }                                                                                           //#.(31114.04.1)
            pForm.fldSQLquery.value = aSQL
        } else {                                                                                        // .(31115.03.6)    
            aSQL        =  pForm.fldSQLquery.value                                                      // .(31115.03.7 RAM May want to validate SQL) 
            }                                                                                           // .(31115.03.8) 
        if (aSQL == "" ) {
            alert(       " * Please enter a SQL statement or just enter a Population value." );
            return "SQL-NotOK"                                                                          // .(31114.01.8)
        } else {
//          aURL        =  `${ aURL.trim() }?SQL=${ aSQL.replace( /\n */g, " ") }`                      // .(31114.01.9)
            aSQL        =  `${ aSQL.replace( /\n */g, " ") }`
    return  aSQL                                                                                        // .(31114.01.10)
            }                                                                                           // .(31114.01.11)
//  ------  --------------------------------------------------
         }; // eof chkSQL                                                                               // .(31114.01.5 RAM End) 
//  ------  --------------------------------------------------------------------

  function  btnSelGetData_onChange() {
            console.log( "  Creating SQL for new Data Source" )
            TheSQLchgd = false                                                                          // .(31115.03.9)            
         $('#frmGetData')[0].fldSQLquery.value = ''                                                     // .(31114.03.2 RAM Remove SQL here).(31113.01.1 RAM Added)
            chkSQL( '#frmGetData' ) // , aTable )                                                       // .(31114.03.3 Reset SQL).(31114.03.1 RAM Remove aTable)
         }; // eof btnSelGetData_onChange
//  ------  --------------------------------------------------

  function  fldPopulation_onChange() {                      // Modify SQL
            TheSQLchgd = false                                                                          // .(31115.03.10 RAM Reset it)            
            console.log( "  Adding population condition to SQL" )
            chkSQL( '#frmGetData' ) // , aTable )                                                       // .(31114.03.1 RAM Define aTable in function)
         }; // eof fldPopulation_onChange
//  ------  --------------------------------------------------

  function  btnShoAccess_Form_onClick( ) {                  // Open/Close Access Form 
            divToggle( "Section3b", "ShoAccess" )           // See divToggle() in './components/Section3_Excel.mjs'
         }; // eof btnShoAccess_Form_onClick
//  ------  --------------------------------------------------
/*
  function  btnGetData_onClick( ) {
            divToggle( "Table3b",   "GetData" )             // See divToggle() in './components/Section3_Excel.mjs'
         }; */ // eof btnGetData_Form_onClick
//  ------  --------------------------------------------------

     async  function  frmGetData_onClick( pEvent ) {        // Click on Show Data. needs to be async ?  // .(31114.02.1 RAM Breakout seperate getData function?)
            pEvent.preventDefault( );                       // Prevent the form from being submitted by browser

//   if ($('#divTable3b').is( ':hidden') == false) {        // Hide Data table in Access Form if open   //#.(31107.03.1 RAM No Workie) 
     if ($('#divTable3b')[  0 ].hidden   == false) {        // Hide Data table in Access Form if open   // .(31107.03.1 RAM )
            divToggle(     "Table3b", "GetData" )           // See divToggle() in './components/Section3_Excel.mjs'
     if ($('#divTable3b')[  0 ].innerHTML.replace( /\n +/, '' ) != '') {                                // .(31107.03.9 RAM Blank line not hidden)
         $('#divTable3b')[  0 ].innerHTML = ''                                                          // .(31107.03.11 RAM Clear out the data)
//       $('#frmGetData')[0].fldSQLquery.value = ''                                                     //#.(31114.03.2 RAM Remove SQL in btnSelGetData_onChange).(31113.01.1 RAM Added)          
            return }                                                                                    //#.(31107.01.1 RAM Keep going. But why did it think it was open, when it wasn't???)
            } 
       var  pLocation   =  $('#selGetData')[0];
       var  aURL        = `${ TheHost3 }/${ pLocation[ pLocation.selectedIndex ].innerText.substring(1) }`
            aURL        =  aURL.match( /mysql/i   ) ?  aURL.replace( /.+mysql/, `${TheHost4}/api` ) : aURL // .(31109.02.x RAM switch Host for MySQL)
       var  aTable      =  aURL.match( /countries/) ? "country" : "city"

       var  aSQL        =  chkSQL( '#frmGetData', aTable )                                              // .(31114.01.12 RAM Use function)
        if (aSQL == 'SQL-NotOK') { return }                                                             // .(31114.01.13)
            aURL        =  `${ aURL.trim() }?SQL=${ aSQL }`                                             // .(31114.01.14)

        if (aTable == 'city'   ) { await doCities23(     'divTable3b',  aURL ); }  // see doCities23() above 
        if (aTable == 'country') { await doCountries23(  'divTable3b',  aURL ); }  // see doCountries() above 

     if ($('#divTable3b').is(':hidden') == true) {                                                      // .(31109.02.6 RAM ??)
            divToggle( 'Table3b', 'GetData'  ) // , "show" )                                            // .(31109.02.6)
//          divToggle( 'Table3b', 'GetData', 'hide' )                                                   //#.(31109.02.6 RAM ??)
            }                                                                                           //#.(31109.02.7)
         }; // eof frmGetCities_onClick
//  ------  --------------------------------------------------
