#!/bin/bash

   HOST="localhost"
   PORT="8808"
   DB_PATH="my_chroma_data"
 
#                       aArgs="$@"
# if [ "$1" == "" ]; then aArgs="run --host \"$HOST\" --port \"$PORT\" --path \"$DB_PATH\" --log-path \"$LOG_PATH\""; fi 
# if [ "$1" == "" ]; then aArgs="run --host \"$HOST\" --port \"$PORT\" --path \"$DB_PATH\" --log-path \".\""; fi 
# if [ "$1" == "" ]; then aArgs="run --host $HOST --port $PORT --path $DB_PATH --log-path ."; fi 

if [ "${OS:0:3}" == "Win" ]; then 
#   Python="C:\Users\Robin\AppData\Local\Microsoft\WindowsApps\python3.12.exe"
    Python_Packages="/C/Users/Robin/AppData/Local/Packages/PythonSoftwareFoundation.Python.3.12_qbz5n2kfra8p0/LocalCache/local-packages/Python312/Scripts"
#   Python_Packages="/Users/robin/Library/Python/3.9/lib/python/site-packages"

#   echo "Running ChromaDB... with: chroma.exe -m chromadb.cli.cli $@"

# ${Python_Packages}/chroma.exe run --host localhost --port 8000 --path ./my_chroma_data
  ${Python_Packages}/chroma.exe "$@"
# ${Python_Packages}/chroma.exe "${aArgs}"

# ${Python_Packages}/chroma "$@"

  else

#  /Users/robin/Library/Python/3.9/lib/python/site-packages/chromadb
#  /Library/python/3.9/site-packages/chromadb

#   Python_Exec="/c/Users/Robin/AppData/Local/Microsoft/WindowsApps/python"
#   Python_Exec="/usr/bin/python3"
    Python_Exec="$( which python3 )"            # .(50516.06.1 RAM Fix ${ which python3 })

#   echo "Starting ChromaDB server..."
# "${Python_Exec}" -m chromadb.cli.cli run --host "$HOST" --port "$PORT" --path "$DB_PATH" --log-path "$LOG_PATH"

#   echo "Running ChromaDB... with: python3 -m chromadb.cli.cli $@"

  "${Python_Exec}" -m chromadb.cli.cli "$@"
# "${Python_Exec}" -m chromadb.cli.cli "${aArgs}"
 
   fi

