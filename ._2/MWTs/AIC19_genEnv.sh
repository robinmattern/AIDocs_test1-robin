#!/bin/bash

aApp=$1
aTest="$2"

# aTestParms="a11_t011.01, llama3.2:3b,          131072, GKN1-SIMP, 0.3,  1, 0, 0, 1, 0, \"Parms,Docs,Search,Stats,Results\""

function YorN() { 
    if [ "$1" == "1" ]; then echo "Yes"; else echo "No"; fi 
    }
# -----------------------------------------------------------------

function splitParms() { 
   part1=$( echo "$1" | sed    's/".*$//' )
   part2=$( echo "$1" | grep -o '"[^"]*"' | sed 's/"//g' ) # Extract the quoted part  "
#  part2=$( echo "$1" | awk '{ sub( /.+?"/, "" );   sub( /\"/, "" ); print }' ) # Extract the quoted part  "
#  echo "  The quoted part is: '${part2}'"

# Create the array by splitting the first part by comma and adding the quoted part as the last element
   readarray -t mArray < <(echo "$part1" | tr ',' '\n')
#  mArray+="${part2}"
#  echo "  The quoted part is: '${mArray[10]}'"

# Trim whitespace from each element
for i in "${!mArray[@]}"; do
    mArray[$i]=$(echo "${mArray[$i]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
done

   aModel="${mArray[1]/:/;}"
   aTests="${mArray[5]}-tests"; if [ "${mArray[5]}" == "1" ]; then aTests="1-test"; fi 
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

if [ ! -f "$template_file" ]; then
    echo "Template file not found: $template_file"
    exit 1
fi

# Read the template into a variable
    aBodyText=$(cat "$template_file")
    mArray[0]="${mArray[0]:4:4}"  # aTestId=

# Replace placeholders with array elements
# TestId,      Model,              CTX_SIZE, SysPmtCd, Temp, Tests, DOCs, URLs, USPF, UUPF, Sections

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

    
#   echo "  Using the following settings:" 
    echo "    1. Model:           ${mArray[1]}"
    echo "    2. CTX_Size:        ${mArray[2]}"
    echo "    3. Temperature:     ${mArray[4]}"
    echo "    4. SysPmt Code:     ${mArray[3]}"
    echo "    5. Do Doc Search:   $( YorN ${mArray[7]} )"
    echo "    6. Do Web Search:   $( YorN ${mArray[8]} )"
    echo "    7. Use SysPmt File: $( YorN ${mArray[9]} )"
    echo "    8. Use UsrPmt File: $( YorN ${mArray[10]} )"
    echo "    9. Test Title:      ${aTitle}"
    echo "   10. UsrPrompt Runs:  ${mArray[6]}"
    echo "   10. SysPrompt Tests: ${mArray[5]}"
    echo "   11. First Run Id:    t${aTest}.01"
    echo "   12. Sections:        ${part2}"
    echo ""
    echo "$aBodyText" > "$output_file"  # Write the result to the output file
#   echo "  The .env file saved to: $output_file"
    }
# ---------------------------------------------------------------------------

  echo "" 
 if [ "${aTest:3:1}" == "0" ]; then 
   aTestParms="$( cat "${aApp}_model-tests.txt" | awk '/'${aTest:0:3}'1/ { print }' )"
#  echo "  Creating .env test file for test: ${aTestParms}" 
   splitParms "${aTestParms}"
#  echo "  aModel: '${mArray[1]}', nTests: '${mArray[5]}'"
   aDestFile=".env_${aApp}_${aTest}_${aTitle}.txt" 
   echo "  Creating the .env test file with the following parameters:" 
   mergeVars ".env_${aApp}-template.txt" "${aDestFile}"
   echo "  Saved the .env test file: ${aDestFile}." 
 else 
   
# echo "cat \"${aApp}_system-prompts.txt\" | awk '/${aApp}, t00${aTest:2:1}/'"  
   aSysPrompt="$( cat "${aApp}_system-prompts.txt" | awk '/'"${aApp}, t00${aTest:2:1}"'/ { aPrompt = substr( $0, 32 ); sub( /[" ]+$/, "", aPrompt ); print aPrompt }' )"
#  echo "--- aTest: ${aTest}, aSysprompt: '${aSysPrompt}'"; exit 
   aTestParms="$( cat "${aApp}_model-tests.txt"    | awk '/'${aTest}'/ { print }' )"
   echo "  Creating an .env file with the following parameters:" 
   splitParms "${aTestParms}"
   mergeVars ".env_${aApp}-template.txt" ".env"
   echo "  Saved .env file for test run t${aTest}." 
   fi 


