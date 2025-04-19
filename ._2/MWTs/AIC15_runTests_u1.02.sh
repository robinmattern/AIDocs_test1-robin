#!/bin/bash

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
#       ls -l  "${genEnv}"; exit 

        aCmd="run"; if [ "$1" == "gen" ]; then aCmd="gen"; shift; fi 
        aArgs="$1,$2,$3,$4,$5,$6,$7,$8,$9"; aArgs=${aArgs//,,/}; s=""
        if [ "$1" == "all" ]; then aArgs="t010,t020,t030"; fi
        if [ "${aArgs:0:1}" != "t" ] && [ "${aArgs}" != "" ]; then aArgs="t${aArgs}"; fi; 

#       echo -e "\n  - AIC15[  22]  aCmd: ${aCmd},  aArgs: '${aArgs}', aLogs: '${aLogs}', aPCCode: '${aPCCode}', aEnvFile: '${aEnvFile}'"; # exit 

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
 
   if [ "$1" == "" ]; then 
        echo ""
        echo "  Run any of the following tests:"
        echo "    bash run-tests.sh  t0##  # .env_s11_t0##_model_1-test.txt"  
        ls -l .env_${aApp}_* | awk '!/_v[0-9]/ { print "    bash run-tests.sh  " substr($9,10,4) "  # " $9 }' 
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
        exit 1
    fi 
# -------------------------------------------------------------------

        aTestGroups="01,02,03,04"                                                       # .(50415.02.1 RAM Check for valid Test Groups)
        IFS=',' read -ra mArgs <<< "${aArgs}"; nTests=0
    for aTest in "${mArgs[@]}"; do
     if [[ "${aTest}" =~ ^t[0-9]{3}$ ]] && [[ "${aTestGroups/${aTest:1:2}}" != "${aTestGroups}" ]]; then 
        (( nTests++ ))
      else 
        echo -e "\n* Invalid Test Id. Please use one of the following:"
        echo      "    t010 t020 t030 t040 t041 or multipe tests: t010,t020,t030"
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
        exit 1
      fi
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
function getFld( aRow ) { 
         split( aRow, mVar, "=" ); aVar = mVar[2]; sub( /#.+/, "", aVar ); # print " -- " aVar;  
         sub( /^[" ]+/, "", aVar ); sub( /[" ]+$/, "", aVar );             # print " -- [" aVar "]"; 
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
   /SESSION_TITLE/        { print "    9. Test Title:      "  getFld( $0 ) } 
   /USR_RUN_COUNT/        { print "   10. UsrPrompt Runs:  "  getFld( $0 ) } 
   /SYS_RUN_COUNT/        { print "   11. SysPrompt Tests: "  getFld( $0 ) } 
   /SESSION_ID/           { print "   12. First Run Id:    "  getFld( $0 ) ".01" }
   /SHOW_SECTIONS/        { print "   13. Sections:        "  getFld( $0 ) }
'    
# -------------------------------------------------------------------

function cpyEnv() {
#      if [ ! -f $1 ]; then echo -e "\n* No .env file exists for $1. Do ./run-tests gen $1 to create it."; return ; fi
#               ls -l .env_${aApp}_$1* | awk '!/_v[0-9]/'
       aEnv="$( ls -l .env_${aApp}_$1* | awk '!/_v[0-9]/ { sub( /.+\.env/, ".env"); print; exit }' )"; # echo "--- aEnv: ${aEnv}"; exit 
       if [ "${aEnv}" == "" ]; then 
       echo -e "\n* No .env file exists for $1. Create it with: ./run-tests gen $1"; 
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
      echo -e "${aTS}  ${aApp}  ${aTestId}     Running search_u2.05.sh $@"
      fi
 
   if [ "${bDoit}" == "1" ]; then 
#     echo ""
#     echo "========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----"
#     echo "=================================================================================================================================================="
      node search_u2.05.mjs  "$@"
      fi 

   done 
#  ---------------------------------------------------------------------------------
