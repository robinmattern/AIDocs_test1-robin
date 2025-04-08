/*\ . . .
##=========+====================+================================================+
##RD        [Client] Server     | Run a Client Server
##RFILE    +====================+=======+===============+======+=================+
##FD   server.mjs               |   5204|  4/12/24 18:40|    81| u1.01`40412.1840
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file run a simple ExpressJS Server that run a semi-
#           static web page the way live-server can.
#
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           setHeaders          |
#           setHeaders_ifmjs    |

##CHGS     .--------------------+----------------------------------------------+
# .(40409.03  4/09/24 RAM  4:00p|  Add SERVER_HOST
# .(40411.04  4/11/24 RAM  7:20p|  Use main page variable
# .(40412.01  4/12/24 RAM  6:40p|  Add JPT's Doc Header Info
                                |
##SRCE     +====================+===============================================+
\*/
    import  express from 'express';
    import  path    from 'path';

    var aURI       =  import.meta.url; // console.log( "aURI", aURI ); process.exit()
    var aOS        = (typeof(process) != 'undefined' ) ? (`${process.argv[1]}`.match( /^[a-z]:/i ) ? 'windows' : 'linux' ) : 'browser'
    var __filename =  aURI.replace( /^.+\//, "" )
    var __dirname  =  aURI.replace( `/${__filename}`, '' ).replace( 'file:///', aOS == 'linux' ? '/' : '')  // .(30322.05.1 RAM Put '/' back in)

    var pApp       =  express( );
    var nPort      =  process.env.PORT || 8080;                                                             // .(40409.03.8)
    var aMain_Page = 'index.html'                                                                           // .(40411.04.1 RAM Use main page variable)

//  --- --- -----------  =  --------------------------------------------------

function checkOrigin( req, res, next ) {
  const allowedOrigin = "http://155.138.193.41"; // Replace with your actual IP
  const origin        =  req.header("origin");

  if (origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    next(); // Pass the request to the next middleware
  } else {
    res.status(403).send("Origin not allowed"); // Deny requests from other origins
    }
  }
//  --- --- -----------  =  --------------------------------------------------
/*
function setHeaders_ifmjs( res, path ) {
    if (path.endsWith( '.mjs' ) ) {
        res.setHeader( 'Content-Type', 'application/javascript' ); }
        } */
//  --- --- -----------  =  --------------------------------------------------

//      pApp.get('*', (req, res) => {
//          res.sendFile(                       path.join( __dirname, 'index_u1.04-Robin.html' ) );         // Route to handle all other requests (optional)
//          });
//  --- --- -----------  =  --------------------------------------------------

//        pApp.use( checkOrigin )                                                                             // .(40504.01.1 RAM Allow CORS ?? )

        pApp.use(               express.static(            __dirname,                                       // Serve .mjs files "inline"
        { setHeaders: ( res, path) => {
            console.log(     `  Loading ${path.replace( /.+app[\\\/]/, "" ) }` )
        if (path.endsWith( '.mjs' ) ) {
            res.setHeader( 'Content-Type', 'application/javascript' ); }
            } } ) );
//  --- --- -----------  =  --------------------------------------------------

//      pApp.use(               express.static( path.join( __dirname, ( res, path ) => setHeaders_ifmjs( res, path ) ) ) );  // Serve .mjs files
//      pApp.use(               express.static( path.join( __dirname, setHeaders_ifmjs ) ) );               // Serve .mjs files: TypeError TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received function setHeaders_ifmjs

//      pApp.use('../../../._2/FRTs',  express.static( path.join( __dirname, '../../._2/FRTs' ) ) );        // 'E:\Repos\Robin\AIDocs_\demo1-master\._2'
//      pApp.use('/_2/FRTs',    express.static( path.join( __dirname, '../../._2/FRTs' ) ) );               // 'E:\Repos\Robin\AIDocs_\demo1-master\._2'
//      pApp.use('/components', express.static( path.join( __dirname, './components'   ) ) );
//      pApp.use('/models',     express.static( path.join( __dirname, './models'       ) ) );
//      pApp.use('/utils',      express.static( path.join( __dirname, './utils'        ) ) );
//      pApp.use('/utils/FRTs', express.static( path.join( __dirname, './utils/FRTs'   ) ) );

//  --- --- -----------  =  --------------------------------------------------

//      pApp.get('*', (req, res) => {
//          res.sendFile(                      path.join( __dirname, 'index_u1.04-Robin.html' ) );          // Route to handle all other requests (optional)
//          });
//  --- --- -----------  =  --------------------------------------------------

        pApp.listen( nPort, () => {
            console.log(`  The express app is running at http://localhost:${nPort}`);
//          console.log(`  Using page: index_u1.04-Robin.html\n` )                                          // See index.html script: location="index_u1.04-Robin.html"
            console.log(`  Using main page: ${aMain_Page}\n` )                                              // .(40411.04.2)
            });
//  --- --- -----------  =  --------------------------------------------------
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/
