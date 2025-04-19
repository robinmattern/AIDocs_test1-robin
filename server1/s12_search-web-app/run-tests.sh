#!/bin/bash
        
     if [ "$1" == "s12" ]; then shift; fi 

     export APP=s12

#    export LOGGER=
#    export LOGGER="log"   # no workie
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"
     export DEBUG="0"
 
#    export PC_CODE="pc001p"
     export PC_CODE="rm231d"
#    export PC_CODE="bt04st"

#    export ENV_TEMPLATE="../../.env_${APP}-template_${PC_CODE}.txt"
     export ENV_TEMPLATE=".env_${APP}-template_${PC_CODE}.txt"
#    export ENV_TEMPLATE=".env_${APP}-template_${PC_CODE}.txt"

     export DEBUG="0"
     bash   ../../._2/MWTs/AIC15_runTests_u1.02.sh  "$@";  if [ $? -ne 0 ]; then exit 1; fi
#    shift 
 
#    node search_u2.05.mjs  "$@" 
#    node   search_u2.05.mjs    # run by AIC15_runTests_u1.02.sh

  if [ "${LOGGER}" == "log,inputs" ]; then 
     echo -e "\n-----------------------------------------------------------"
     fi
     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 

