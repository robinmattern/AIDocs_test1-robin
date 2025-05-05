#!/bin/bash

#  aAIC=${BASH_SOURCE[1]}; echo "  aAIC: ${aAIC}"; exit 
#  nPID=$PPID; aAIC=$(ps -o args= -p ${nPID} 2>/dev/null | awk '{print $1}'); echo "  aAIC: ${aAIC}"; exit 

           aAIT="$1";   if [ "${aAIT/ait}" != "ait" ] && [ "$1" != "" ]; then shift; else aAIT="$0"; fi; 
           aAIT="$( basename "${aAIT}" )"; export AIT="${aAIT}"; # echo "  aAIT: ${aAIT}, \$1: '${1:0:3}'"; exit 
#          aDir="$(pwd)"; if [ "${aDir/_}" != "${aDir}" ]; then bash run-tests.sh "$@"; exit; fi  # .(50505.02.1 RAM Need to be in __basedir)
           aDir="$(pwd)"; if [ "${aDir/_}" != "${aDir}" ]; then aCmd="run here"; fi     # .(50505.02.1 RAM Need to be in __basedir)
#          aDir="$(pwd)"; if [ "${aDir/_}" != "${aDir}" ]; then  cd ../../; fi          ##.(50505.02.1)

   if [ "${aAIT}" == "ait"       ]; then aAIT="AIT"; fi 
   if [ "${aAIT}" == "aitestr"   ]; then aAIT="AItestR"; fi 
   if [ "${aAIT}" == "aitestr4u" ]; then aAIT="AI.testR.4u"; fi 

                                         aCmd="        ";  
   if [ "$1"          == ""      ]; then aCmd="help"; fi; b=0 
   if [ "$1"          == "help"  ]; then aCmd="help"; fi 
   if [ "${aCmd}"     != "help"  ]; then 
   if [ "${1:0:3}"    == "ver"   ]; then  ._2/MWTs/AIC00_getVersion.sh;   exit;  fi     # .(50420.01b.2)
   if [ "${1:0:3}"    == "gen"   ]; then aCmd="generate"; aApp=$2; shift; shift; b=2; fi     # .(50420.01b.3)
   if [ "${2:0:3}"    == "gen"   ]; then aCmd="generate"; aApp=$1; shift; shift; b=2; fi     # .(50420.01b.5)
   if [ "${1:0:3}"    == "lis"   ]; then aCmd="list    "; aApp=$2; shift; shift; b=1; fi     # .(50420.01b.4)
   if [ "${2:0:3}"    == "lis"   ]; then aCmd="list    "; aApp=$1; shift; shift; b=1; fi     # .(50420.01b.6)
   if [ "${1:0:3}"    == "imp"   ]; then aCmd="import  "; aApp=$2; shift; shift; b=1; fi     # .(50505.05.1)
   if [ "${2:0:3}"    == "imp"   ]; then aCmd="import  "; aApp=$1; shift; shift; b=1; fi     # .(50505.05.2)
   if [ "${1:0:3}"    == "sql"   ]; then aCmd="sqlite  "; aApp=$2; shift; shift; b=1; fi     # .(50505.06.1)
   if [ "${2:0:3}"    == "sql"   ]; then aCmd="sqlite  "; aApp=$1; shift; shift; b=1; fi     # .(50505.06.2)
   if [ "${1:0:3}"    == "exa"   ]; then aCmd="example "; aApp=$2; shift; shift; b=1; fi     # .(50505.04.1)
   if [ "${2:0:3}"    == "exa"   ]; then aCmd="example "; aApp=$1; shift; shift; b=1; fi     # .(50505.04.2)
   if [ "${aApp}"     == ""      ]; then                  aApp=$1; shift; fi            # .(50420.01b.7)
                                         aDir=""; aTests="$@"                           # .(50429.05.1)             
   if [ "${aApp:0:3}" == "s11"   ]; then aDir="server1/s11_search-app";     shift; fi   # .(50429.05.2)             
   if [ "${aApp:0:3}" == "s12"   ]; then aDir="server1/s12_search-web-app"; shift; fi   # .(50429.05.3)
   if [ "${aApp:0:3}" == "s13"   ]; then aDir="server1/s13_search-rag-app"; shift; fi   # .(50429.05.4)
 
