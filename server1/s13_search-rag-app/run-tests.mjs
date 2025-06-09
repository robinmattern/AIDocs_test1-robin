    process.env.Debug   =  0  
if (process.env.Debug   == 1 || process.env.VSCODE_INSPECTOR_OPTIONS ? 1 : 0) {  
    process.env.ENVs    = "0"
//  process.env.LANCE_DB_FOLDER = "D:/Data/AI.vectors/lanceDB"
//  process.env.LANCE_DB_FOLDER = ""
//  process.env.LANCE_DB_FOLDER2  = "./data/AI.vectors/lanceDB"
    global.bQuiet = 0

 // process.env.DRYRUN  = "1"
//  process.env.LOGGER  = "log"
    process.env.APP     = "s13"
    }
await import( '../components/search_u2.11.mjs' )          // .(50522.02b.10).(50514.07.9).(50507.05.1 RAM Put script into components)
debugger 