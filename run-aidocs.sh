#!/bin/bash
#*\
##=========+====================+================================================+
##RD         run-aidocs         | AIDocs Run Commands
##RFILE    +====================+=======+===============+======+=================+
##FD   run-aidocs.sh            |   8331|  3/03/25 10:15|   178| v1.05`50303.1015
##FD   run-aidocs.sh            |  12086|  3/04/25 17:45|   225| v1.05`50304.1745
##FD   run-aidocs.sh            |  12322|  5/10/25 17:30|   228| v1.05`50510.1730
#
#DESC     .---------------------+-------+---------------+------+-----------------+
#            This script runs AIDocs Apps
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#            help               |
#            setDir             |
#            setRepos           |
#            doPM2              |
#            doAll              |
#            listApps           |
#            exit_wCR           |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50303.02   3/03/25 RAM 10:00a| Add run-docs metadata
#.(50303.03   3/03/25 RAM 10:15a| Fix c16 mis-name
#.(50304.06   3/04/25 RAM  9:45a| Display invalid command & other Opps
#.(50304.05   3/04/25 RAM  5:45p| Improve logs commands
#.(50510.03   5/10/25 RAM  8:30a| Bump Version
#.(50516.04   5/16/25 RAM 10:00a| Bump AIDocs version in run-aidocs.sh
#.(50519.03   5/19/25 RAM  8:30a| Bump AIDocs version to u2.10.139, here
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#*/
#========================================================================================================== #  ===============================  #

  aVer="v0.01.50303.1000"  # run-aidocs.sh                                              # .(50303.02.1)
  aVer="v0.01.50303.1015"  # run-aidocs.sh
  aVer="v0.01.50304.1745"  # run-aidocs.sh
  aVer="v2.09.50510.1730"  # run-aidocs.sh                                              # .(50510.03.1)
  aVer="u2.10.138\`50516.1001"  # set-aidocs.sh                                         # .(50516.04.3)
  aVer="u2.10.139\`50519.0830"  # set-aidocs.sh                                         # .(50519.03.1)

function exit_wCR() {
      if [ "${OS:0:7}" != "Windows" ]; then echo ""; fi
         exit
         }
function setRepos() {
         aDir="$( pwd )";
         aPath="$( pwd | tr '[:upper:]' '[:lower:]' )";
         if [[ "${aPath}" =~ ^(.*repos/(robin|test)) ]]; then
             nLen="${#BASH_REMATCH[1]}"
             aRepos="${aDir:0:nLen}"
             fi
         aRepo="${aDir/${aRepos}/}"; aRepo="${aRepo:1}"
 #       echo "  aGitPath: '${aRepos}/${aRepo}/.git'"
         if [ ! -d "${aRepos}/${aRepo}/.git" ]; then
         echo -e "\n* You are not in a Repos folder."
         exit_wCR
         fi
       __basedir="${aRepos}/${aRepo}"
         }
# ------------------------------------------------------------------------------

         aOwnr="Rick"
         setRepos

         echo -e "\n  The current Repo folder is: ${__basedir}"; # exit

         aArg1=$1; aArg2=$2; aArg3=$3; aArg4=$4                                         # .(50304.05.1 RAM Add aArg4 for log -f)
 if [ "${aArg1:0:3}" == "log" ]; then aArg1="logs"; fi                                  # .(50304.05.2 RAM All 'log'; 3 letters)
 if [ "${aArg2:0:3}" == "log" ]; then aArg2="logs"; fi                                  # .(50304.05.3)
 if [ "${aArg3}"  == "-f" ]; then bFollow=1; aArg3="${aArg4}"; fi                       # .(50304.05.4)
 if [ "${aArg4}"  == "-f" ]; then bFollow=1; fi                                         # .(50304.05.5)
 if [ "${#aArg1}" != "3"  ]; then a1=${aArg1}; aArg1=${aArg2}; aArg2=${a1}; fi          # .(50304.05.6 RAM set aArg2 if aArg1 not an App, ie. length is 3)
 if [ "${aArg3}"  == ""   ]; then aArg3=15;  fi                                         # .(50304.05.7 RAM --lines default)

#        echo "  aArg1: '${aArg1:0:3}', aArg2: '${aArg2:0:4}', aArg3: '${aArg3}', bFollow: '${bFollow}'";   exit

# ------------------------------------------------------------------------------

