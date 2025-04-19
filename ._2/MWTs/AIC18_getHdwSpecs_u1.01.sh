#!/bin/bash
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

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
##========================================================================================================= #  ===============================  #

# Function to execute shell commands and return cleaned output
function  runCommand() {
  local result
  result=$(eval "$1" 2>/dev/null) || result="Unknown"
  echo "$result" | tr -d '\n'
  }

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
   cpuInfo=$(   runCommand "system_profiler SPHardwareDataType | grep 'Processor Name'")
   THE_CPU=$(echo "$cpuInfo" | sed -E 's/.*Processor Name: (.*)/\1/' || echo "Unknown")
   
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

if [ "${OS:0:3}" != "Win" ]; then                                                       # .(50416.08c.1)
    getMacInfo                                                                          # .(50416.08b.3)
 else                                                                                   # .(50416.08c.2)
    getWinInfo                                                                          # .(50416.08c.3)
    fi                                                                                  # .(50416.08b.4)

    aDir="../../data/AItestR4u/settings"
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

## --  ---  --------  =  --  =  ------------------------------------------------------  #  ---------------- #
##========================================================================================================= #  ===============================  
#>      AIC18 END
##===== =================================================================================================== #
#
##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
