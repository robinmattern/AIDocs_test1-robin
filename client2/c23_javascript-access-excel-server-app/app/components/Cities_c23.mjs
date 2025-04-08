       var  ThePort3     =  50133
       var  TheHost3     = `http://localhost:${ThePort3}`
       var  ThePort4     =  50144                                                                       // .(31109.02.1 RAM Add MySQL City table) 
       var  TheHost4     = `http://localhost:${ThePort4}`                                               // .(31109.02.2)

       var  nTest =  6;     

            nTest =  typeof( process ) == 'undefined' ? 0 :                                             
            nTest = (process.argv[2] ? process.argv[2] : nTest)                                         // .(31108.01.1 RAM Use arg when run via node)
 
        if (nTest ==  1) {  testCities23(  ) }                                                          // .(31108.01.2 RAM Beg Change doCities23())
        if (nTest ==  2) {  testCities23( `${TheHost3}/excel/world/cities` ) }
        if (nTest ==  3) {  testCities23( `${TheHost3}/access/world/cities`) }
        if (nTest ==  4) {  testCities23( `${TheHost3}/access/world/cities?SQL`  ) }
        if (nTest ==  5) {  testCities23( `${TheHost3}/access/world/cities?SQL=select * from city` ) }
        if (nTest ==  6) {  testCities23( `${TheHost3}/access/world/cities?SQL=select * from table`) }  // .(31108.01.2 RAM End)  
        if (nTest ==  7) {  testCities23( `${TheHost3}/access/world/cities?SQL=select * from city where Population > 9999999`) }  

        if (nTest == 10) {  testCities23( ) }  
        if (nTest == 11) {  testCities23( `${TheHost4}/api/cities` ) }                                  // .(31109.02.3 RAM Beg)
        if (nTest == 15) {  testCities23( `${TheHost4}/api/cities?SQL=select * from city` ) }  
        if (nTest == 17) {  testCities23( `${TheHost4}/api/cities?SQL=select * from city where Population > 9999999` ) }  // .(31109.02.3 RAM End) 

// -------  -----------------------------------------------------
/* for debugging ......  */

     async  function  testCities23( aURL ) {                    // can't return a value                 // .(31108.01.3 RAM End)

            aURL         =  aURL ? aURL : `${TheHost3}/excel/world/cities`
            aURL         =  aURL.replace( / /g, "%20" )                                                 // .(31107.02.1 RAM Can't send spaces)

       var  aHTML        =  await  fmtCities( '', aURL )        // calls getCities() then formats the data   
       if (!aHTML) {
       var  aMsg         = `\n * Error: ${ 'Is Server running?' }`                                      // .(31108.02.4 RAM Was aMsg: 'unknown')
            console.log(   `\n * Unable to retreive city data from URL, ${aURL}! ${aMsg}` ) 
       } else {
            console.log(   `\n   ${ aHTML.substring( 0, 800 ) + ' ...' }` ); var n = aHTML.split( /eachRow/ ).length - 1
            console.log(   `\n   Formatted ${ n } cit${ n == 1 ? 'y' : 'ies' }.` )
            }
         }; // eof doCities23
// -------  -----------------------------------------------------

     async  function  getCities( aURL ) {                       // Must define async function to use with await below   
       try {
       var  nRows        =  -1
       var  pResponse    =  await  fetch( aURL )                // Never returns !! if called by client Cities_c23.mjs in broswer, works in VSCode/Node??   

//     var  aType        =  await  pResponse.headers.get('content-type'); bNotJSON = /application\/json/.test( aType ); console.log( "bNotJSON", bNotJSON )
       var  aStatus      =  await  pResponse.statusText;  console.log( "   aStatus", aStatus ) // it's not a function. 'OK' 
       var  nStatus      =  await  pResponse.status;      console.log( "   nStatus", nStatus ) // it's not a function.  200, 404, etc 
       var  bNotOK       =! await  pResponse.ok;          console.log( "   bNotOk ", bNotOK  ) // it's not a function.  true or false
        if (bNotOK)      {  console.log( "Cities[44]   fetch failed, OK == false" ); return -1 } 

       var  bNotJSON     = (await  pResponse.headers.get('content-type')).match( /application\/json/) == null; console.log( "   bNotJSON", bNotJSON )
        if (bNotJSON)    {  
       var  aText        = (await  pResponse.text() ).replace( /.*alert\( *"/, "" ).replace( /" *\).+/, '')    // .(31108.02.x Remove "<script> aalert( aMsg ) </script>")
  return { 'html': aText.replace( /" \+ "Press.+/, "").replace( /\\n/g, "<br>" ) } }
       var  aBody        =  await  pResponse.body;       console.log( "aBody", aBody )     // it's not a function. ReadableStream { locked: false, state: 'readable', supportsBYOB: false }

       var  pJSON        =  await  pResponse.json( )
        if (pJSON.error) { 
                            console.log( "Cities[54]  ", pJSON.error ); return -1 
            }
            pJSON        =  pJSON[ 'api/cities' ] ? { cities: pJSON['api/cities'] } : pJSON             // .(31109.01.2 RAM MySQL API Should return use pJSON.cities)
            pJSON        =  pJSON[ 'cities'     ] ?   pJSON               : { cities: pJSON }
       var  nRows        = (typeof( pJSON.cities.length) != 'undefined' ) ?  99 : -1
       var  mCities      =  pJSON.cities.filter( (pCity, i) => { return i < nRows } )
    return  mCities
        } catch ( pErr ) {  console.log( "Cities[61]  ", pErr )
    return  nRows }           // alert( `Can't fetch ${aURL}`) }

            }; // eof getCities
