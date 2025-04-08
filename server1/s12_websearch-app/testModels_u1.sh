#!/bin/bash

# .env settings
#-------------------------
# SHOW_SCTIONS="RunId"    # "None,RunId,Stats,Parms,Docs,Search,Results"
# SESSION_ID="t008"
# NEXT_POST="01"
# RUN_COUNT=2

node interactive_search_u2.01.mjs  qwen2:0.5b         # Save docs/a12_*/a12_t007.01.4.50404.1101_Response.txt
node interactive_search_u2.01.mjs  gemma2:2b          # Save docs/a12_*/a12_t007.03.4.50404.1102_Response.txt
node interactive_search_u2.01.mjs  llama3      8000   # Save docs/a12_*/a12_t007.05.4.50404.1103_Response.txt
node interactive_search_u2.01.mjs  llama3     16000   # Save docs/a12_*/a12_t007.07.4.50404.1104_Response.txt

