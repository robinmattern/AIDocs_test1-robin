
       var  ThePort2  =  50122
       var  TheHost2  = `http://localhost:${ThePort2}`
// -------  -----------------------------------------------------

  function  btnButton2_onClick( ) {
       var  pSection  =  $( "#divSection2" )
       var  pButton   =  $( "#btnButton2"  )

            pSection.toggle()
            pButton.html(    pSection.hidden ? "Show Table" : "Hide Table" )

            doCountries2( )

         }; // eof btnButton2_onClick
// -------  -----------------------------------------------------

   async function doCountries2( aDiv, aURL ) { // can't return a value
       var  aDiv      =  aDiv ? aDiv : `tblCountries2`
       var  aURL      =  aURL ? aURL : `${TheHost2}/api/countries`

       var  bOk       =  await  pCountries.fmtCountries( aDiv, aURL )
       if (!bOk) {  alert( `Make sure the Json Server is running on at this URL:\n  ${aURL}.`)
            window.location.reload();
            }
         }; // eof doCountries2
//  ------  --------------------------------------------------------------------
