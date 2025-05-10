#!/bin/bash
        
     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
     aApp2="s13"; if [[ "$1" =~ [acs][0-9]{2} ]]; then aApp2=$1; shift; fi              # .(50429.05.13 )
                  if [[ "$2" =~ [acs][0-9]{2} ]]; then aApp2=$2; aArgs=("$@"); unset aArgs[1]; set -- "${aArgs[@]}"; fi         # .(50429.05.14 )

     export RUN_TESTS="../../._2/MWTs/AIC15_runTests_u1.02.sh"
     export SCORE_SCRIPT="../compopnents/score_u2.08.mjs"                               # .(50507.02.6)
     export SEARCH_SCRIPT="../components/search_u2.08.mjs"                              # .(50507.02.7)

     export APP=${aApp2}                                                                # .(50429.05.15 )  

#    export LOGGER=
     export LOGGER="log"   # no workie
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"
     export DRYRUN="0"                          # .(50506.03.1 RAM Add DRYRUN)                                           
     export SCOREIT="1"                         # .(50507.02.8 RAM New way to score it)                                           

     export PC_CODE="rm231d"

     export SCORE_SCRIPT="${SCORE_SCRIPT} gemma2:2b"

     bash  "${RUN_TESTS}" "t041";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t041";            if [ $? -ne 0 ]; then exit 1; fi

     bash  "${RUN_TESTS}" "t042";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t042";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t043";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t043";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t044";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t044";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t045";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t045";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t046";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t046";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t047";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t047";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t048";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t048";            if [ $? -ne 0 ]; then exit 1; fi
 
     bash  "${RUN_TESTS}" "t049";               if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "t049";            if [ $? -ne 0 ]; then exit 1; fi