function help() {
    if [ "$1" != "2" ]; then
    echo ""
    echo "  Use any of the following Apps in ${aRepo}:"
    echo "    c16_aidocs-review-app"
    echo "    c17_aidocs-review-backup"

    echo ""
    fi
    aIt="it"; if [ "${aApp}" != "" ]; then aIt="'${aApp}'"; fi
    echo "  Use ${aIt} with any of the following PM2 commands ($aVer}):"                # .(50303.02.2)
    echo "    status            Show all running PM2 apps"
    echo "    list apps         List all AIDocs Apps"                                   # .(50303.01.1)
    echo "    start all         Start all Apps in ${aRepo}"
    echo "    {App} start       Start an {App} in ${aRepo}"
    echo "    {App} stop        Suspend a running {App}"
    echo "    {App} restart     Restart a suspended {App}"
    echo "    {App} kill        Delete {App} from PM2's memory"
    echo "    {App} info        Display {App} properties"
    echo "    {App} logs {Cnt}  Display last {Cnt} log lines, or stream them with -f"   # .(50304.05.8)
    echo "    save              Save PM2 configuration for startup"
    if [ "$1" != "2" ]; then exit_wCR; fi                                               # .(50304.06.1)
    }
# -----------------------------------------------------

function doAll() {
    local aApps=$1                              # Comma-separated list of apps (e.g., "app1,app2,app3")
    local aCmd=$2                               # Command to execute (e.g., "run")
    local script_path="$(realpath "$0")"
    if [ "${aCmd}" == "" ]; then echo ""; help 2; exit; fi

    IFS=',' read -r -a apps_array <<< "$aApps"  # Split the comma-separated list into an array

    for app in "${apps_array[@]}"; do           # Loop through each app in the list
        app=$( echo "$app" | xargs )            # Trim whitespace from the app name
        if [ -n "$app" ]; then                  # Check if the app name is not empty
#       echo -e "\n  calling $script_path  $app $aCmd"
            bash "$script_path" "$app" "$aCmd"  # Call the script with its full path, the current app, and the command
        fi
    done
    }
# -----------------------------------------------------

function doPM2() {
#   aPython="$( which python3 )"
#   aCmd="${2/python3/${aPython}}"
#   echo "  aCmd: $1, aApp: '$2', nLines: '$4', bFollow: '${bFollow}'"

 if [ "$1" == "logs"  ] && [ "${bFollow}" != "1" ]; then                                # .(50304.05.9 RAM Cmd: logs without -follow Beg)
            aLogFile1="$( pm2 show "$2" | grep 'out log'   | awk '{ print $6 }' )"
            aLogFile2="$( pm2 show "$2" | grep 'error log' | awk '{ print $6 }' )"
    echo "  -------------------------------------------------------------------------"
    echo "  tail -n $4 '${aLogFile2}'"
    echo "  -------------------------------------------------------------------------"
            tail -n $4 "${aLogFile2}" | awk '{ print "    " $0 }'; echo ""
    echo "  -------------------------------------------------------------------------"
    echo "  tail -n $4 '${aLogFile1}'"
    echo "  -------------------------------------------------------------------------"
            tail -n $4 "${aLogFile1}" | awk '{ print "    " $0 }'
    echo "  -------------------------------------------------------------------------"
            return
    fi # eif logs without -f                                                            # .(50304.05.9 End)

 if [ "$1" == "start" ]; then
    echo "  pm2 start ecosystem.config.cjs --only \"${aName}\""; echo ""
            pm2 start ../../ecosystem.config.cjs --only "${aName}"
 else
    if [ "${aName}" == "" ]; then return; fi                                            # .(50304.06.2)
    echo "  pm2 $1 \"${aName}\" $3 $4"; echo ""
            pm2 $1  "${aName}"  $3 $4
    fi # eif not start
    }
# -----------------------------------------------------

function  setDir() {
    if [ "${1:0:3}"      == "all"  ]; then aApp="all"; fi
    if [ "${1:0:3}"      == "c16"  ]; then aApp="c16"; aName="AIDocs_${aOwnr}-8016"; aPort="8016"; aAppDir="client1/c16_aidocs-review-app"; fi
#   if [ "${1:0:3}"      == "c17"  ]; then aApp="c17"; aName="AIDocs_${aOwnr}-8017"; aPort="8017"; aAppDir="client1/c17_aidocs-review-backup"; fi
    if [ "${1:0:3}"      == "c17"  ]; then aApp="c17"; aName="AIDocs_Claude-8017";   aPort="8017"; aAppDir="client1/c17_convert-ai-session-app"; fi
    if [ "${1:0:3}"      == "c01"  ]; then aApp="c01"; aName="AIDocs_c01-8001"; aPort="8001"; aAppDir="client/c01_client-app"; fi
    if [ "${1:0:3}"      == "s01"  ]; then aApp="s01"; aName="AIDocs_s01-8101"; aPort="8101"; aAppDir="server/s01_server-api"; fi
    if [ "${1:0:3}"      == "c12"  ]; then aApp="c12"; aName="AIDocs_c12-8012"; aPort="8012"; aAppDir="client1/c12_client-app"; fi
    if [ "${1:0:3}"      == "s12"  ]; then aApp="s12"; aName="AIDocs_s12-8112"; aPort="8112"; aAppDir="server1/s12_server-api"; fi

#   echo "  aApp:  '${aApp}', aName: '${aName}', aAppDir='${aAppDir}', aArg2: '${aArg2}'" ; # exit
#   echo "  aDir: '${__basedir}/${aAppDir}'" ; # exit

    if [ ! -d "${__basedir}/${aAppDir}" ]; then
    echo -e "\n* Can't find an App folder for ${1:0:3}."
    exit_wCR
    fi
#   echo "    cd: '${__basedir}/${aAppDir}'"

    cd "${__basedir}/${aAppDir}" || exit_wCR

    if [ "$2" == "-quiet" ]; then return; fi
    echo "  The current App  folder is: ./${aAppDir}"
    }
