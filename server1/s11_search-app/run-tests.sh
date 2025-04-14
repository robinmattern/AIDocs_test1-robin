#!/bin/bash
        aApp=s11 
        aTests="t010,t020,t030,t040"
        aArgs="$1,$2,$3,$4,$5,$6,$7,$8,$9"; aArgs=${aArgs//,,/}; s=""

   if [ "$1" == "" ]; then 
        echo ""
        echo "  Run any of the following tests:"
        echo "    bash run-tests.sh  t0##  # .env_s11_t0##_model_#-tests.txt"  
        ls -l .env_${aApp}_* | awk '{ print "    bash run-tests.sh  " substr($9,10,4) "  # " $9 }' 
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
        exit 
    fi 

        IFS=',' read -ra mArgs <<< "${aArgs}"; nTests=0
    for aTest in "${mArgs[@]}"; do
     if [[ "${aTest}" =~ ^t[0-9]{3}$ ]]; then (( nTests++ ))
      else 
        echo -e "\n* Invalid Test Id. Please use one of the following:"
        echo      "    t010 t020 t030 t040 t041 or more: t010,t020,t030"
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
        exit 
      fi
    done
    s="s"; if [ "${nTests}" == "1" ]; then s=""; fi 
    echo -e "\n  Running test${s} for: '${aArgs}'."; # exit 
    shift 
# -------------------------------------------------------------------
aAWKscr='
function getFld( aRow ){ 
         n=split( aRow, aFld, "," ); 
    for (i=1; i<=n; i++) { 
     if (aFld[i] ~ /^t[0-9]{3}$/) { 
         aThreadId=aFld[i]; 
         return aThreadId; 
         } 
     } 
 } )
'
aAWKscr='
function getFld( aRow ) { 
         split( aRow, mVar, "=" ); aVar = mVar[2]; sub( /#.+/, "", aVar ); # print " -- " aVar;  
         sub( /^[" ]+/, "", aVar ); sub( /[" ]+$/, "", aVar );             # print " -- [" aVar "]"; 
  return aVar 
         }
   /^[#]/ { next }
   /OLLAMA_MODEL_NAME/    { print "    1.  Model:           "  getFld( $0 )} 
   /CTX_SIZE/             { print "    2.  CTX_Size:        "  getFld( $0 ) } 
   /TEMPERATURE/          { print "    3.  Temperature:     "  getFld( $0 ) } 
   /SYS_PROMPT_CD/        { print "    4.  SysPmt Code:     "  getFld( $0 ) } 
   /USE_DOCS/             { print "    5.  Do Doc Search:   " (getFld( $0 ) ? "Yes" : "No") }
   /USE_URLS/             { print "    6.  Do Web Search:   " (getFld( $0 ) ? "Yes" : "No") }
   /USE_SYS_PROMPTS_FILE/ { print "    7.  Use SysPmt File: " (getFld( $0 ) ? "Yes" : "No") }
   /USE_USR_PROMPTS_FILE/ { print "    8.  Use UsrPmt File: " (getFld( $0 ) ? "Yes" : "No") }
   /SESSION_TITLE/        { print "    9.  Test Title:      "  getFld( $0 ) } 
   /USR_RUN_COUNT/        { print "   10.  UsrPrompt Runs:  "  getFld( $0 ) } 
   /SYS_RUN_COUNT/        { print "   11.  SysPrompt Tests: "  getFld( $0 ) } 
   /SESSION_ID/           { print "   12.  First Run Id:    "  getFld( $0 ) ".01" }
   /SHOW_SECTIONS/        { print "   13.  Sections:        "  getFld( $0 ) }
'         
    for aThreadId in "${mArgs[@]}"; do
#       aThreadId=${1:0:4}; bCopied=0
                                              
if [ "${aThreadId:3:1}" != "0" ]; then ../../._2/MWTs/AIC19_genEnv.sh ${aApp} ${aThreadId/t}; else  
if [ "${aThreadId}"  == "t010" ]; then cp -p .env_${aApp}_t010_*.txt .env; fi 
if [ "${aThreadId}"  == "t020" ]; then cp -p .env_${aApp}_t020_*.txt .env; fi 
if [ "${aThreadId}"  == "t030" ]; then cp -p .env_${aApp}_t030_*.txt .env; fi;   
if [ "${aThreadId}"  == "t040" ]; then cp -p .env_${aApp}_t040_*.txt .env; fi; fi  

if [ "${aThreadId:3:1}" == "0" ]; then 
   echo -e "\n  Using an env file with the following parameters:"
   cat .env | awk "${aAWKscr}" | sort -k1,1
   fi 

   node search_u2.05.mjs  "$@"
   done 
