#!/bin/bash
        
     if [ "$1" == "s12" ]; then shift; fi 
     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
     aRun_Tests="../../._2/MWTs/AIC15_runTests_u1.02.sh"
     export SEARCH_SCRIPT="search_u2.06.mjs"

     export APP=s12

#    export LOGGER=
     export LOGGER="log"   # no workie
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"
 
     export PC_CODE="rm231d"

     bash  "${aRun_Tests}"  t041 
     bash  "${aRun_Tests}"  t042
     bash  "${aRun_Tests}"  t043
     bash  "${aRun_Tests}"  t044
     bash  "${aRun_Tests}"  t045
     bash  "${aRun_Tests}"  t046
     bash  "${aRun_Tests}"  t047
     bash  "${aRun_Tests}"  t048
     bash  "${aRun_Tests}"  t049
