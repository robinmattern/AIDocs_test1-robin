// const globalState = { }
   const process     = { env: { } }
  
//export function setGlobalValue( aName, aValue ) { globalState[ aName ]        =  aValue;   }
//export function getGlobalValue( aNane ) {  return globalState[ aName ];                    }

  export function setGlobalValue( aName, aValue ) { process.env[ aName ]        =  aValue;   }
  export function getGlobalValue( aNane ) {  return process.env[ aName ];                    }

  export function setPromptValue(        aValue ) { setGlobalValue( 'promptValue', aValue ); }
  export function getPromptValue(       ) {  return getGlobalValue( 'promptValue' );         }

  