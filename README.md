
## formR and AIDocs 

<details><summary style="font-size:16px; color:blue;">
 Introduction
</summary>

The grand idea is to create instructions for building an AI App from soup to nuts. It's a hands on approach using inexpensive, lasting technologies. 
1. formR Flow and FRDocs    
   We begin, before the age of AI, with simple guides and tools, such as FRTools and gitR, to do the following listed below.  Documentation and a git repository of sample code and scripts are provided here.    
   1. [Build a Development Workstation](https://8020data.github.io/FRDocs_prod-master/#/Setup/fr0101_Setup-Developer-Workstation) 
   2. [Build a Web Server in the Cloud](https://8020data.github.io/FRDocs_prod-master/#/Setup/fr0301_Setup-Vultr-Ubuntu)
   3. [Write an Web Application](https://8020data.github.io/FRDocs_prod-master/#/FRApps/fr020100_My-HTML-Custom)
      - HTML and CSS only
      - JavaScript Only
      - MySQL and Rest APIs
      - JavaScript Component Framework
2. AI.Docs.4u    
   With the age of AI upon us, we continue building applications with the help of AI.  Here are our three main development projects.        
   1. AI.viewR.4u - Build a simple chat app using local AI models to query local data, all on an inexpensive Mac Mini with an M4 AI Processor 
   2. AI.testR.4u - Test which models performs best
   3. AI.codeR.4u - Use AI to build, deploy and enhance Agentic workflows

</details>

## AIDocs AI.testR.4u Installation Guide

<details><summary style="font-size:16px; color:blue">
  A. Install or Update FRTools 
</summary>

Only do this once from a terminal window in a new Repos folder.  It puts a few commands, e.g. `frtools`, `frt`, `rdir`, `gitr`, etc. into the system path so, 
you'll need to re-open the terminal window.

 1. Goto FRTools GitHub Repository. Scroll down to the README and copy the Option 2 line of code    

    <details><summary><a href="https://github.com/robinmattern/FRTools_prod2-master">https://github.com/robinmattern/FRTools_prod2-master)</a></summary></details>

 2. Open a terminal window, cd into the Repos folder, paste the code and press enter:

    <details><summary><code>cd /Users/Shared/Repos</code></summary></details>
    <details><summary><code>curl -s https://raw.githubusercontent.com/robinmattern/FRTools_prod2-master/master/._2/ZIPs/set-repos | bash   </code></summary>
         
        Getting script: set-repos-dir.sh.
  
        The current version of "7zip" is 7-Zip v24.09.
        curl -s "https://raw.githubusercontent.com/robinmattern/FRTools_prod2-master/master/.  _2/ZIPs/set-repos-dir.zip"  -o set-repos-dir.zip
  
        Unzipping, set-repos-dir.zip, with 7zip --
            Extracting archive: set-repos-dir.zip
            Folders: 4
            Files: 10
  
        Password:
  
        The FormR install scripts have been downloaded into your Repos folder.
  
        You can now run any of these install commands from your Repos folder:
  
            bash install frtools       # first, then login again, or run:
            source ~/.zshrc             # then run, frt, to check it.
  
            bash install anyllm        # then run, anyllm, to check it.
            bash install aidocs demo1  # then run, aidocs, to check it.
            bash install aidocs test1  # then run, aidocs, to check it.
  
        * Note: You must install FRTools before any other projects.  After that,
        you can clone or create your own projects folder with:
  
            bash frt clone {RepoName} '' {CloneDir} {Branch} {Account}
            
    </details>

 3. Run the command to install FRTools              
    <details><summary><code>bash install frtools</code></summary>
   
        Cloning into 'FRTools'...
        remote: Enumerating objects: 2045, done.
        remote: Counting objects: 100% (278/278), done.
        remote: Compressing objects: 100% (168/168), done.
        remote: Total 2045 (delta 197), reused 188 (delta 110), pack-reused 1767 (from 1)
        Receiving objects: 100% (2045/2045), 799.50 KiB | 8.60 MiB/s, done.
        Resolving deltas: 100% (1349/1349), done.
        Password:

          Won't create BinDir. It already exists: "/Users/Shared/._0/bin"
          Created script in: /Users/Shared/._0/bin/jpt      for "/Users/robin/Repos3/FRTools/._2/JPTs/JPT30_Main0.sh"
          Created script in: /Users/Shared/._0/bin/rss      for "/Users/robin/Repos3/FRTools/._2/JPTs/RSS/RSS01_Main1.sh"
          Created script in: /Users/Shared/._0/bin/rss2     for "/Users/robin/Repos3/FRTools/._2/JPTs/RSS/RSS02_Main1.sh"
          Created script in: /Users/Shared/._0/bin/rdir     for "/Users/robin/Repos3/FRTools/._2/JPTs/RSS/fileList/RSS21_FileList.sh"
          Created script in: /Users/Shared/._0/bin/dirlist  for "/Users/robin/Repos3/FRTools/._2/JPTs/RSS/dirList/RSS22_DirList.sh"
          Created script in: /Users/Shared/._0/bin/info     for "/Users/robin/Repos3/FRTools/._2/JPTs/RSS/infoR/RSS23_Info.sh"
          Created script in: /Users/Shared/._0/bin/frt      for "/Users/robin/Repos3/FRTools/._2/FRTs/FRT40_Main0.sh"
          Created script in: /Users/Shared/._0/bin/keys     for "/Users/robin/Repos3/FRTools/._2/FRTs/keyS/FRT41_keyS1.sh"
          Created script in: /Users/Shared/._0/bin/gitr     for "/Users/robin/Repos3/FRTools/._2/FRTs/gitR/FRT42_gitR2.sh"
          Created script in: /Users/Shared/._0/bin/gitr1    for "/Users/robin/Repos3/FRTools/._2/FRTs/gitR/FRT42_gitR1.sh"
          Created script in: /Users/Shared/._0/bin/gitr2    for "/Users/robin/Repos3/FRTools/._2/FRTs/gitR/FRT42_gitR2.sh"
          Created script in: /Users/Shared/._0/bin/netr     for "/Users/robin/Repos3/FRTools/._2/FRTs/netR/FRT44_netR1.sh"
          Created script in: /Users/Shared/._0/bin/dokr     for "/Users/robin/Repos3/FRTools/._2/FRTs/dokR/FRT45_dokR1.sh"
          Created script in: /Users/Shared/._0/bin/docr     for "/Users/robin/Repos3/FRTools/._2/FRTs/FRT46_docR0.sh"

          THE_SERVER is: xx000-os23_Robins-Mac-mini (10.0.0.37)

        * The path, '/Users/Shared/._0/bin', is already in the User's ~/.zshrc file.

        * You may need to run, source /Users/robin/.zshrc, or login again.

          FRTools are installed.

          Run, bash install, again to see other repos to install  
          
    </details>

 4. Re-open the terminal window to login again, and then test the `frtools help` or `frt` commmand.  
 
    <details><summary><code>frtools help</code></summary>

          Useful FRTools  (u1.09)               (Apr 8, 2025 9:20a)
          ------------------------------------  ---------------------------------
             FRT [Help]

             FRT Path Set [-doit] [-user]        Enable formR Tools to run anywhere
             FRT Path Set [-doit] [-user]        Enable formR Tools to run anywhere

             FRT keyS [ Help ]                   Manage SSH Key files
                 keyS List SSH Hosts Keys

             FRT gitR [ help ]                   Manage Git Local and Remote Repos
                 gitR Init
                 gitR Clone
                 gitR Pull

             FRT netR [ help ]                   Manage Git Local and Remote Repos
                 netR List
                 netR Clone

             FRT porTs show                      Manage Ports
                 show ports
                 porT kill {Port}
                 kill port {Port}

                 JPT {Cmd}
                 JPT RSS {Cmd}
                     RSS Dir (RDir)
                     RSS DirList (DirList)

            FRT New Repo                         Create a new local repo folder
            FRT Clone                            Clone a remote Github repo
            FRT Install                          Run ./set-frtools.sh
                Install [ALTools] [-doit]        Install ALTools
                        [ALTools] [-doit] [-u]   Update ALTools
                        [AIDocs] [-doit]         Install AIDocs
            FRT Copy    {FromBra} {File} {ToBra} Copy file from to a branch

            FRT Update [-doit]                   Update [ {FRTools} ]

          Notes: Only 3 lowercase letters are needed for each command, separated by spaces
                 One or more command options follow. Help for the command is dispayed if no options are given
                 The options, debug, doit and quietly, can follow anywhere after the command

    </details>

 5. Update the latest version of FRTools. This can be done at anytime. 
 
    <details><summary><code>frt version</code></summary>

           formR Tools: u1.09   (Apr 8, 2025 9:20a)

    </details>
    
    <details><summary><code>frt update -d</code></summary>
    
          RepoDir is: /Users/Shared/Repos/FRTools, branch: master

          About to update repo, 'origin', for branch, 'master', from remote, 'robinmattern/FRTools_prod2-master'.
        remote: Enumerating objects: 9, done.
        remote: Counting objects: 100% (9/9), done.
        remote: Compressing objects: 100% (2/2), done.
        remote: Total 5 (delta 3), reused 5 (delta 3), pack-reused 0 (from 0)
        Unpacking objects: 100% (5/5), 544 bytes | 49.00 KiB/s, done.
        From https://github.com/robinmattern/FRTools_prod2-master
           30764d1..3dbbb9a  master     -> origin/master
          HEAD is now at 3dbbb9a .(50512.01_Add frtools script
        Password:

          Updated repo, 'origin', for branch, 'master', from remote, 'robinmattern/FRTools_prod2-master'.    

    </details>
    
</details>

<!-- ---------------------------------------------------------------------------------- -->

<details><summary style="font-size:16px; color:blue">
  B. Install or Update AIDocs testR 
</summary>

Install the AI.testR.4u app from a terminal window in a Repos folder.  

 1. Install the testR version of AIDocs.              
    <details><summary><code>bash install aidocs test1</code></summary>

          git clone "https://github.com/robinmattern/AIDocs_test1-robin.git" AIDocs_test1
        - This could take a while. You may have to enter your password to set .sh permissions.

          Please change into the project folder: cd AIDocs_test1
          You can now work on it in VSCode with: code AIDocs_test1*

          cd AIDocs_test1/._2
        npm warn deprecated @aws-sdk/protocol-http@3.374.0: This package has moved to @smithy/protocol-http
        npm warn deprecated @aws-sdk/signature-v4@3.374.0: This package has moved to @smithy/signature-v4
        npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
          cd AIDocs_test1/client1
          cd AIDocs_test1/server1
          npm install
        npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

            added 165 packages, and audited 166 packages in 4s

            67 packages are looking for funding
              run `npm fund` for details

            1 low severity vulnerability

            To address all issues (including breaking changes), run:
              npm audit fix --force

            Run `npm audit` for details.

            Copying .env file from ./AIDocs_test1/client1/c16_aidocs-review-app/utils/FRTs/_env_local-local.txt  to  .env
            Copying .env file from ./AIDocs_test1/server1/s11_search-app/.env_example  to  .env
            Copying .env file from ./AIDocs_test1/server1/s12_search-web-app/.env_example  to  .env
            Copying .env file from ./AIDocs_test1/server1/s13_search-rag-app/.env_example  to  .env
            Copying .env file from ./AIDocs_test1/server1/s14_grading-app/.env_example  to  .env

          Copied:  /Users/Shared/._0/bin/ait
          Copied:  /Users/Shared/._0/bin/aitestr
          Copied:  /Users/Shared/._0/bin/ai.testr.4u
        Password:
          Copied:  /Users/Shared/._0/bin/aidocs
          Version: v0.01.50510.1730

          Run the AI model testr in any of the server1 apps folder, for example

             cd AIDocs_test1/server1/s11_*
             ai.testr.4u help
             aitestr s11 t041
             ait chroma start
             ait import s13
             ait s13 t041

          Run, bash install, again to see other repos to install
    </details>

 2. Update the latest version of the AIDocs testR app.    
 
    <details><summary><code>cd AIDocs_test1</code></summary></details>
    <details><summary><code>aitestr version</code></summary>

          AIDocs - AI.testR.4u  Ver: u2.08.136

    </details>
    
    <details><summary><code>frt gitr update -d    </code></summary>

          RepoDir is: /Users/Shared/Repos/, branch: master

          About to update repo, 'origin', for branch, 'master', from remote, 'robinmattern/AIDocs_test1-robin'.

        * The branch, 'master', has 11 uncommitted files, that will be stashed.
            1.             ?   2025-05-06 10:47  data/AI.testR.4u/settings/hardware-settings_h2q6nv.txt
            2.             ?   2025-05-06 10:06  data/AI.testR.4u/settings/hardware-settings_mymac.txt
            3.             ?   2025-05-06 09:49  data/AI.testR.4u/settings/hardware-settings_rm231p.txt
            4.             ?   2025-05-06 10:47  docs/a11_search-app/a11-saved-stats/a11_Stats-h2q6nv_u2.08.csv
            5.             ?   2025-05-06 10:15  docs/a11_search-app/a11-saved-stats/a11_Stats-mymac_u2.08.csv
            6.             ?   2025-05-06 09:49  docs/a11_search-app/a11-saved-stats/a11_Stats-rm231p_u2.08.csv
            7.             ?   2025-05-06 10:25  docs/a14_grading-app/a14-saved-stats/a14_Stats-mymac_u2.08.csv
            8.             ?   2025-05-06 10:47  server1/s11_search-app/.env_s11-template_h2q6nv.txt
            9.             ?   2025-05-06 10:06  server1/s11_search-app/.env_s11-template_mymac.txt
           10.             ?   2025-05-06 09:49  server1/s11_search-app/.env_s11-template_rm231p.txt
           11.             M   2025-05-06 11:36  server1/s13_search-rag-app/s13_model-tests.txt
          No local changes to save
          HEAD is now at ea344ed .(50505.13_More fixes
        Password:

          Updated repo, 'origin', for branch, 'master', from remote, 'robinmattern/AIDocs_test1-robin'.

    </details>
    
</details>


<details><summary style="font-size:16px; color:blue">
C. Get Help
</summary>

 1. Run the `AI.testR.4u Help` command from any location.

    <details><summary><code>AI.testR.4u Help</code></summary>

          Usage: AI.testR.4u ...
            {App} {Test}       to run a test
            {App} gen {Group}  to generate an .env template for a test model group
            {App} list         to list all tests to run
            import {App}       to import a collection of docs
            chroma start       to start the Chroma Vector DB
            sql {table}        to query a table in the Chroma Vector DB

          Where:
            {App}              is an App Id for one type of test app, e.g. s11.
            {Test}             is one Test id, e.g. t011
            {Group}            is a Group Id for one set of model tests, e.g. t010

          For example:
            AI.testR.4u s11 help
            AI.testR.4u s11 t041
            AI.testR.4u s13g t041
            AI.testR.4u import s13a
            AI.testR.4u sql collections
            AI.testR.4u example s13

    </details>

 2. Run the `aitestr help` command from the `AIDocs_test1` directory.

    <details><summary><code>cd AIDocs_test1</code></summary></details>
    <details><summary><code>aitestr help</code></summary>

          Usage: AItestR ...
            {App} {Test}       to run a test
            {App} gen {Group}  to generate an .env template for a test model group
            {App} list         to list all tests to run
            import {App}       to import a collection of docs
            chroma start       to start the Chroma Vector DB
            sql {table}        to query a table in the Chroma Vector DB

          Where:
            {App}              is an App Id for one type of test app, e.g. s11.
            {Test}             is one Test id, e.g. t011
            {Group}            is a Group Id for one set of model tests, e.g. t010

          For example:
            AItestR s11 help
            AItestR s11 t041
            AItestR s13g t041
            AItestR import s13a
            AItestR sql collections
            AItestR example s13

    </details>

 3. Get help for a specific application

    <details><summary><code>AIT s13 help</code></summary>

          Run any of the following tests for app: s13:
            ait  s13  t041  # A single test for one sysprompt (created from .env_s13-template_{HWCD}.txt and s13_model-tests.txt).
            ait  s13  t040  # A group test for one model (copied from .env_s13_t040_qwen2;0.5b_4,6-tests.txt)

          No group test are defined. Define them for three models with:
            ait  gen  s13  all

          For the s13_search-rag-app, you can give a collection name, s13a, s13b, etc
            s13_apple-ipad
            s13a_apple-pages
            s13b_apple-pdfs
            s13c_rag-architecture-doc
            s13d_greenbook-pdf
            s13e_greenbook-txt
            s13f_constitution-docs
            s13g_eo-docs
            s13h_sourcedocs

          For example:
            ait  s13b  t041
            ait  s13b  current

          For these to work you will need to import them into to ChromaDB Vector DB first:
            ait  import s13b
            ait  import s13x_other-docs

          You can also query the ChromaDB Vector DB. See ait sql help:

    </details>

 4. Get with the Chroma Vector database

    <details><summary><code>ait sql help</code></summary>

          Usage: aitestr chroma {Command} [{IDs}] [{Format}]

            Command     IDs    Format     Description
            ----------- -----  ---------  -------------------------------------------------
            start                         Start chromaDB if it is not running
            stop                          Stop chromaDB if it is running
            check                         Check if chromaDB is running

            counts                        List record counts for all tables
            tables                        Show schema for all tables

            collections                   List collections.name for all apps, e.g. s13c

            documents                     List all documents
            documents  {id}               List documents for one embedding_id
            documents  {id1,id2,id2}      List documents for multiple embedding_ids
            documents  {id1..id2}         List documents between two embedding_ids
            documents  {a##}              List documents for one app, aka collection_name
            documents  <ids> [json|line]  Show documents for <ids> in json or line format

            chunks                        List all embeddings
            chunks     <ids>              List embeddings for <ids>

            metadata                      List three metadata columns for all embeddings
            metadata   <ids>              List three metadata columns for <ids> embeddings
            metadata   <ids> [json|line]  Show chroma:document metadata, aka embedded_text

            embeddings                    List all embeddings with only document_paths
            embeddings {id}               Show embedding data for one embedding_id
            queue                         List metatdata in json format for ??

    </details>

</details>

<!-- ---------------------------------------------------------------------------------- -->

<details><summary style="font-size:16px; color:blue">
D. Run three sample models
</summary>

 1. Run a model in `s11_search-app` from it's `server1` directory.  
 
    <details><summary><code>cd AIDocs_test1/server1/s11_*</code></summary></details>
    <details><summary><code>ait s11 t011</code></summary>


        50512.0958.03  s11           Running test: t011

        -----------------------------------------------------------

        * Creating app .env template file for PC_Code: ....
          Creating hardware file for ....
          Saving hardware info for h2q6nv into the template file: '.env_s11-template_h2q6nv.txt'

          Merging file, .env_s11-template_h2q6nv.txt, with file, s11_model-tests.txt.
           to create an .env file with the following parameters:

            1. Model:           llama3.2:3b
            2. CTX_Size:        4000
            3. Temperature:     0.3
            4. SysPmt Code:     GKN1-SIMP
            5. Do Doc Search:   No
            6. Do Web Search:   No
            7. Use SysPmt File: Yes
            8. Use UsrPmt File: Yes
            9. Test Title:      t011_llama3.2;3b_1,1-test on h2q6nv
           10. SysPrompt Tests: 1
           11. UsrPrompt Runs:  1
           12. First Run Id:    s11_t011.01
           13. Sections:        Parms,Docs,Search,Stats,Results

          Saved .env file for test run t011.

        50512.0958.04  s11  t011     Running ./run-tests.mjs t011

        50512.0958.04  s11  t011.01  Starting llama3.2:3b          GKN1-SIMP  KN1    4000  0.3
        50512.0958.24                Finished llama3.2:3b       in 19.35 secs, 22.87 tps

        -----------------------------------------------------------

        50512.0958.24  s14  t001     Running score_u2.09.mjs for s11_t011.01
        50512.0958.24  s14  t001.12  Starting qwen2:0.5b           GKN0-SIMP  KP0    4000  0.7
        50512.0958.29                Finished qwen2:0.5b        in 5.17 secs, 55.74 tps
        50512.0958.29  s11  t011.01  Finished with these scores of 10, 9, 8
        
    </details>   

 2. Run a model in s12_search-web-app from the AIDocs_test1 directory.  
 
    <details><summary><code>cd ../s12_*</code></summary></details>
    <details><summary><code>ait s12 t011</code></summary>

        50513.0938.35  s12           Running test: t011

        -----------------------------------------------------------

          Merging file, .env_s12-template_rm231d.txt, with file, s12_model-tests.txt.
           to create an .env file with the following parameters:

            1. Model:           llama3.2:3b
            2. CTX_Size:        4000
            3. Temperature:     0.3
            4. SysPmt Code:     GKN1-SIMP
            5. Do Doc Search:   No
            6. Do Web Search:   Yes
            7. Use SysPmt File: No
            8. Use UsrPmt File: No
            9. Test Title:      t011_llama3.2;3b_1,1-test on rm231d
           10. SysPrompt Tests: 1
           11. UsrPrompt Runs:  1
           12. First Run Id:    s12_t011.01
           13. Sections:        Parms,Docs,Search,Stats,Results

          Saved .env file for test run t011.

        50513.0938.35  s12  t011     Running ./run-tests.mjs t011

        50513.0938.35  s12  t011.01  Starting llama3.2:3b          GKN0-SIMP  KP0    4000  0.3
        50513.0938.53                Finished llama3.2:3b       in 16.20 secs, 21.01 tps

        -----------------------------------------------------------

        50513.0938.53  s14  t001     Running score_u2.09.mjs for s12_t011.01
        50513.0938.53  s14  t001.27  Starting gemma2:2b            GKN0-SIMP  KP0    4000  0.7
        50513.0939.10                Finished gemma2:2b         in 16.66 secs, 23.32 tps
        50513.0939.10  s12  t011.01  Finished with these scores of 8, 6, 7

    </details>   

 3. Run a model in s12_search-web-app from the AIDocs_test1 directory.  
 
    <details><summary><code>cd ../s12_*</code></summary></details>
    <details><summary><code>ait s13 t011</code></summary>

        50513.1013.06  s13           Running test: t011

        -----------------------------------------------------------

          Merging file, .env_s13-template_rm231d.txt, with file, s13_model-tests.txt.
           to create an .env file with the following parameters:

            1. Model:           llama3.2:3b
            2. CTX_Size:        4000
            3. Temperature:     0.3
            4. SysPmt Code:     GKN1-SIMP
            5. Do Doc Search:   Yes
            6. Do Web Search:   No
            7. Use SysPmt File: Yes
            8. Use UsrPmt File: Yes
            9. Test Title:      t011_llama3.2;3b_1,1-test on rm231d
           10. SysPrompt Tests: 1
           11. UsrPrompt Runs:  1
           12. First Run Id:    s13_t011.01
           13. Sections:        Parms,Docs,Search,Stats,Results
           14. Collection:      s13_apple-ipad

          Saved .env file for test run t011.

        50513.1013.07  s13  t011     Running ./run-tests.mjs t011

        50513.1013.08  s13  t011.01  Starting llama3.2:3b          GKN1-SIMP  KN1    4000  0.3
        50513.1013.13                Finished llama3.2:3b       in 4.54 secs, 99.50 tps

        -----------------------------------------------------------

        50513.1013.13  s14  t001     Running score_u2.09.mjs for s13_t011.01
        50513.1013.13  s14  t001.16  Starting gemma2:2b            GKN0-SIMP  KP0    4000  0.7
        50513.1013.16                Finished gemma2:2b         in 2.50 secs, 110.42 tps
        50513.1013.16  s13  t011.01  Finished with these scores of 8, 7, 9

    </details>   

</details>

<details><summary style="font-size:16px; color:blue">
E. Change some runtime parameters
</summary>

 1. Let's open VSCode and look at the `run-tests.sh` script in the s11_search-app folder.

    <details><summary><code>code AIDocs_test1-robin.code-workspace</code></summary></details>  

    <details><summary<code>Open the file: <code>run-tests.sh</code></summary>

        #!/bin/bash

             if [ "${1:0:3}" == "ver" ]; then "../../._2/MWTs/AIC00_getVersion.sh"; exit; fi    # .(50420.01.4)
             aApp2="s11"; if [[ "$1" =~ [acs][0-9]{2} ]]; then aApp2=$1; shift; fi              # .(50429.05.13)
                          if [[ "$2" =~ [acs][0-9]{2} ]]; then aApp2=$2; aArgs=("$@"); unset "aArgs[1]"; set -- "${aArgs[@]}"; fi       # .(50429.05.14 )

        #    if [ "${aApp2}" == "example" ]; then bash run-tests2.sh; exit; fi                  # .(50505.04.6 Add example)

             export RUN_TESTS="../../._2/MWTs/AIC15_runTests_u1.02.sh"
        #    export SCORE_SCRIPT="../components/score_u2.08.mjs"                                ##.(50507.02.6)
        #    export SEARCH_SCRIPT="../components/search_u2.09.mjs"                              ##.(50507.02.7)
             export SCORE_SCRIPT="../s14_grading-app/run-tests.mjs"                             # .(50507.02.6)
             export SEARCH_SCRIPT="./run-tests.mjs"                                             # .(50507.02.7)

             export APP=${aApp2}                                                                # .(50429.05.15)  

        #    export LOGGER=
        #    export LOGGER="log"   
        #    export LOGGER="inputs"
             export LOGGER="log,inputs"

             export DOIT="1"
             export DEBUG="0"                           #  Runs node with --inspect-brk 
             export DRYRUN="0"                          # .(50506.03.1 RAM Add DRYRUN)                                           
             export SCORING="1"                         # .(50507.02.8 RAM New way to score it)                                           

             export PC_CODE=""

        #    echo "" >run-tests.txt                     ##.(50507.08d.3 RAM Not here).(50507.08a.3 RAM Start MT)
             bash  "${RUN_TESTS}" "$@";                 if [ $? -ne 0 ]; then exit 1; fi
             node  "${SCORE_SCRIPT}" "gemma2:2b" "${aApp2}" "$@";         

    </details>   

    We're changing 3 variables in the run script.  

    <details><summary><span style="font-size:11px; padding-left:13px">Comment line 16   </span><code> # export LOGGER="log,inputs"</code></summary>
       <ul><li style="font-size:11px;"><code>LOGGER</code>: by turning off this override, we'll see all the sections set for this test in the `model-script.txt` files.</li></ul>   
    </details>  

    <details><summary><span style="font-size:11px; padding-left:23px">Change line 21    </span><code> &nbsp; export PC_CODE=""</code></summary> 
       <ul><li style="font-size:11px;"><code>PC_CODE</code>: by making it empty, a new Hardware code will be generated.</li></ul>  
    </details>  

    <details><summary><span style="font-size:11px; padding-left: 2px">Change line 25    </span><code> &nbsp; export SCORING="0";</code></summary> 
       <ul><li style="font-size:11px;"><code>SCOREIT</code> by turning it on, the model test run will be scored.</li></ul>
    </details>  
    

 3. Let's run it again to see a new hardware code being created, all output for sections: `Parms,Docs,Stats,Results, 
    as well running the scoring model.              
    
    <details><summary><code>ait s11 011</code></summary>    

          Running test for: 't011' for app s11.

        * Creating app .env template file for PC_Code: ....
          Creating hardware file for ....
          Saving hardware info for cn0g0p into the template file: '.env_s11-template_cn0g0p.txt'

          Merging file, .env_s11-template_cn0g0p.txt, with file, s11_model-tests.txt.
           to create an .env file with the following parameters:

            1. Model:           llama3.2:3b
            2. CTX_Size:        4000
            3. Temperature:     0.3
            4. SysPmt Code:     GKN1-SIMP
            5. Do Doc Search:   No
            6. Do Web Search:   No
            7. Use SysPmt File: Yes
            8. Use UsrPmt File: Yes
            9. Test Title:      t011_llama3.2;3b_1,1-test on cn0g0p
           10. SysPrompt Tests: 1
           11. UsrPrompt Runs:  1
           12. First Run Id:    s11_t011.01
           13. Sections:        Parms,Docs,Search,Stats,Results

          Saved .env file for test run t011.

        --------------------------------------------------------------------------------------------------------------------------------------------------
          - AIC90[ 192]  Setting logfile to: './docs/a11_search-app/25.05.May/a11_t011_llama3.2;3b_1,1-test on cn0g0p/s11_t011.01.4.50513.1017_Response.txt
        -------------------------------------------------------------------------------------------------------------------------------------
        ---------------------------------------------------------
        * No text content for the AI model to query or summarize.

        Combined Prompt for Model: llama3.2:3b  (RunId: s11_t011.01, No: 1 of 1)
        ----------------------------------------------------------------------------------------------
          Docs:      "0 Sources, 0 bytes from collection, ''."
          SysPrompt: "You are a helpful and informative AI assistant. Answer questions accurately and concisely, drawing on a wide range of general knowledge. If you don't know the answer, say so. "
          UsrPrompt: "KN1: Explain the key differences between transformer and RNN architectures in deep learning."
          Prompt:    "{UsrPrompt}. {SysPrompt}, {Docs}"

        Ollama Response for Model: llama3.2:3b  (RunId: s11_t011.01, No: 1 of 1)
        -------------------------------------------------------------------------------------------------------------------------------------------------
        I'd be happy to explain the key differences between Transformer and RNN (Recurrent Neural Network) architectures in deep learning.

        **What are RNNs?**
        RNNs are a type of neural network designed to handle sequential data, such as text, speech, or time series data. They process input data one step
            at a time, using the previous steps' information to make predictions about the current step.

        **What are Transformers?**
        Transformers, on the other hand, are a more recent architecture introduced in 2017 by Vaswani et al. They also handle sequential data but do so
            differently than RNNs.

        **Key differences:**

        1. **Sequential Processing**: Both RNNs and Transformers process input data sequentially, but they approach this processing in different ways.
        2. **Self-Attention Mechanism**: Transformers use a self-attention mechanism to weigh the importance of each input element relative to every other
            element. This allows them to attend to multiple parts of the input simultaneously, which is particularly useful for tasks like machine translation
            and text summarization. RNNs, by contrast, process input sequentially and rely on recurrent connections to capture relationships between
            consecutive elements.
        3. **Lack of Recurrence**: Transformers do not have recurrence or feedback loops like RNNs, which means they don't need to store information from
            previous steps in memory. Instead, they use the self-attention mechanism to capture long-range dependencies directly.
        4. **Parallelization**: Due to their lack of recurrence and self-attention mechanism, Transformers can be more easily parallelized than RNNs,
            making them more computationally efficient for large-scale tasks.
        5. **Input Size Limitation**: Traditional RNN architectures often have an input size limitation due to the vanishing gradient problem, which
            occurs when gradients are backpropagated through time. This limitation is largely alleviated by Transformers, which can handle inputs of arbitrary
            length without significant performance degradation.

        **When to use each?**

        * Use RNNs for tasks that require sequential processing and have a large amount of context, such as:
        + Language modeling
        + Sentiment analysis
        + Speech recognition
        * Use Transformers for tasks that benefit from parallelization and self-attention mechanisms, such as:
        + Machine translation
        + Text summarization
        + Image captioning

        Keep in mind that these are general guidelines, and the choice between RNNs and Transformers ultimately depends on the specific task requirements
            and performance characteristics.

        Do you have any further questions about this topic?
        -------------------------------------------------------------------------------------------------------------------------------------------------

        ----------------------------------------------------------------------------------------------
        Ollama Run Statistics:
        ---------------------------------------------------------
            Server: rm228d-w10p_Windows-Prod1 (127.0.0.1)
            Operating System:       Win11 Pro
            CPU/GPU/RAM:            i7-13700HX, RTX 4080, 32 GB
            Computer:               HP OMEN 16
            Session.Post ID:        s11_t011.01.4.50513.1017
            Model Name:             llama3.2:3b
            Temperature:            0.3
            Context Window:         4000 bytes
            Total Duration:         4.70 seconds
            Eval Count:             506 tokens
            Eval Duration:          4.60 seconds
            Prompt Eval Count:      78 tokens
            Tokens per Second:      109.90 tps

        ----------------------------------------------------------------------------------------------
        ========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----

        50513.1017.07  s14  t001     Running score_u2.09.mjs for s11_t011.01
        --------------------------------------------------------------------------------------------------------------------------------------------------
          - AIC90[ 192]  Setting logfile to: './docs/a14_grading-app/25.05.May/a14_t001_gemma2;2b_1,1-test on rm228p/s14_t001.18.4.50513.1017_Response.txt
        -------------------------------------------------------------------------------------------------------------------------------------

        Files Search Prompt: "What is this document about?"
        ---------------------------------------------------------

          Reading from file: ./s14_scoring-prompt.txt

        Combined Prompt for Model: gemma2:2b  (RunId: s14_t001.18, No: 1 of 1)
        ---------------------------------------------------------------------------------------------- 
          Docs:      "1 Source, 6152 bytes from file, 's14_scoring-prompt.txt'."
          SysPrompt: "Summarize the information and provide an answer. Use only the information in the following articles to answer the question: "
          UsrPrompt: "KP0: What is this document about?"
          Prompt:    "{UsrPrompt}. {SysPrompt}, {Docs}"

        Ollama Response for Model: gemma2:2b  (RunId: s14_t001.18, No: 1 of 1)
        -------------------------------------------------------------------------------------------------------------------------------------------------
        ### Evaluation for Response

        **Accuracy**: 9
        Justification: The response provides accurate and detailed information about the key differences between RNNs and Transformers, including their
            processing mechanisms, self-attention mechanism, and limitations.  It utilizes relevant terminology and avoids any unsupported claims or
            fabrications. The provided examples of when to use each are appropriate and help illustrate the general applications of these architectures.

        **Relevance**: 10
        Justification: The response directly addresses the prompt's question regarding the key differences between RNNs and Transformers, providing a
            concise and comprehensive explanation. It highlights both the core concepts and practical aspects in a clear and organized manner, aligning
            perfectly with the user's intent to understand these architectures.

        **Coherence**: 8
        Justification: The response is well-structured and logically flows from defining RNNs and transformers to outlining their differences through a
            series of numbered key points, while providing examples for each architecture's use cases. There are minor transition points between the
            explanations that could be improved.

        **Total Score**: 27/30
        Overall Comments: The response effectively and accurately addresses the user prompt, providing a clear and detailed explanation of RNNs vs.
            Transformers. It is highly relevant to the request and exhibits good coherence in its presentation.


        -------------------------------------------------------------------------------------------------------------------------------------------------

        ----------------------------------------------------------------------------------------------
        Ollama Run Statistics:
        ---------------------------------------------------------
            Server: rm228d-w10p_Windows-Prod1 (127.0.0.1)
            Operating System:       Win11 Pro
            CPU/GPU/RAM:            i7-13700HX, RTX 4080, 32 GB
            Computer:               HP OMEN 16
            Session.Post ID:        s14_t001.18.4.50513.1017
            Model Name:             gemma2:2b
            Temperature:            0.7
            Context Window:         4000 bytes
            Total Duration:         2.52 seconds
            Eval Count:             260 tokens
            Eval Duration:          2.31 seconds
            Prompt Eval Count:      1307 tokens
            Tokens per Second:      112.38 tps

        ----------------------------------------------------------------------------------------------
        ========== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== ------ ===== -----

        50513.1017.10  s11  t011.01  Finished with these scores of 9, 8, 10

    </details>

 1. Let's change the `PC_CODE` to something more readable.

    <details><summary<code>Open the file: <code>run-tests.sh</code> again.</summary></details>
    
    <details><summary><span style="font-size:11px; padding-left:23px">Change line 21    </span><code> &nbsp; export PC_CODE="bt101a"</code></summary> 
       <ul><li style="font-size:11px;"><code>PC_CODE</code>: by giving it a value, a new readable hardware code will be generated.</li></ul>  
    </details>  
    
 2. Let's look at the `model-tests` files and change the sections to be displayed.

    <details><summary<code>Open the file: <code>server1/s11_search-app/s11_model-tests.txt</code></summary>
    
                                                           Runs,    DOCs,   USPF,  # Use s13_system-prompt.txt file
           TestId,   Model,              CTX_SIZE, SysPmtCd, Temp,   Tests,   URLs,   UUPF,  Sections
        -----------, --------------------, ------, ---------, ---, ---,---,  --,--,  --,--,  ---------------------------------
        a11_t010.01, llama3.2:3b,            4000, GKN1-SIMP, 0.7,   2,  4,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t011.01, llama3.2:3b,            4000, GKN1-SIMP, 0.3,   1,  1,   0, 0,   1, 1,  "Parms,Search,Results"
        a11_t012.01, llama3.2:3b,            4000, GKN2-SIMP, 0.6,   1,  4,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t013.01, llama3.2:3b,            4000, GKN3-SIMP, 0.9,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t014.01, llama3.2:3b,            4000, GKN4-DETA, 0.3,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t015.01, llama3.2:3b,            4000, GKN5-DETA, 0.6,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t016.01, llama3.2:3b,            4000, GKN6-DETA, 0.9,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t017.01, llama3.2:3b,            4000, GKN7-REAS, 0.3,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t018.01, llama3.2:3b,            4000, GKN8-REAS, 0.6,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Results"
        a11_t019.01, llama3.2:3b,            4000, GKN9-REAS, 0.9,   0,  0,   0, 0,   1, 1,  "Parms,Docs,Search,Stats,Result3"

        a11_t020.01, phi3,                   4000, GKN1-SIMP, 0.7,   9,  1,   0, 0,   1, 0,  "RunId,Stats"
        a11_t021.01, phi3,                   4000, GKN1-SIMP, 0.3,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t022.01, phi3,                   4000, GKN2-SIMP, 0.6,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t023.01, phi3,                   4000, GKN3-SIMP, 0.9,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t024.01, phi3,                   4000, GKN4-DETA, 0.3,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t025.01, phi3,                   4000, GKN5-DETA, 0.6,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t026.01, phi3,                   4000, GKN6-DETA, 0.9,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t027.01, phi3,                   4000, GKN7-REAS, 0.3,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t028.01, phi3,                   4000, GKN8-REAS, 0.6,   1,  1,   0, 0,   0, 1,  "RunId,Stats"
        a11_t029.01, phi3,                   4000, GKN9-REAS, 0.9,   1,  1,   0, 0,   0, 1,  "RunId,Stat3"

        a11_t030.01, granite3.1-dense:2b,    4000, GKN1-SIMP, 0.7,   9, 25,   0, 0,   0, 1,  "Parms,Stats,Results"
        a11_t031.01, granite3.1-dense:2b,    4000, GKN1-SIMP, 0.3,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t032.01, granite3.1-dense:2b,    4000, GKN2-SIMP, 0.6,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t033.01, granite3.1-dense:2b,    4000, GKN3-SIMP, 0.9,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t034.01, granite3.1-dense:2b,    4000, GKN4-DETA, 0.3,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t035.01, granite3.1-dense:2b,    4000, GKN5-DETA, 0.6,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t036.01, granite3.1-dense:2b,    4000, GKN6-DETA, 0.9,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t037.01, granite3.1-dense:2b,    4000, GKN7-REAS, 0.3,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t038.01, granite3.1-dense:2b,    4000, GKN8-REAS, 0.6,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Results"
        a11_t039.01, granite3.1-dense:2b,    4000, GKN9-REAS, 0.9,   1, 25,   0, 0,   1, 1,  "Parms,Stats,Result3"

        a11_t040.01, qwen2:0.5b,             6000, GKN1-SIMP, 0.7,   4,  6,   0, 0,   1, 1,  "RunId"
        a11_t041.01, qwen2:0.5b,            16000, GKN1-SIMP, 0.3,   1,  1,   0, 0,   0, 0,  "Parms,Docs,Search,Stats,Results"
        a11_t042.01, qwen2:0.5b,            32000, GKN2-SIMP, 0.6,   1,  2,   0, 0,   1, 0,  "RunId"
        a11_t043.01, qwen2:0.5b,            32768, GKN3-SIMP, 0.9,   3,  1,   0, 0,   1, 1,  "RunId"
        a11_t044.01, qwen2:0.5b,             4000, GKN4-DETA, 0.3,   2,  2,   0, 0,   1, 1,  "RunId"
        a11_t045.01, qwen2:0.5b,             4000, GKN5-DETA, 0.6,   1,  5,   0, 0,   0, 1,  "RunId"
        a11_t046.01, qwen2:0.5b,             4000, GKN6-DETA, 0.9,   2,  3,   0, 0,   1, 1,  "RunId"
        a11_t047.01, qwen2:0.5b,             4000, GKN7-REAS, 0.3,   7,  1,   0, 0,   1, 0,  "RunId"
        a11_t048.01, qwen2:0.5b,             4000, GKN8-REAS, 0.6,   1,  8,   0, 0,   0, 1,  "RunId"
        a11_t049.01, qwen2:0.5b,             4000, GKN9-REAS, 0.9,   0,  0,   0, 0,   0, 0,  "RunId"
    
    </details>  
    
    <details><summary><span style="font-size:11px; padding-left:23px">Change Sections for `a11_t011.011` to </span><code> Parms,Search,Results"</code></summary> 
       <ul><li style="font-size:11px;"><code>PC_CODE</code>: by making it empty, a new Hardware code will be generated.</li></ul>  
    </details>  

    <details><summary<code>Open the file: <code>server1/s14_grading-app/s14_model-tests.txt</code></summary>

                                                                   Runs,    DOCs,   USPF,  # Use s13_system-prompt.txt file
           TestId,   Model,              CTX_SIZE, SysPmtCd, Temp,   Tests,   URLs,   UUPF,  Sections
        -----------, --------------------, ------, ---------, ---, ---,---,  --,--,  --,--,  ---------------------------------
        a14_t001.01, qwen2:0.5b,            16000, GKN1-SIMP, 0.3,   1,  1,   0, 0,   1, 0,  "Parms,Search,Results"
        a14_t002.01, qwen2:0.5b,            32000, GKN2-SIMP, 0.6,   1,  2,   0, 0,   1, 0,  "RunId"
        a14_t003.01, qwen2:0.5b,            32768, GKN3-SIMP, 0.9,   3,  1,   0, 0,   1, 1,  "RunId"
        a14_t004.01, qwen2:0.5b,             4000, GKN4-DETA, 0.3,   2,  2,   0, 0,   1, 1,  "RunId"
        a14_t005.01, qwen2:0.5b,             4000, GKN5-DETA, 0.6,   1,  5,   0, 0,   0, 1,  "RunId"
        a14_t006.01, qwen2:0.5b,             4000, GKN6-DETA, 0.9,   2,  3,   0, 0,   1, 1,  "RunId"
        a14_t007.01, qwen2:0.5b,             4000, GKN7-REAS, 0.3,   7,  1,   0, 0,   1, 0,  "RunId"
        a14_t008.01, qwen2:0.5b,             4000, GKN8-REAS, 0.6,   1,  8,   0, 0,   0, 1,  "RunId"
        a14_t009.01, qwen2:0.5b,             4000, GKN9-REAS, 0.9,   0,  0,   0, 0,   0, 0,  "RunId"
    
    </details>  
    
    <details><summary><span style="font-size:11px; padding-left:23px">Change Sections for `a11_t011.011` to </span><code> Parms,Search,Results"</code></summary> 
       <ul><li style="font-size:11px;"><code>PC_CODE</code>: by making it empty, a new Hardware code will be generated.</li></ul>  
    </details>  


 3. Let's run it again to see a new readable hardware code being created, and output for sections: `Parms,Stats,Results, 


</details>



<!-- ---------------------------------------------------------------------------------- -->
        
        
        