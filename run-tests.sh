#!/bin/bash
##=========+====================+================================================+
##RD       run-tests.sh         | Assign Parameters for all model runs
##RFILE    +====================+=======+===============+======+=================+
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script is used by run-aitestr.sh
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##CHGS     .--------------------+----------------------------------------------+
#.(50416.08   4/16/25 RAM  5:50p| Witten by Robin Mattern
#.(50506.03   5/06/25 RAM  9:45a| Add DRYRUN
#.(50507.02   5/07/25 RAM  7:00a| New way to turn score on an off 
#.(50513.02   5/13/25 RAM  2:35p| Put paramaters in this script in project dir
#.(50514.01   5/14/25 RAM  8:15a| Add override parameters 

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
#    export SECTIONS=Parms,Search,Results       # .(50514.01.1 Override parameters in s##_model-tests.txt)
#    export SECTIONS=Parms,Results              # .(50514.01.2)
#    export SECTIONS=RunId                      # .(50514.01.3

#    export LOGGER=
     export LOGGER="log"
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"                            # .(50506.03.5 Do it unless DRYRUN="1".
     export DEBUG="0"                           # .(50506.03.6 Runs node with --inspect-brk, if bDOIT="1", unless DRYRUN="0"
     export DRYRUN="0"                          # .(50506.03.1 RAM Add DRYRUN)
     export SCORING="1"                         # .(50507.02.8 RAM New way to score it

     export PC_CODE=""

     export SEARCH_MODEL="qwen2:1.5b"           # .(50514.01.5 RAM Override parameters -- no spaces before or after = sign)
     export SCORING_MODEL="qwen2:1.5b"          # .(50514.01.6)
#    export SYSTEM_PROMPT="Summarize the information provided and answer the user's prompt accordingly."     
#    export RAG_COLLECTIONS="s13b_apple-os-pdfs"        
#    export USER_PROMPT="What is so special about ios 17"        

##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
 
