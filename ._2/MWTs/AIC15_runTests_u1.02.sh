#!/bin/bash
#!/bin/bash
##=========+====================+================================================+
##RD       AIC15_runTests       | Generate Mac Hardware specs
##RFILE    +====================+=======+===============+======+=================+
##FD AIC15_runTests_u1.02.sh    |  10000|  4/16/25 17:50|   200| u1.02`50416.1750
##FD AIC15_runTests_u1.02.sh    |  12538|  4/23/25  8:30|   224| u1.02`50423.0830
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script really runs the tests specificed by run-tests.sh
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#       ion  runcommand() {     |
#       ion  getMacInfo() {     |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50416.08   4/16/25 RAM  5:50p| Witten by Robin Mattern
#.(50419.05   4/19/25 RAM  4:00p| Allow run-tests.sh run aTest, maybe 
#.(50420.03   4/20/25 RAM  9:30a| Move final underline to here from run.tests.sh
#.(50420.04   4/20/25 RAM 10:15a| Add Help re run-tests.sh Ids   
#.(50422.03   4/22/25 RAM 10:11a| Add ${aApp} to help
#.(50422.04   4/22/25 RAM  9:41a| Add TestId to "inputs" display 
#.(50423.03   4/23/25 RAM  8:30a| Use ${SEARCH_SCRIPT} in run-tests.sh

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
##========================================================================================================= #  ===============================  #

        aApp=${APP}

#       aLogs="inputs"
        aLogs="${LOGGER}"
#       aLogs="log"

        bDoit=${DOIT}
        bDebug=${DEBUG}

        aPCCode="${PC_CODE}"
        aEnvFile="${ENV_TEMPLATE}"

