#!/bin/bash
##=========+====================+================================================+
##RD       AIC19_genEnv         | Generate .Env file
##RFILE    +====================+=======+===============+======+=================+
##FD  AIC19_genEnv_v1.01.sh     |   9000|  3/29/25  8:00|   100| u1.01`50329.0800
##FD  AIC19_genEnv_v1.01.sh     |  15777|  4/27/25  6:00|   267| u1.01`50427.1800
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script generates a .env file to running AITestR4U AI Model tests
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#       ion  YorN() {           |
#       ion  sayMsg() {         |
#       ion  usrMsg() {         |
#       ion  splitParms() {     |
#       ion  mergeVars() {      |
#
##CHGS     .--------------------+----------------------------------------------+
#.(50329.02   3/29/25 XAI  7:00a| Created by Grok
#.(50329.02   3/29/25 RAM  7:00a| Modifoed by Robin Mattern
#.(50414.10   4/14/25 RAM  6:00a| Add PC_NAME global variable
#.(50417.01   4/17/25 RAM  6:35a| Change aEnvFile to aSrcFile
#.(50417.03   4/17/25 RAM 10:00a| Write chkEnvTemplate to create a .env template file
#.(50417.04   4/17/25 RAM  1:00p| Change PC_NAME to PC_CODE
#.(50418.01   4/18/25 RAM  8:00p| Remove _${aPcCd} from template_master_file
#.(50419.06   4/19/25 RAM  4:00p| Display Creating Hardware file msg
#.(50420.02   4/20/25 RAM 11:00a| Add PC_Code and Title with PC_Code
#.(50420.02   4/20/25 RAM 12:15p| Add  title2 and some msg tweaks
#.(50422.04   4/22/25 RAM  9:41a| Add TestId to "inputs" display
#.(50427.04   4/27/25 RAM  6:00p| Check if hardware file exists before creating it
#.(50429.05   4/29/25 RAM  9:30p| Set env variable for aApp2
#.(50429.09   4/29/25 RAM 10:00p| Accomodate aCollection and aApp2 
#.(50430.02   4/30/25 RAM  5:45p| Add aApp2 to the First Run Id
#.(50429.05b  5/01/25 RAM  7:05p| Always set aApp2 to the first 4 characters of aApp
#.(50501.02   5/01/25 RAM  7:05p| Add bGroup for clarity
#.(50502.01   5/02/25 RAM  5:05a| Add msg re No TestId found 
#.(50503.10   5/05/25 RAM 11:59p| Fiddle with bDebug
#.(50506.04   5/06/25 RAM  2:55p| Delete existing group files with del1stFile
#.(50514.01   5/14/25 RAM  8:15a| Add override parameters  
#.(50515.03   5/15/25 RAM  9:25a| Save PC_CODE to root run-tests.sh 
#.(50515.04   5/15/25 RAM  9:45a| Allways say hardware msgs
#.(50518.03   5/18/25 RAM 11:30p| Add !/PC_CODE= to run-tests.sh rewrite
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
##========================================================================================================= #  ===============================  #

   aApp=${1:0:3}; if [ "${aApp}" == "s13" ]; then aApp2="${1:0:4}"; else aApp2="${aApp}"; fi                # .(50429.05b.1).(50429.05.12)

   aTest="$2"; if [ "${aTest:0:1}" == "t" ]; then aTest="${aTest:1}"; fi
   aLogs="$3"
#  aPcCd="$4"; if [ "${aPcCd}" == ""      ]; then aPcCd="pc000p"; fi                    ##.(50414.10.1 RAM Add User arg)
   aPcCd="$4"; if [ "${aPcCd}" == ""      ]; then aPcCd="${PC_CODE}"; fi                # .(50417.04.1).(50414.10.1 RAM Add PC_NAME)
   aEnvFile="${ENV_TEMPLATE}"
   aCollection="${COLLECTION}"                                                                              # .(50429.09.8)
   bDebug=${DEBUG}; if [ "${bDebug}" == "1" ]; then                                                         # .(50503.10.1 RAM Even though sayMsg isn't defined yet)  
   echo -e "\n  - AIC19[  62]  bDebug: '${bDebug}', aApp2: '${aApp2}', aPcCd: '${aPcCd}', aCollection: '${aCollection}', aEnvFile: '${aEnvFile}'"
   fi                                                                                                       # .(50503.10.2)
   if [ "${aTest:2:1}" == "0"   ]; then  aLogs="log,inputs"; fi
