#!/bin/bash
##=========+====================+================================================+
##RD       AIC19_genEnv         | Generate .Env file
##RFILE    +====================+=======+===============+======+=================+
##FD  AIC19_genEnv_v1.01.sh     |  26141|  4/17/25  6:45|   446| u1.01`50417.0645
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

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
##========================================================================================================= #  ===============================  #

   aApp=$1
   aTest="$2"; if [ "${aTest:0:1}" == "t" ]; then aTest="${aTest:1}"; fi 
   aLogs="$3"
#  aPcCd="$4"; if [ "${aPcCd}" == ""      ]; then aPcCd="pc000p"; fi                ##.(50414.10.1 RAM Add User arg)
   aPcCd="$4"; if [ "${aPcCd}" == ""      ]; then aPcCd="${PC_CODE}"; fi            # .(50417.04.1).(50414.10.1 RAM Add PC_NAME)
   aEnvFile="${ENV_TEMPLATE}"
   bDebug=${DEBUG}
#  echo -e "\n    bDebug: '${bDebug}', aPcCd: '${aPcCd}', aEnvFile: '${aEnvFile}'"  

   if [ "${aTest:2:1}" == "0" ]; then  aLogs="log,inputs"; fi

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
   if [ "${aLogs/inputs}" != "${aLogs}" ] || [ "${aLogs}" == "" ] || [ "$bDebug" == "1" ]; then echo -e "$1"; fi
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
   sayMsg "AIC19[  99]  Need to create an .env template file, '$1'${aForPcCd}."   
   usrMsg "* Creating hardware file ${aForPcCd}"                                       # .(50419.06.1 RAM Add Creating hardware file msg)
   hardware_file="$( "../../._2/MWTs/AIC18_getHdwSpecs_u1.01.sh"  ${aPcCd} )"
   sayMsg "AIC19[ 102]  Created hardware file: '${hardware_file}'"  
   aPcCd="${hardware_file#*_}"; aPcCd="${aPcCd/.txt/}"   
   template_file=".env_${aApp}-template_${aPcCd}.txt"
   template_master_file=".env_${aApp}-template.txt"                                     # .(50418.01. RAM Remove _${aPcCd} from template_master_file)
   sayMsg "AIC19[ 107]  Saving hardware for ${aPcCd}, info into the template file: '${template_file}'" 
   aSpecs="$( cat "${hardware_file}" )"
# echo  "${aSpecs}"
   # Replace first line of file1 with contents of file2

   awk    '/{HARDWARE_SPECS}/ {while ((getline line < "'${hardware_file}'") > 0) print "  " line; next} {print}' "${template_master_file}" > "${template_file}"
#  sed    '/{HARDWARE_SPECS}/ {r '"${hardware_file}"';d;}' "${template_master_file}" >"${template_file}"
#  sed -e "/{HARDWARE_SPECS}/ {" -e "r ${hardware_file}" -e "d;" -e "}" "${template_master_file}" > "${template_file}"

   awk '/PC_CODE=/ { print "     export PC_CODE=\"'${aPcCd}'\"" } !/PC_CODE/ { print }' run-tests.sh > @temp && mv @temp run-tests.sh
   chmod 755 run-tests.sh
   sayMsg "AIC19[ 118]  Saved PC_CODE, ${aPcCd}, info into the file, run-tests.sh"   
#  echo "             i.e. '$(pwd)/${template_file}'"
#  cat "$(pwd)/${template_file}"
 
   aSrcFile="${template_file}"
   } # eof chkEnvTemplate                                                                               # .(50417.03.1 End)
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
#  echo "--aTemplate_file: ${template_file}"
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
   usrMsg "   12. First Run Id:    t${aTest:0:2}1.01"
   usrMsg "   13. Sections:        ${part2}"
   usrMsg ""

   echo "$aBodyText" > "$output_file"  # Write the result to the output file
#  echo "  The .env file saved to: $output_file"
   } # eof mergeVars
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

#  sayMsg "AIC19[ 189]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}'"; # exit    
#  bInputs=0; if [ "${aLogs/inputs}" != "${aLogs}" ]; then bInputs=1; fi
#  aTestParms="a11_t011.01, llama3.2:3b,          131072, GKN1-SIMP, 0.3,  1, 0, 0, 1, 0, \"Parms,Docs,Search,Stats,Results\""

   if [ "${aLogs}" == "log,inputs" ]; then 
      echo -e "\n-----------------------------------------------------------\n"
      fi; 

#  sayMsg "AIC19[ 197]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}', aEnvFile: '${aEnvFile}'"; #  exit    

   aSrcFile="${aEnvFile}"                                                               # .(50417.01.1 RAM Use SrcFile name)
if [ "${aEnvFile}" == "" ]; then  
   aSrcFile=".env_${aApp}-template_${aPcCd}.txt"                                        # .(50417.01.2)
   fi 

   chkEnvTemplate  "${aSrcFile}"                                                        # .(50417.03.2)   

   sayMsg "AIC19[ 206]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}', aSrcFile: '${aSrcFile}'"; #  exit    
#  usrMsg ""; 
   usrMsg  "  Merging file, ${aSrcFile}, with file, ${aApp}_model-tests.txt."           # .(50417.01.3)
 
 if [ "${aTest:2:1}" == "0" ]; then 
   aTestParms="$( cat "${aApp}_model-tests.txt" | awk '/'t${aTest:0:2}'0/ { print }' )" # was: ${aTest:0:3}'0 to use the first one
#  echo "  Creating an .env test file for the test group: t${aTest}"; exit  
   splitParms "${aTestParms}"
#  echo "  aModel: '${mArray[1]}', nTests: '${mArray[5]}'"
   aDstFile=".env_${aApp}_t${aTest}_${aTitle}.txt" 
   usrMsg     "   to create an .env test group file with the following parameters:\n";  # .(50420.02.5 RAM Add CR)
   mergeVars  "${aSrcFile}" "${aDstFile}"                                               # .(50417.01.4).(50414.10.x)
   usrMsg     "  Saved the .env test group file: ${aDstFile}." 

 else 
#  echo "  searching for: '/${aApp}, t${aTest}/'"    # '/${aApp}, t00${aTest:2:1}/'" 
#  echo "cat \"${aApp}_system-prompts.txt\" | awk '/${aApp}, t00${aTest:2:1}/'"  
#  aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t00${aTest:2:1}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
   aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t${aTest}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
#  echo "--- aTest: ${aTest}, aSysprompt: '${aSysPrompt}'"; exit 
   aTestParms="$( cat "${aApp}_model-tests.txt"    | awk '/t'${aTest}'/ { print }' )"
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

