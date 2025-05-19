#!/bin/bash
##=========+====================+================================================+
##RD        run-testr.sh        | Main AI.testR.4u  Script
##RFILE    +====================+=======+===============+======+=================+
##FD   run0testr.sh                |      0|  3/01/25  7:00|     0| p1.03`50301.0700
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script runs all the models
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Data-formR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |

##CHGS     .--------------------+----------------------------------------------+
#.(50101.01   5/01/25 MW   7:00a| Created by Robin mattern
#.(50519.02   5/19/25 RAM 10:00a| Write and use shoSource
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#=====================================================================================  # ================= #  ===============================  #

            aVer="u2.10.138"                                                            # .(50514.07.1 RAM Bump Version)
                                                                                        # .(50513.02.x RAM Change name from run-tests.sh to run-aitestr.sh)
#  aAIC="$( dirname "$0" )"; aPWD="$(pwd)"; #echo "  \${aAIC/\${aPWD}/}: ${aAIC/${aPWD}/} -- ${aAIC} in ${aPWD}/"     ##.(50511.04.1)
#  aAIC="$( dirname "$0" )"; aPWD="$(pwd)";  echo "  \${aPWD/\${aAIC}/}: ${aPWD/${aAIC}/} -- ${aPWD} in ${aAIC}/"     ##.(50511.04.1)
#  if [ "${aAIC/${aPWWD}}" == "${aAIC/${aPWD}}" ]; then  echo "  aPWD is in aAIC"; else echo "  aPWD is not in aAIC; cd ${aAIC}"; fi; exit
   aAIC="$( dirname "$0" )"; aPWD="$(pwd)"; # if [ "${aAIC/${aPWWD}}" != "${aAIC/${aPWD}}" ]; then cd "${aAIC}"; fi;  ##.(50511.04.1 RAM Call from anywhere).(50511.04c.1)
     cd "${aAIC}";  # echo "[ 7] cd ${aAIC}"                                                                          # .(50511.04c.1 RAM Call from script location)
#  nPID=$PPID; aAIC=$(ps -o args= -p ${nPID} 2>/dev/null | awk '{print $1}'); echo "  aAIC: ${aAIC}"; exit

           aAIT="$1";   if [ "${aAIT/ait}" != "ait" ] && [ "$1" != "" ]; then shift; else aAIT="$0"; fi;
           aAIT="$( basename "${aAIT}" )"; export AIT="${aAIT}"; # echo "  aAIT: ${aAIT}, \$1: '${1:0:3}'"; exit
#          aDir="$(pwd)"; if [ "${aDir/_}" != "${aDir}" ]; then bash run-tests.sh "$@"; exit; fi  ##.(50505.02.1 RAM Need to be in __basedir)
           aDir="$(pwd)"; if [ "${aDir/_}" != "${aDir}" ]; then aCmd="run here"; fi     # .(50505.02.1 RAM Need to be in __basedir)
#          aDir="$(pwd)"; if [ "${aDir/_}" != "${aDir}" ]; then  cd ../../; fi          ##.(50505.02.1)

#*  --- --  --------------  =  -------------------------------------------------------  #  --------------  *#

  function  shoSource( ) {                                                              # .(50519.02.1 RAM Write shoSource Beg) 
    aCmdFile=$( which 'aitestr' )
    cat "${aCmdFile}" | awk '/aitestr/ { print "\n  " $1 }'
    if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
    }                                                                                   # .(50519.02.1 End) 
#*  --- --  --------------  =  ------------------------------------------------------  *#  

   if [ "${aAIT}" == "ait"       ]; then aAIT="AIT"; fi
   if [ "${aAIT}" == "aitestr"   ]; then aAIT="AItestR"; fi
   if [ "${aAIT}" == "aitestr4u" ]; then aAIT="AI.testR.4u"; fi

                                         aCmd="        ";
   if [ "$1"          == ""      ]; then aCmd="help"; fi; b=0
   if [ "$1"          == "help"  ]; then aCmd="help"; fi
   if [ "$1"          == "Help"  ]; then aCmd="help"; fi
   if [ "${aCmd}"     != "help"  ]; then
   if [ "${1:0:3}"    == "sou"   ]; then  shoSource; exit; fi                           # .(50519.02.1 RAM Use shoSource)
   if [ "${1:0:3}"    == "ver"   ]; then  ._2/MWTs/AIC00_getVersion.sh;  exit;  fi      # .(50420.01b.2)
   if [ "${1:0:3}"    == "gen"   ]; then aCmd="generate"; aApp=$2;  shift; b=2; shift; b=2; fi # .(50420.01b.3)
   if [ "${2:0:3}"    == "gen"   ]; then aCmd="generate"; aApp=$1;  shift; b=2; shift; b=2; fi # .(50420.01b.5)
   if [ "${1:0:3}"    == "lis"   ]; then aCmd="list    "; aApp=$2;  shift; b=1; fi      # .(50516.07.1 RAM Was s13).(50420.01b.4)
   if [ "${2:0:3}"    == "lis"   ]; then aCmd="list    "; aApp=$1;  shift; b=1; fi      # .(50516.07.2 RAM Do list for each app)
   if [ "${1:0:3}"    == "imp"   ]; then aCmd="import  "; aApp=s13; shift; b=1; fi      # .(50505.05.1
   if [ "${1:0:3}"    == "sql"   ]; then aCmd="sqlite  "; aApp=s13; shift; b=1; fi      # .(50505.06.1)
   if [ "${1:0:3}"    == "chr"   ]; then aCmd="chroma  "; aApp=s13; shift; b=1; fi      # .(50505.06.2)
   if [ "${1:0:3}"    == "exa"   ]; then aCmd="example "; aApp=s13; shift; b=1; fi      # .(50505.04.2 RAM Add example)
   if [ "${aApp}"     == ""      ]; then                  aApp=$1;  shift; fi           # .(50420.01b.7)
                                         aDir=""; aTests="$@"                           # .(50429.05.1)
