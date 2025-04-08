#!/bin/bash

  cd server1/c12* 
bash interactive_search_u2.01.mjs                     # Save docs/a12_*/a12_t005.01.4.50402.0901_Response.txt
bash interactive_search_u2.01.mjs  gemma2:2b          # Save docs/a12_*/a12_t005.01.4.50402.0902_Response.txt
bash interactive_search_u2.01.mjs  qwen2:0.5b  8000   # Save docs/a12_*/a12_t005.01.4.50402.0903_Response.txt
bash interactive_search_u2.01.mjs  qwen2:0.5b  16000  # Save docs/a12_*/a12_t005.01.4.50402.0904_Response.txt
  cd server1/c13* 
bash interactive_search_u2.01.mjs  llama              # Save docs/a13_*/a13_t001.01.4.50402.0905_Response.txt

base run-View.mjs     a12 t005.01                  # Display docs/a12_*/a12_t005.01.4.50402.0901_Response.txt

base run-Save.mjs     a12 t005.01  s005.01         # Save    docs/a12_*/a12_t005.01.4.50402.0901_Response.txt   to   docs/a00_*/a12_s005.01.4.50402.0901_Response.txt
base run-Save.mjs     a12 t005.02  s005.02         # Save    docs/a12_*/a12_t005.02.4.50402.0902_Response.txt   to   docs/a00_*/a12_s005.02.4.50402.0902_Response.txt  
base run-Save.mjs     a12 t005.03  s005.03         # Save    docs/a12_*/a12_t005.03.4.50402.0903_Response.txt   to   docs/a00_*/a12_s005.03.4.50402.0903_Response.txt  
base run-Save.mjs     a13 t001.01  s005.04         # Save    docs/a13_*/a13_t001.01.4.50402.0905_Response.txt   to   docs/a00_*/a13_s005.04.4.50402.0905_Response.txt  

base run-Compare.mjs  s005.01  s005.02             # Compare docs/a00_*/a11_t005.01.4.50402.0901_Response.txt   to   docs/a00_*/a12_s005.02.4.50402.0902_Response.txt  
base run-Compare.mjs  s005.01  s005.03             # Compare docs/a00_*/a11_t005.01.4.50402.0901_Response.txt   to   docs/a00_*/a12_s005.03.4.50402.0903_Response.txt  
base run-Compare.mjs  s005.01  s005.04             # Compare docs/a00_*/a11_t005.01.4.50402.0901_Response.txt   to   docs/a00_*/a13_s005.04.4.50402.0904_Response.txt  

base run-Compare.mjs  s005                         # Compare docs/a00_*/a11_t005.**.4.50402.0901_Response.txt  into  a00_*/a00_t005.05.8.50402.0905_Response.txt              

base run-View.mjs     s005.05.8                    # Display docs/a00_*/a00_t005.05.8.50402.0905_Response.txt

-------------------------------------------------------

aitest4u set  s12  
aitest4u set  s13  

aitest4u run  s12  
aitest4u run  s12 gemma2:2b        
aitest4u run  s12 qwen2:0.5b  8000 
aitest4u run  s12 qwen2:0.5b  16000
aitest4u run  s13 llama

aitest4u show a12 t005.01     # Response.txt   
aitest4u show a12 t005.01.2   # Request.txt 
aitest4u show a12 t005.01.4   # Response.txt   

aitest4u save a12 t005.01 s005.01 
aitest4u save a12 t005.02 s005.02  
aitest4u save a12 t005.03 s005.03 
aitest4u save a13 t001.01 s005.04 

aitest4u compare  s005.01 s005.02 
aitest4u compare  s005.01 s005.03  
aitest4u compare  s005.01 s005.04

aitest4u show     s005.02.8   # Comparison.txt    
aitest4u show     s005.03.8 
aitest4u show     s005.04.8 

aitest4u compare  s005 
aitest4u show     s005.05.8 
