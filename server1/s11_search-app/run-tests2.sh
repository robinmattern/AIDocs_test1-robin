#!/bin/bash
        
     if [ "$1" == "s11" ]; then shift; fi 
     if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
     aRun_Tests="../../._2/MWTs/AIC15_runTests_u1.02.sh"
     export SEARCH_SCRIPT="search_u2.06.mjs"

     export APP=s11 

#    export LOGGER=
     export LOGGER="log"   # no workie
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"
 
     export PC_CODE="rm231d"

     bash  "${aRun_Tests}"  041 
     bash  "${aRun_Tests}"  042
     bash  "${aRun_Tests}"  043
     bash  "${aRun_Tests}"  044
     bash  "${aRun_Tests}"  045
     bash  "${aRun_Tests}"  046
     bash  "${aRun_Tests}"  047
     bash  "${aRun_Tests}"  048
     bash  "${aRun_Tests}"  049