#  if [ "${aApp:0:3}" == "s11"   ]; then aDir="server1/s11_search-app";     shift; fi   ##.(50429.05.2).(50518.01.1)
   if [ "${aApp:0:3}" == "s01"   ]; then aDir="server/s01_search-app";      shift; fi   # .(50518.01.1 RAM Add     ./server/s01_search-app)
   if [ "${aApp:0:3}" == "s11"   ]; then aDir="server1/s11_search-mod-app"; shift; fi   # .(50518.01.2 RAM Rename ./server1/s11_search-app).(50429.05.2)
   if [ "${aApp:0:3}" == "s12"   ]; then aDir="server1/s12_search-web-app"; shift; fi   # .(50429.05.3)
   if [ "${aApp:0:3}" == "s13"   ]; then aDir="server1/s13_search-rag-app"; shift; fi   # .(50429.05.4)

#  echo "-- aCmd: '${aCmd}', aApp: '${aApp}', PWD: '${aPWD/*robin/}'; aDir: '${aDir}', aTests: '${aTests}'"; #  exit # .(50429.05.5

   if [ "${b}" == "1" ] && [ "${aDir}" == "" ]; then                                    # .(50429.05.6 Beg)
      echo -e "\n* Note: You didn't provide a valid App: s11, s12 or s13.";        aCmd="help"
      fi
   if [ "${b}" == "2" ] && [ "${aDir}" != "" ] && [ "${aTests}" == "" ]; then
      echo -e "\n* Note: Did you forget to provide a Test Id?";                    aCmd="help"
      fi
   if [ "${aCmd}" == "        " ] && [ "${aDir}" == "" ]; then
      echo -e "\n* Error: Invalid app name. Please specify a valid app name.";     aCmd="help"
      echo -e   "    s01                for server/s01_search-app"                      # .(50518.01.3)
      echo -e   "    s11                for server1/s11_search-mod-app"                 # .(50518.01.4)
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
#*  --- --  --------------  =  ------------------------------------------------------  *#  

   if [ "${aCmd}" == "help" ]; then
   if [ "${2:0:2}" == "pc" ]; then                                                      # .(50516.08.1 RAM pc_code help Beg)
      echo -e "\n  Before testing model performance on your computer, we need to determine the hardware specs"
      echo      "  for your PC. To do that, just run any test, e.g. ait s11 t011.  Your PC's specs will be"
      echo      "  saved along with a unique 6 digit hexidecimal PC_CODE.  If you'd like to create a more user"
      echo      "  friendly PC_CODE, you can assign a 6 digit code on line 36 of this file, run-tests.sh,"
      echo      "  and run the test again."
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit
      fi                                                                                # .(50516.08.1 End)
      aDate2="$( date +'%B %d, %Y %l:%M%p' )"; aDate="${aDate/AM/a}"; aDate="${aDate/PM/p}" # .(50516.04.4 RAM Add nice version date)
      echo -e "\n  Usage: ${aAIT} ...       Ver: ${aVer}  (${aDate2})"                  # .(50516.04.5).(50505.05.1)
      echo -e   "" 
      echo -e   "    {App} {Test}       to run a test"
      echo -e   "    {App} gen {Group}  to generate an .env template for a test model group"
      echo -e   "    {App} list         to list all tests to run"
      echo -e   "    help pc_code       to save computer hardware specs"                # .(50516.08.2)
      echo -e   "    import {App}       to import a collection of docs"                 # .(50505.05.2)
      echo -e   "    chroma start       to start the Chroma Vector DB"                  # .(50505.06.3)
      echo -e   "    sql {table}        to query a table in the Chroma Vector DB"       # .(50505.06.4)
      echo -e   ""
      echo -e   "  Where:"
      echo -e   "    {App}              is an App Id for one type of test app, e.g. s11."
      echo -e   "    {Test}             is one Test id, e.g. t011"
      echo -e   "    {Group}            is a Group Id for one set of model tests, e.g. t010"
      echo -e   ""                                                                      # .(50421.04.1 RAM Add more help Beg)
      echo -e   "  For example:"
      echo -e   "    ${aAIT} s11 help"
      echo -e   "    ${aAIT} s11 t011"
      echo -e   "    ${aAIT} import s13a"                                               # .(50505.05.3)
      echo -e   "    ${aAIT} chroma collections"                                        # .(50429.05.7)
      echo -e   "    ${aAIT} s13g t041"                                                 # .(50429.05.7)
      echo -e   "    ${aAIT} example s13"                                               # .(50505.04.3)
