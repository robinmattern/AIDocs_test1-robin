
   import   pCities      from './Cities_c23.mjs'
   import   pCountries   from './Countries_c23.mjs'



       var  ThePort3     =  50133
       var  TheHost3     = `http://localhost:${ThePort3}`
       var  TheDataPath  = 'C:\\Repos\\FRApps\\server3\\s33_express-xlsx-server-api\\data'              // . (31115.04.1 RAM Use it later)
       var  TheExcelFile = 'Countries.xlsx'                                                             // . (31115.04.2)

//          --------------------------------------------------

            setListeners( TheHost3 )   // set Listeners for three buttons below

  function  setListeners( aHost ) {

            $( '#btnShoExcel'  ).click(  function( ) { btnShoExcel_Form_onClick(                           ) } )

            $( '#btnGetExcel'  ).click(  btnOpnLink_onClick.bind(  null,     `${aHost}/download/countries` ) )  // scope, i.e. this
            $( '#btnGetJSON'   ).click(  btnGetJSON_onClick.bind(  null,     `${aHost}/download/json`      ) )  //   is global
//          $( '#btnGetJSON'   ).click(  btnGetJSON_onClick.bind(  null,     `${aHost}/excel/countries`    ) )  //   is global
//          $( '#btnShoTable'  ).click(  btnShoTable_onClick.bind(           `${aHost}/download/json`      ) )  //   is button
            $( '#btnShoTable'  ).click(  btnShoTable_onClick.bind(           `${aHost}/excel/countries`    ) )  //   is button
            $( '#selGetJSON'   ).change( selGetJSON_onChange       )
//          $( '#frmUpload'    ).action                                    = `${aHost}/upload`
            $( '#frmUpload'    ).on( "submit", frmGetExcel_onClick )

            $( '#fldExcelFile' ).change( fldExcelFile_onChange     )                                 // .(31115.04.x)  

         }; // eof setListeners
//  ------  --------------------------------------------------------------------

     async  function  doCountries23( aDiv, aURL ) {
       var  aDiv =  aDiv ? aDiv : `divTable3a`
       var  aURL =  aURL ? aURL : `${TheHost3}/excel/countries`

       var  bOk  =  await  pCountries.fmtCountries( aDiv, aURL )
       if (!bOk) {  alert( `Make sure the Express Excel Server is running at URL:\n  ${aURL}.`
                       + '\n  And that you have uploaded a Countries spreadsheet.' )
                    window.location.reload();
            }
         }; // eof doCountries3
//  ------  --------------------------------------------------------------------

     async  function  doCities23( aDiv, aURL ) {
       var  aDiv =  aDiv ? aDiv : `divTable3a`
       var  aURL =  aURL ? aURL : `${TheHost3}/excel/world/cities`

       var  bOk  =  await  pCities.fmtCities( aDiv, aURL )
       if (!bOk) {  alert( `Make sure the Express Excel Server is running at URL:\n  ${aURL}.`
                       + '\n  And that you have uploaded a world spreadsheet.' )
                    window.location.reload();
            }
         }; // eof doCities23
//  ------  --------------------------------------------------------------------








  
  

  
//  ------  --------------------------------------------------------------------

  function  fldExcelFile_onChange( pEvent ) {                                                           // .(31115.04.x RAM Add it)
       var  pFld  =  $('#fldExcelFile')[0]  // pEvent.target
       var  aFile =  pFld.value.replace( /.*[\\\/]/, '' )
            aFile = `${TheDataPath}\\${ aFile ? aFile : TheExcelFile }`
            $('#fldUpload')[0].innerHTML = `Upload the Excel spreadsheet file from here: ${aFile}`      // .(31115.04.2)
         }; // eof fldExcelFile_onChange                                                                // .(31115.04.x RAM Add it)
//  ------  --------------------------------------------------

  function  frmGetExcel_onClick( pEvent ) { 
            pEvent.preventDefault( ); // Prevent the form from being submitted by browser
       var  pForm = pEvent.target
            pForm.action = `${TheHost3}/upload` 
       var  aFile = pForm.fldExcelFile.value.replace( /.*[\\\/]/, '' )   
        if (aFile == '') {
            alert( "* Please select a file to upload.")
            return 
            }
            alert( `Uploading Excel File, ${aFile}, to ${ pForm.action }`)
            pForm.submit() 
         }; // eof frmGetExcel_onClick
