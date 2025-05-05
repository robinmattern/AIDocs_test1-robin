#!/bin/bash

#   Python="C:\Users\Robin\AppData\Local\Microsoft\WindowsApps\python3.12.exe"
    Python_Packages="/C/Users/Robin/AppData/Local/Packages/PythonSoftwareFoundation.Python.3.12_qbz5n2kfra8p0/LocalCache/local-packages/Python312/Scripts"
# ${Python_Packages}/chroma.exe run --host localhost --port 8000 --path ./my_chroma_data

  ${Python_Packages}/chroma.exe "$@"  
 
