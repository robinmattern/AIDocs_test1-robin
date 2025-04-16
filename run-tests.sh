#!/bin/bash

                              aDir=""    
   if [ "$1" == "s11" ]; then aDir="server1/s11_search-app";     shift; fi
   if [ "$1" == "s12" ]; then aDir="server1/s12_search-web-app"; shift; fi
   if [ "$1" == "s13" ]; then aDir="server1/s13_search-rag-app"; shift; fi

   if [ "$1" != ""  ] && [ "${aDir}" == "" ]; then
      echo -e "\n* Error: Invalid app name. Please specify a valid app name."
      echo -e   "    s11                for server1/s11_search-app" 
      echo -e   "    s12                for server1/s12_search-web-app" 
      echo -e   "    s13                for server1/s13_search-rag-app" 
      shift
      fi

   if [ "$1" == "" ]; then  
      echo -e "\n  Usage: ./run-tests.sh ..."
      echo -e   "    {App} {Test}       to run a test"
      echo -e   "    {App} gen {Group}  to generate an .env template for a test model group"
      echo -e   ""
      echo -e   "  where:"
      echo -e   "    {App}              is an App Id for one type of test, e.g. s11."
      echo -e   "    {Test}             is one Test id, e.g. t011"
      echo -e   "    {Group}            is a Group Id for one set of model tests, e.g. t010"
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
      exit 
      fi 

      cd "${aDir}"; 

#     echo ""
#     pwd
#     echo ./run-tests.sh "$@"
#     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 

      ./run-tests.sh "$@"