#  if [ "${aLogs}"     == "log" ]; then  aLogs="log,inputs"; fi                         ##.(50515.04.1 RAM Allways do inputs if just "logs")

# -----------------------------------------------------------------

function  sayMsg() {
   if [ "${bDebug}" == "1" ]; then echo -e "  - $1"; fi
   }
# -----------------------------------------------------------------

function  YorN() {
   if [ "$1" == "1" ]; then echo "Yes"; else echo "No"; fi
   }
# -----------------------------------------------------------------

function  usrMsg() {
   if [ "$2" == "1" ]; then echo -e "$1"; return; fi                                    # .(50515.04.2 RAM Allways say hardware msgs)     
   if [ "${aLogs/inputs}" != "${aLogs}" ] || [ "${aLogs}" == "" ] || [ "${bDebug}" == "1" ]; then echo -e "$1"; fi
#  if [ "${bInputs}" == "1" ]; then echo "$1"; fi
   }
# -----------------------------------------------------------------

function  splitParms() {
# Split the string by comma, but preserve the quoted part at the end
# We use a combination of sed and awk to handle this
#  echo "  Splitting the string: '$1'"
   part1=$( echo "$1" | sed    's/".*$//' )
   part2=$( echo "$1" | grep -o '"[^"]*"' | sed 's/"//g' ) # Extract the quoted part  "
#  part2=$( echo "$1" | awk '{ sub( /.+?"/, "" );   sub( /\"/, "" ); print }' ) # Extract the quoted part  "
#  echo "  The quoted part is: '${part2}'"

# Create the array by splitting the first part by comma and adding the quoted part as the last element

#  readarray -t mArray < <(echo "$part1" | tr ',' '\n')
   mArray=()
   while IFS= read -r line; do mArray+=("$line")
   done < <(echo "$part1" | tr ',' '\n')

#  mArray+="${part2}"
#  echo "  The quoted part is: '${mArray[10]}'"

# Trim whitespace from each element
for i in "${!mArray[@]}"; do
   mArray[$i]=$(echo "${mArray[$i]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
   done

   aModel="${mArray[1]/:/;}"
#  aTests="${mArray[6]}-tests"; if [ "${mArray[6]}" == "1" ]; then aTests="1-test"; fi
   aTests="${mArray[5]},${mArray[6]}-tests"; if [ "${mArray[6]}" == "1" ]; then aTests="${mArray[5]},1-test"; fi
   aTitle="${aModel}_${aTests}"
   aTitle2="${aModel}_${aTests} on ${aPcCd}"                                            # .(50420.02.1 RAM Add aTitle2 with PC_Code)

   } # eof splitParms
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

function  chkEnvTemplate() {                                                            # .(50417.03.1 RAM Write chkEnvTemplate Beg)
  
   if [ -f "$1" ]; then return; fi

   aForPcCd="for ..."; if [ "${aPcCd}" != "" ]; then aForPcCd="for '${aPcCd}'."; fi
   sayMsg "AIC19[ 124]  Need to create an .env template file, '$1', ${aForPcCd}."
   if [ "${aLogs/inputs}" == "${aLogs}" ]; then usrMsg "" 1; fi                         # .(50515.04.3)
   usrMsg "* Creating app .env template file for PC_Code: ${aForPcCd:4}." 1             # .(50515.04.4).(50427.04.1 RAM Change prompt).(50419.06.1 RAM Add Creating hardware file msg)

   aDir="../../data/AI.testR.4u/settings"                                               # .(50427.04.2 RAM Move to here Beg).(50422.01.1)
   if [ -d "._2" ]; then aDir="./data/AI.testR.4u/settings"; fi                         # .(50422.01.2).(50419.03.4)

#  if [ "$1" != "" ]; then THE_PC_CODE="$1"; fi                                         # .(50417.06.1)
   aPC_CODE="$( echo "${aPcCd}" | tr '[:upper:]' '[:lower:]' )"
#  aServerName="${aPC_CODE}-${THE_SERVER#*-}"
   aHdwFile="${aDir}/hardware-settings_${aPC_CODE}.txt"                                 # .(50427.04.2 End)

if [ ! -f "${aHdwFile}" ]; then                                                         # .(50427.04.3 RAM Check if it exists)
#  sayMsg "AIC19[ 137]  Creating hardware file: '${aHdwFile}'"
   usrMsg "  Creating hardware file ${aForPcCd}." 1                                     # .(50515.04.5).(50427.04.4 RAM Change prompt).(50419.06.1 RAM Add Creating hardware file msg)
   hardware_file="$( "../../._2/MWTs/AIC18_getHdwSpecs_u1.01.sh" ${aPcCd} )"
   sayMsg "AIC19[ 140]  Created .env template file: '${hardware_file}'"                 # .(50427.04.5 Beg)
 else
   hardware_file="${aHdwFile}"
   fi                                                                                   # .(50427.04.6 End)
   aPcCd="${hardware_file#*_}"; aPcCd="${aPcCd/.txt/}"
   template_file=".env_${aApp}-template_${aPcCd}.txt"
   template_master_file=".env_${aApp}-template.txt"                                     # .(50418.01. RAM Remove _${aPcCd} from template_master_file)
   sayMsg "AIC19[ 147]  Saving hardware for, '${aPcCd}', info into the template file: '${template_file}'"
   usrMsg "  Saving hardware info for ${aPcCd} into the template file: '${template_file}'\n" 1 # .(50515.04.6).(50427.04.6)
#  usrMsg "" 1                                                                          ##.(50515.04.7)        

#  aSpecs="$( cat "${hardware_file}" )"; echo  "${aSpecs}"
#
   # Replace first line of file1 with contents of file2

   awk    '/{HARDWARE_SPECS}/ {while ((getline line < "'${hardware_file}'") > 0) print "  " line; next} {print}' "${template_master_file}" > "${template_file}"
#  sed    '/{HARDWARE_SPECS}/ {r '"${hardware_file}"';d;}' "${template_master_file}" >"${template_file}"
#  sed -e "/{HARDWARE_SPECS}/ {" -e "r ${hardware_file}" -e "d;" -e "}" "${template_master_file}" > "${template_file}"

   awk '/PC_CODE=/ { print "     export PC_CODE=\"'${aPcCd}'\"" } !/PC_CODE=/ { print }' ../../run-tests.sh > @temp && mv @temp ../../run-tests.sh   # .(50518.03.1).(50515.03.1)
   awk '/PC_CODE=/ { print "     export PC_CODE=\"'${aPcCd}'\"" } !/PC_CODE=/ { print }'       run-tests.sh > @temp && mv @temp run-tests.sh         # .(50518.03.1 RAM Add !/PC_CODE=)
   chmod 755 run-tests.sh
   sayMsg "AIC19[ 162]  Saved PC_CODE, ${aPcCd}, info into the file, run-tests.sh" 
#  echo "             i.e. '$(pwd)/${template_file}'"
#  cat "$(pwd)/${template_file}"

   aSrcFile="${template_file}"
       } # eof chkEnvTemplate                                                                               # .(50417.03.1 End)
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

function  del1stFile() {                                                                # .(50506.04.1 RAM Write del1stFile Beg)
          aStr="$1"; # echo "--- looking for '${aStr}'"
   for file in ./.env*; do                                # Process files first
 if [ ! -f "${file}" ]; then continue; fi                 # Skip if not a file
          fileName=$(basename "$file")                    # Get filename without path
#         echo "--- '${fileName}'"
 if [[ "${fileName}" == "${aStr}"* ]]; then               # Check if file starts with the specified string
 echo "   Delete file, ${fileName}"
          rm ${fileName}
          fi
       done
       }                                                                                # .(50506.04.1 End)
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

function  mergeVars() {
# Split the string by comma, but preserve the quoted part at the end
# We use a combination of sed and awk to handle this
# readarray -t mArray < <(echo "$aTestParms" | awk -F'"' '{print $1}' | sed 's/,/\n/g' && echo "\"$(echo "$aStr" | awk -F'"' '{print $2}')\""')

#  Trim whitespace from each element
#  for i in "${!mArray[@]}"; do
#    mArray[$i]=$(echo "${mArray[$i]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')   # '
#    done

#  Read the template file
   template_file="$1"
   output_file="$2"
   sayMsg "AIC19[ 197]  The .env file will be saved from: ${template_file} for ${aApp2}"
if [ ! -f "${template_file}" ]; then
   echo -e "\n* Template file not found: ${template_file}"
   exit 1
   fi

#  Read the template into a variable
   aBodyText=$(cat "$template_file"); # echo "--- aTestId: ${mArray[0]}" # aTestId=
   mArray[0]="${mArray[0]:4:4}";      # echo "--- aTestId: ${mArray[0]}" # aTestId=

# Replace placeholders with array elements
#  TestId,      Model,              CTX_SIZE, SysPmtCd, Temp, Tests, DOCs, URLs, USPF, UUPF, Sections

   placeholder="{TestId}";    replacement="${mArray[0]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Model}";     replacement="${mArray[1]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{CTX_Size}";  replacement="${mArray[2]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{SysPmtCd}";  replacement="${mArray[3]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Temp}";      replacement="${mArray[4]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Runs}";      replacement="${mArray[6]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Tests}";     replacement="${mArray[5]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{DOCs}";      replacement="${mArray[7]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{URLs}";      replacement="${mArray[8]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{USPF}";      replacement="${mArray[9]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{UUPF}";      replacement="${mArray[10]}";  aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Sections}";  replacement="${part2}";       aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Title}";     replacement="${aTitle}";      aBodyText="${aBodyText//$placeholder/$replacement}"  # .(50420.02.2 RAM Add Title without PC_Code)
   placeholder="{Cnt}";       replacement="${mArray[5]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{SysPrompt}"; replacement="${aSysPrompt}";  aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{PC_Code}";   replacement="${aPcCd}";       aBodyText="${aBodyText//$placeholder/$replacement}"  # .(50420.02.3 RAM Add PC_Code)
   placeholder="{Collection}";replacement="${aCollection}"; aBodyText="${aBodyText//$placeholder/$replacement}"  # .(50429.09.9 RAM Add Collection)

   if [ "${SEARCH_MODEL}" != "" ] && [ "${aApp}" != "s14" ]; then 
           mArray[1]="${SEARCH_MODEL}"                                                  # .(50514.01.8 RAM Display SEARCH_MODEL parameter)                          
           fi
   if [ "${SYSTEM_PROMPT}" != "" ]; then 
#          pVars.SYS_PROMPT       =  process.env.SYSTEM_PROMPT                          
           mArray[3]="GKN0-INPT"  #  SysPmt Code                                        # .(50514.01.9 RAM Display SYS_PROMPT_CD parameter)                          
           mArray[9]="0"          #  Use SysPmt File                                    # .(50514.01.10 RAM Display USE_SYS_PROMPTS_FILE parameter)                          
           mArray[5]="1"          #  SysPrompt Runs                                     # .(50514.01.11 RAM Display SYS_RUN_COUNT parameter)                          
           fi
   if [ "${USER_PROMPT}" != "" ]; then 
#          pVars.USR_PROMPT       =  process.env.USER_PROMPT                            
#          pVars.USR_PROMPT_CD    = "AA0"
           mArray[10]="0"         #  Use UsrPmt File                                    # .(50514.01.12 RAM Display USE_USR_PROMPTS_FILE parameter)                          
           mArray[6]="1"          #  UsrPrompt Runs                                     # .(50514.01.13 RAM Display USR_RUN_COUNT parameter)                          
           fi
   if [ "${SECTIONS}" != "" ]; then                                                          
           part2="${SECTIONS}"    # Sections                                            # .(50514.01.14 RAM Display SHOW_SECTIONS parameter) 
           fi
   if [ "${RAG_COLLECTIONS}" != "" ]; then                                                          
           aCollection="${RAG_COLLECTIONS}"                                             # .(50514.01.15 RAM Display SHOW_SECTIONS parameter) 
           fi
   
#  sayMsg "  Using the following settings:"
   usrMsg "    1. Model:           ${mArray[1]}"
   usrMsg "    2. CTX_Size:        ${mArray[2]}"
   usrMsg "    3. Temperature:     ${mArray[4]}"
   usrMsg "    4. SysPmt Code:     ${mArray[3]}"
   usrMsg "    5. Do Doc Search:   $( YorN ${mArray[7]} )"
   usrMsg "    6. Do Web Search:   $( YorN ${mArray[8]} )"
   usrMsg "    7. Use SysPmt File: $( YorN ${mArray[9]} )"
   usrMsg "    8. Use UsrPmt File: $( YorN ${mArray[10]} )"
   usrMsg "    9. Test Title:      t${aTest}_${aTitle2}"                                                    # .(50422.04.5 RAM Add TestId).(50420.02.4 RAM Add PC_Code here too)
   usrMsg "   10. SysPrompt Tests: ${mArray[5]}"
   usrMsg "   11. UsrPrompt Runs:  ${mArray[6]}"
   usrMsg "   12. First Run Id:    ${aApp2}_t${aTest:0:2}1.01"                                              # .(50430.02.3 RAM Add aApp2)
   usrMsg "   13. Sections:        ${part2}"
                             if [ "${aCollection}" != "" ]; then                                            # .(50429.09.10)
   usrMsg "   14. Collection:      ${aCollection}"; fi                                                      # .(50429.09.11 RAM Add Collection)
   usrMsg ""
   
   sayMsg "AIC19[ 268]  The .env file will be saved to: $( pwd )/${output_file}"
   echo "${aBodyText}" > "${output_file}"  # Write the result to the output file
#  echo "  The .env file saved to: $output_file"
   } # eof mergeVars
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

   sayMsg "AIC19[ 274]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}'"; # exit
#  bInputs=0; if [ "${aLogs/inputs}" != "${aLogs}" ]; then bInputs=1; fi
#  aTestParms="a11_t011.01, llama3.2:3b,          131072, GKN1-SIMP, 0.3,  1, 0, 0, 1, 0, \"Parms,Docs,Search,Stats,Results\""

   if [ "${aLogs}" == "log,inputs" ]; then
      echo -e "\n-----------------------------------------------------------\n"
      fi;

#  sayMsg "AIC19[ 282]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}', aEnvFile: '${aEnvFile}'"; #  exit

   aSrcFile="${aEnvFile}"                                                               # .(50417.01.1 RAM Use SrcFile name)
if [ "${aEnvFile}" == "" ]; then
   aSrcFile=".env_${aApp}-template_${aPcCd}.txt"                                        # .(50417.01.2)
   fi

   chkEnvTemplate  "${aSrcFile}"                                                        # .(50417.03.2)
   del1stFile ".env_${aApp}_t${aTest}_"                                                 # .(50506.04.2 RAM Delete existing group template files)

   sayMsg "AIC19[ 292]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}', aSrcFile: '${aSrcFile}'"; #  exit
#  usrMsg "";
   usrMsg  "  Merging file, ${aSrcFile}, with file, ${aApp}_model-tests.txt."           # .(50417.01.3)

   bGroup=0; if [ "${aTest:2:1}" == "0" ]; then bGroup=1; fi                            # .(50501.02.1 RAM Add bGroup) 
 if [ "${bGroup}" == "1" ]; then                                                        # .(50501.02.2 RAM Use it) 
   aTestParms="$( cat "${aApp}_model-tests.txt" | awk '/'t${aTest:0:2}'0/ { print }' )" # was: ${aTest:0:3}'0 to use the first one
   if [ "${aTestParms}" == "" ]; then echo -e "\n* No test group found for: t${aTest}";  exit 1; fi                           #.(50501.03   5/01/25 RAM  7:05p| Pass file names via .env, not process.env
#  echo "  Creating an .env test file for the test group: t${aTest}"; exit
   splitParms "${aTestParms}"
#  echo "  aModel: '${mArray[1]}', nTests: '${mArray[5]}'"
   aDstFile=".env_${aApp}_t${aTest}_${aTitle}.txt"                                     
   usrMsg     "   to create an .env test group file with the following parameters:\n";  # .(50420.02.5 RAM Add CR)
   mergeVars  "${aSrcFile}" "${aDstFile}"                                               # .(50417.01.4).(50414.10.x)
   usrMsg     "  Saved the .env test group file: ${aDstFile}."

 else  # generate an .env file for a single test

   aTestId="${aTest:0:2}"; if [ "${aTest:2:1}" == "0" ]; then aTestId="${aTest:0:3}"; fi # .(50422.04.4 RAM Add TestId)
   aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t${aTest}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
#  echo "  searching for: '/${aApp}, t${aTest}/'"    # '/${aApp}, t00${aTest:2:1}/'"
#  echo "cat \"${aApp}_system-prompts.txt\" | awk '/${aApp}, t00${aTest:2:1}/'"
#  aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t00${aTest:2:1}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
   aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t${aTest}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
#  echo "--- aTest: ${aTest}, aSysprompt: '${aSysPrompt}'"; exit
   aTestParms="$( cat "${aApp}_model-tests.txt"    | awk '/t'${aTest}'/ { print }' )"
   if [ "${aTestParms}" == "" ]; then echo -e "\n* No test found for: t${aTest} in '${aApp}_model-tests.txt'"; exit 1; fi       #.(50502.01.1)
   usrMsg     "   to create an .env file with the following parameters:\n";             # .(50420.02.6 RAM Add CR)
   splitParms "${aTestParms}"
   mergeVars  "${aSrcFile}" ".env"                                                      # .(50417.01.5).(50414.10.x)
   usrMsg     "  Saved .env file for test run t${aTest}."
   echo ""
   fi
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
##========================================================================================================= #  ===============================
#>      AIC19 END
##===== =================================================================================================== #
#
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+

