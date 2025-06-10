#!/bin/bash

#  frt install AIDocs               -d; aRepo="AIDocs"              ; aAppDir="AIDocs"          gitr clone aidocs_ -d

#  frt install AIDocs_demo1         -d; aRepo="AIDocs_demo1-master" ; aAppDir="AIDocs_demo1"    gitr clone aidocs_demo1
#  frt install AIDocs_demo1-master  -d; aRepo="AIDocs_demo1-master" ; aAppDir="AIDocs_demo1"
#  frt install AIDocs_/demo1-master -d; aRepo="AIDocs_/demo1-master"; aAppDir="AIDocs_demo1"

#  frt install AIDocs_dev01         -d; aRepo="AIDocs_dev01-robin"  ; aAppDir="AIDocs_dev01"
#  frt install AIDocs_dev01-robin   -d; aRepo="AIDocs_dev01-robin"  ; aAppDir="AIDocs_dev01"
#  frt install AIDocs_/dev01-robin  -d; aRepo="AIDocs_/dev01-robin" ; aAppDir="AIDocs_dev01"

#  aRepo="$1"; if [ "$1" == "" ]; then aRepo="AIDocs_demo1-master"; fi
#  aRepo="$1"; if [ "$1" == "" ]; then aRepo="AIDocs_demo1"; fi                         # .(50402.15.5)

   aAppDir="$1"; aAccount="$2"; # echo -e "\n  \$1: '$1', \$2: '$2'"; aAppDir="$1"; aAccount="$2"
   if [ "${aAppDir/_}" != "${aAppDir}" ]; then aStage="${aAppDir/*_}";aAppDir="${aAppDir/_*/}"; fi  # .(50402.15.2 RAM Split at _)

                                       aRepo="$1";                  aAppDir="$1"        # .(50402.15.x RAM Seems strange, but ...)
   if [ "${aStage}" == ""      ]; then aRepo="AIDocs_demo1-master"; aAppDir="no-stage"; fi
   if [ "${aStage}" == "demo1" ]; then aRepo="AIDocs_demo1-master"; aAppDir="demo1"; fi
   if [ "${aStage}" == "dev01" ]; then aRepo="AIDocs_dev01-robin";  aAppDir="dev01"; fi
   if [ "${aStage}" == "dev02" ]; then aRepo="AIDocs_dev02-robin";  aAppDir="dev02"; fi # .(50408.05.1 RAM Add dev02)
   if [ "${aStage}" == "test1" ]; then aRepo="AIDocs_test1-robin";  aAppDir="test1"; fi # .(50408.05.2 RAM Add test1)
   if [ "${aStage}" == "testr" ]; then aRepo="AIDocs_testR-master"; aAppDir="testR"; fi # .(50518.04.3 RAM Add testR)
   if [ "${aStage}" == "testR" ]; then aRepo="AIDocs_testR-master"; aAppDir="testR"; fi # .(50518.04.4 RAM Add testR)
   if [ "${aRepo/\//}" != "${aAppDir}" ]; then aRepo="${aRepo/\//}"; fi

#  ----------------------------------------------------------------------------

cleanup() {                                                                             # .(50408.03.3 RAM Write cleanup Beg)
#   echo
#   echo "Ctrl+C detected! Performing cleanup..."

#   echo "* Aborting: frt clone '${aRepo}' '' '${aAppDir}' ${aAccount} -d"
    echo "* Aborting: install ${aRepo}"

    # Add your cleanup code here
    # For example: remove temporary files, reset configurations, etc.

#   echo "Exiting gracefully."
#   exit 1
    exit_wCR 1
    }                                                                                   # .(50408.03.3 End)
# -----------------------------------------------

exit_wCR() {                                                                            # .(50408.03.4 RAM Write exit_wCR Beg)
   if [ "${OS:0:7}"     != "Windows" ]; then echo ""; fi;
   if [ "$1" == "" ]; then exit 0; else exit $1; fi
   }                                                                                    # .(50408.03.4 End)
