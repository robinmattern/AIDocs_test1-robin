#!/bin/bash
aDate="$(date +'%B %d, %Y %l:%M%p')"; aDate="${aDate/AM/a}"; aDate="${aDate/PM/p}"
aDate="May 31, 2025 4:22p"                                                              # .(50522.02b.4)
echo -e "\n  AIDocs - AI.testR.4u  Ver: u2.11.141  (${aDate})"                          # .(50522.02b.5) RAM Bump version)
if [ "${OS:0:3}" != "Win" ]; then echo ""; fi 
