#!/bin/bash
##=========+====================+================================================+
##RD       AIC15_runTests       | Generate Mac Hardware specs
##RFILE    +====================+=======+===============+======+=================+
##FD AIC15_runTests_u1.02.sh    |  10000|  4/16/25 17:50|   200| u1.02`50416.1750
##FD AIC15_runTests_u1.02.sh    |  12538|  4/23/25  8:30|   224| u1.02`50423.0830
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script really runs the tests specificed by run-tests.sh
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#       ion  runcommand() {     |
#       ion  getMacInfo() {     |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50416.08   4/16/25 RAM  5:50p| Witten by Robin Mattern
#.(50419.05   4/19/25 RAM  4:00p| Allow run-tests.sh run aTest, maybe
#.(50420.03   4/20/25 RAM  9:30a| Move final underline to here from run.tests.sh
#.(50420.04   4/20/25 RAM 10:15a| Add Help re run-tests.sh Ids
#.(50422.03   4/22/25 RAM 10:11a| Add ${aApp} to help
#.(50422.04   4/22/25 RAM  9:41a| Add TestId to "inputs" display
#.(50423.03   4/23/25 RAM  8:30a| Use ${SEARCH_SCRIPT} in run-tests.sh
#.(50420.01b  4/29/25 RAM  8:30a| Rework arguments to allow for aApp2
#.(50428.05   4/29/25 RAM  9:00a| Add ${aApp} to Running Msg
#.(50429.02   4/29/25 CAI  9:00p| Move shift
#.(50429.03   4/29/25 CAI  9:15p| Write get1stFile
#.(50429.05   4/29/25 RAM  9:30p| Set env variable for aApp2
#.(50429.06   4/29/25 CAI  9:45p| Use current .env file
#.(50429.09   4/29/25 CAI 10:15p| Accomodate collections for s13
#.(50430.01   4/30/25 RAM  5:30p| Add to help
#.(50430.02   4/30/25 RAM  6:00p| Update display of input vars
#.(50415.02b  5/01/01 RAM  6:45p| Include t00# for group tests
#.(50501.02   5/01/25 RAM  7:05p| Add bGroup for clarity
#.(50501.04   5/01/25 RAM  7:30p| Catch error and add Attach debug
#.(50503.06   5/03/25 RAM 10:00p| Abort if no docs found
#.(50505.02   5/05/25 RAM  8:20p| Add command name {AIT} to help
#.(50505.04   5/05/25 RAM  8:40p| Add ait example command
#.(50505.05   5/05/25 RAM  9:00p| Add ait import command
#.(50505.06   5/05/25 RAM  9:30p| Add ait sqlite/chroma commands
#.(50505.10   5/05/25 RAM 11:30p| Supress node warnings
#.(50505.12   5/06/25 RAM 11:45p| Check if templates exist
#.(50506.03   5/06/25 RAM  9:45a| Add DRYRUN
#.(50507.02   5/07/25 RAM  7:00a| Move scripts to ./server1/components
#.(50507.08c  5/09/25 RAM 10:10a| Save Stat row and count for delayed score runs
#.(50507.08   5/11/25 RAM  9:30a| Start run-tests.txt MT
#.(50511.01   5/11/25 RAM 10:00a| Print line for LOGGER log and inputs
#.(50513.04   5/13/25 RAM  7:25p| Implement DRYRUN
#.(50513.05   5/13/25 RAM  7:30p| Implement bEnvs debug msgs
#.(50514.01   5/14/25 RAM  8:15a| Add override parameters
#.(50514.02   5/14/25 RAM  1:50p| Move script to components folder
#.(50514.07   5/14/25 RAM  7:45p| Bump version from u2.09 to u2.10
#.(50515.02   5/15/25 RAM  9:25a| Display running script_u2.10.mjs
#.(50516.07   5/16/25 RAM  2:50p| Add App to model-tests listing
#.(50405.01c  5/17/25 RAM  1:04p| Put stats into a month folder  
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
##========================================================================================================= #  ===============================  #

         aVer="u2.10"                                                                   # .(50514.07.3).(50507.08c.1 RAM Get first shhet files for this version??)

   if [ "${1:0:3}"    == "ver"  ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi  # .(50420.01.4)
   if [ "${1:0:4}"    == "help" ]; then aCmd="help"; fi; b=0;                           # .(50505.05.5).(50420.01b.8)
   if [ "$1"          == ""     ]; then aCmd="help"; fi                                 # .(50420.01b.9)
   if [ "${aCmd}"     != "help" ]; then aCmd="run";        aTests="$@";                 # .(50420.01b.10)
   if [ "${1:0:3}"    == "gen"  ]; then aCmd="gen"; shift; aTests="$@"; b=1; fi         # .(50420.01b.11)
   if [ "${1:0:3}"    == "lis"  ]; then aCmd="lis"; shift; aTests="";   b=1; fi         # .(50505.05.6).(50420.01b.12)
   if [ "${1:0:3}"    == "imp"  ]; then aCmd="imp"; shift; aTests="";   b=1; fi         # .(50505.05.7)
   if [ "${1:0:3}"    == "sql"  ]; then aCmd="sql"; shift; aTests="";   b=1; fi         # .(50505.06.7
   if [ "${aTests}"   == ""     ] && [ "${b}" != "1" ]; then echo "* invalid args";     # .(50505.05.8).(50420.01b.13)
   if [ "${OS:0:3}"   != "Win"  ]; then echo ""; fi; exit 1; fi
        fi
        aApp=${APP:0:3}                                                                 # .(50429.05.9)
        aApp2=${APP:0:4}                                                                # .(50429.05.9)
        aAIT=${AIT}; if [ "${aAIT}" == "" ]; then aAIT="bash run-tests.sh"; fi          # .(50505.02.2)
#       echo -e "\n  - AIC15[  73]  aCmd: ${aCmd},  aApp: '${aApp}', aApp2: '${aApp2}', aPCCode: '${aPCCode}'"; # exit
#       aLogs="inputs"
        aLogs="${LOGGER}"
#       aLogs="log"
        bEnvs=${ENVs}                                                                   # .(50513.05.3)
        bDoit=${DOIT}
        bDebug=${DEBUG}
        bDryRun=${DRYRUN}                                                               # .(50506.03.2)
#       bScoreIt=${SCORING}                                                             ##.(50507.02.5)

        aPCCode="${PC_CODE}"
        aEnvFile="${ENV_TEMPLATE}"

#       ls -l ../../._2/MWTs/; exit
        genEnv="../../._2/MWTs/AIC19_genEnv_u1.01.sh"
        searchScript="${SEARCH_SCRIPT}"                                                 # .(50423.03.1 RAM Use ${Search_Script} instead of search_u2.05.sh)
      if [ "${bEnvs}" == "1" ]; then echo "  - AIC15[  89] aApp: '${aApp2}', DOIT: '${bDoit}',  DEBUG: '${bDebug}', DRYRUN: '${bDryRun}', SCORING: '${SCORING}', PC_CODE: '${aPCCode}', LOGGER: '${aLogs}', "; fi # exit # .(50513.05.4)

#       aCmd="run"; if [ "$1" == "gen" ]; then aCmd="gen"; shift; fi
#       aArgs="$1,$2,$3,$4,$5,$6,$7,$8,$9"; aArgs=${aArgs//,,/}; s=""
#       aArgs="$@"; aArgs=${aArgs//,,/}; aArgs=${aArgs//,,/}; s=""
        IFS=' ' read -ra mArgs <<< "$@"; for aTest in "${mArgs[@]}"; do aArgs="${aArgs},${aTest}"; done;  aArgs="${aArgs:1}"
        if [ "$1" == "all" ]; then aArgs="t010,t020,t030"; fi
#       if [ "${aArgs:0:3}" == "run" ]; then aArgs="${aArgs:4}"; fi;                    # .(50419.05.1 RAM Allow run)
#       if [ "${aArgs:0:1}" != "t" ] && [ "${aArgs}" != "" ]; then aArgs="t${aArgs}"; fi;

#*  --- --  --------------  =  ------------------------------------------------------   #   ------------ *#

function sayMsg() {
   if [ "${bDebug}" == "1" ] || [ "$2" == "1" ]; then echo -e "  - $1"; fi
      }
# -------------------------------------------------------------------

         sayMsg "AIC15[ 108]  aCmd: ${aCmd},  aApp2: '${aApp2}', aArgs: '${aArgs}', aLogs: '${aLogs}', aPCCode: '${aPCCode}'" -1; # exit

   if [ "${aCmd}" == "sql" ]; then                                                      # .(50505.06.8 RAM Add sql command app Beg)
#     echo "  sqlite '$@'"; exit
      bash sqlite.sh "$@"
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit 1
      fi                                                                                # .(50505.06.8 End)
# -------------------------------------------------------------------
   if [ "${aCmd}" == "imp" ]; then                                                      # .(50505.05.9 RAM Add import app command Beg)
#     echo "  importing '${aApp2}'"
      node "../../server1/components/import_u1.03.mjs" ${aApp2}                         # .(50514.02.2 RAM Move script to components folder)
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit 1
      fi                                                                                # .(50505.05.9 End)
# -------------------------------------------------------------------

   if [ "${aCmd}" == "lis" ]; then
        echo -e "\n  Run any of the following tests for app: ${aApp}:"                   # .(50516.07.3)
        cat "${aApp}_model-tests.txt" | awk 'NF { sub( /a[0-9][0-9]_/, "    "); sub( /\.01/, "   "); gsub( /,/, " "); aApp = NR > 3 ? "  '${aApp}'  " : (NR == 3 ? "  ---  " : (NR == 2 ? "  App  " : "       " )); print aApp $0 }' # .(50516.07.4)
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit 1
     fi
# -------------------------------------------------------------------

   if [ "${aCmd}" == "gen" ]; then
     if [ "${aArgs}" == "" ] || [ "${aArgs:3:1}" != "0" ]; then
        echo -e "\n* Please provide a test group id (t0#0) to create an .env test group file."
        echo "   Example: ${aAIT} gen t040  # It must end with a zero."                                     # .(50505.02c.1)
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit 1
      fi
#     if [ "${aArgs/t010}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t010 ${aLogs} ${aPCCode}; fi   # Create Model1 Tests   ##.(50429.09.1 Beg)
#     if [ "${aArgs/t020}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t020 ${aLogs} ${aPCCode}; fi   # Create Model2 Tests
#     if [ "${aArgs/t030}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t030 ${aLogs} ${aPCCode}; fi   # Create Model3 Tests
#     if [ "${aArgs/t040}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t040 ${aLogs} ${aPCCode}; fi   # Create Model4 Tests
#     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
#     exit 1                                                                                                               ##.(50429.09.1 End)
      fi
# -------------------------------------------------------------------

   if [ "${aCmd}" == "help" ]; then                                                                                        # .(50420.04.1)
      echo -e "\n  Run any of the following tests for app: ${aApp2}:"                                                      # .(50422.03.1 RAM Add for app: ${aApp})
#     echo -e   "    ${aAIT}  t041  # A single test for one sysprompt. (generated from s11_model-tests.txt)"               ##.(50505.02.3).(50420.04.2 RAM Add Help re run-tests.sh)
#     echo -e   "    ${aAIT}  t0#0  # A group test for one model. (copied from .env_s11_t0#0_model_1-test.txt)"            ##.(50505.02.4).(50420.04.3)
      echo -e   "    ${aAIT}  ${aApp}  t010  # A group test for one model (copied from .env_${aApp}_t040_qwen2;0.5b_4,6-tests.txt)"              # .(50505.02.6).(50422.03.2 RAM Was s11).(50420.04.5)
      echo -e   "    ${aAIT}  ${aApp}  t011  # A single test for one sysprompt (created from .env_${aApp}-template_{HWCD}.txt and ${aApp}_model-tests.txt)."  # .(50505.02.5).(50422.03.2 RAM Was s11).(50420.04.5)

   if ls .env_${aApp}_* >/dev/null 2>&1; then                                                                              # .(50505.12.1 RAM Check if templates exist)
      echo -e "\n  For example, these group tests are available to run:"                                                   # .(50420.04.4)
      ls -l .env_${aApp}_* | awk '!/_v[0-9]/ { print "    '"${aAIT}"'  " substr($9,10,4) "  # " $9 }'                      # .(50505.02.7 RAM Add command name {AIT} to help)
      echo -e   "    ${aAIT}  ${aApp} curr  # .env as it currently exists"                                                 # .(50505.02.8).(50430.01.1 RAM Add to help)

      echo -e "\n  To run other tests for models, llama3.2:3b, phi3 and granite3.1-dense:2b, use:"                         # .(50420.04.6)
      echo -e   "    ${aAIT}  gen  all"                                                                                    # .(50505.02.9).(50420.04.7)
      echo -e   "    ${aAIT}  example"                                                                                     # .(50505.04.5)
    else                                                                                                                   # .(50505.12.2)
      echo -e "\n  No group test are defined. Define them for three models with:"                                          # .(50505.12.3)
      echo -e   "    ${aAIT}  gen  ${aApp}  all"                                                                           # .(50505.12.4)
      fi                                                                                                                   # .(50505.12.5)

   if [ "${aApp:0:3}" == "s13" ]; then                                                                                     # .(50505.12.6)
      echo -e "\n  For the s13_search-rag-app, you can give a collection name, s13a, s13b, etc"                            # .(50430.01.2)
      ls -l ../../data/AI.testR.4u/files/${aApp}*_* | awk '!/_v[0-9]/ { sub(/\.txt/,"",$9); print "    " substr($9,30) }'  # .(50430.01.3)
      echo -e "\n  For example: "                                                                                          # .(50430.01.4)
      echo -e   "    ${aAIT}  s13b  t041 "                                                                                 # .(50505.02.10).(50430.01.5)
      echo -e   "    ${aAIT}  s13b  current"                                                                               # .(50505.02.11).(50430.01.6)

      echo -e "\n  For these to work you will need to import them into to ChromaDB Vector DB first:"                       # .(50505.05.10)
      echo -e   "    ${aAIT}  import s13b"                                                                                 # .(50505.05.11)
      echo -e   "    ${aAIT}  import s13x_other-docs"                                                                      # .(50505.05.12)

      echo -e "\n  You can also query the ChromaDB Vector DB. See ${aAIT} sql help:"    # .(50505.06.9)
      fi                                                                                                                   # .(50505.12.7)

      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit 1
    fi
# -------------------------------------------------------------------
         sayMsg "AIC15[ 187]  aCmd: ${aCmd},  aApp2: '${aApp2}', aArgs: '${aArgs}', aLogs: '${aLogs}', aPCCode: '${aPCCode}', aEnvFile: '${aEnvFile}'" -1; # exit
         bUseCurrentId="0"; if [ "${aArgs:0:3}" == "cur" ]; then bUseCurrentId="1"; fi   # .(50429.06.1 RAM Use current .env file)

  if [ "${bUseCurrentId}" == "1" ]; then                                                # .(50429.06.2 RAM Run current .env file Beg)
         aUseTestId="$( cat .env | awk -F= '/SESSION_ID/ {print $2}' )"                 # .(50429.06.3 RAM Get SESSION_ID from .env file)
         mArgs[0]=${aUseTestId//\"/}; aArgs=${mArgs[0]}                                 # .(50429.06.4 RAM Use SESSION_ID as aTestId)
#        sayMsg "AIC15[ 193]  aCmd: ${aCmd},  aApp2: '${aApp2}', mArgs[0]: '${mArgs[0]}', aLogs: '${aLogs}', aPCCode: '${aPCCode}', aEnvFile: '${aEnvFile}'"; # exit
    else
        aUseTestId=""                                                                   # .(50429.06.2 End)
#       aTestGroups="01,02,03,04"                                                       # .(50415.02.1 RAM Check for valid Test Groups)
        aTestGroups="00,01,02,03,04"                                                    # .(50415.02b.1 RAM Include t00# for group tests)
        IFS=',' read -ra mArgs <<< "${aArgs}"; nTests=0
    for aTest in "${mArgs[@]}"; do
#    if [ "${aTest}"  != "trun" ]; then                                                 ##.(50419.05.2 RAM Allow run)
#    if [ "${aTest:0:1}" != "t" ]; then aTest="t${aTest}"; fi                           ##.(50419.05.3 RAM Allow 040 with no t.  Need to replace it in mArgs)
     if [[ "${aTest}" =~ ^t[0-9]{3}$ ]] && [[ "${aTestGroups/${aTest:1:2}}" != "${aTestGroups}" ]]; then
        (( nTests++ ))
      else
        echo -e "\n* Invalid Test Id, ${aTest}.  Please use one of the following:"      # .(50419.05.4)
        echo      "    t010 t020 t030 t040 t041 or multipe tests: t010,t020,t030"
        if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
        exit 1
        fi # eif valid test id
#     fi                                                                                ##.(50419.05.5)
      done
    fi # eif use current .env file                                                      # .(50429.06.5)

#   shift                                                                               # .(50429.02.1 RAM Is shift necessary)
# -------------------------------------------------------------------

function prt1stMsg() {
       s="s"; if [ "${nTests}" == "1" ]; then s=""; fi
       if [ "${b}" == "1" ] || [ "${bEnvs}" == "1" ]; then return; fi                   # .(50513.05.5).(50505.05.13 RAM Don't print if not a run command)
    if [ "${aLogs/log}" != "${aLogs}" ]; then
       aTS="$( date +%y%m%d.%H%M.%S)"; aTS="${aTS:1}";
       echo -e "\n${aTS}  ${aApp}           Running test${s}: ${aArgs}"
     else
       echo -e "\n  Running test${s} for: '${aArgs}' for app ${aApp2}."; # exit         # .(50428.05.x RAM Add ${aApp})
       if [ "$s" == "" ] || [ "${aArgs:4:1}" == "0" ]; then echo ""; fi
       fi
     }
# -------------------------------------------------------------------

# Find the first file in a folder that starts with the specified string
# $1: Starting string to match
# $2: Folder path to search
# $3: Optional file extension (without the dot)
# Returns: Full path to the first matching file or empty string if none found
#
# Example usage:
#     file_path=$(get1stFile "config" "./project" "json")
#  if [ -n "$file_path" ]; then
#     echo "Found matching file: $file_path"
#   else
#     echo "No matching file found"
#    fi
function get1stFile() {                                                                 # .(50429.03.1 CAI Write get1stFile Beg)
 local aStr="$1"
 local aFolder="$2"
 local aExt="$3"; aExt="${aExt/\./}"                                                    # .(50508.13.1 RAM Remove . from aExt)
 local bStar=$4; if [ "$4" == "" ]; then bStar=0; fi

#if [ ! -d "$aFolder" ]; then echo -e "\n* Unknown folder, '${aFolder}'"; return 1;  fi         # Ensure the folder exists
 if [ ! -d "$aFolder" ]; then echo ""; return 1; fi         # Ensure the folder exists

 for file in "$aFolder"/*; do                               # Process files first
   if [ ! -f "${file}" ]; then continue; fi                 # Skip if not a file
      local bFound=0
      local fileName=$(basename "$file")                    # Get filename without path
   if [[ "${fileName}" == *"${aStr}"* ]]; then bFound="${bStar}"; fi  # Check if file contains the specified string
   if [[ "${fileName}" ==  "${aStr}"* ]]; then bFound="1"; fi         # Check if file starts with the specified string
   if [  "${bFound}"   ==  "1" ]; then
     if [ -n "${aExt}" ]; then                              # If extension is specified, check if the file has that extension
         local fileExt="${fileName##*.}"
       if [ "${fileExt}" != "${aExt}" ]; then continue; fi  # Skip if extension doesn't match
     fi
#      echo "   found ${file}"
       echo "${file}"
     return 0
   fi
#      echo "no found ${file}"
 done

 for aDir in "${aFolder}"/*; do                             # If no matching file found, recursively check subdirectories
   if [ -d "${aDir}" ]; then
#  echo "--- looking in aDir: '${aDir}'"
     local result=$( get1stFile "${aStr}" "${aDir}" "${aExt}" )
     if [ -n "${result}" ]; then
        echo "${result}"                                    # Return the first match found in subdirectories
       return 0
     fi
   fi
 done

 echo ""                                                    # No matching file found
 return 1
  }                                                                                     # .(50429.03.1 End)
# --------------------------------------------------------------------

aAWKscr='
function getFld( aRow, bTest ) {
         split( aRow, mVar, "=" ); aVar = mVar[2]; sub( /#.+/, "", aVar ); # print " -- "  aVar;
         sub( /^[" ]+/, "", aVar ); sub( /[" ]+$/, "",aVar );             # print " -- [" aVar "]";
#        if (bTest == 1 && substr(aVar,4,1) == "0") { aVar = aApp "_" substr(aVar,1,3) "1"; aTestId = aVar} ##.(50422.04.1 RAM Save aTestId).(50430.02.1)
#        if (bTest == 2) { aVar = substr( aTestId,1,3) "0_" aVar }                                          ##.(50422.04.2 RAM Add to SESSION TITLE).(50430.02.2)
         if (bTest == 1) { aVar = aApp "_" substr(aVar,1,3) "1"; aTestId = aVar; sub( aApp, "", aTestId ) } # .(50430.02.1).(50422.04.1 RAM Save aTestId)
         if (bTest == 2) { aVar = substr( aTestId,2,4) "_" aVar }                                           # .(50430.02.2).(50422.04.2 RAM Add to SESSION TITLE)
  return aVar
         }
BEGIN { aApp = "'${aApp2}'" }
   /^[#]/ { next }
   /OLLAMA_MODEL_NAME/    { print "    1. Model:           "  getFld( $0 )}
   /CTX_SIZE/             { print "    2. CTX_Size:        "  getFld( $0 ) }
   /TEMPERATURE/          { print "    3. Temperature:     "  getFld( $0 ) }
   /SYS_PROMPT_CD/        { print "    4. SysPmt Code:     "  getFld( $0 ) }
   /USE_DOCS/             { print "    5. Do Doc Search:   " (getFld( $0 ) ? "Yes" : "No") }
   /USE_URLS/             { print "    6. Do Web Search:   " (getFld( $0 ) ? "Yes" : "No") }
   /USE_SYS_PROMPTS_FILE/ { print "    7. Use SysPmt File: " (getFld( $0 ) ? "Yes" : "No") }
   /USE_USR_PROMPTS_FILE/ { print "    8. Use UsrPmt File: " (getFld( $0 ) ? "Yes" : "No") }
#  /SESSION_TITLE/        { print "    9. Test Title:      "  getFld( $0 ) }                                ##.(50422.04.3 RAM Move to 12)
   /SYS_RUN_COUNT/        { print "   10. SysPrompt Tests: "  getFld( $0 ) }
   /USR_RUN_COUNT/        { print "   11. UsrPrompt Runs:  "  getFld( $0 ) }
   /SESSION_ID/           { print "   12. First Run Id:    "  getFld( $0, 1 ) ".01"; }
   /SESSION_TITLE/        { print "    9. Test Title:      "  getFld( $0, 2 );       }                      # .(50422.04.4)
   /SHOW_SECTIONS/        { print "   13. Sections:        "  getFld( $0 ) }
   /DOC_COLLECTIONS/      { if (substr(aApp,2,2) == "13") {
                            print "   14. Collections:     "  getFld( $0 ) } }
'
# if [ "${SYSTEM_PROMPT}" != "" ]; then                                                 # .(50514.01.6 RAM Overide parameters Beg)
# if [ "${SEARCH_MODEL}"  != "" ] && [ "${aApp}" != "s14" ]; then

aAWKscr2='
BEGIN { aApp  = "'${aApp2}'"
        bChg1 = "'${SYSTEM_PROMPT}'" != ""
        bChg2 = "'${SEARCH_MODEL}'" != "" && aApp != "s14"
        }
   /SYS_PROMPT_CD/        && bChg1 { print "  SYS_PROMPT_CD=\"GKN0-INPT\""; next }
   /SYS_RUN_COUNT/        && bChg1 { print "  SYS_RUN_COUNT=1"; next }
   /USE_SYS_PROMPTS_FILE/ && bChg1 { print "  USE_SYS_PROMPTS_FILE=0"; next }
   /OLLAMA_MODEL_NAME/    && bChg2 { print "  OLLAMA_MODEL_NAME=\"${SEARCH_MODEL}\""; next }
                                   { print }
'
# echo "  AWKscr2:\n${aAWKscr2}"; exit                                                  # .(50514.01.6 End)
# -------------------------------------------------------------------

function cpyEnv() {
#      if [ ! -f $1 ]; then echo -e "\n* No .env file exists for $1. Do ./run-tests gen $1 to create it."; return ; fi
#               ls -l .env_${aApp}_$1* | awk '!/_v[0-9]/'
         aEnv="$( ls -l .env_${aApp}_$1* 2>/dev/null | awk '!/_v[0-9]/ { sub( /.+\.env/, ".env"); print; exit }' )"; # echo "--- aEnv: ${aEnv}"; exit
      if [ "${aEnv}" == "" ]; then
         echo -e "\n* No .env file exists for $1. Create it with: ${aAIT} ${aApp} gen $1";                  # .(50505.02c.2)
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
         exit 1
         fi
         sayMsg "AIC15[ 341]  Using .env group file: ${aEnv}" -1; # exit  1         # .(50429.05.10 RAM Was [ 111], then [ 222], but not any more)
         cp -p "${aEnv}" .env
         }
# -------------------------------------------------------------------

#        aFolder="../../data/AI.testR.4u/files"
#        sayMsg "AIC15[ 347]  get1stFile \"s13\" \"${aFolder}\" \"txt\":\n $( ls -l "${aStatsDir}" )" 1;  #exit
#        aCollection="$( get1stFile "s13" "${aFolder}" "txt" )" echo "  aCollection: ${aCollection}";#  exit

         aMonth="$( date '+%Y.%m.%B')"                                                  # .(50405.01c.4))
         aAppName="$( basename "$( pwd )" )"                                            # .(50507.08c.2 RAM get number of row in stats sheet before runs Beg)
#        aRespsDir="../../docs/a${aAppName:1}/$( date +'%y.%m.%B')"
         aStatsDir="../../docs/a${aAppName:1}/${aMonth}_a${aApp:1}-saved-stats"         # .(50405.01c.5 RAM Add aMonth here too)
#echo "  aStatsDir: '${aStatsDir}"; ls -l ${aStatsDir}; exit
#        sayMsg "AIC15[ 360]  get1stFile \"a${aApp:1}_Stats\" \"../../docs/${aApp}/$( date +'%y.%m.%B')\" \".csv\"" 1;    # exit
#        sayMsg "AIC15[ 361]  get1stFile \"a${aApp:1}_Stats-\" \"${aStatsDir}\" \".csv\":\n $( ls -l "${aStatsDir}" )" 1; # exit
#        sayMsg "AIC15[ 362]  get1stFile \"a${aApp:1}_Stats-\" \"${aStatsDir}\" \".csv\":\n $( ls -l "../../docs" )" 1;   # exit
#        sayMsg "AIC15[ 363]  get1stFile  \"_${aVer}\"         \"${aStatsDir}\" \".csv\" 1" 1;                            # exit
#              aStatsFile="$( get1stFile  "a${aApp:1}"          "${aStatsDir}"   ".csv"   )";  # echo "     aStatsFile: ${aStatsFile}"; # exit
#              aStatsFile="$( get1stFile  "a${aApp:1}*_${aVer}" "${aStatsDir}"   ".csv"   )";  # echo "     aStatsFile: ${aStatsFile}"; # exit
               aStatsFile="$( get1stFile  "_${aVer}"            "${aStatsDir}"   ".csv" 1 )";  # echo "     aStatsFile: ${aStatsFile}"; # exit
#      if [ "${aStatsFile}" == "" ]; then sayMsg "\n  - AIC15[ 342]* no stats sheet found" 1; exit; fi
       if [ "${aStatsFile}" == "" ]; then  nStats=1
                                         else  nStats=$( wc "${aStatsFile}" | awk '{ print $1 ? $1 : 0 }' ); fi
         sayMsg "AIC15[ 370]  ${aStatsFile}, nStats: ${nStats}" -1 # 1                  # .(50507.08c.2 End

function savRespIds2() {                                                                # .(50507.08c.3 RAM Write savRespIds Beg)
#        sayMsg "AIC15[ 368]  pwd: $( pwd )" 1
         nLen=$( wc run-tests.txt | awk '{ print $2 }' )
         aRow=$( echo "${nStats}" | awk '{ printf "%03d\n", $1 + 1 }' )
#        ls -l run-tests.txt
         cp run-tests.txt ${aStatsDir}/a${aApp:1}_Tests_r${aRow},${nLen}.txt
         sayMsg "AIC15[ 373]  Saved: ${aStatsDir}/a${aApp:1}_Tests_r${nStats},${nLen}.txt" -1 # 1
         } # eof savRespIds2                                                            # .(50507.08c.3 End)
# -------------------------------------------------------------------

         sayMsg "AIC15[ 377]  aCmd: ${aCmd},  aApp2: '${aApp2}', mArgs: '${mArgs[@]}', aLogs: '${aLogs}', aPCCode: '${aPCCode}', aEnvFile: '${aEnvFile}'" -1; # exit

#        prt1stMsg
         echo "" >"$( pwd )/run-tests.txt"                                              # .(50507.08d.5RAM MT it here)

   if [ "${aApp}" == "s13" ]; then                                                      # .(50429.09.2 RAM Collections for App s13 only Beg)
         aFolder="../../data/AI.testR.4u/files"
         aCollection="$( get1stFile "${aApp2}" "${aFolder}" "txt" )"                    # .(50429.09.3 RAM Use get1stFile)
         if [ "${aCollection}" == "" ]; then echo -e "* No collection file found for App, '${aApp2}', in ${aFolder}."; exit; fi
         sayMsg "AIC15[ 386]  Using Collection: '$( basename ${aCollection%.*} )'"; # exit
         export COLLECTION="$( basename ${aCollection%.*} )"
       else
         export COLLECTION=""
         fi                                                                             # .(50429.09.2 End)
# -------------------------------------------------------------------

   if [ "${aCmd}" == "gen" ]; then                                                                                        # .(50429.09.3 RAM Generate them here Beg)
      if [ "${aArgs/t010}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t010 ${aLogs} ${aPCCode}; fi   # Create Model1 Tests  # .(50429.09.4)
      if [ "${aArgs/t020}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t020 ${aLogs} ${aPCCode}; fi   # Create Model2 Tests  # .(50429.09.5)
      if [ "${aArgs/t030}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t030 ${aLogs} ${aPCCode}; fi   # Create Model3 Tests  # .(50429.09.6)
      if [ "${aArgs/t040}" != "${aArgs}" ]; then ${genEnv} ${aApp2} t040 ${aLogs} ${aPCCode}; fi   # Create Model4 Tests  # .(50429.09.7)
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
      exit 1
      fi                                                                                                                  # .(50429.09.3 End)
# -------------------------------------------------------------------

#if [ "${aUseTestId}" != "" ]; then                                                     ##.(50429.06.6 Beg)
#        node ${searchScript}  ${aUseTestId}                                            ##.(50423.03.3 RAM Use ${Search_Script} instead of search_u2.05.sh)
#        mArgs[0]="${aUseTestId}"                                                       ##.(50429.06.7)
#        sayMsg  "AIC15[ 406]  Using aApp2: '${aApp2}', mArgs[0]: '${mArgs[0]}', bGroup: '${aTestId:3:1}', aLogs: '${aLogs}'"; # exit  1
#        fi                                                                             ##.(50429.06.6 End)
# -------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------

        prt1stMsg

  for aTestId in "${mArgs[@]}"; do

         bGroup=0; if [ "${aTest:3:1}" == "0" ]; then bGroup=1; fi                      # .(50501.02.3 RAM Add bGroup)
         sayMsg "AIC15[ 416]  aApp2: '${aApp2}', aTestId: '${aTestId}', bGroup: '${bGroup}}', bUseCurrentId: '${bUseCurrentId}'" -1; # exit  1
         sayMsg "AIC15[ 417]  "${genEnv}" ${aApp2} ${aTestId/t} ${aLogs}";     # exit  1

 # -----------------------------------------------------------------------------------

   if [ "${bUseCurrentId}"  == "0" ]; then                                              # .(50429.06.8 RAM Not using current .env file)

#  if [ "${aTestId:3:1}"    != "0" ]; then                                       # Generate .env file for a single test
   if [ "${bGroup}"         == "0" ]; then                                              # .(50501.02.4)
                                     "${genEnv}" ${aApp2} ${aTestId/t} ${aLogs};        # .(50429.05.11 RAM Use aApp2)
      if [ "$?" != "0" ]; then exit 1; fi                                               # .(50501.02.5)
    else
      if [ "${aTestId}"  == "t010" ]; then cpyEnv t010; fi                       # Copy the .env file for a group test
      if [ "${aTestId}"  == "t020" ]; then cpyEnv t020; fi
      if [ "${aTestId}"  == "t030" ]; then cpyEnv t030; fi;
      if [ "${aTestId}"  == "t040" ]; then cpyEnv t040; fi;
      fi # eif group run

   fi # eif generate or copy new current .env
 # -----------------------------------------------------------------------------------

   if [ "${bUseCurrentId}"  == "1" ]; then                                              # .(50429.06.9 RAM Use current .env file Beg)
   if [ "${aLogs/inputs}" != "${aLogs}" ]; then
      echo -e "\n-----------------------------------------------------------"
      echo -e "\n  Using the current .env file with the following parameters:"
      cat .env | awk "${aAWKscr2}" | awk "${aAWKscr}" | sort -k1,1                      # .(50514.01.7 RAM Display Overridden parameters)
      echo " "
      fi;
   fi # eif use current .env file                                                                             # .(50429.06.9 End)

#        prt1stMsg
         sayMsg "AIC15[ 450] aApp: '${aApp2}', DOIT: '${bDoit}', bDebug: '${bDebug}', DRYRUN: '${bDryRun}', SCORING: '${SCORING}', PC_CODE: '${aPCCode}', LOGGER: '${aLogs}'" ${bEnvs}; # exit
#        echo "--- aDryRun: '${aDryRun}', bDryRun: '${bDryRun}', bDebug: '${bDebug}', bUseCurrentId: '${bUseCurrentId}'"
 # -----------------------------------------------------------------------------------

 if [ "${aTestId:3:1}" == "0" ] && [ "${bUseCurrentId}" != "1" ]; then                  # Group run and not current

   if [ "${aLogs/inputs}" != "${aLogs}" ]; then
      if [ "${aLogs}" == "log,inputs"   ] && [ "${bEnvs}" != "1" ]; then   # log,inputs # .(50513.05.6)
#     usrMsg  "\n-----------------------------------------------------------" 1         ##.(50513.05.7 RAM Lines)
      echo -e "\n-----------------------------------------------------------"           # .(50513.05.7 RAM Lines)
         fi
      echo -e "\n  Using a .env file (copied from ${aEnv}) with the following parameters:"
      cat .env | awk "${aAWKscr}" | sort -k1,1
      echo " "
      fi # eif show log,inputs

   fi # eif ${aTestId:3:1}" == "0", i.e group run
 # -----------------------------------------------------------------------------------

   if [ "${bDoit}" == "1" ] || [ "${bDryRun}" == "1" ]; then               # Run it     # .(50513.04.0 RAM bDoit == "1" required for bDebug).(50506.03.3)
#     echo ""
#     echo "========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----"
#     echo "=================================================================================================================================================="
      aDryRun=""; if [ "${bDryRun}" == "1" ]; then aDryRun="a Dry Run of "; fi          # .(50513.04.1)

         shift                                                                          # .(50429.02.2 RAM Yes, shift is necessary)
         sayMsg "AIC15[ 476]  Running ${aDryRun}${searchScript} $@\n" -1;   # exit      # .(50513.04.2 RAM Add aDryRun)

   if [ "${aLogs/log}"   != "${aLogs}"  ] && [ "${bEnvs}" != "1" ]; then   # log        # .(50513.05b.1)
      aTS="$( date +%y%m%d.%H%M.%S)"; aTS="${aTS:1}";
#     echo -e "${aTS}  ${aApp}  ${aTestId}     Running ${searchScript} $@"              ##.(50515.02.1)
      echo -e "${aTS}  ${aApp}  ${aTestId}     Running search_${aVer}.mjs $@"           # .(50515.02.1)
      fi # eif show log

      if [ "${bDryRun}" != "1" ] &&                                                     # .(50506.03.4 RAM )
         [ "${bDebug}"  == "1" ]; then node --inspect-brk ${searchScript}  "$@"         # .(50501.04.1 RAM Add Attach debug).(50423.03.3 RAM Use ${Search_Script} instead of search_u2.05.sh)
              else NODE_NO_WARNINGS=1  node               ${searchScript}  "$@"; fi     # .(50505.10.1).(50501.04.2)
                if [ $? -ne 0 ]; then exit 1; fi                                        # .(50503.06.5 RAM Exit with exit code)

                                      savRespIds2                                       # .(50507.08c.4 RAM Save 2nd RespIds file )
      fi # eif doit
 # -----------------------------------------------------------------------------------

   done  # eol aTestId in "${mArgs[@]}"

# ---------------------------------------------------------------------------------------------------

#  if [ "${LOGGER}" == "log,inputs" ]; then                                             ##.(50420.03.1 RAM Move this to here from run.tests.sh Beg).(50511.01.4)
   if [ "${LOGGER/log/}" != "${LOGGER}" ] && [ "${bEnvs}" != "1" ]; then   # log        # .(50513.05b.2).(50513.05.8 RAM Add bEnvs).(50511.01.4 RAM Print line for both)
     echo -e "\n----------------------------------------------------------"             # .(50513.05.9 RAM Lines)
     fi
     if [ "${OS:0:3}" != "Win" ]; then echo ""; fi                                      # .(50420.03.1 End)

#*  --- --  --------------  =  ------------------------------------------------------   #   ------------ *#

#*====================================================================================================== *#### =============================== *#
#>      S1201 END
# ==== ================================================================================================= *#
#
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
#