#     echo -e   "    ${aAIT}"                                                           # .(50421.04.1 End)
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit
      fi
#*  --- --  --------------  =  ------------------------------------------------------  *#  

    source "./run-tests.sh"                                                             # .(50513.02.1 RAM Get common parameters from __basedir/run-tests.sh)

#   export  SECTIONS="None"                                                             # .(50515.01.1)

    export  ENVs="0"; bEnvs="${ENVs}"                                                   # .(50513.05.1)
#   export  DOIT="0"                            # .(50506.03.5 Do it unless DRYRUN="1".
#   export  DEBUG="1"                           # .(50506.03.6 Runs node with --inspect-brk, if bDOIT="1", unless DRYRUN="0"
#   export  DRYRUN="1"                          # .(50506.03.1 RAM Add DRYRUN)
#   export  SCORING="1"                         # .(50507.02.8 RAM New way to score it

      if [ "${bEnvs}" == "1" ]; then echo "  - S1000[  93]  APP: '${aApp}', DOIT: '${DOIT}',  DEBUG: '${DEBUG}', DRYRUN: '${DRYRUN}', SCORING: '${SCORING}', PC_CODE: '${PC_CODE}', LOGGER: '${LOGGER}'"; fi # exit # .(50513.05.2)

#     if [ "${aCmd}" == "run here " ]; then bash run-test.sh "$@"; exit; fi             ##.(50505.02b.1).(50505.02.12 RAM ??)

#     aPWD="$( pwd )"; echo "  aDir: '${aPWD}' == '${aDir}', '${aPWD/${aDir}}'"; # exit
#     aPWD="$( pwd )"; if [[ "${aPWD}" == *"${aDir}"* ]]; then echo "don't cd"; fi; exit
#     if [ "${aCmd}" != "run here " ]; then                                             ##.(50505.02b.2 RAM Try this).(50505.02.12 RAM ??).(50511.04c.2)
#     if [[ "$( pwd )" != *"${aDir}"* ]]; then cd "${aDir}"; echo "  cd ${aDir}"; fi    ##.(50511.04.2 RAM Was: PWD no workie in Unix)
#     fi                                                                                ##.(50511.04.2).(50511.04c.2)
#*  --- --  --------------  =  ------------------------------------------------------  *#  

       cd "${aDir}"; # echo "[97]  cd ${aDir}";                                         # .(50511.04c.2 RAM Call from app location)
#      echo ""
#      pwd
#      echo -- bash sqlite.sh "${aTests}"; exit
#      echo "-- node import_u1.03.mjs '${aApp}' '${aTests}'"; exit
#     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      if [ "${aCmd}" == "import  " ]; then node ../components/import_u1.03.mjs ${aTests}; exit; fi    # .(50514.02.1).(50505.07.1).(50505.05.4)
      if [ "${aCmd}" == "sqlite  " ]; then bash sqlite.sh ${aTests}; exit; fi           # .(50505.06.5)
      if [ "${aCmd}" == "chroma  " ]; then bash sqlite.sh ${aTests}; exit; fi           # .(50505.06.6)
      if [ "${aCmd}" == "example " ]; then bash run-tests2.sh; exit; fi                 # .(50505.04.4)

#*  --- --  --------------  =  ------------------------------------------------------  *#  

#  echo  "  ./run-tests.sh ${aCmd// /} ${aApp} ${aTests}"; exit                         ##.(50429.05.8)
            ./run-tests.sh ${aCmd// /} ${aApp} ${aTests}                                # .(50429.05.8

#*  --- --  --------------  =  -------------------------------------------------------  #  --------------  *#

#*====================================================================================================== *#### =============================== *#
#>      S1201 END
# ==== ==================================================================================================  *#
#
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
#