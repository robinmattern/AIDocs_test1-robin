       var  ThePort2     =  50122
       var  TheHost2     = `http://localhost:${ThePort2}`
       var  ThePort3     =  50133
       var  TheHost3     = `http://localhost:${ThePort3}`
       var  ThePort4     =  50144                                                                       // .(31109.02.1 RAM Add MySQL City table) 
       var  TheHost4     = `http://localhost:${ThePort4}`                                               // .(31109.02.2)

       var  nTest =  10;    nTest = typeof( process ) != 'undefined' ? nTest : 0         
        if (nTest ==  1) {  testCountries23( `http://localhost:50122/api/countries` ) }
//      if (nTest ==  2) {  testCountries23( `${TheHost2}/download/json` ) }
        if (nTest ==  2) {  testCountries23( `${TheHost2}/api/countries` ) }

        if (nTest ==  3) {  testCountries23(  ) }
        if (nTest ==  4) {  testCountries23( `${TheHost3}/excel/world/countries` ) }
        if (nTest ==  5) {  testCountries23( `${TheHost3}/access/world/countries`) }
        if (nTest ==  6) {  testCountries23( `${TheHost3}/access/world/countries?SQL`) }
        if (nTest ==  7) {  testCountries23( `${TheHost3}/access/world/countries?SQL=select * from country`) }
        if (nTest ==  8) {  testCountries23( `${TheHost3}/access/world/countries?SQL=select * from table`  ) }

        if (nTest ==  9) {  testCountries23( `http://localhost:50144/api/countries` ) }
        if (nTest == 10) {  testCountries23( `${TheHost4}/api/countries` ) }                            // .(31109.02.3 RAM Beg)
        if (nTest == 11) {  testCountries23( `${TheHost4}/api/countries?SQL=select * from city` ) }  
        if (nTest == 12) {  testCountries23( `${TheHost4}/api/countries?SQL=select * from city where Population > 9999999` ) }  // .(31109.02.3 RAM End) 

// -------  -----------------------------------------------------
/* for debugging ......  */

     async  function testCountries23( aURL ) {  // can't return a value

            aURL         =  aURL ? aURL : `${TheHost3}/excel/world/countries`
       var  aHTML        =  await  fmtCountries( '', aURL )
       if (!aHTML) {
       var  aMsg         = `\n * Error: ${ 'unknown' }`
            console.log( `Unable to retreive country data from URL, ${aURL}! ${aMsg}` ) 
       } else {
            console.log(  aHTML.substring( 1, 800 ) + ' ...' )
            console.log( `\n  Formatted ${ aHTML.split( /eachRow/ ).length - 1 } countries` )
            }
         }; // eof testCountries23
// -------  -----------------------------------------------------

     async  function  getCountries( aURL ) {        // Must define async function to use with await below
       try {
       var  nRows        =  -1
       var  pResponse    =  await  fetch( aURL )    // Never returns !!
       var  pJSON        =  await   pResponse.json( )
            pJSON        =  pJSON[ 'api/countries' ] ? { countries: pJSON['api/countries'] } : pJSON    // .(31113.02.1 RAM Need it for /mysql/..).(30913.01.3 RAM Express Server route)
            pJSON        =  pJSON[ 'countries' ]     ?   pJSON                  : { countries: pJSON }  // .(30911.01.3 RAM JSON Server route)
       var  nRows        = (typeof( pJSON.countries.length) != 'undefined' ) ? 99 : -1                  // .(30918.03.2 RAM Err not an Array)
       var  mCountries   =  pJSON.countries.filter( (pCountry, i) => { return i < nRows } )             // .(30831.03.1 RAM Add countries)
    return  mCountries
        } catch ( pErr ) { 
    return  nRows }           // alert( `Can't fetch ${aURL}`) }                  // .(30918.03.3)

         }; // eof getCountries
// -------  -----------------------------------------------------

     async  function  fmtCountries( aDiv, aURL ) {

       var  mCountries   =  await getCountries( aURL )     // Must assign mCountries here with await

        if (mCountries  == -1) {
    return  false }









       var  mHTML_Rows   =  [ ]
            mHTML_Rows.push(   fmtCountry_Header( ) )
            mHTML_Rows.push(  ...mCountries.map( fmtCountry_Row ) )
            mHTML_Rows.push( `    <tr class="lastRow" ><td colspan="5"></td></tr>` )

        if (aDiv) {
       var  pCountries_Div               =  $( '#' + aDiv )[0]   // `#${aDiv}`
//          pCountries_Div.innerHTML     =  '' 
            pCountries_Div.innerHTML     =  mHTML_Rows.join( "\n" )
//          pCountries_Div.style.display = 'block'
    return  true
        } else {
    return                              mHTML_Rows.join( "\n" )
            }
         }; // eof fmtCountries
//  ------  ---------------------------------------------

  function  fmtCountry_Header( ) {



       var  aHTML_Row    = `
  <tr>
    <th class="CountryCode-th">Code</th>
    <th class="Country-th"    >Country</th>
    <th class="Continent-th"  >Continent</th>
    <th class="Area-th"       >Area (mi<sup>2</sup>)</th>
    <th class="Population-th" >Population</th>
  </tr> `
    return  aHTML_Row.substring(1)
            }; // eof fmtCountry_Header
//  ------  ---------------------------------------------

  function  fmtCountry_Row( pCountry, i ) {
       var  aColor       =  i % 2 == 1 ? '#EFF8F8'  : '#DEEEF7'
       var  aRow_ID      = `id="R${ `${ i + 1 }`.padStart( 3, "0" )}"`










       var  aHTML_Row    = `
  <tr ${aRow_ID} Class="${`eachRow ${aColor}`}">
    <td bgColor="${aColor}" class="CountryCode-td"> ${ pCountry.Code }</td>
    <td bgColor="${aColor}" class="Country-td"    > ${ pCountry.Name }</td>
    <td bgColor="${aColor}" class="Continent-td"  > ${ pCountry.Continent   }</td>
    <td bgColor="${aColor}" class="Area-td"       > ${ pCountry.SurfaceArea }</td>  <!-- .(31115.01.1 RAM Was: Area) -->
    <td bgColor="${aColor}" class="Population-td" > ${ pCountry.Population  }</td>
  </tr> `
    return  aHTML_Row.substring(1)
            }; // eof fmtCountry_Row
//  ------  ---------------------------------------------

// -------  -----------------------------------------------------

       var  Countries = { fmtCountries, getCountries }
    export  default Countries

// -------  -----------------------------------------------------
