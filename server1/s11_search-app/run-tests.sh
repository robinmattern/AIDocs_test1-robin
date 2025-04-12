#!/bin/bash
        aApp=s11 
        aThreadId=${1:0:4}; bCopied=0
                                              
if [ "${aThreadId/t}" != "${aThreadId}" ]; then ../../._2/MWTs/AIC19_genEnv.sh ${aApp} ${aThreadId/t}; bCopied=1; shift; else  
if [ "${aThreadId}" == "t010" ]; then cp -p ".env_${aApp}_t010_*.txt" .env; bCopied=1; shift; fi 
if [ "${aThreadId}" == "t020" ]; then cp -p ".env_${aApp}_t002_*.txt" .env; bCopied=1; shift; fi 
if [ "${aThreadId}" == "t030" ]; then cp -p ".env_${aApp}_t003_*.txt" .env; bCopied=1; shift; fi;   
if [ "${aThreadId}" == "t040" ]; then cp -p ".env_${aApp}_t004_*.txt" .env; bCopied=1; shift; fi; fi  

if [ "$1" == "" ] && [ "${bCopied}" ==  "0" ]; then 
   echo ""
   echo "  Run any of the following tests:"
         ls -l .env_${aApp}_* | awk '{ print "    bash run-tests.sh  " substr($9,10,4) "  # " $9 }' 
   if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
   exit 
   fi 

   node search_u2.04.mjs  "$@"



