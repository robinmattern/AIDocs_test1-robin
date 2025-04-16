#!/bin/bash

        aThreadId=${1:0:4}; bCopied=0
if [ "${aThreadId}" == "t001" ]; then cp -p .env_t001_Run1-qwen2.txt    .env; bCopied=1; shift; fi
if [ "${aThreadId}" == "t002" ]; then cp -p .env_t002_Run5-gemma2.txt  .env; bCopied=1; shift; fi
if [ "${aThreadId}" == "t003" ]; then cp -p .env_t003_Run2-llama3.2.txt .env; bCopied=1; shift; fi

if [ "$1" == "" ] && [ "${bCopied}" ==  "0" ]; then
   echo ""
   echo "  Run any of the following tests:"
   echo "    bash run-tests.sh  t001   # .env_t001_Run1-qwen2"
   echo "    bash run-tests.sh  t002   # .env_t002_Run5-gemma2"
   echo "    bash run-tests.sh  t003   # .env_t003_Run2-llama3.2"
   if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
   exit
   fi

if ()
   node search-web_u2.04.mjs  "$@"



