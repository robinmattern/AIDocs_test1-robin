       var  ThePort4     =  50144
       var  TheHost4     = `http://localhost:${ThePort4}`

       var  nTest =   2  ;  nTest = typeof( process ) != 'undefined' ? nTest : 0         
        if (nTest ==  1) {  testCountries24(  ) }
        if (nTest ==  2) {  testCountries24( `${TheHost4}/api/countries` ) }

// -------  -----------------------------------------------------

     async  function testCountries24( aURL ) {  // can't return a value

       var  aURL          =  aURL ? aURL : `${TheHost3}/excel/world/countries`
       var  aHTML         =  await  fmtCountries( '', aURL )
       if (!aHTML) {
       var  aMsg         = `\n * Error: ${ 'unknown' }`
            console.log( `Unable to retreive country data from URL, ${aURL}! ${aMsg}` ) 
        } else {
            console.log(  aHTML.substring( 1, 800 ) + ' ...' )
            console.log( `\n  Formatted ${ aHTML.split( /eachRow/ ).length - 1 } countries` )
            }
         }; // eof testCountries24
// -------  -----------------------------------------------------

     async  function fmtCountries( aDiv, aURL ) {
    
       var  mCountries   =  await getCountries( aURL )     // Must assign mCountries here with await  
        if (mCountries  ==  -1) { 
    return  false }  
    
       var  mHTMLrows    =  [ ]
//          mHTMLrows    =  [ fmtCountryHeader() ]
            mHTMLrows.push(   fmtCountryHeader() )
            mHTMLrows.push(  ...mCountries.map( fmtCountryRow ) )
            mHTMLrows.push( `\n    <tr class="lastRow" ><td colspan="5"></td></tr>` )

        if (aDiv) { 
       var  pCountries           =  document.getElementById( aDiv )
            pCountries.innerHTML =  mHTMLrows.join( "\n" )
    return  true 
        } else { 
    return  mHTMLrows.join( "\n" )
            }
         };
// -------  -----------------------------------------------------

     async  function getCountries( aURL ) {      // Must define async function to use with await below   
       try {         
//var  pResponse  =  await fetch( 'http://localhost:50125/api/countries' ) //  assets/data/db.json' )
       var  pResponse  =  await fetch( aURL ) //  assets/data/db.json' )
       var  pJSON      =  await pResponse.json( ) 
            pJSON      =  pJSON['api/countries'] ? { countries: pJSON['api/countries'] } : pJSON   // .(30913.01.3 RAM Express Server route)       
            pJSON      =  pJSON['countries']     ?   pJSON                  : { countries: pJSON } // .(30911.01.3 RAM JSON Server route)
       var  nRows      =  99
       var  mCountries =  pJSON.countries.filter( (pCountry, i) => { return i < nRows } )  // .(30831.03.1 RAM Add countries)
    return  mCountries 
        } catch ( pErr ) { return -1 } // alert( `Can't fetch ${aURL}`) }

         }; // eof getCountries           
// -------  -----------------------------------------------------

  function  fmtCountryHeader( ) {           
       var  aHTMLrow   = `
<tr>
  <th class="CountryCode-th">Code</th>
  <th class="Country-th"    >Country</th>
  <th class="Continent-th"  >Continent</th>
  <th class="Area-th"       >Area (mi<sup>2</sup>)</th>
  <th class="Population-th" >Population</th>            
</tr> `
    return  aHTMLrow 
         }; // eof fmtCountryHeader 
// -------  -----------------------------------------------------

 
function  fmtCountryRow( pCountry, i ) {           
  var  aColor    =  i % 2 == 1 ? '#EFF8F8'  : '#DEEEF7'
  var  aID       = `id="R${ `${ i + 1 }`.padStart( 3, "0" )}"`
  var  aHTMLrow  = `
  <tr ${aID} Class="${`eachRow ${aColor}`}">
    <td bgColor="${aColor}" class="CountryCode-td"> ${ pCountry.Code }</td>
    <td bgColor="${aColor}" class="Country-td"    > ${ pCountry.Name }</td>
    <td bgColor="${aColor}" class="Continent-td"  > ${ pCountry.Continent   }</td>
    <td bgColor="${aColor}" class="Area-td"       > ${ pCountry.SurfaceArea }</td>
    <td bgColor="${aColor}" class="Population-td" > ${ pCountry.Population  }</td>
  </tr> `
return  aHTMLrow 
   }
// --- -------------------------------------------------------------

//  fmtCountries( 'Countries', 'http://localhost:50125/api/countries' )
//  export d efault fmtCountries 
       var  Countries = { fmtCountries, getCountries } 
    export  default Countries  
