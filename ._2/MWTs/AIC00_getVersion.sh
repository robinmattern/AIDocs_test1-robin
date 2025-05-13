#!/bin/bash
aDate="$(date +'%B %d, %Y %l:%M%p')"; aDate="${aDate/AM/a}"; aDate="${aDate/PM/p}"
echo -e "\n  AIDocs - AI.testR.4u  Ver: u2.09.137  (${aDate})"
if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
