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
#.(50506.03   5/06/25 RAM  9:45a| Add DRYRUN to affect DOIT and DEBUG
#.(50507.02   5/07/25 RAM  7:00a| New way to turn score on an off
#.(50514.01   5/14/25 RAM  8:15a| Add override parameters in project dir
#
##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
#
#    export LOGGER=
     export LOGGER="log"                        # .(50514.01.1 RAM Override display sections -- no spaces before or after = sign)
#    export LOGGER="inputs"
#    export LOGGER="log,inputs"

     export DOIT="1"                            # .(50506.03.5 Do it unless DRYRUN="1")
     export DEBUG="0"                           # .(50506.03.6 Runs node with --inspect-brk, if bDOIT="1", unless DRYRUN="0")
     export DRYRUN="0"                          # .(50506.03.7 RAM Add DRYRUN)
     export SCORING="1"                         # .(50507.02.8 RAM Run scoring after models are run)

     export PC_CODE=""

     export SEARCH_MODEL="qwen2:0.5b"           # .(50514.01.2 RAM Override models)
     export SCORING_MODEL="gemma2:2b-instruct-q4_0" # .(50514.01.2)
#    export SCORING_MODEL="gemma2:2b"           # .(50514.01.3)

#    export SCORING_SECTIONS="Results,RunId"    # .(50521.01.1 RAM Override display sections for scoring model run)
#    export SCORING_SECTIONS="Stats,RunId"      # .(50521.01.2)
#    export SCORING_SECTIONS="All"              # .(50521.01.3)

     export SYSTEM_PROMPT="all-sys: Summarize the information provided and answer the user's prompt accordingly."
     export USER_PROMPT="all-usr: What is so special about ios 17"
     export RAG_COLLECTIONS="s13_apple-ipad-txt"

##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+

