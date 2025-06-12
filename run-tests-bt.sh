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
#    export LOGGER="log"                        # .(50514.01.1 RAM Override display sections -- no spaces before or after = sign)
#    export LOGGER="inputs"
    export LOGGER="log,inputs"

     export DOIT="1"                            # .(50506.03.5 Do it unless DRYRUN="1")
     export DEBUG="0"                           # .(50506.03.6 Runs node with --inspect-brk, if bDOIT="1", unless DRYRUN="0")
     export DRYRUN="0"                          # .(50506.03.7 RAM Add DRYRUN)
     export SCORING="1"                         # .(50507.02.8 RAM Run scoring after models are run)

     export PC_CODE=""

#echo "$1";

#if [ "$1" == "" ]; then shift
#    export SEARCH_MODEL="$1"             # 0.934 GB
#else
#     export SEARCH_MODEL="gemma3:1b"              # 0.815 GB
#fi

    export SEARCH_MODEL="qwen2:1.5b"             # 0.934 GB
#     export SEARCH_MODEL="gemma3:1b"              # 0.815 GB
#     export SEARCH_MODEL="gemma3:1b-it-q4_K_M"    # 0.815 GB
#     export SEARCH_MODEL="granite3.3:2b"          # 1.5 GB
#     export SEARCH_MODEL="llama3.2:3b"            # 2.0 GB
#     export SEARCH_MODEL="phi4-mini"              # 2.5 GB
#     export SEARCH_MODEL="phi4-mini:3.8b-q4_K_M"  # 2.5 GB
#     export SEARCH_MODEL="mistral:7b"             # 4.1 GB
#     export SEARCH_MODEL="mistral:7b-instruct"    # 4.1 GB
#     export SEARCH_MODEL="internlm2"              # 4.5 GB
#     export SEARCH_MODEL="granite3.3:8b"          # 4.9 GB

     export SCORING_MODEL="gemma2:2b-instruct-q4_0"          # .(50514.01.3)
#     export SCORING_MODEL="gemma3:1b-it-q4_K_M"          # .(50514.01.3)
     
#    export SCORING_SECTIONS="Results,RunId"    # .(50521.01.1 RAM Override display sections for scoring model run)
#    export SCORING_SECTIONS="Stats,RunId"      # .(50521.01.1 RAM Override display sections for scoring model run)

     export SYSTEM_PROMPT="You are a knowledgeable AI assistant with access to a vast database of information.  Your goal is to provide accurate, comprehensive, and unbiased answers to user queries.  If a question requires specialized knowledge outside your current capabilities, politely explain the limitations and suggest alternative resources."     
     export USER_PROMPT="What are the key events relating to the rise nd fall of the roman empire?"        
     export RAG_COLLECTIONS=""        

##SRCE     +====================+===============================================+
##RFILE    +====================+=======+===================+======+=============+
 
