/*\
##=========+====================+================================================+
##RD       formR tools test     | formR FRT Tools Test Script
##RFILE    +====================+=======+===============+======+=================+
##FD   formR-tools-test.mjs     |   3049|  4/09/24 16:00|    50| u1.03`40409.1600
##FD   formR-tools-test.mjs     |   3296|  4/12/24 15:10|    53| u1.03`40412.1510
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript file tests the use of formr_utility-fns.mjs and
#           getAPI.mjs for the AIDocs client1 apps.
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#
##CHGS     .--------------------+----------------------------------------------+
# .(40402.06  4/02/24 RAM  5:30p|  Move FRTools to client1/._3c1/JPTs from ._2/FRTs
# .(40407.02  4/07/24 RAM  6:30p|  Move FRTools back to client1/c16_app/Utils folder
# .(40409.03  4/09/24 RAM  4:00p|  Add SERVER_HOST
# .(40412.01  4/12/24 RAM  3:10p|  Add JPT's Doc Header Info
                                |
##SRCE     +====================+===============================================+
\*/
// import   FRT        from '../FRTs/formr_utility-fns_u1.07.mjs'
// import { FRT      } from '../../../._2/FRTs/formr_utility-fns_u1.08.mjs'
   import { FRT      } from '../../c16_aidocs-review-app/utils/FRTs/formr_utility-fns_u1.08.mjs'     // .(40407.02.7 RAM Moved it)
// import { getHelp  } from '../../../._2/FRTs/formr_utility-fns_u1.08.mjs'
   import { getHelp  } from '../../c16_aidocs-review-app/utils/FRTs/formr_utility-fns_u1.08.mjs'     // .(40407.02.8)
// import   APIfns     from '../../../._2/FRTs/getAPI_u1.03.mjs';  var getAPI = APIfns.getAPI        //#.(40402.06.1 RAM Move getAPI_u1.03 back to ._3/JPTs)
// import   APIfns     from '../../._3c1/JPTs/getAPI_u1.03.mjs';   var getAPI = APIfns.getAPI        //#.(40402.06.1 RAM Move getAPI_u1.03 back to ._3/JPTs)

    var bQuiet      =  true,  bNoisy = bQuiet ? 0 : 2
    var bQuiet      =  false, bNoisy = bQuiet ? 0 : 2

        FRT.setQuiet(  bQuiet )
//const console_log =  APIfns.console_log

//      --- ------- =  -------------------------------------------------

//      getHelp()
//      FRT.traceR(   'formR-tools-test[1]', 'FRT', 2, FRT )
   var  pEnv =  await  FRT.getEnv( )
//      FRT.traceR(   'formR-tools-test[2]', pEnv, 2 )
        FRT.traceR(   'formR-tools-test[3]', `SERVER_PORT   :  ${ pEnv.SERVER_PORT }`     , bNoisy)
        FRT.traceR(   'formR-tools-test[3]', `SERVER_HOST   :  ${ pEnv.SERVER_HOST }`     , bNoisy) // .(40409.03.1 RAM)
        FRT.traceR(   'formR-tools-test[4]', `ANYLLM_API_KEY: '${ pEnv.ANYLLM_API_KEY }'` , bNoisy)
        FRT.traceR(   'formR-tools-test[5]', `OPENAI_API_KEY: '${ process.env.OPENAI_API_KEY }'` , bNoisy)

        debugger
//      --- ------- =  -------------------------------------------------
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/
