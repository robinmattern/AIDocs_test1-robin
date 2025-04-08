#!/bin/bash

   aApp=demo1
   export PORT=8080

if [ ! -d ../node_modules/express ]; then
   echo -e "\n* Please run npm install in the client1 folder."
   exit
   fi

if [ ! -f ./utils/FRTs/_env ]; then
   echo -e "\n* Please copy an _env file in the folder, /utils/FRTs."
   exit
   fi

if [ "${OSTYPE:0:5}" == "linux" ]; then
   if which "run-node-apps"  >/dev/null 2>&1; then run-node-apps stop ${aApp};  else echo -e "\n* run-node-apps is not available"; fi
   if which "kill-node-apps" >/dev/null 2>&1; then kill-node-apps ${PORT} doit; else echo -e "\n* kill-node-apps is not available"; fi
#  echo kill-node-apps 8080 doit
#  kill-node-apps 8080 doit
   npm start
   exit
   fi

if [ "${OSTYPE:0:6}" == "darwin" ]; then
   jpt kill port ${PORT}; echo ""
   node server.mjs
   exit
   fi

if [ "${OSTYPE:0:4}" == "msys" ]; then
   jpt kill port ${PORT}; echo ""
   node server.mjs
   exit
   fi

if [ "${OS:0:7}" == "Windows" ]; then   # Running in DOS, will it ever happen?
   jpt kill port ${PORT}; echo ""
   node server.mjs
   exit
   fi