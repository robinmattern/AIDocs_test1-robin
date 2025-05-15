#!/bin/bash
##=========+====================+================================================+
##RD       AIC18_getHdwSpecs    | Generate Mac Hardware specs
##RFILE    +====================+=======+===============+======+=================+
##FD  AIC18_getHdwSpecs_v1.01.sh|  26141|  4/17/25  6:45|   446| u1.01`50417.0645
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script runs os commands to save hardware specs that will be 
#            merged into the .env templates for AITestR4U AI Model tests.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#       ion  runcommand() {     |
#       ion  getMacInfo() {     |
#                               |
##CHGS     .--------------------+----------------------------------------------+
#.(50416.08   4/16/25 XAI  5:50p| .mjs script witten by Grok and Bruce
#.(50416.08a  4/17/25 CAI  6:20a| .sh script rewritten by Claude and Robin
#.(50416.08b  4/17/25 RAM  6:45a| Added function getMacInfo
#.(50416.08c  4/17/25 RAM  3:15p| Added function getWinInfo
#.(50417.06   4/17/25 RAM  5:15p| Use $1 for PC_CODE if passed
#.(50419.03   4/17/25 CAI 10:00a| Write getWinInfo function
#.(50420.06   4/20/25 RAM  2:00p| Use MacOS "Chip" for CPU
#.(50422.01   4/22/25 RAM  2:00p| Change name of AItestR4u to AI.testR.4u
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
##========================================================================================================= #  ===============================  #

# Function to execute shell commands and return cleaned output
function  runCommand() {
  local result
  result=$( eval "$1" 2>/dev/null ) || result="Unknown"
  echo "$result" | tr -d '\n'
  }
# -------------------------------------------------------------------------------------

