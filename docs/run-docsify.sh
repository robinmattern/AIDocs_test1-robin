#!/bin/bash

#  Start Docsify server in the background, redirecting output to log file

 if [ ! -f node_modules/.bin/docsify ]; then
    echo -e "\n * Please run: npm install docsify"
    exit
    fi

 if [ ! -f docsify.log ]; then rm -f docsify.log; fi 
   
   docsify serve &> docsify.log &

#  Wait for server to start (adjust sleep time if needed)

   sleep 5

#  Open Chrome with the correct URL

#           cat docsify.log
   nPort=$( cat docsify.log | awk '/Listening/ { sub( /.+:/, "" ); print }' )

 if [ "${nPort}" == "" ]; then
    echo -e "\n * Something went wrong, try again"
    exit
    fi

   echo -e "\n  Opening Chrome: \"http://localhost:${nPort}\""

  "C:\Program Files\Google\Chrome\Application\chrome.exe" --profile-directory="Default"  "http://localhost:${nPort}"

#  chrome https://localhost:3000 || xdg-open https://localhost:3000  # use default browser

   aName="$0"
   aName=$(basename "$0")
#  aName="\"C:\\Program Files\\Git\\bin\\bash.exe\""

#  echo /C taskkill "/F /IM \"$0\""
#  echo "  powershell -Command \"Stop-Process -Name ${aName}\""

   nPID=$(ps -p $$ | awk 'NR == 2 {print $1}' )
   nWID=$(ps -p $$ | awk 'NR == 2 {print $4}' )
#  echo "  powershell -Command \"Stop-Process -Id ${nWID}\""

if [[ "$OSTYPE" == "msys" ]]; then

   sleep 5

#          taskkill "/F /IM \"$0\""
#  cmd //C taskkill  /f /im  "$0"
#  cmd  /C taskkill "/F /IM \"$0\""

#  echo "  powershell -Command \"Stop-Process -Id ${nWID}\""
#          powershell -Command  "Stop-Process -Id ${nWID}"

#  echo "  powershell -Command \"Stop-Process -Name ${aName}\""
#          powershell -Command  "Stop-Process -Name ${aName}"

#          powershell -Command "Get-Process run-docsify.sh | Stop-Process"
#          powershell -Command "Get-Process ${aName} | Stop-Process"

#  echo "  wscript -e:vbscript \"CreateObject( 'WScript.Shell' ).AppActivate(  ${aName}  ).quit()\""
#          wscript -e:vbscript  "CreateObject(\"WScript.Shell\").AppActivate( "${aName}" ).quit()"

#          kill ${aName}  # process name not found
#          kill ${nPID}   # nothing happens
#          kill ${nWID}   # process id not found
   fi
