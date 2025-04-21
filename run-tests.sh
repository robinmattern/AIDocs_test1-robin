#!/bin/bash

   if [ "${1:0:3}" == "ver" ]; then                                                     # .(50420.01.1)
        ._2/MWTs/AIC00_getVersion.sh; exit                                              # .(50420.01.2)
        fi                                                                              # .(50420.01.3)
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

#  if [ "${1:0:3}" == "lis" ]; then echo "do list"; exit; fi
   
   if [ "$1" == "" ]; then  
      echo -e "\n  Usage: ./run-tests.sh ..."
      echo -e   "    {App} {Test}       to run a test"
      echo -e   "    {App} gen {Group}  to generate an .env template for a test model group"
      echo -e   "    {App} list         to list all tests to run"
      echo -e   ""
      echo -e   "  Where:"
      echo -e   "    {App}              is an App Id for one type of test app, e.g. s11."
      echo -e   "    {Test}             is one Test id, e.g. t011"
      echo -e   "    {Group}            is a Group Id for one set of model tests, e.g. t010"
      echo -e   ""                                                                      # .(50421.04.1 RAM Add more help Beg)
      echo -e   "  For example:"                                                         
      echo -e   "    ./run-tests.sh s11 help"
      echo -e   "    ./run-tests.sh s11 t041"
      echo -e   "    ./run-tests2.sh"                                                   # .(50421.04.1 End)

      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
      exit 
      fi 

      cd "${aDir}"; 

#     echo ""
#     pwd
#     echo ./run-tests.sh "$@"
#     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 

      ./run-tests.sh "$@"