# -----------------------------------------------------

function listApps() {
    cd "${__baseDir}"
    rdir -r 2 -s 3 "[cs][0-9][0-9]_" -x '!|\/data|\/docs'
    }
# -----------------------------------------------------


    if [ "${aArg2:0:4}"  == "save" ]; then echo ""; pm2 save;   exit_wCR; fi
    if [ "${aArg2:0:4}"  == "stat" ]; then          pm2 status; exit_wCR; fi
    if [ "${aArg2:0:4}"  == "list" ]; then listApps;            exit;     fi
#   if [ "${aArg2:0:4}"  == "star" ]; then aApp="all"; fi

          setDir ${aArg1} -quiet
    if [ "$1"            == ""     ]; then help; exit; fi                               # .(50304.06.3 RAM Opps)
    if [ "${aApp}"       == "hel"  ]; then help; exit; fi
    if [ "${aApp}"       == "all"  ]; then doAll "c01,s01,c12,s12" ${aArg2}; exit; fi

    echo ""
#   cd "${__basedir}/${aAppDir}"
    if [ "${aArg2:0:4}"  == "star" ]; then bCmd="1";
         if [ "${aApp}"  == "c16"  ]; then setDir c16; doPM2 start "python3 -m http.server ${aPort}" --name "${aName}"; fi
         if [ "${aApp}"  == "c17"  ]; then setDir c17; doPM2 start "python3 -m http.server ${aPort}" --name "${aName}"; fi
         if [ "${aApp}"  == "c01"  ]; then setDir c01; doPM2 start "${aName}"; fi
         if [ "${aApp}"  == "s01"  ]; then setDir s01; doPM2 start "${aName}"; fi
         if [ "${aApp}"  == "c12"  ]; then setDir c12; doPM2 start "${aName}"; fi
         if [ "${aApp}"  == "s12"  ]; then setDir s12; doPM2 start "${aName}"; fi
    fi
#   echo ""
    if [ "${aArg2:0:4}"  == "save" ]; then bCmd="1";  doPM2 save;    fi
    if [ "${aArg2:0:4}"  == "stat" ]; then bCmd="1";  doPM2 status;  fi
    if [ "${aArg2:0:4}"  == "list" ]; then bCmd="1";  listApps;      fi
    if [ "${aArg2:0:4}"  == "stop" ]; then bCmd="1";  doPM2 stop    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "rest" ]; then bCmd="1";  doPM2 restart "${aName}"; fi
    if [ "${aArg2:0:4}"  == "info" ]; then bCmd="1";  doPM2 info    "${aName}"; fi
    if [ "${aArg2:0:4}"  == "kill" ]; then bCmd="1";  doPM2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "dele" ]; then bCmd="1";  doPM2 delete  "${aName}"; fi
    if [ "${aArg2:0:4}"  == "logs" ]; then bCmd="1";  doPM2 logs    "${aName}" --lines ${aArg3}; fi         # .(50304.06.4 RAM Was: $$)

 #     echo -e "\n  bCmd: '${bCmd}', aName: '${aName}', aCmd: '${aArg2}', aApp: '${aArg1}'"
    if [ "${bCmd}" == "1" ] && [ "${aName}"  == "" ]; then echo -e "\n* Invalid App: ${aArg1}."; exit_wCR; fi

    if [ "${bCmd}" != "1" ]; then
       help 2;
       echo -e "\n* You entered an invalid command: ${aArg2}."                          # .(50304.06.5 RAM Display invalid command)
       fi                                                                               # .(50304.06.6)
       exit_wCR

# ------------------------------------------------------------------------------
