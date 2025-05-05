#!/bin/bash
        
     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
     aApp2="s12"; if [[ "$1" =~ [acs][0-9]{2} ]]; then aApp2=$1; shift; fi              # .(50429.05.13)
                  if [[ "$2" =~ [acs][0-9]{2} ]]; then aApp2=$2; aArgs=("$@"); unset aArgs[1]; set -- "${aArgs[@]}"; fi         # .(50429.05.14 )

            aRun_Tests="../../._2/MWTs/AIC15_runTests_u1.02.sh"
            aScore_Script="../s14_grading-app/score_u2.08.mjs"
     export SEARCH_SCRIPT="search_u2.08.mjs"

     export APP=${aApp2}

#    export LOGGER=
#    export LOGGER="log"   # no workie
#    export LOGGER="inputs"
     export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"
 
     export PC_CODE="rm231p"

     bash  "${aRun_Tests}"  "$@";                                if [ $? -ne 0 ]; then exit 1; fi
     node  "${aScore_Script}" "gemma2:2b" "--app:s12";           if [ $? -ne 0 ]; then exit 1; fi

