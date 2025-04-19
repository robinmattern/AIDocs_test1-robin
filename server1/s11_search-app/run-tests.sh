#!/bin/bash
        
     if [ "$1" == "s11" ]; then shift; fi 

     export APP=s11 

#    export LOGGER=
#    export LOGGER="log"   # no workie
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"
 
     export PC_CODE="rm231d"

     bash   ../../._2/MWTs/AIC15_runTests_u1.02.sh  "$@";  if [ $? -ne 0 ]; then exit 1; fi
#    shift 
 
#    node search_u2.05.mjs  "$@" 
#    node   search_u2.05.mjs    # run by AIC15_runTests_u1.02.sh

  if [ "${LOGGER}" == "log,inputs" ]; then 
     echo -e "\n-----------------------------------------------------------"
     fi
     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 

