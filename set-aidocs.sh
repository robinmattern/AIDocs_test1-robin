#!/bin/bash
#*\
##=========+====================+================================================+
##RD         set-aidocs         | AIDocs Setup Script                                   # .(50503.01.1)
##RFILE    +====================+=======+===============+======+=================+
##FD   set-aidocs.sh            |  10420|  3/03/25  9:30|   202| v1.05`50303.0930       # .(50503.01.2)

##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script saves aidocs command to ._0/bin.                               # .(50503.01.3)
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2024 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#            help               |
#            setOSvars          |
#            showEm             |
#            mkScript           |
#            cpyToBin           |
#            Sudo               |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50303.01   3/03/25 RAM  9:30a| opy set-aidocs from set-anyllm
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#*/
#========================================================================================================== #  ===============================  #

  aVer="v0.05.50303.0930"  # set-aidocs.sh                                              # .(50503.01.4)

  echo ""

# ---------------------------------------------------------------------------

function help() {
  echo "  Run . ./set-aidocs.sh commands  (${aVer} OS: ${aOS})"                         # .(50503.01.5)
  echo "    help  This help"
  echo "    doit  Create command aidocs"                                                # .(50503.01.6)
# echo "    doit  Make folders"          
  echo "    show  Show commands and ${aBashrc} and \$PATH" 
# echo "    wipe  Wipe all the setup"                      
  }
# -----------------------------------------------------------

function exit_wCR() {
  if [[ "${aOS}" != "windows" ]]; then echo ""; fi
     }
# -----------------------------------------------------------

function setOSvars() {
     aTS=$( date '+%y%m%d.%H%M' ); aTS=${aTS:2}
     aBashrc="$HOME/.bashrc"
     aBinDir="/home/._0/bin"                                                           
     aOS="linux"
  if [[ "${OS:0:7}" == "Windows" ]]; then
     aOS="windows";
     aBinDir="/C/Home/._0/bin"
     fi
  if [[ "${OSTYPE:0:6}" == "darwin" ]]; then
     aBashrc="$HOME/.zshrc"
     aBinDir="/Users/Shared/._0/bin"
     aOS="darwin"
     fi
     }
# -----------------------------------------------------------

function Sudo() {                                                                                         
  if [[ "${OS:0:7}" != "Windows" ]]; then if [ "${USERNAME}" != "root" ]; then sudo "$@"; fi; fi           
     }                                                                                                      
# -----------------------------------------------------------

                                     aCmd="help"
#  if [[ "$1" == ""         ]]; then aCmd="help";   fi
   if [[ "$1" == "help"     ]]; then aCmd="help";   fi
   if [[ "$1" == "doit"     ]]; then aCmd="doIt";   fi
   if [[ "${1:0:2}" == "-d" ]]; then aCmd="doIt";   fi                                  
   if [[ "$1" == "show"     ]]; then aCmd="showEm"; fi

# ---------------------------------------------------------------------------

function getBinVersion() {    
  if [ ! -f "${aBinDir}/$1" ]; then 
     echo "  aBinFile: run-$1.sh"; cat "run-$1.sh"; exit 
     aBinFile="$( cat "run-$1.sh"     | awk '/\.sh/ { sub( /"\$.+/, "" ); sub( /^ */, "" ); sub( / *$/, "" ); print }' )"
  else 
     aBinFile="$( cat "${aBinDir}/$1" | awk '/\.sh/ { sub( /"\$.+/, "" ); sub( /^ */, "" ); sub( / *$/, "" ); print }' )"
     fi 
#    aBinFile="$( cat "${aBinDir}/$1" | awk '/\.sh/' )"; echo "  '${aBinFile}'"; exit
     aBinVer="$(  cat "${aBinFile}"   | awk '/ aVer=/ { sub( /aVer=/, "" ); a = $1 }; END{ print a }' )"
     aBinVer="$(  cat "${aBinFile}"   | awk '/ aVer="?v[0-9]/ { sub( /aVer=/, "" ); a = $1 }; END{ print a }' )"
     }                                                                                                         