//  ------  --------------------------------------------------

  function  btnShoExcel_Form_onClick( aURL ) {
            divToggle( "Section3",  "ShoExcel" )
         }; // eof btnShoExcel_onClick
//  ------  --------------------------------------------------

  function  btnOpnLink_onClick( aURL ) {
//          window.location = aURL
            window.open( aURL, "_blank" )
         }; // eof btnOpnLink_onClick
//  ------  --------------------------------------------------

  function  selGetJSON_onChange( pEvent ) {
//      if ($('#divSection3a').is(  ':hidden' ) == false) {
//          divToggle( "Section3a", "ShoTable", "hide" )  // -> Show Table 
//          }
            btnShoTable_onClick( '', 'hide' ) 
        };  // eof selGetJSON_onChange
//  ------  --------------------------------------------------

  function  btnGetJSON_onClick( aURL ) {
       var  pLocation    =  $( "#selGetJSON" )[0];
       var  aURL         = `${  TheHost3  }${ pLocation[ pLocation.selectedIndex ].innerText }`
            btnOpnLink_onClick( aURL )
         }; // eof btnGetJSON_onClick
//  ------  --------------------------------------------------------------------




  async function  btnShoTable_onClick( aURL, bGetJSON_onChange ) { // doesn't need to be async
       var  aHideMaybe   =  bGetJSON_onChange == 'hide' ? 'show' : 'toggle'
       var  bVisible     =  divToggle( "Section3a", "ShoTable", aHideMaybe )  // -> Hide Table if selGetJSON_onChange, i.e. Display table 
        if (bVisible ) {
       var  pLocation    =  $( "#selGetJSON" )[0];
       var  aURL         = `${ TheHost3 }${ pLocation[ pLocation.selectedIndex ].innerText  }`
       var  aTable       =  aURL.match( /countries/) ? "country" : "city"

            $("#divTable3a")[0].innerHTML = ''
        if (aTable == "city"   ) { await doCities23(     "divTable3a",  aURL ); }
        if (aTable == "country") { await doCountries23(  "divTable3a",  aURL ); }
        //  unless you want to do something here
            }
         }; // btnShoTable_onClick
//  ------  --------------------------------------------------

  function  divToggle( aSection, aButton, aHide ) {
       var  pSection     =  $( `#div${aSection}` )   // $( '#divSection3'
       var  pButton      =  $( `#btn${aButton}`  )   // $( '#btnShoTable'
       var  pLabel       =  $( `#lab${aButton}`  )   // $( '#labShoTable'
//     var  aWhat        =  aButton.substr(3);   aWhat += (aWhat == "Cities") ? " Form" : ""
       var  aWhat        =  aButton.substr(3) + (aButton.match(/Cities|Access|Excel/) ? " Form" : "")

//          pSection     =  pSection[0] ? pSection[0] : pSection 
       if (`${aHide}`.match( /Hide|Show/i ) ) {
//          pSection.visible  = aHide.match( /Hide/i ) ? false : true
//          pSection.css( 'visibility', aHide.match( /Hide/i ) ? 'hidden' : 'visible' );  // doesn't seem to work 
       var  bHidden      =  aHide.match( /Hide/i ) != null 
        } else {
            pSection.toggle()
       var  bHidden      =  pSection.is( ':hidden')
            }
       var  aBtnText     = `${ bHidden ? "Show" : "Hide" } ${ aWhat }`
//          pButton.id   ?  pButton.html( aBtnText )   : pButton[0].value     = aBtnText    // Kludge for <input> 
//          pButton.id   ?  pButton.html( aBtnText )   : pButton[0].innerHTML = aBtnText    // Kludge for <input> 
        if (pButton.id) {   pButton.html( aBtnText )
        } else {            pButton[0].value = aBtnText; pButton[0].innerHTML = aBtnText }
        if (pLabel.html( )) {
        if (bHidden)  { // pSection.is(   ':hidden' )) {
            pLabel.html(    pLabel.html().replace( /Hide/, "Display" )  )
//          return false
        } else {
            pLabel.html(    pLabel.html().replace( /Display/, "Hide" )  )
//          return true
            }  }
    return !bHidden 
         }; // eof divToggle
//  ------  --------------------------------------------------------------------

export { divToggle }