#  ----------------------------------------------------------------------------

   export aQuiet=q                                                                      # .(50105.05b.7 RAM Add aQuiet)

#  echo -e "\n  aRepo: ${aRepo}', \$2: '$2'"; # exit
#  echo "  frt install '${aRepo}' ''           ''  '$3' -d;"; # exit
#  echo "  frt install '${aRepo}' '${aAppDir}' ''  '$3' -d;"; # exit
#          frt install  ${aRepo}  $ {aAppDir}  ''   $3  -d;                             # .(50105.05b.8 RAM Remove -q)
#          frt install  ${aRepo}  $ {aAppDir}  ''   $3;                                 # .(50105.05b.8 RAM Remove -q)

#          frt clone  {RepoName}  ''  {CloneDir} {Branch} {Account}
#  echo "  frt clone   '${aRepo}' '' '${aAppDir}'    '${aAccount}' -d;"; # exit
#          frt clone    ${aRepo}  ''  ${aAppDir}  ''  ${aAccount}    ;   # exit
#          frt clone    ${aRepo}  ''  ${aAppDir}  ''  ${aAccount}  -b;     exit

#  trap    cleanup SIGINT SIGTERM SIGHUP  # Set trap to catch SIGINT                    ##.(50408.03.5).(50610.04.3)

#          frt clone    ${aRepo}  ''  ${aAppDir}  ''  ${aAccount}  -d;   # exit         ##.(50610.04.4 RAM Don't reinstall)

   if [ $? !=  0  ]; then exit 1; fi                                                    # .(50408.03.6)

#          nErr=$?; # echo " --- nErr: '${nErr}'"; # exit;                              ##.(50408.03.7 RAM Other possibilities Beg)
#  if [ "${nErr}" != "0" ]; then echo "----failure 1: '${nErr}'; exiting"; exit_wCR; fi
#   case ${nErr} in
#     0) echo "Success" ;;
#     1) echo "General error"; exit ;;
#     2) echo "Specific error condition"; exit ;;
#     *) echo "Unknown error: ${nErr}"; exit ;;
#        esac
#                                                                                       ##.(50408.03.7 End)
# -----------------------------------------------------------------------------

           aAppDir2="${aRepo/_*/}"                                                      # .(50402.18.1 RAM Gotta reassign aRepoDir Beg)
   if [ "${aAppDir/-}" == "${aAppDir}" ]; then aRepoDir="${aAppDir2}_${aAppDir}"; fi
   if [ "${aAppDir/-}" != "${aAppDir}" ]; then aRepoDir="${aAppDir}"; fi
#  if [ "${aAppDir}"   != ""           ]; then aRepoDir="${aAppDir2}_${aAppDir}"; fi;
   if [ "${aAppDir}" == "no-stage"     ]; then aRepoDir="${aAppDir2}"; fi               # .(50402.18.1 End)

#    aRepoDir="${aRepo}"; aRepo="${aRepo/\.code.workspace/}"                            ##.(50106.06.5 RAM Create aRepoDir).(50402.18.1)

#    aBinScr="$( which aidocs )"
#    aBinScr="$( pwd | awk '{ sub( /Repos|repos/, "" ); print $0 "._0/bin/aidocs" }' )" ##.(50402.19.1  RAM Re-create aidocs script Beg).(50402.19b.1)
#    aBinDir="$( pwd | awk '{ sub( /Repos|repos/, "" ); print $0 "._0/bin"        }' )" ##.(50402.19b.1 RAM Re-create aidocs script Beg).(50402.19c.1)
# if [ ! -d "${aBinDir}" ]; then mkdir -p "${aBinDir}"; echo "  Created ${aBinDir}"; fi ##.(50402.19b.2 RAM Re-create binDir for this AIDocs and without Sudo??).(50402.19c.1)
     aBinDir="$( which frt | awk '{ sub( /\/frt/, "" ); print }' )"                     # .(50402.19c.1 RAM Get the binDir from FRT)
     aBinScr="${aBinDir}/aidocs"                                                        # .(50402.19c.2)