function get1stDir() {                                                                 # .(50429.03.1 CAI Write get1stFile Beg)
 local aStr="$1"
 local aFolder="$2"
 local aExt="$3"
#     echo "aFolder: '${aFolder}'"

#if [ ! -d "$aFolder" ]; then echo -e "\n* Unknown folder, '${aFolder}'"; return 1;  fi         # Ensure the folder exists
 if [ ! -d "$aFolder" ]; then echo ""; return 1; fi         # Ensure the folder exists

 for file in "$aFolder"/*; do                               # Process files first
   if [ ! -d "${file}" ]; then continue; fi                 # Skip if not a file
      local dirName=$(basename "$file")                    # Get filename without path
#     echo "dirName: '${dirName}'"
   if [[ "${dirName}" == *"${aStr}"* ]]; then               # Check if file starts with the specified string
     echo "${file}"
     return 0
   fi
 done

 for aDir in "${aFolder}"/*; do                             # If no matching file found, recursively check subdirectories
   if [ -d "${aDir}" ] && [[ "${aDir}" != *node_modules* ]];  then
#  echo "--- looking in aDir: '${aDir}'"
     local result=$( get1stDir "${aStr}" "${aDir}" "${aExt}" )
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

  function  setPCd() { 
#           aVar="{pcd}"; aPCd="$1"; # PCd="rm228p"; 
            aVar="rm228p"; aPCd="$1"; # aPCd="{pcd}"; 
            aFilename="$( readlink -f "$0" )";  # echo "  aFilename: '${aFilename}'"; 
            aBasedir="${aFilename%/._2*}";      # echo "  aBaseDir:  '${aBasedir}'"; # exit   
              #           get1stDir "{pcd}" "${aBasedir}"; exit  
            aTitleDir="$( get1stDir "${aVar}" "${aBasedir}" )" 
    while [ "${aTitleDir}" != "" ]; do 
#           echo "-----------------------------------------" 
#           echo "  Renaming: '${aTitleDir}'"; # exit   
#           echo "        to: '${aTitleDir/\{pcd\}/${aPCd}}'"
            echo "  Renaming: '${aTitleDir/${aVar}/${aPCd}}'"
            mv "${aTitleDir}" "${aTitleDir/${aVar}/${aPCd}}"; 
#           echo "-----------------------------------------" 
            aTitleDir="$( get1stDir "${aVar}" "${aBasedir}" )" 
#           aTitleDir="" 
            done 

    #       0  2025-04-09 03:52.35  ./!__601-11-0001_formR's AIDocs Project in {pcd} on Stage test1-robin_u250401
    #       0  2025-04-09 03:52.38  ./._2/!2__Runtime Files for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.38  ./client/!_Client Apps for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.40  ./client/c01_simple-app/!_1st Client App for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.39  ./client/c02_complex-app/!_2nd Client App for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.39  ./client1/!_Client1 Apps for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.43  ./docs/!_Docsify Files for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.44  ./server/!_Server APIs for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-21 07:26.12  ./server/s01_simple-api/!_1st Server API for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-21 07:26.28  ./server/s02_complex-api/!_2nd Server API for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-09 03:52.45  ./server1/!_Server1 APIs for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-21 07:27.35  ./server1/s11_search-app/!_1st Server1 App for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-21 07:27.45  ./server1/s12_search-web-app/!_2nd Server1 App for formR's AIDocs Project in {pcd} on Stage test1-robin
    #       0  2025-04-21 07:27.52  ./server1/s13_search-rag-app/!_3rd Server1 App for formR's AIDocs Project in {pcd} on Stage test1-robin
    }
# --------------------------------------------------------------------
#  setPCd "{pcd}"; exit 

function  getMacInfo() {                                                                # .(50416.08b.1 RAM Add function)
#  Get Mac model
   modelInfo=$( runCommand "system_profiler SPHardwareDataType | grep 'Model Name'")
   THE_PC_MODEL=$(echo "$modelInfo" | sed -E 's/.*Model Name: (.*)/\1/' || echo "Unknown")
   
#  Get OS version
   osName=$(    runCommand "sw_vers -productName")
   osVersion=$( runCommand "sw_vers -productVersion")
   THE_OS="${osName} v${osVersion}"
   [ "$THE_OS" = " v" ] && THE_OS="Unknown"
   
#  Get CPU
#  cpuInfo=$(   runCommand "system_profiler SPHardwareDataType | grep 'Processor Name'")                    ##.(50420.06.1)
   cpuInfo=$(   runCommand "system_profiler SPHardwareDataType | grep 'Chip'")                              # .(50420.06.1 RAM Use Mac Chip for CPU)
#  THE_CPU=$(echo "$cpuInfo" | sed -E 's/.*Processor Name: (.*)/\1/' || echo "Unknown")                     ##(50420.06.2)
   THE_CPU=$(echo "$cpuInfo" | sed -E 's/.*Chip: (.*)/\1/' || echo "Unknown")                               #.(50420.06.2)
   
#  Get GPU
   gpuInfo=$(   runCommand "system_profiler SPDisplaysDataType | grep 'Chipset Model' | head -n 1")
   THE_GPU=$(echo "$gpuInfo" | sed -E 's/.*Chipset Model: (.*)/\1/' || echo "Unknown")
   
#  Get RAM
   ramInfo=$(   runCommand "system_profiler SPHardwareDataType | grep 'Memory'")
   THE_RAM=$(echo "$ramInfo" | sed -E 's/.*Memory: (.*)/\1/' || echo "Unknown")
   
#  Get Serial Number
   serialInfo=$(runCommand "system_profiler SPHardwareDataType | grep 'Serial Number'")
   THE_SERIAL=$(echo "$serialInfo" | sed -E 's/.*Serial Number.*: (.*)/\1/' || echo "Unknown")
   
#  Get Hardware UUID
   uuidInfo=$(  runCommand "ioreg -rd1 -c IOPlatformExpertDevice | grep IOPlatformUUID")
   THE_UUID=$(echo "$uuidInfo" | sed -E 's/.*"IOPlatformUUID" = "(.*)"$/\1/' || echo "Unknown")
   
#  Get PC_CODE (first 2 letters + last 3 letters of THE_SERIAL)
   if [ "$THE_SERIAL" != "Unknown" ]; then
     THE_PC_CODE="${THE_SERIAL:0:2}${THE_SERIAL: -4}"
   else
     THE_PC_CODE="Unknown"
   fi
   }                                                                                    # .(50416.08b.2)
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

function runPS_cmd() {                                                                  # .(50419.03.1 CAI Write runPS_cmd Beg)
    local cmd="$1"
    local result

    # Run PowerShell command and trim carriage returns and leading/trailing whitespace
#   result=$(powershell.exe -Command "$cmd" 2>/dev/null | tr -d '\r' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    result=$(powershell.exe -Command "$cmd" 2>/dev/null | tr -d '\r' )
    # Check if command succeeded
    echo "$result"  
#   if [ $? -eq 0 ] && [ -n "$result" ]; then echo "$result"; else echo "Unknown";  fi
    }                                                                                   # .(50419.03.1 End)
 
function getWinInfo() {                                                                 # .(50419.03.2 CAI Write getWinInfo Beg)
    # Get PC model
    THE_PC_MODEL=$(runPS_cmd "(Get-WmiObject -Class Win32_ComputerSystem).Model")
    if [ "${THE_PC_MODEL:0:4}" == "OMEN" ]; then THE_PC_MODEL="HP OMEN 16"; fi
    
    # Get OS version
    osName=$(runPS_cmd "(Get-WmiObject -Class Win32_OperatingSystem).Caption")
    osVersion=$(runPS_cmd "(Get-WmiObject -Class Win32_OperatingSystem).Version")
#   THE_OS="Win ${osName:18} v${osVersion:0:4}"  # Microsoft Windows 11 Pro v10.0.22631
    THE_OS="Win${osName:18}"                     # Microsoft Windows 11 Pro v10.0.22631

    # Get CPU
    THE_CPU=$(runPS_cmd "(Get-WmiObject -Class Win32_Processor).Name")  
    THE_CPU="${THE_CPU:27}"  # 13th Gen Intel(R) Core(TM) i7-13700HX
    
    # Get GPU
    THE_GPU=$(runPS_cmd "(Get-WmiObject -Class Win32_VideoController).Name")
    THE_GPU="${THE_GPU:15:8}"  # NVIDIA GeForce RTX 4080 Laptop GPU
    
    # Get RAM
    ramInfoBytes=$(runPS_cmd "(Get-WmiObject -Class Win32_OperatingSystem).TotalVisibleMemorySize")
    ramInfoGB=$(echo $ramInfoBytes | awk '{ printf "%d", $1 / 1024 / 1000 }')
    THE_RAM="${ramInfoGB} GB"
    
    # Get Serial Number
    THE_SERIAL=$(runPS_cmd "(Get-WmiObject -Class Win32_BIOS).SerialNumber")
    
    # Get Hardware UUID
    THE_UUID=$(runPS_cmd "(Get-WmiObject -Class Win32_ComputerSystemProduct).UUID")

    THE_PC_CODE="${THE_SERIAL:0:2}${THE_SERIAL: -4}"
    }                                                                                   # .(50419.03.2 End)
## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #

if [ "${OS:0:3}" != "Win" ]; then                                                       # .(50416.08c.1)
    getMacInfo                                                                          # .(50416.08b.3)
 else                                                                                   # .(50416.08c.2)
    getWinInfo                                                                          # .(50419.03.3).(50416.08c.3)
    fi                                                                                  # .(50416.08b.4)

    aDir="../../data/AI.testR.4u/settings"                                              # .(50422.01.1)     
    if [ -d "._2" ]; then aDir="./data/AI.testR.4u/settings"; fi                        # .(50422.01.2).(50419.03.4)

    if [ "$1" != "" ]; then THE_PC_CODE="$1"; fi                                        # .(50417.06.1)
    aPC_CODE="$( echo "${THE_PC_CODE}" | tr '[:upper:]' '[:lower:]' )" 
    aServerName="${aPC_CODE}-${THE_SERVER#*-}"
    aHdwFile="${aDir}/hardware-settings_${aPC_CODE}.txt"   
  
# Output the information in the requested format
    echo "THE_SERVER_NAME=\"${aServerName}\""  >"${aHdwFile}"
    echo "THE_PC_CODE=\"${aPC_CODE}\""        >>"${aHdwFile}"
    echo "THE_PC_MODEL=\"$THE_PC_MODEL\""     >>"${aHdwFile}"
    echo "THE_OS=\"$THE_OS\""                 >>"${aHdwFile}"
    echo "THE_CPU=\"$THE_CPU\""               >>"${aHdwFile}"
    echo "THE_GPU=\"$THE_GPU\""               >>"${aHdwFile}"
    echo "THE_RAM=\"$THE_RAM\""               >>"${aHdwFile}"
    echo "THE_SERIAL=\"$THE_SERIAL\""         >>"${aHdwFile}"
    echo "THE_UUID=\"$THE_UUID\""             >>"${aHdwFile}"
    
    echo "${aHdwFile}"
#   cat  "${aHdwFile}"

## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
##========================================================================================================= #  ===============================  
#>      AIC18 END
##===== =================================================================================================== #
#
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