#       ls -l ../../._2/MWTs/; exit 
        genEnv="../../._2/MWTs/AIC19_genEnv_u1.01.sh"
        searchScript="${SEARCH_SCRIPT}"                                                 # .(50423.03.1 RAM Use ${Search_Script} instead of search_u2.05.sh)

        aCmd="run"; if [ "$1" == "gen" ]; then aCmd="gen"; shift; fi 
        aArgs="$1,$2,$3,$4,$5,$6,$7,$8,$9"; aArgs=${aArgs//,,/}; s=""
        if [ "$1" == "all" ]; then aArgs="t010,t020,t030"; fi
        if [ "${aArgs:0:3}" == "run" ]; then aArgs="${aArgs:4}"; fi;                    # .(50419.05.1 RAM Allow run)
        if [ "${aArgs:0:1}" != "t" ] && [ "${aArgs}" != "" ]; then aArgs="t${aArgs}"; fi; 

#       echo -e "\n  - AIC15[  25]  aCmd: ${aCmd},  aArgs: '${aArgs}', aLogs: '${aLogs}', aPCCode: '${aPCCode}', aEnvFile: '${aEnvFile}'"; # exit 

# -------------------------------------------------------------------

   if [ "${1:0:3}" == "lis" ]; then
        echo -e "\n  Run any of the following tests:\n"
        cat "${aApp}_model-tests.txt" | awk '{ sub( /a[0-9][0-9]_/, "    "); sub( /\.01/, "   "); gsub( /,/, " "); print "  " $0 }'
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit
     fi
# -------------------------------------------------------------------

   if [ "${aCmd}" == "gen" ]; then
     if [ "${aArgs}" == "" ] || [ "${aArgs:3:1}" != "0" ]; then
        echo -e "\n* Please provide a test group id (t0#0) to create an .env test group file."
        echo "   Example: bash run-tests.sh gen t040  # It must end with a zero."
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit 1
      fi
      if [ "${aArgs/t010}" != "${aArgs}" ]; then ${genEnv} ${aApp} t010 ${aLogs} ${aPCCode}; fi   # Create Model1 Tests
      if [ "${aArgs/t020}" != "${aArgs}" ]; then ${genEnv} ${aApp} t020 ${aLogs} ${aPCCode}; fi   # Create Model2 Tests
      if [ "${aArgs/t030}" != "${aArgs}" ]; then ${genEnv} ${aApp} t030 ${aLogs} ${aPCCode}; fi   # Create Model3 Tests
      if [ "${aArgs/t040}" != "${aArgs}" ]; then ${genEnv} ${aApp} t040 ${aLogs} ${aPCCode}; fi   # Create Model4 Tests
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit 1
      fi
# -------------------------------------------------------------------

   if [ "$1" == "" ] || [ "$1" == "help" ]; then                                                                           # .(50420.04.1)
        echo -e "\n  Run any of the following tests for app: ${aApp}:"                                                     # .(50422.03.1 RAM Add for app: ${aApp})
        echo -e   "    bash run-tests.sh  t0##  # A single test for one sysprompt. (generated from s11_model-tests.txt)"   # .(50420.04.2 RAM Add Help re run-tests.sh)
        echo -e   "    bash run-tests.sh  t0#0  # A group test for one model. (copied from .env_s11_t0#0_model_1-test.txt)" # .(50420.04.3)
        echo -e "\n  For example, these tests are available to run:"                                                       # .(50420.04.4)
        ls -l .env_${aApp}_* | awk '!/_v[0-9]/ { print "    bash run-tests.sh  " substr($9,10,4) "  # " $9 }'
        echo -e   "    bash run-tests.sh  t041  # .env generated from .env_${aApp}_t040_qwen2;0.5b_4,6-tests.txt"          #.(50422.03.2 RAM Was s11).(50420.04.5)
        echo -e "\n  To run other tests for models, llama3.2:3b, phi3 and granite3.1-dense:2b, do:"                        #.(50420.04.6)
        echo -e   "    bash run-tests.sh gen all"                                                                          #.(50420.04.7)
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit 1
    fi
# -------------------------------------------------------------------

        aTestGroups="01,02,03,04"                                                       # .(50415.02.1 RAM Check for valid Test Groups)
        IFS=',' read -ra mArgs <<< "${aArgs}"; nTests=0
    for aTest in "${mArgs[@]}"; do
#    if [ "${aTest}"  != "trun" ]; then                                                 ##.(50419.05.2 RAM Allow run)
#    if [ "${aTest:0:1}" != "t" ]; then aTest="t${aTest}"; fi                           ##.(50419.05.3 RAM Allow 040 with no t.  Need to replace it in mArgs)
     if [[ "${aTest}" =~ ^t[0-9]{3}$ ]] && [[ "${aTestGroups/${aTest:1:2}}" != "${aTestGroups}" ]]; then
        (( nTests++ ))
      else
        echo -e "\n* Invalid Test Id, ${aTest}.  Please use one of the following:"      # .(50419.05.4)
        echo      "    t010 t020 t030 t040 t041 or multipe tests: t010,t020,t030"
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit 1
      fi
#     fi                                                                                ##.(50419.05.5)
    done

    shift
# -------------------------------------------------------------------

function sayMsg() {
    if [ "${bDebug}" == "1" ]; then echo -e "$1"; fi
    }
# -------------------------------------------------------------------

function prt1stMsg() {
       s="s"; if [ "${nTests}" == "1" ]; then s=""; fi

    if [ "${aLogs/log}" != "${aLogs}" ]; then
       aTS="$( date +%y%m%d.%H%M.%S)"; aTS="${aTS:1}";
       echo -e "\n${aTS}  ${aApp}           Running test${s}: ${aArgs}"
     else
       echo -e "\n  Running test${s} for: '${aArgs}'."; # exit
       if [ "$s" == "" ] || [ "${aArgs:4:1}" == "0" ]; then echo ""; fi
       fi
     }
# -------------------------------------------------------------------

aAWKscr='
function getFld( aRow, bTest ) {
         split( aRow, mVar, "=" ); aVar = mVar[2]; sub( /#.+/, "", aVar ); # print " -- " aVar;
         sub( /^[" ]+/, "", aVar ); sub( /[" ]+$/, "", aVar );             # print " -- [" aVar "]";
         if (bTest == 1 && substr(aVar,4,1) == "0") { aVar = substr(aVar,1,3) "1"; aTestId = aVar }         # .(50422.04.1 RAM Save aTestId)
         if (bTest == 2) { aVar = substr(aTestId,1,3) "0_" aVar }                                           # .(50422.04.2 RAM Add to SESSION TITLE)
  return aVar
         }
   /^[#]/ { next }
   /OLLAMA_MODEL_NAME/    { print "    1. Model:           "  getFld( $0 )}
   /CTX_SIZE/             { print "    2. CTX_Size:        "  getFld( $0 ) }
   /TEMPERATURE/          { print "    3. Temperature:     "  getFld( $0 ) }
   /SYS_PROMPT_CD/        { print "    4. SysPmt Code:     "  getFld( $0 ) }
   /USE_DOCS/             { print "    5. Do Doc Search:   " (getFld( $0 ) ? "Yes" : "No") }
   /USE_URLS/             { print "    6. Do Web Search:   " (getFld( $0 ) ? "Yes" : "No") }
   /USE_SYS_PROMPTS_FILE/ { print "    7. Use SysPmt File: " (getFld( $0 ) ? "Yes" : "No") }
   /USE_USR_PROMPTS_FILE/ { print "    8. Use UsrPmt File: " (getFld( $0 ) ? "Yes" : "No") }
#  /SESSION_TITLE/        { print "    9. Test Title:      "  getFld( $0 ) }                                ##.(50422.04.3 RAM Move to 12)
   /SYS_RUN_COUNT/        { print "   10. SysPrompt Tests: "  getFld( $0 ) }
   /USR_RUN_COUNT/        { print "   11. UsrPrompt Runs:  "  getFld( $0 ) }
   /SESSION_ID/           { print "   12. First Run Id:    "  getFld( $0, 1 ) ".01" }
   /SESSION_TITLE/        { print "    9. Test Title:      "  getFld( $0, 2 ) }                             # .(50422.04.4)
   /SHOW_SECTIONS/        { print "   13. Sections:        "  getFld( $0 ) }
'
# -------------------------------------------------------------------

function cpyEnv() {
#      if [ ! -f $1 ]; then echo -e "\n* No .env file exists for $1. Do ./run-tests gen $1 to create it."; return ; fi
#               ls -l .env_${aApp}_$1* | awk '!/_v[0-9]/'
       aEnv="$( ls -l .env_${aApp}_$1* | awk '!/_v[0-9]/ { sub( /.+\.env/, ".env"); print; exit }' )"; # echo "--- aEnv: ${aEnv}"; exit
       if [ "${aEnv}" == "" ]; then
       echo -e "\n* No .env file exists for $1. Create it with: ./run-tests.sh ${aApp} gen $1";
       if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
       exit 1
       fi
       sayMsg "  - AIC15[ 111]  Using .env group filea: ${aEnv}"; # exit  1
       cp -p "${aEnv}" .env
       }
# -------------------------------------------------------------------

       sayMsg "\n  - AIC15[ 124]  aCmd: ${aCmd},  aArgs: '${aArgs}', aLogs: '${aLogs}', aPCCode: '${aPCCode}', aEnvFile: '${aEnvFile}'"; # exit

       prt1stMsg

  for aTestId in "${mArgs[@]}"; do
#     aTestId=${1:0:4}; bCopied=0
      sayMsg  "  - AIC15[ 120]  aApp: ${aApp}, aTestId: ${aTestId} '${aTestId:3:1}', aLogs: ${aLogs}"; # exit  1
      sayMsg  "  - AIC15[ 121]  "${genEnv}" ${aApp} ${aTestId/t} ${aLogs}";  # exit  1

#  if [ "${aTestId:3:1}" != "0" ]; then ../../._2/MWTs/AIC19_genEnv.sh ${aApp} ${aTestId/t} ${aLogs}; else
   if [ "${aTestId:3:1}" != "0" ]; then "${genEnv}" ${aApp} ${aTestId/t} ${aLogs}; else
   if [ "${aTestId}"  == "t010" ]; then cpyEnv t010; fi
   if [ "${aTestId}"  == "t020" ]; then cpyEnv t020; fi
   if [ "${aTestId}"  == "t030" ]; then cpyEnv t030; fi;
   if [ "${aTestId}"  == "t040" ]; then cpyEnv t040; fi; fi

#    prt1stMsg

 if [ "${aTestId:3:1}" == "0" ]; then

   if [ "${aLogs/inputs}" != "${aLogs}" ]; then
      if [ "${aLogs}" == "log,inputs" ]; then
      echo -e "\n-----------------------------------------------------------"
      fi
      echo -e "\n  Using a .env file (copied from ${aEnv}) with the following parameters:"
      cat .env | awk "${aAWKscr}" | sort -k1,1
      echo " "
      fi;
   fi #

   if [ "${aLogs/log}"   != "${aLogs}" ]; then
      aTS="$( date +%y%m%d.%H%M.%S)"; aTS="${aTS:1}";
      echo -e "${aTS}  ${aApp}  ${aTestId}     Running ${searchScript} $@"              # .(50423.03.2)
      fi

   if [ "${bDoit}" == "1" ]; then
#     echo ""
#     echo "========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----"
#     echo "=================================================================================================================================================="
      node ${searchScript}  "$@"                                                        # .(50423.03.3 RAM Use ${Search_Script} instead of search_u2.05.sh)
      fi

   done

   if [ "${LOGGER}" == "log,inputs" ]; then                                             # .(50420.03.1 RAM Move this to here from run.tests.sh Beg)
     echo -e "\n-----------------------------------------------------------"
     fi
     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi                                      # .(50420.03.1 End)

#  ---------------------------------------------------------------------------------