# -----------------------------------------------------------

function showEm() {
         getBinVersion "aidocs"                                                         # .(50503.01.7)

  echo "  aBinDir: '${aBinDir}'"
  if [ -d "${aBinDir}" ]; then ls -l "${aBinDir}" | awk 'NR > 1 { print "    " $0 }'; fi

  echo ""
  echo "  .Bashrc: '${aBashrc}'"
  if [ -f "${aBashrc}" ]; then cat  "${aBashrc}" | awk '{ print "    " $0 }'; fi
  echo -e "    -------\n"

  echo "  PATH:"
  echo "${PATH}" | awk '{ gsub( /:/, "\n" ); print}' | awk '/bin$/ { print "    " $0 }' | sort              

  echo ""                                                                                                    
  echo "  aidocs Version: ${aBinVer}"                                                   # .(50503.01.8)
  echo "  aidocs Location: ${aBinDir}/aidocs"                                           # .(50503.01.9)
  echo "  aidocs Script:  '${aBinFile}'"                                                # .(50503.01.10)
  }
# -----------------------------------------------------------

function mkScript() {
# echo "    aAIDocs_scr: $2/$3"                                                         # .(50503.01.11)
  echo "#!/bin/bash"   >"$2/$3"
  echo "  $1 \"\$@\"" >>"$2/$3"
  chmod 777 "$2/$3"
  }
# -----------------------------------------------------------

function cpyToBin() {
# return
   if [ ! $( which node 2>/dev/null ) ]; then                                           
      echo -e "\n* You need to install NodeJS.  Use NVS to easily switch versions."
      exit_wCR
      fi
   if [ ! $( which yarn 2>/dev/null ) ]; then
      echo -e "\n  Installing YARN ..."
      npm install --global yarn
      fi                                                                                
  aJPTs_JDir="${aBinDir}"   # "/Users/Shared/._0/bin"
# aJPTs_GitR="${aRepo_Dir}/._2/JPTs/gitr.sh"                                            
  AIDocs_scr="${aRepo_Dir}/run-aidocs.sh"                                               # .(50303.01.12)

# echo ""
# echo " aJPTs_JDir: ${aJPTs_JDir}";
# echo " aJPTs_GitR: ${aJPTs_GitR}";
# echo " alias gitr: ${aJPTs_JDir}/gitr.sh";
# echo " copying run-aidocs.sh and gitr to: \"${aJPTs_JDir}\""; echo ""                 # .(50503.01.13)

  if [ ! -d  "${aJPTs_JDir}" ]; then sudo mkdir -p  "${aJPTs_JDir}";                    echo "  Created: ${aJPTs_JDir}";
                                     Sudo chmod 777 "${aJPTs_JDir}"; fi                 

  if [   -f  "${AIDocs_scr}" ]; then mkScript "${AIDocs_scr}" "${aJPTs_JDir}" "aidocs"; echo "  Copied:  ${aJPTs_JDir}/aidocs";  # .(50503.01.14)
                                     Sudo chmod 777 "${AIDocs_scr}"; fi                 # .(50503.01.15)
                                     getBinVersion "aidocs"                             # .(50503.01.16)

   cd "${aRepo_Dir}"                                                                    
   git config core.fileMode false                                                       

  echo "  Version: ${aBinVer//\"}"                                                      
  }
# ---------------------------------------------------------------------------

  aRepo_Dir="$(pwd)"
  cd ..
  aProj_Dir="$(pwd)"

  setOSvars; # echo "  OS: ${aOS}"

  if [[ "${aCmd}" == "help"   ]]; then help; fi
  if [[ "${aCmd}" == "showEm" ]]; then showEm; fi
# if [[ "${aCmd}" == "doIt"   ]]; then setBashrc; fi                                    
  if [[ "${aCmd}" == "doIt"   ]]; then cpyToBin; fi

# ---------------------------------------------------------------------------

   cd "${aRepo_Dir}"                                                                    

   exit_wCR