//  ------  ---------------------------------------------

     async  function  fmtCities( aDiv, aURL ) {

       var  mCities      =  await getCities( aURL )             // Must assign mCountries here with await. See getCities() above 
//     var  mCities      =  [ { ID: 1, CountryCode: "USA", Name: "Reston", District: "Fairfax", Population: 234567 } ]

        if (mCities     == -1) { return  false }
        if (mCities.html     ) { return mCities.html }          // .(31108.02.x RAM New possibility )

       var  pCity_Flds      =
             { "ID"         : "ID"           // [3]
             , "CountryCode": "Code"         // [1]
             , "Name"       : "City Name"    // [4]
             , "District"   : "District"     // [2]
             , "Population" : "Population"   // [5]
                }

       var  mHTML_Rows   =  [ ]
            mHTML_Rows.push(   fmtCity_Header(  mCities[0], pCity_Flds ) )
            mHTML_Rows.push(  ...mCities.map( fmtCity_Row  ) )
            mHTML_Rows.push( `    <tr class="lastRow" ><td colspan="5"></td></tr>` )

        if (aDiv) {
       var  pCities_Div              =  $( '#' + aDiv )[0]   // `#${aDiv}`
            pCities_Div.innerHTML    =  mHTML_Rows.join( "\n" )
    return  true
        } else {
    return                              mHTML_Rows.join( "\n" )
            };

//  ------  ---------------------------------------------

  function  fmtCity_Header( pCity, pCity_Flds ) {

       var  mFlds        =  Object.keys( pCity_Flds )
       var  fmtFld       =( aFld ) => `<th class="${ aFld }-th">${ pCity_Flds[ aFld ] }</th>`
       var  aHTML_Row    = `
    <tr>
      ${ fmtFld( mFlds[0] ) }
      ${ fmtFld( mFlds[1] ) }
      ${ fmtFld( mFlds[2] ) }
      ${ fmtFld( mFlds[3] ) }
      ${ fmtFld( mFlds[4] ) }
    </tr> `
    return  aHTML_Row.substring(1)
            }; // eof fmtCity_Header
//  ------  ---------------------------------------------

  function  fmtCity_Row( pCity, i ) {
       var  aColor       =  i % 2 == 1 ? '#EFF8F8'  : '#DEEEF7'
       var  aRow_ID      = `id="R${ `${ i + 1 }`.padStart( 3, "0" )}"`

       var  mFlds        =  Object.keys( pCity_Flds )
       var  fmtFld       =( aFld ) => `<td bgColor="${aColor}" class="${ aFld }-td"> ${ pCity[ aFld ] }</td>`

       var  aHTML_Row    = `
    <tr ${aRow_ID} Class="${ `eachRow ${aColor}` }">
      ${ mFlds.map( fmtFld ).join( '\n      ' ) }
    </tr> `

/*
       var  aHTML_Row    = `
  <tr ${aRow_ID} Class="${`eachRow ${aColor}`}">
    <td bgColor="${aColor}" class="ID-td"          > ${ pCity.ID          }</td>
    <td bgColor="${aColor}" class="CountryCode-td" > ${ pCity.CountryCode }</td>
    <td bgColor="${aColor}" class="CityName-td"    > ${ pCity.CityName    }</td>
    <td bgColor="${aColor}" class="District-td"    > ${ pCity.District    }</td>
    <td bgColor="${aColor}" class="Population-td"  > ${ pCity.Population  }</td>
  </tr> ` */
    return  aHTML_Row.substring(1)
            }; // eof fmtCity_Row
//  ------  ---------------------------------------------
         }; // eof fmtCities
//--------  --------------------------------------------------------

       var  Cities = { fmtCities, getCities } // , doCities23 }
    export  default Cities

// -------  -----------------------------------------------------
