#!/bin/bash

     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)  
     aApp2="s14"; if [[ "$1" =~ [acs][0-9]{2} ]]; then aApp2=$1; shift; fi              # .(50429.05.13)
                  if [[ "$2" =~ [acs][0-9]{2} ]]; then aApp2=$2; aArgs=("$@"); unset "aArgs[1]"; set -- "${aArgs[@]}"; fi       # .(50429.05.14 )
                  
#    if [ "${aApp2}" == "example" ]; then bash run-tests2.sh; exit; fi                  # .(50505.04.6 Add example)

     export RUN_TESTS="../../._2/MWTs/AIC15_runTests_u1.02.sh"
#    export SCORE_SCRIPT="../components/score_u2.08.mjs"                                ##.(50507.02.6)
#    export SEARCH_SCRIPT="../components/search_u2.08.mjs"                              ##.(50507.02.7)
     export SCORE_SCRIPT="../s14_grading-app/run-tests.mjs"                             # .(50507.02.6)
     export SEARCH_SCRIPT="./run-tests.mjs search"                                      # .(50507.02.7)

     export APP=${aApp2}                                                                # .(50429.05.15)

    if [ "${DRYRUN}" == "" ]; then                                                      # .(50513.02.10 beg)
#    export LOGGER=
#    export LOGGER="log"
#    export LOGGER="inputs"
     export LOGGER="log,inputs"

#    export SCORING="1"                         # .(50507.02.8 RAM New way to score it)                                           
     export PC_CODE=""
     fi                                                                                 # .(50513.02.11 End)

#    export ENVs="1"                                                                    # .(50513.05.22)
#    export DOIT="0"                            # .(50506.03.5 Do it unless DRYRUN="1".
#    export DEBUG="1"                           # .(50506.03.6 Runs node with --inspect-brk, if bDOIT="1", unless DRYRUN="0"
#    export DRYRUN="0"                          # .(50506.03.1 RAM Add DRYRUN)

            bEnvs=${ENVs}                                                               # .(50513.05.23)
    if [ "${bEnvs}" == "1" ]; then echo "  - S1400[  37]  APP: '${APP}', DOIT: '${DOIT}',  DEBUG: '${DEBUG}', DRYRUN: '${DRYRUN}', SCORING: '${SCORING}', PC_CODE: '${PC_CODE}', LOGGER: '${LOGGER}'"; fi # exit  # .(50513.05.24)

            SEARCH_MODEL="gemma2:2b"                                                    # .(50514.01.21 Beg)
    if [ "${SEARCH_MODEL}" != "" ]; then 
            SEARCH_MODEL="gemma2:2b"                                                    # .(50514.01.22 RAM Override SEARCH_MODEL parameterBeg)
     fi                                                                                 # .(50514.01.23 End)
#    echo "" >run-tests.txt                     ##.(50507.08d.6 RAM Not here).(50507.08a.6 RAM Start MT)
     bash  "${RUN_TESTS}" "$@";                 if [ $? -ne 0 ]; then exit 1; fi
     node  "${SCORE_SCRIPT}" "${SEARCH_MODEL}" "${aApp2}" "$@";
