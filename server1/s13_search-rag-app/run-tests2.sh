#!/bin/bash
        
     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
     aApp2="s13"; if [[ "$1" =~ [acs][0-9]{2} ]]; then aApp2=$1; shift; fi              # .(50429.05.13 )
                  if [[ "$2" =~ [acs][0-9]{2} ]]; then aApp2=$2; aArgs=("$@"); unset "aArgs[1]"; set -- "${aArgs[@]}"; fi       # .(50429.05.14 )

#    if [ "${aApp2}" == "example" ]; then bash run-tests2.sh; exit; fi                  # .(50505.04.6 Add example)

     export RUN_TESTS="../../._2/MWTs/AIC15_runTests_u1.02.sh"
#    export SCORE_SCRIPT="../components/score_u2.08.mjs"                                ##.(50507.02.6)
#    export SEARCH_SCRIPT="../components/search_u2.08.mjs"                              ##.(50507.02.7)
     export SCORE_SCRIPT="../s14_grading-app/run-tests.mjs"                             # .(50507.02.6)
     export SEARCH_SCRIPT="./run-tests.mjs"                                             # .(50507.02.7)

     export APP=${aApp2}                                                                # .(50429.05.15 )  

#    export LOGGER=
     export LOGGER="log"   
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"                           #  Runs node with --inspect-brk 
     export DRYRUN="0"                          # .(50506.03.1 RAM Add DRYRUN)                                           
     export SCORING="1"                         # .(50507.02.8 RAM New way to score it)                                           

     export PC_CODE="rm231d"

#    echo "" >run-tests.txt                     ##.(50507.08d.7 RAM Not here).(50507.08a.7 RAM Start MT)
     bash  "${RUN_TESTS}" "t041";               if [ $? -ne 0 ]; then exit 1; fi
     export SCORE_SCRIPT="${SCORE_SCRIPT} "qwen2:0.5b"

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