#    echo "  aBinScr: '${aBinScr}'";  # exit
     aPath="$( pwd )/${aRepoDir}/run-aidocs.sh \"\$@\""
     echo "#!/bin/bash"  >"${aBinScr}"
     echo "${aPath}"    >>"${aBinScr}"
     if [ "${OS:0:7}" != "Windows" ]; then sudo chmod 777 "${aBinScr}"; fi              # .(50402.19e.1 RAM Forgot chmod).(50402.19e.1 RAM Bad Substitution).(50402.19d.1 RAM Set permmission for aidocs if not Windows)
                                                                                        # .(50402.19.1 End)
# -----------------------------------------------

  if [ "1" == "2" ]; then
     aBinScr="$( which aidocs )"
#    aPath="$( cat "${aBinScr}" | awk 'NR == 2 { print }' )"
#    echo "  pwd: $( pwd )"
     aPath="$( pwd )/${aRepoDir}/run-aidocs.sh \"\$@\""
#    echo "  aPath: ${aPath}"

     echo "#!/bin/bash"  >"${aBinScr}"
     echo "${aPath}"    >>"${aBinScr}"
     cat "${aBinScr}"
     echo "  aRepoDir: ${aRepoDir}"
     echo "  aRepo:    ${aRepo}"
  if [ "${OS:0:7}"     != "Windows" ]; then echo ""; fi
     exit
     fi  # eif "1" == "2"
# --------------------------------------------------------------

   if [ $? -ne 1 ]; then                                                                # .(50106.04.15 RAM Exit if bDoit=0)

   if [ ! -d "AnyLLM" ]; then bAnyLLM=1; fi                                             # .(50402.15.6)

# --------------------------------------------------------------

if [ -d "${aRepoDir}/client1" ]; then

if [ -f "${aRepoDir}/._2/package.json" ]; then                                          # .(50402.20.1 RAM Run other npm installs Beg)
   echo -e "  cd ${aRepoDir}/._2";  # exit                                              # .(50106.06.6).(50104.01.10)
     cd "${aRepoDir}/._2"
           npm install >/dev/null
     cd ../../
     fi
#   --------------------------------------------------

if [ -f "${aRepoDir}/client1/package.json" ]; then
   echo -e "  cd ${aRepoDir}/client1" # exit                                            # .(50106.06.7).(50104.01.11)
     cd "${aRepoDir}/client1"                                                           # .(50106.06.8)
           npm install >/dev/null
     cd ../../
     fi # eif ${aRepoDir}/client1/package.json
#   --------------------------------------------------

if [ -f "${aRepoDir}/server1/package.json" ]; then
   echo -e "  cd ${aRepoDir}/server1" # exit                                            # .(50106.06.9).(50104.01.12)
     cd "${aRepoDir}/server1"
   echo "  npm install"
           npm install | awk '{ print "    " $0 }'
     cd ../../                                                                          # .(50406.01c.1 RAM Return back to root dir)
     fi                                                                                 # .(50402.20.1 End)
# --------------------------------------------------------------

function cpyEnv() {                                                                                         # .(50406.03.1 RAM Copy _env Beg)
      aFrom="$1/$2"; aTo="$1/$3"
#     echo "    Copying .env file from ${aFrom}"
#     echo "                      into ${aTo}"
      if [ ! -f "${aFrom}" ]; then echo     "  * Can't copy .env file: '${aFrom}'";  return; fi                   # .(50406.01d.1)
      echo "    Copying .env file from ${aFrom}  to  .env"                                                  # .(50410.01.1)
      if [   -f "${aFrom}" ]; then            cp -p "${aFrom}" "${aTo}";               fi
      if [ ! -f "${aTo}"   ]; then echo  "  * Copy to: '${aTo}' failed";       return; fi                   # .(50406.01d.2)
      }                                                                                                     # .(50406.03.1 End)
# --------------------------------------------------------------

 if [ "${aStage}" == "" ] || [ "${aStage}" == "demo1" ]; then bModelTester=0; fi        # .(50406.01d.1)

