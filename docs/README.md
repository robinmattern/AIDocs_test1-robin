<details><summary style="font-size:16px; color:blue">
D. Run three sample models
</summary>

 1. Run s11_search-app from the AIDocs_test1 directory.  
 
    <details><summary><code>cd AIDocs_test1</code></summary></details>
    <details><summary><code>ait s11 t041</code></summary>

        50506.0949.05  s11           Running test: t041

        -----------------------------------------------------------

        * Creating app .env template file for PC_Code: 'rm231p'..
          Creating hardware file for 'rm231p'..
          Saving hardware info for rm231p into the template file: '.env_s11-template_rm231p.txt'

          Merging file, .env_s11-template_rm231p.txt, with file, s11_model-tests.txt.
           to create an .env file with the following parameters:

            1. Model:           qwen2:0.5b
            2. CTX_Size:        16000
            3. Temperature:     0.3
            4. SysPmt Code:     GKN1-SIMP
            5. Do Doc Search:   No
            6. Do Web Search:   No
            7. Use SysPmt File: No
            8. Use UsrPmt File: No
            9. Test Title:      t041_qwen2;0.5b_1,1-test on rm231p
           10. SysPrompt Tests: 1
           11. UsrPrompt Runs:  1
           12. First Run Id:    s11_t041.01
           13. Sections:        RunId

          Saved .env file for test run t041.

        50506.0949.07  s11  t041     Running search_u2.08.mjs t041
        50506.0949.07  s11  t041.01  Starting qwen2:0.5b           GKN1-SIMP  KP0   16000  0.3
        50506.0949.18                Finished qwen2:0.5b        in 2.19 secs, 239.18 tps

        -----------------------------------------------------------

    </details>   

 2. Let's open VSCode and look at the `run-tests.sh` script in the s11_search-app folder.

    <details><summary><code>code AIDocs_test1-robin.code-workspace</code></summary></details>  

    <details><summary<code>Open the file: <code>run-tests.sh</code></summary>

        #!/bin/bash

             if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
             aApp2="s11"; if [[ "$1" =~ [acs][0-9]{2} ]]; then aApp2=$1; shift; fi              # .(50429.05.13)
                          if [[ "$2" =~ [acs][0-9]{2} ]]; then aApp2=$2; aArgs=("$@"); unset aArgs[1]; set -- "${aArgs[@]}"; fi         # .(50429.05.14 )

                    aRun_Tests="../../._2/MWTs/AIC15_runTests_u1.02.sh"
                    aScore_Script="../s14_grading-app/score_u2.08.mjs"
             export SEARCH_SCRIPT="search_u2.08.mjs"

             export APP=${aApp2}

        #    export LOGGER=
        #    export LOGGER="log"   # no workie
        #    export LOGGER="inputs"
             export LOGGER="log,inputs"

             export DOIT="1"
             export DEBUG="0"
             export DRYRUN="0"                                                                  # .(50506.03.1 RAM Add DRYRUN)                                           
        #    export SCOREIT="0"                                                                 # .(50506.03.2 RAM New way to score it)                  

             export PC_CODE="rm231p"

             bash  "${aRun_Tests}"  "$@";                                if [ $? -ne 0 ]; then exit 1; fi
        #    node  "${aScore_Script}" "gemma2:2b" "--app:s11";           if [ $? -ne 0 ]; then exit 1; fi  
       
    </details>   

    We're changing 3 variables in the run script.  

    <details><summary><span style="font-size:11px; padding-left:13px">Comment line 16   </span><code> # export LOGGER="log,inputs"</code></summary>
       <ul><li style="font-size:11px;"><code>LOGGER</code>: by turning off this override, we'll see all the sections set for this test in the `model-script.txt` files.</li></ul>   
    </details>  

    <details><summary><span style="font-size:11px; padding-left:23px">Change line 21    </span><code> &nbsp; export PC_CODE="myMac"</code></summary> 
       <ul><li style="font-size:11px;"><code>PC_CODE</code>: by making it empty, a new Hardware code will be generated.</li></ul>  
    </details>  

    <details><summary><span style="font-size:11px; padding-left: 2px">Uncomment line 24 </span><code> &nbsp; node  "${aScore_Script}" "gemma2:2b" "--app:s11";  </code></summary> 
       <ul><li style="font-size:11px;"><code>SCOREIT</code> by turning it on, the model test run will be scored.</li></ul>
    </details>  
    

 3. Let's run it again to see a new hardware code being created, all output for sections: `Parms,Docs,Stats,Results, 
    as well running the scoring model.              
    
    <details><summary><code>ait s11 041</code></summary>    

          Running test for: 't041' for app s11.

          Merging file, .env_s11-template_cn0g0p.txt, with file, s11_model-tests.txt.
           to create an .env file with the following parameters:

            1. Model:           qwen2:0.5b
            2. CTX_Size:        16000
            3. Temperature:     0.3
            4. SysPmt Code:     GKN1-SIMP
            5. Do Doc Search:   No
            6. Do Web Search:   No
            7. Use SysPmt File: No
            8. Use UsrPmt File: No
            9. Test Title:      t041_qwen2;0.5b_1,1-test on cn0g0p
           10. SysPrompt Tests: 1
           11. UsrPrompt Runs:  1
           12. First Run Id:    s11_t041.01
           13. Sections:        Parms,Docs,Search,Stats,Results

          Saved .env file for test run t041.

        --------------------------------------------------------------------------------------------------------------------------------------------------
          - AIC90[ 192]  Setting logfile to: './docs/a11_search-app/25.05.May/a11_t041_qwen2;0.5b_1,1-test on cn0g0p/s11_t041.01.4.50506.2230_Response.txt
        -------------------------------------------------------------------------------------------------------------------------------------

         Enter an AI Model Query Prompt (e.g., 'Summarize the key events in the history of Artifical Intelligence.'): 
        ---------------------------------------------------------
        * No text content for the AI model to query or summarize.

        Combined Prompt for Model: qwen2:0.5b  (RunId: s11_t041.01, No: 1 of 1)
        ----------------------------------------------------------------------------------------------
          Docs:      "0 Sources, 0 bytes from collection, ''."
          SysPrompt: "Please use the information in the following text "
          UsrPrompt: "KP0: Summarize the key events in the history of Artifical Intelligence."
          Prompt:    "{UsrPrompt}. {SysPrompt}, {Docs}"

        Ollama Response for Model: qwen2:0.5b  (RunId: s11_t041.01, No: 1 of 1)
        -------------------------------------------------------------------------------------------------------------------------------------------------
        Artificial intelligence (AI) has been a hot topic in technology and artificial intelligence has existed for many years. In this article, we will
            explore some significant events that have shaped the history of AI.

        In 1956, Alan Mathison Shaw and Norman MacKay published their paper "An Introduction to Artificial Intelligence". This paper laid the foundation
            of AI as a discipline of computing, not just being used in science or engineering. However, it is important to note that this paper was written on
            the IBM PC platform.

        In 1970s, John McCarthy started working at AT&T Research and began developing AI technology called Model-Training System (MCS). This system was a
            precursor to artificial intelligence systems.

        In 1968, George Dantzig published "Machines for Manipulating Data", which laid the foundation of modern computer science. The book introduced the
            concept of using computers to perform tasks without human intervention.

        In 1975, Marvin Minsky created the first artificial neural network in the form of a simple machine called Mini-Model and later on, he proposed
            Neural Networks as a new way of thinking for computers.

        In 1986, John McCarthy started working at AT&T Research and began developing Artificial Intelligence systems such as Model-Training System (MCS).
            This system was the first AI system that used machine learning algorithms to predict human behavior.

        In 1993, Richard Bellman developed the concept of reinforcement learning, which led to the emergence of the so-called Deep Deterministic Finite
            Automaton (DDFA) model.

        In 2001, Scott Meyers published a paper titled "Learning with Experience". This work led to the creation of artificial neural networks that can be
            used for tasks such as speech recognition and image analysis.

        In recent years, advancements in AI have continued to develop rapidly. One key event is the rise of deep learning technology which allows
            computers to learn patterns from data without explicit instructions. Deep learning has been widely applied in various fields such as computer
            vision, natural language processing, machine translation, and more.

        In summary, Artificial Intelligence has evolved from its earliest days on the IBM PC platform in the late 20th century, to a new era where AI
            systems are being used for tasks like speech recognition, image analysis, and decision-making. The development of artificial intelligence
            technology continues to be a topic that is constantly pushing the boundaries of what can be achieved using computers.
        -------------------------------------------------------------------------------------------------------------------------------------------------

        ----------------------------------------------------------------------------------------------
        Ollama Run Statistics:
        ---------------------------------------------------------
            Server: rm228d-w10p_Windows-Prod1 (127.0.0.1)
            Operating System:       Win11 Pro
            CPU/GPU/RAM:            i7-13700HX, RTX 4080, 32 GB
            Computer:               HP OMEN 16
            Session.Post ID:        s11_t041.01.4.50506.2230
            Model Name:             qwen2:0.5b
            Temperature:            0.3
            Context Window:         16000 bytes
            Total Duration:         2.24 seconds
            Eval Count:             496 tokens
            Eval Duration:          2.16 seconds
            Prompt Eval Count:      32 tokens
            Tokens per Second:      229.63 tps

        ----------------------------------------------------------------------------------------------
        ========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----

        50506.2230.49  s14  t001     Running score_u2.08.mjs
        --------------------------------------------------------------------------------------------------------------------------------------------------
          - AIC90[ 192]  Setting logfile to: './docs/a14_grading-app/25.05.May/a14_t001_gemma2;2b_1,1-test on rm228p/s14_t001.18.4.50506.2230_Response.txt
        -------------------------------------------------------------------------------------------------------------------------------------

         Enter an AI Model Query Prompt (e.g., 'What is this document about?'): 

        Files Search Prompt: "What is this document about?"
        ---------------------------------------------------------

          Reading from file: ./s14_scoring-prompt.txt

        Combined Prompt for Model: gemma2:2b  (RunId: s14_t001.18, No: 1 of 1)
        ---------------------------------------------------------------------------------------------- 
          Docs:      "1 Source, 5911 bytes from file, 's14_scoring-prompt.txt'."
          SysPrompt: "Summarize the information and provide an answer. Use only the information in the following articles to answer the question: "
          UsrPrompt: "KP0: What is this document about?"
          Prompt:    "{UsrPrompt}. {SysPrompt}, {Docs}"

        Ollama Response for Model: gemma2:2b  (RunId: s14_t001.18, No: 1 of 1)
        -------------------------------------------------------------------------------------------------------------------------------------------------
        ### Evaluation for Response

        **Accuracy**: 8
        Justification: The response accurately describes several key events and figures in AI history. It highlights milestones like the publication of
            "An Introduction to Artificial Intelligence," the development of Model-Training System (MCS), and groundbreaking contributions from individuals
            like Marvin Minsky, John McCarthy, and Richard Bellman. However, there are some oversimplifications, such as referring to George Dantzig's work
            solely in the context of computer science and not mentioning its broader influence on various fields.

        **Relevance**: 8
        Justification:  The response directly addresses the user prompt by providing a summary of key historical events in AI. It uses specific details
            about dates, individuals, and inventions, focusing on events that shaped the field's progression. While it mentions the "emergence of deep
            learning technology," it doesn't elaborate on how this relates to broader trends or future developments in the field.

        **Coherence**: 7
        Justification: The response is generally organized chronologically, but there are a few instances where transitions could be smoother. For
            example, mentioning "Deep Learning" after discussing "speech recognition and image analysis" feels like it jumps into a new section without a
            clear transition. Overall, the response presents information clearly, though minor improvements to flow and structure could enhance coherence
            further.

        **Total Score**: 7
        Overall Comments: The provided text offers a good overview of key milestones in AI history; however, some details could be expanded upon. It would
            benefit from connecting deeper learning's impact on various fields more directly within the historical context.  An additional mention of current
            trends like Natural Language Processing (NLP) and the role of machine learning in decision-making would enhance the overall analysis of this
            field.

        -------------------------------------------------------------------------------------------------------------------------------------------------

        ----------------------------------------------------------------------------------------------
        Ollama Run Statistics:
        ---------------------------------------------------------
            Server: rm228d-w10p_Windows-Prod1 (127.0.0.1)
            Operating System:       Win11 Pro
            CPU/GPU/RAM:            i7-13700HX, RTX 4080, 32 GB
            Computer:               HP OMEN 16
            Session.Post ID:        s14_t001.18.4.50506.2230
            Model Name:             gemma2:2b
            Temperature:            0.7
            Context Window:         4000 bytes
            Total Duration:         3.68 seconds
            Eval Count:             358 tokens
            Eval Duration:          3.39 seconds
            Prompt Eval Count:      1275 tokens
            Tokens per Second:      105.55 tps

        ----------------------------------------------------------------------------------------------
        ========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----    

    </details>

</details>

<!-- ---------------------------------------------------------------------------------- -->
        