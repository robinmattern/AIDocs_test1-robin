       var  ThePort2     =  50122
       var  TheHost2     = `http://localhost:${ThePort2}`

       var  nTest =   2  ;  nTest = typeof( process ) != 'undefined' ? nTest : 0         
        if (nTest ==  1) {  testCountries22(  ) }
        if (nTest ==  2) {  testCountries22( `${TheHost2}/api/countries` ) }

// -------  -----------------------------------------------------
/* for debugging ......  */

     async  function testCountries22( aURL ) {  // can't return a value

       var  aURL         =  aURL ? aURL : `${TheHost2}/api/countries`
       var  aHTML        =  await  fmtCountries( '', aURL )
       if (!aHTML) {
            console.log( `Unable to retreive countries from URL: ${aURL}` ) }
         else {
            console.log(  aHTML.substring( 1, 800 ) + ' ...' )
            console.log( `\n  Formatted ${ aHTML.split( /eachRow/ ).length - 1 } cities` )
            }
         }; // eof doCountries3
// -------  -----------------------------------------------------

     async  function  getCountries( aURL ) {        // Must define async function to use with await below
       try {
       var  nRows        =  -1
       var  pResponse    =  await   fetch( aURL )   // aURL: './assets/data/db.json' )
       var  pJSON        =  await   pResponse.json( )
//          pJSON        =  pJSON[ 'api/countries' ] ? { countries: pJSON['api/countries'] } : pJSON    // .(30913.01.3 RAM Express Server route)
            pJSON        =  pJSON[ 'countries' ]     ?   pJSON                  : { countries: pJSON }  // .(30911.01.3 RAM JSON Server route)
       var  nRows        = (typeof( pJSON.countries.length) != 'undefined' ) ? 99 : -1                  // .(30918.03.2 RAM Err not an Array)
       var  mCountries   =  pJSON.countries.filter( (pCountry, i) => { return i < nRows } )             // .(30831.03.1 RAM Add countries)
    return  mCountries
        } catch ( pErr ) { return nRows }           // alert( `Can't fetch ${aURL}`) }                  // .(30918.03.3)

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
       var  pCountries_Div           =  document.getElementById( aDiv )
            pCountries_Div.innerHTML =  mHTML_Rows.join( "\n" )
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
    <td bgColor="${aColor}" class="Area-td"       > ${ pCountry.Area }</td>
    <td bgColor="${aColor}" class="Population-td" > ${ pCountry.Population  }</td>
  </tr> `
    return  aHTML_Row.substring(1)
            }; // eof fmtCountry_Row
//  ------  ---------------------------------------------

// -------  -----------------------------------------------------

       var  Countries = { fmtCountries, getCountries }
    export  default Countries

// -------  -----------------------------------------------------