#if [  -f "${aRepoDir}/client1/c16_aidocs-review-app/utils/FRTs/_env_local-local.txt" ]; then
#   cp -p "${aRepoDir}/client1/c16_aidocs-review-app/utils/FRTs/_env_local-local.txt"  "${aRepos}/client1/c16_aidocs-review-app/utils/FRTs/_env"
#   fi
   echo ""                                                                              # .(50406.01e.1)
   cpyEnv "./${aRepoDir}/client1/c16_aidocs-review-app/utils/FRTs"  "_env_local-local.txt"  "_env"          # .(50406.03.2 RAM Copy c16 _env)

#if [ "${aStage}" == "dev01" ] || [ "${aStage}" == "test1" ]; then                                          # .(50406.03c.1 RAM Try again).(50406.03b.1 RAM Only copy dev01's env)

 if [ "${bModelTester}" != "0" ]; then                                                                      # .(50406.03c.1 RAM Try again).(50406.03b.1 RAM Only copy dev01's env)
   cpyEnv "./${aRepoDir}/server/s01_search-app"      ".env_example"  ".env"                                 # .(50518.01.7)            
   cpyEnv "./${aRepoDir}/server1/s11_search-mod-app" ".env_example"  ".env"                                 # .(50518.01.8 RAM Rename).(50410.01.2)
   cpyEnv "./${aRepoDir}/server1/s12_search-web-app" ".env_example"  ".env"                                 # .(50410.01.3).(50406.03.3 RAM Copy s12 .env)
   cpyEnv "./${aRepoDir}/server1/s13_search-rag-app" ".env_example"  ".env"                                 # .(50410.01.4)
   cpyEnv "./${aRepoDir}/server1/s14_grading-app"    ".env_example"  ".env"                                 # .(50510.05.1)
   cd ${aRepoDir}                                                                                           # .(50505.10.1)
   bash set-aidocs.sh doit                                                                                  # .(50505.10.2)
   fi                                                                                                       # .(50406.03b.2)
# --------------------------------------------------------------

#if [ "${aRepo}" == "AnyLLM" ]; then                                                    ##.(50406.01c.1).(50402.15.7 RAM Only set ANYLLM_KEY id it's installed).(50406.01d.2)
#if [ "${bAnyLLM}" == "1" ] && [ "${aStage}" == "demo1" ]; then                         ##.(50406.01.1).(50402.15.7 RAM Only set ANYLLM_KEY id it's installed).(50406.01c.1)
 if [ "${bAnyLLM}" == "1" ] && [ "${bModelTester}" == "0" ]; then                       # .(50406.01d.2).(50406.01.1).(50402.15.7 RAM Only set ANYLLM_KEY id it's installed).(50406.01c.1)
#  echo ""
   echo -e   "  Edit SERVER_HOST and ANYLLM_API_KEY in _env:"                           # .(50406.01e.2 RAM Remove CR)
   echo -e   "     cd ${aRepoDir}"                                                      # .(50106.06.10)
   echo -e   "     nano client1/c16_aidocs-review-app/utils/FRTs/_env"
   echo -e   "     ./run-client.sh\n"
   echo -e   "  or work on it in VSCode with: code ${aRepoDir/\//}*"                    # .(50105.05c.7).(50106.06.11).(50104.01.13 End)
   if [ "${OS:0:7}"     != "Windows" ]; then echo ""; fi                                #
   exit
   fi
#else                                                                                   ##.(50406.01b.1 Display msg for AIDocs_dev01 Beg).(50406.01c.2)
#  echo "--- aRepo: '${aRepo}', aStage: '${aStage}', bModelTester: '${bModelTester}'"
#if [ "${aRepo}" == "AIDocs"   ]; then                                                  # .(50406.01c.2).(50408.01.x).(50402.15.7 RAM Only set ANYLLM_KEY id it's installed).(50406.01d.3)

 if [ "${bModelTester}" != "0" ]; then                                                  # .(50406.01d.2).(50406.01c.2).(50408.01.x).(50402.15.7 RAM Only set ANYLLM_KEY id it's installed)
   echo -e "//  ------  End of Install  ----------------------------------------------------------------------------- \\\n"       # .(50516.01.1 RAM Add End of Install msg)

