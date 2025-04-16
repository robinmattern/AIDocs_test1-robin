#!/bin/bash

   aApp=$1
   aTest="$2"; if [ "${aTest:0:1}" == "t" ]; then aTest="${aTest:1}"; fi 
   aLogs="$3"
#  aPcCd="$4"; if [ "${aPcCd}" == ""      ]; then aPcCd="pc000p"; fi                # .(50414.10.1 RAM Add User arg)
   aPcCd="$4"; if [ "${aPcCd}" == ""      ]; then aPcCd="${PC_NAME}"; fi            # .(50414.10.1 RAM Add User arg)
   aEnvFile="${ENV_TEMPLATE}"
   bDebug=${DEBUG}

   if [ "${aTest:2:1}" == "0" ]; then  aLogs="log,inputs"; fi

function sayMsg() {
   if [ "${bDebug}" == "1" ]; then echo -e "$1"; fi
   }
# -----------------------------------------------------------------

   sayMsg "  - AIC19[  12]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}'"; # exit    
#  bInputs=0; if [ "${aLogs/inputs}" != "${aLogs}" ]; then bInputs=1; fi
#  aTestParms="a11_t011.01, llama3.2:3b,          131072, GKN1-SIMP, 0.3,  1, 0, 0, 1, 0, \"Parms,Docs,Search,Stats,Results\""

   if [ "${aLogs}" == "log,inputs" ]; then 
      echo -e "\n-----------------------------------------------------------"
      fi; 

function YorN() { 
   if [ "$1" == "1" ]; then echo "Yes"; else echo "No"; fi 
   }
# -----------------------------------------------------------------

function usrMsg() {
   if [ "${aLogs/inputs}" != "${aLogs}" ]; then echo "$1"; fi
#  if [ "${bInputs}" == "1" ]; then echo "$1"; fi 
   }
# -----------------------------------------------------------------

function splitParms() { 
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
   }
# -----------------------------------------------------------------

function mergeVars() { 
# Split the string by comma, but preserve the quoted part at the end
# We use a combination of sed and awk to handle this
# readarray -t mArray < <(echo "$aTestParms" | awk -F'"' '{print $1}' | sed 's/,/\n/g' && echo "\"$(echo "$aStr" | awk -F'"' '{print $2}')\""')

# Trim whitespace from each element
#for i in "${!mArray[@]}"; do
#    mArray[$i]=$(echo "${mArray[$i]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')   # '
#done

# Read the template file
   template_file="$1"
   output_file="$2"
#  echo "--aTemplate_file: ${template_file}"
if [ ! -f "${template_file}" ]; then
   echo -e "* Template file not found: ${template_file}"
   exit 1
   fi

# Read the template into a variable
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
   placeholder="{Title}";     replacement="${aTitle}";      aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{Cnt}";       replacement="${mArray[5]}";   aBodyText="${aBodyText//$placeholder/$replacement}"
   placeholder="{SysPrompt}"; replacement="${aSysPrompt}";  aBodyText="${aBodyText//$placeholder/$replacement}"

#  sayMsg "  Using the following settings:" 
   usrMsg "    1. Model:           ${mArray[1]}"
   usrMsg "    2. CTX_Size:        ${mArray[2]}"
   usrMsg "    3. Temperature:     ${mArray[4]}"
   usrMsg "    4. SysPmt Code:     ${mArray[3]}"
   usrMsg "    5. Do Doc Search:   $( YorN ${mArray[7]} )"
   usrMsg "    6. Do Web Search:   $( YorN ${mArray[8]} )"
   usrMsg "    7. Use SysPmt File: $( YorN ${mArray[9]} )"
   usrMsg "    8. Use UsrPmt File: $( YorN ${mArray[10]} )"
   usrMsg "    9. Test Title:      ${aTitle}"
   usrMsg "   10. UsrPrompt Runs:  ${mArray[6]}"
   usrMsg "   10. SysPrompt Tests: ${mArray[5]}"
   usrMsg "   11. First Run Id:    t${aTest:0:2}1.01"
   usrMsg "   12. Sections:        ${part2}"
   usrMsg ""

   echo "$aBodyText" > "$output_file"  # Write the result to the output file
#  echo "  The .env file saved to: $output_file"
   }
# ---------------------------------------------------------------------------

   sayMsg "  - AIC19[ 125]  aApp: '${aApp}', aTest: '${aTest}', aLogs: '${aLogs}', aPCName: '${aPcCd}', aEnvFile: '${aEnvFile}'"; #  exit    

   usrMsg ""; 
if [ "${aEnvFile}" == "" ]; then  
   aEnvFile=".env_${aApp}-template_${aPcCd}.txt"
   fi 
   usrMsg  "  Merging file, ${aEnvFile}, with file, ${aApp}_model-tests.txt."

 if [ "${aTest:2:1}" == "0" ]; then 
   aTestParms="$( cat "${aApp}_model-tests.txt" | awk '/'t${aTest:0:2}'0/ { print }' )"  # was: ${aTest:0:3}'0 to use the first one
#  echo "  Creating an .env test file for the test group: t${aTest}"; exit  
   splitParms "${aTestParms}"
#  echo "  aModel: '${mArray[1]}', nTests: '${mArray[5]}'"
   aDstFile=".env_${aApp}_t${aTest}_${aTitle}.txt" 
   usrMsg   "   to create an .env test group file with the following parameters:";  # exit 
   mergeVars "${aEnvFile}" "${aDstFile}"                        # .(50414.10.x)
   usrMsg   "  Saved the .env test group file: ${aDstFile}." 
 else 
   
#  echo "  searching for: '/${aApp}, t${aTest}/'"    # '/${aApp}, t00${aTest:2:1}/'" 
#  echo "cat \"${aApp}_system-prompts.txt\" | awk '/${aApp}, t00${aTest:2:1}/'"  
#  aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t00${aTest:2:1}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
   aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t${aTest}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
#  echo "--- aTest: ${aTest}, aSysprompt: '${aSysPrompt}'"; exit 
   aTestParms="$( cat "${aApp}_model-tests.txt"    | awk '/t'${aTest}'/ { print }' )"
   usrMsg   "   to create an .env file with the following parameters:"; # exit 
   splitParms "${aTestParms}"
   mergeVars ".env_${aApp}-template_${aPcCd}.txt" ".env"                               # .(50414.10.x)
   usrMsg   "  Saved .env file for test run t${aTest}." 
   echo ""
   fi 
