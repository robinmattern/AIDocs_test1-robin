#!/bin/bash

# .env settings
#-------------------------
# SHOW_SCTIONS="RunId"    # "None,RunId,Stats,Parms,Docs,Search,Results"
# SESSION_ID="t010"
# NEXT_POST="01"
# RUN_COUNT=2

  node interactive_search_u2.02.mjs  qwen2:0.5b         # Save ./docs/a12_*/25.04.Apr/_t009_Final Test/a12_t009.01.4.50405.1143_Response.txt
  node interactive_search_u2.02.mjs  gemma2:2b          # Save ./docs/a12_*/25.04.Apr/_t009_Final Test/a12_t009.02.4.50405.1143_Response.txt
  node interactive_search_u2.02.mjs  llama3     16000   # Save ./docs/a12_*/25.04.Apr/_t009_Final Test/a12_t009.03.4.50405.1158_Response.txt
  node interactive_search_u2.02.mjs  llama3.2    8000   # Save ./docs/a12_*/25.04.Apr/_t009_Final Test/a12_t009.04.4.50405.1158_Response.txt



