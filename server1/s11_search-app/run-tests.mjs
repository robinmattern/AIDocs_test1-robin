
    process.env.Debug   =  0  
if (process.env.Debug   == 1 || process.env.VSCODE_INSPECTOR_OPTIONS ? 1 : 0) {  
    process.env.ENVs    = "0"
    process.env.DRYRUN  = "1"
//  process.env.LOGGER  = "log"
    process.env.APP     = "s11"
    }
await import( '../components/search_u2.10.mjs' )          // .(50514.07.7).(50507.05.1 RAM Put script into components)
debugger 