#  echo -e "\n  Run the AI model testr in any of the server1 app folders, for example"  ##.(50406.01e.3 RAM Remove CR).(50516.02.7)
#  echo -e "\n  Run the AI model testr commands in the repository, for example:"        ##.(50406.01e.3 RAM Remove CR).(50516.02.7)
#  echo -e   "   after editing the model paramters in .env file(s), e.g."               ##.(50420.05.1 RAM New Instructions)
#  echo -e "\n     cd ${aRepoDir}/server1/s11_*"                                        ##.(50106.06d.1 RAM Add a space).(50420.05.2).(50516.02.2)
#  echo -e "\n     cd ${aRepoDir}"                                                      ##.(50106.06d.1 RAM Add a space).(50420.05.2).(50516.02.8)
   echo -e "\n  After changing into the project folder: cd ${aRepoDir}"                 # .(50516.02.9)
   echo -e   "    and setting your PC_CODE in the script, run-tests.sh,"                # .(50516.02.10)
   echo -e   "    you can run any of these AI model testr commands, for example:"       # .(50516.02.11)

#  echo -e   "     nano .env"                                                           ##.(50420.05.3)
#  echo -e   "     node search_u2.03.mjs [{Model}] [{CTX_Size}]"                        ##.(50420.05.4)
#  echo -e   "     nano .env_t001_Run1-qwen2.txt"                                       ##.(50410.01.5).(50420.05.5)

   echo -e "\n     ai.testr.4u help"                                                    # .(50516.02.x).(50420.05.6).(50410.01.6)
   echo -e   "     aitestr s11 t011"                                                    # .(50420.05.6).(50410.01.6)
   echo -e   "     ait chroma start"                                                    # .(50410.01.7)
   echo -e   "     ait import s13 "                                                     # .(50410.01.8)
   echo -e   "     ait s13 t011"                                                        # .(50410.01.8)

#  echo -e   "     bash run-tests.sh help"                                              # .(50420.05.6).(50410.01.6)
#  echo -e   "     bash run-tests.sh t041"                                              # .(50410.01.7)
#  echo -e   "     bash run-tests2.sh"                                                  # .(50410.01.8)
#  echo -e   "     bash run-tests2.sh"                                                  # .(50410.01.8)

   if [ "${OS:0:7}"     != "Windows" ]; then echo ""; fi                                #
   exit
   fi                                                                                   # .(50406.01b.1 End).(50406.01.1 End).(50106.04.16 RAM Exit if bDoit=0)

 else                                                                                   # .(50402.15.8)
   echo -e "* AIDocs didn't get installed into folder: ${aRepoDir}/client1.";           # .(50402.15.9)
#  exit
   fi # eif ${aRepoDir}/client1
 fi  # eif $? -ne 1                                                                     # .(50402.15.10)

  if [ "${OS:0:7}" != "Windows" ]; then echo ""; fi

# frt clone AIDocs_demo1-master ''  ''            -->   AIDocs_demo1-master.git  AIDocs                x   AIDocs_demo1-master
# frt clone AIDocs_demo1-master ''  demo1         -->   AIDocs_demo1-master.git  AIDocs_demo1
# frt clone AIDocs_demo1-master ''  demo1-master  -->   AIDocs_demo1-master.git  AIDocs_demo1-master
# frt clone AIDocs_demo1-master '' /demo1-master  -->   AIDocs_demo1-master.git  AIDocs_/demo1-master

# frt clone AIDocs_dev01-robin  ''  dev01         --> x AIDocs_demo1-master.git" AIDocs_dev01          x
# frt clone AIDocs_dev01-robin  ''  dev01-robin   --> x AIDocs_demo1-master.git" AIDocs_dev01-robin    x
# frt clone AIDocs_dev01-robin  '' /dev01-robin   --> x AIDocs_demo1-master.git" AIDocs_/dev01-robin   x