#  echo "-- aCmd: '${aCmd}', aApp: '${aApp}', aDir: '${aDir}', aTests: '${aTests}'"; # exit # .(50429.05.5

   aCmds= 
   if [ "${b}" == "1" ] && [ "${aDir}" == "" ]; then                                   # .(50429.05.6 Beg)   
      echo -e "\n* Note: Did you forget to provide an App?";                       aCmd="help"           
      fi                                                                                   
   if [ "${b}" == "2" ] && [ "${aDir}" != "" ] && [ "${aTests}" == "" ]; then
      echo -e "\n* Note: Did you forget to provide a Test Id?";                    aCmd="help" 
      fi 
   if [ "${aCmd}" == "        " ] && [ "${aDir}" == "" ]; then
      echo -e "\n* Error: Invalid app name. Please specify a valid app name.";     aCmd="help" 
      echo -e   "    s11                for server1/s11_search-app" 
      echo -e   "    s12                for server1/s12_search-web-app" 
      echo -e   "    s13[a]             for server1/s13_search-rag-app" 
      shift
      fi;                                                                              
      fi; # eif help                                                                    # .(50429.05.6 End)
#  if [ "${aCmd}" == "help    " ]; then  
#     echo -e "\n  Usage: ./run-tests.sh ..."; exit
#     fi 

#     echo -e "\n  ./run-tests.sh ${aCmd// /} ${aApp} ${aTests}" 

#  if [ "${1:0:3}" == "lis" ]; then echo "do list"; exit; fi

   if [ "${aCmd}" == "help" ]; then  
      echo -e "\n  Usage: ${aAIT} ..."
      echo -e   "    {App} {Test}       to run a test"
      echo -e   "    {App} gen {Group}  to generate an .env template for a test model group"
      echo -e   "    {App} list         to list all tests to run"
      echo -e   "    import {App}       to import a collection of docs"                 # .(50505.05.3)
      echo -e   "    sqlite s13         to query the Chroma Vector DB"                  # .(50505.06.3)
      echo -e   ""
      echo -e   "  Where:"
      echo -e   "    {App}              is an App Id for one type of test app, e.g. s11."
      echo -e   "    {Test}             is one Test id, e.g. t011"
      echo -e   "    {Group}            is a Group Id for one set of model tests, e.g. t010"
      echo -e   ""                                                                      # .(50421.04.1 RAM Add more help Beg)
      echo -e   "  For example:"                                                         
      echo -e   "    ${aAIT} s11 help"
      echo -e   "    ${aAIT} s11 t041"
      echo -e   "    ${aAIT} s13g t041"                                                 # .(50429.05.7)
      echo -e   "    ${aAIT} import s13a"                                               # .(50505.05.4)
      echo -e   "    ${aAIT} example s13"                                               # .(50505.04.3)
#     echo -e   "    ${aAIT}"                                                           # .(50421.04.1 End)
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
      exit 
      fi 
  #   -------------------------------------------------------------------------------

      if [ "${aCmd}" == "run here " ]; then bash run-test.sh "$@"; exit; fi            # .(50505.02.4) 

      cd "${aDir}"; 

#     echo ""
#     pwd
#     echo -- ./run-tests.sh ${aApp} "$@"
#     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
      if [ "${aCmd}" == "import  " ]; then node import_u1.03.mjs ${aApp}; exit; fi      # .(50505.05.5) 
      if [ "${aCmd}" == "sqlite  " ]; then bash sqlite.sh "$@"; exit; fi                # .(50505.06.4) 
      if [ "${aCmd}" == "example " ]; then bash run-tests2.sh; exit; fi                  # .(50505.04.4) 

#  echo  "  ./run-tests.sh ${aCmd// /} ${aApp} ${aTests}"; exit                         ##.(50429.05.8)
            ./run-tests.sh ${aCmd// /} ${aApp} ${aTests}                                # .(50429.05.8
