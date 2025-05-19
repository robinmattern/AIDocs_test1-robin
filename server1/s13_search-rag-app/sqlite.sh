#!/bin/bash

   aChroma_SQLite3_DB="/Users/Shared/repos/videoprojects/2024-04-08-build-rag-with-typescript/my_chroma_data/chroma.sqlite3"
   aChroma_SQLite3_DB="./my_chroma_data/chroma.sqlite3"

#  aSQL="SELECT ROW_NUMBER() OVER (ORDER BY name) AS num,name,tbl_name,rootpage FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite%';"
#  aSQL="SELECT name FROM sqlite_master WHERE type='table'"

if [ "$1" == "" ] || [ "$1" == "help" ] || [ "$1" == "Help" ]; then
    echo ""
    echo "  Usage: aitestr chroma {Command} [{IDs}] [{Format}]"
    echo ""
    echo "    Command     IDs    Format     Description"
    echo "    ----------- -----  ---------  -------------------------------------------------"
    echo "    start                         Start chromaDB if it is not running"
    echo "    stop                          Stop chromaDB if it is running"
    echo "    check                         Check if chromaDB is running"
    echo ""
    echo "    counts                        List record counts for all tables"
    echo "    tables                        Show schema for all tables"
    echo ""
    echo "    collections                   List collections.name for all apps, e.g. s13c"
    echo ""
    echo "    documents                     List all documents"
    echo "    documents  {id}               List documents for one embedding_id"
    echo "    documents  {id1,id2,id2}      List documents for multiple embedding_ids"
    echo "    documents  {id1..id2}         List documents between two embedding_ids"
    echo "    documents  {a##}              List documents for one app, aka collection_name"
    echo "    documents  <ids> [json|line]  Show documents for <ids> in json or line format"
    echo ""
    echo "    chunks                        List all embeddings"
    echo "    chunks     <ids>              List embeddings for <ids>"
    echo ""
    echo "    metadata                      List three metadata columns for all embeddings"
    echo "    metadata   <ids>              List three metadata columns for <ids> embeddings"
    echo "    metadata   <ids> [json|line]  Show chroma:document metadata, aka embedded_text"
    echo ""
    echo "    embeddings                    List all embeddings with only document_paths"
    echo "    embeddings {id}               Show embedding data for one embedding_id"
    echo "    queue                         List metatdata in json format for ??"
    if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
    exit 1
    fi
# ----------------------------------------------------------------
#        startChromaDB  ./my_chroma_data

         nPort=8808                                                                                         # .(50511.02.4)

function checkChromaDB() {
     bOK="$( curl -s http://localhost:${nPort}/api/v2/heartbeat | awk '/"nanosecond heartbeat"/ { print 1 }' )"
     echo "${bOK}"
           }
# ----------------------------------------------------------------

function stopChromaDB() {                                                               # .(50505.09.1 RAM Write stopChromaDB Beg)
#        aPID="$( ps aux | grep -i chroma | awk '{ print $1 }' )"
#        aPID="$( ps aux | grep 'chromadb.cli.cli run' | awk '{ print $2 }' )"
#                 ps aux | awk '/chroma/ { if ( $11 != "awk" ) { print    } }'
     if [ "${OS:0:3}" == "Win" ]; then
         aPID="$(  ps aux | awk '/chroma/ { print $1; exit }' )"
         aPID2="$( ps aux | awk '/chroma/ { print $2; exit }' )"
       else
         aPID="$( ps aux | awk '/chroma/ { if ( $11 != "awk" ) { print $2 }; exit }' )"
         aPID2=aPID
         fi

     if [ "${aPID}" == "" ]; then echo "  ChromaDB is not running.";
       else kill -9 "${aPID}";    echo "  ChromaDB stopped (PID ${aPID2}).";
      if [ "${OS:0:3}" != "Win" ]; then echo ""; fi;
         exit 1; fi
         }                                                                              # .(50505.09.1 End)
# ----------------------------------------------------------------

function startChromaDB() {
    aChroma_SQLite3_DB="$1"
    aChroma_SQLite3_DB="${aChroma_SQLite3_DB:-$aChroma_SQLite3_DB}"
    aChroma_SQLite3_DB="${aChroma_SQLite3_DB:-./my_chroma_data/chroma.sqlite3}"
    echo "  ChromaDB: ${aChroma_SQLite3_DB}"
    # Configuration
    CHROMA_PORT=${nPort}
    CHROMA_HOST="localhost"
    CHROMA_PATH="./my_chroma_data"
    CHROMA_SCRIPT="./chroma.sh"  # Path to your chroma.sh script

#   pwd; ls -l ${CHROMA_SCRIPT}; exit
#   $CHROMA_SCRIPT ; exit
#   curl http://localhost:${nPort}/api/v2/heartbeat

# Check if ChromaDB is running
#f nc -z $CHROMA_HOST $CHROMA_PORT 2>/dev/null; then # return 0; fi
if [ "$( checkChromaDB )" == "1" ]; then # return 0; fi

    aPID2="?"; if [ -f "chroma.pid" ]; then aPID2=$( cat "chroma.pid" ); fi             # .(50519.01.1 RAM Check if chroma.pid exists)
    echo "  ChromaDB is already running on $CHROMA_HOST:$CHROMA_PORT (PID: ${aPID2})"                       # .(50511.02.5)
       if [ "${OS:0:3}" != "Win" ]; then echo ""; fi                                    # .(50516.05.1 RAM Add blank line)
    exit 1
  else
    echo "  ChromaDB is not running. Starting it now..."

    # Start ChromaDB in the background
    echo "$CHROMA_SCRIPT run --host $CHROMA_HOST --port $CHROMA_PORT --path $CHROMA_PATH "                  # .(50511.02.6)
#   $CHROMA_SCRIPT ; exit
    $CHROMA_SCRIPT run --host $CHROMA_HOST --port $CHROMA_PORT --path $CHROMA_PATH > chroma.log 2>&1 &      # .(50511.02.7)
    export CHROMA_PID=$!  # Store the PID
    echo "  ChromaDB started with Bash PID: $CHROMA_PID"
    echo $CHROMA_PID > chroma.pid  # Optional: Save PID to a file for later reference

         sleep 5 # Wait a moment for it to start

#   if nc -z $CHROMA_HOST $CHROMA_PORT 2>/dev/null; then  # Verify it's running
#   if [ "$( checkChromaDB )" == "1" ]; then # return 0; fi
#           aPID="$( ps aux | grep -i chroma | awk '{ print $1 }' )"
#   if [ "${aPID}" != "" ]; then
    if [ "$( checkChromaDB )" == "1" ]; then # return 0; fi
       echo "  ChromaDB successfully started"
       cat chroma.log
       if [ "${OS:0:3}" != "Win" ]; then echo ""; fi                                    # .(50516.05.2 RAM Add blank line)
    else
       echo "* Failed to start ChromaDB. Check chroma.log for details"
       cat chroma.log
       if [ "${OS:0:3}" != "Win" ]; then echo ""; fi                                    # .(50516.05.3 RAM Add blank line)
       exit 1
    fi
fi
#  echo "  ChromaDB is ready for use"
    }
# ----------------------------------------------------------------

function  cvtApp() {
    aApp="s${1:1}"
    if [ "${aApp/_}" != "${aApp}" ]; then aApp="${aApp/_/\\_}%' ESCAPE '\\"; else aApp="${aApp}%"; fi
    echo "${aApp}"
    }

function  shoTable_Schema() {
    aTable="$1"
    aSQL_Schema="SELECT * FROM pragma_table_info('${aTable}');"
    echo -e "\n  Table: ${aTable}"
    echo   "  --- -------------------- ------------ -- --"
#   sqlite3  "${aChroma_SQLite3_DB}" "${aSQL}"        | awk '{ print "    " $0 }'
    sqlite3  "${aChroma_SQLite3_DB}" "${aSQL_Schema}" | awk -F"|" '{ printf "  %2d. %-20s %-12s %2d %2d\n", $1, $2, $3, $4, $5 }'
    }
# ----------------------------------------------------------------

function  shoTable_Count() {
    aTable="$1"
    aSQL_Count="SELECT count(*) FROM '${aTable}';"
    sqlite3  "${aChroma_SQLite3_DB}" "${aSQL_Count}" | awk '{ printf "  %-35s %5d\n", "'"${aTable}"'", $1 }'
    }
# ----------------------------------------------------------------

function  shoTable_collection() {                                                       # .(50514.03.3 RAM Write shoTable_Collection for one collection Beg)
    aTable="collections"
    aSQL="SELECT name from collections where name like '$1%'"
#   echo "  SQL: ${aSQL}"
    sqlite3 "${aChroma_SQLite3_DB}" "${aSQL}" | awk '{ print "  " $0 }'
    }                                                                                   # .(50514.03.3 End)
# ----------------------------------------------------------------

function  shoTable_collections() {
    aTable="collections"
#   aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="WHERE seq_id in (${aIds})"; aType="-line"; fi
#   aSQL_Table="SELECT id, name, dimension, database_id, substr(config_json_str, 1, 50) || '...' FROM ${aTable} ${aIds};"
# 1 aSQL_Table="SELECT id, name, dimension, count(*), min(created_at) FROM ${aTable}, embeddings where segment_id = id;"
# 2 aSQL_Table="SELECT                                  collections.id,        name, dimension, count(), min(created_at), max(created_at) from collections, embeddings, segments where collections.id = segments.collection and segments.id = embeddings.segment_id group by collections.id, name, dimension"
    aSQL_Table="SELECT min(created_at), '...' || substr(collections.id,20,17), name, dimension, count(),                  max(created_at) from collections, embeddings, segments where collections.id = segments.collection and segments.id = embeddings.segment_id group by collections.id, name, dimension order by min(created_at)"
    echo -e "\n  Table: ${aTable}"
# 1 echo      "  id                                    name                       dimension  database_id                           config_json_str         "
# 1 echo      "  ------------------------------------  -------------------------  ---------  ------------------------------------  -----------------------------------------------------"
# 2 echo      "  collection_id                         name                       dimension  segments  created_at_begin     created_at_end"
# 2 echo      "  ------------------------------------  -------------------------  ---------  --------  -------------------  -------------------"
    echo      "         created_at_begin     collection_id         collection_name            dimension  chunks  created_at_end"
    echo      "         -------------------  --------------------  -------------------------  ---------  ------  -------------------"
#   sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "SELECT * FROM ${aTable} ${aIds};"
# 2 sqlite3 -separator $'\t'  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %36s  %-25s  %9d  %8d  %-19s  %-19s\n", $1, $2, $3, $4, $5, $6 }'
    sqlite3 -separator $'\t'  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %6s %19s  %20s  %-25s  %9d  %6d  %-19s\n", "", $1, $2, $3, $4, $5, $6 }'
    }
# Table: collections
# --- -------------------- ------------ -- --
#  0. id                   TEXT          0  0
#  1. name                 TEXT          1  0
#  2. dimension            INTEGER       0  0
#  3. database_id          TEXT          1  0
#  4. config_json_str      TEXT          0  0
# ----------------------------------------------------------------

function  shoTable_collection_metadata() {
    aTable="collection_metadata"
    aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="WHERE seq_id in (${aIds})"; aType="-line"; fi
    aSQL_Table="SELECT id, name, dimension, database_id, substr(config_json_str, 1, 50) || '...' FROM ${aTable} ${aIds};"
    echo -e "\n  Table: ${aTable}"
    echo      "  id                                    name                       dimension  database_id                           config_json_str         "
    echo      "  ------------------------------------  -------------------------  ---------  ------------------------------------  -----------------------------------------------------"
    sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "SELECT * FROM ${aTable} ${aIds};"
#   sqlite3 -separator $'\t'  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %36s  %-25s  %-9s  %-36s  %-100s\n", $1, $2, $3, $4, $5 }'
    }
# Table: collections_metadata
# --- -------------------- ------------ -- --
#  0. id                   TEXT          0  0
#  1. name                 TEXT          1  0
#  2. dimension            INTEGER       0  0
#  3. database_id          TEXT          1  0
#  4. config_json_str      TEXT          0  0
# ----------------------------------------------------------------

function  shoTable_documents() {
#   echo "  \$1: '$1', \$2: '$2'"
#   aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="AND embeddings.id in (${aIds})"; aType="-line"; fi
#   aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="AND name like '${aIds}%'"; aType="-line"; fi
    aWhere=""; aType="-separator \$'\\t'";
    if [  "$1" != ""          ]; then
    if [[ "$1" =~ ^[0-9,.]+$ ]]; then aWhere="AND embeddings.id in ($1)";
    if [[ "$1" =~ ^[0-9.]+$  ]]; then aWhere="AND embeddings.id between $( echo $1 | awk '{ sub( /\.+/, " and " ); print }' )"; fi
                                 else aWhere="AND name like '$( cvtApp $1 )'"; fi; fi
    if [ "$2" != "" ]; then aType="-$2"; fi
    aTable="collections, segments, embeddings"
#   aSQL="SELECT min(id), min(seq_id), segment_id, RTRIM(embedding_id, '0123456789'), min(created_at), max(created_at) FROM '${aTable}' group by segment_id, RTRIM(embedding_id, '0123456789') order by min(id);"
    aSQL="SELECT
         min(embeddings.id) as first_id
       , min(created_at) as created_at_begin
       , collections.id as collection_id
       , name
       , segment_id
       , RTRIM(embedding_id, '0123456789') as document_path
       , count() chunks
       , max(embeddings.id) as last_id
       , max(created_at) as created_at_end
       , max(embedding_id) as embedding_id
    FROM collections, embeddings, segments
   WHERE collections.id = segments.collection
     AND segments.id    = embeddings.segment_id
     ${aWhere}
GROUP BY collections.id, name, RTRIM(embedding_id, '0123456789'), segment_id
ORDER BY min(embeddings.id)
"
aAWK='
function sqQQ(a)   { sub( /^"/, "", a); sub( /"$/, "", a ); return a }
function strip(a)  { gsub( /[\\\/]/, "/", a ); sub( /.+\/data/, "./data", a ); return a }
function chop(a,n) { n = n - 4; m = (n/2) - 4; a = sqQQ( a ); return (length(a) > n) ? substr( a, 1, (n - m) ) "..." substr( a, length(a) - m ) : a }
function getNo(a)  { sub( /.+?[\/"]/, "", a ); sub( /.+\..../, "", a); return a ? a : "0" }
function midId(a)  { return "..." substr( a, 20, 17 ) }   #
       { printf "  %5s  %19s  %20s  %-25s  %-20s  %-86s %3s %5d  %5d  %-19s\n", $1, $2, midId( $3 ), $4, midId( $5 ), chop( strip( $6 ), 86 ), getNo( $10 ), $7, $8, $9 }
#      { printf "  %3d  %5d  %86s\n", getNo( $9 ), $7, chop( $6, 86 ) }
'
    echo -e "\n  Table: ${aTable}"
#   echo      "  SQL: ${aSQL}"; # exit
    echo      "   id1   created_at_begin     collection_id         collection_name            segment_id            document_path                                                                          max chunks  id2   created_at_end"
    echo      "  -----  -------------------  --------------------  -------------------------  --------------------  -------------------------------------------------------------------------------------- --- ------ -----  -------------------"
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" '{ sub( /^"/, "", $4); sub( /"$/, "", $4); printf "  %5d  %6d  %-36s  %-100s  %-19s  %-19s\n",           $1, $2, $3, (length($4) > 96) ? substr($4,1,52) "..." substr($4,length($4)-44) : $4, $5, $6, $7 }'
#   sqlite3 -separator $'\t'  "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"\t"                                        '{ printf "  %5s  %19s  %20s  %-25s  %36s  %100d  %8d  %-19s\n", $1, $2, $3, $4, $5, (length($6) > 96) ? substr($6,1,52) "..." substr($6,length($4)-44) : $6, $7, $8 }'
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|"                                         '{ printf "  %5s  %19s  %20s  %-25s  %36s  %100d  %8d  %-19s\n", $1, $2, $3, $4, $5, (length($6) > 96) ? substr($6,1,52) "..." substr($6,length($4)-44) : $6, $7, $8 }'
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" "${aAWK}"
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}"
 if [ "${aType}" == "-json" ] || [ "${aType}" == "-line" ]; then
    if [ "${aType}" == "-line" ]; then sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "${aSQL}"; fi
    if [ "${aType}" == "-json" ]; then sqlite3            -json  "${aChroma_SQLite3_DB}" "${aSQL}"; fi
  else
                                       sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" "${aAWK}"
    fi
    }
# ----------------------------------------------------------------

function  shoTable_documents1() {
    aTable="embeddings"
    aSQL="SELECT min(id), min(seq_id), segment_id, RTRIM(embedding_id, '0123456789'), min(created_at), max(created_at) FROM '${aTable}' group by segment_id, RTRIM(embedding_id, '0123456789') order by min(id);"
    echo -e "\n  Table: ${aTable}"
    echo      "     id  seq_id  segment_id                            document_path                                                                                         created_at_start     created_at_end     "
    echo      "  -----  ------  ------------------------------------  ----------------------------------------------------------------------------------------------------  -------------------  -------------------"
    sqlite3  "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" '{ sub( /^"/, "", $4); sub( /"$/, "", $4); printf "  %5d  %6d  %-36s  %-100s  %-19s  %-19s\n", $1, $2, $3, (length($4) > 96) ? substr($4,1,52) "..." substr($4,length($4)-44) : $4, $5, $6, $7 }'
    }
# ----------------------------------------------------------------

function  shoTable_chunks() {
    aTable="collections, segments, embeddings"
#   aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="AND embeddings.id in (${aIds})"; aType="-line"; fi
#   aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="AND name like '${aIds}%'"; fi
    aWhere=""; aType="-separator \$'\\t'"; # echo "-- aApp: $( cvtApp $1 )"; exit
    if [  "$1" != ""          ]; then
    if [[ "$1" =~ ^[0-9,.]+$ ]]; then aWhere="AND embeddings.id in ($1)";
    if [  "${1/.}" != "$1"    ]; then aWhere="AND embeddings.id between $( echo $1 | awk '{ sub( /\.+/, " and " ); print }' )"; fi
                                 else aWhere="AND name like '$( cvtApp $1 )'"; fi; fi
    if [ "$2" != "" ]; then aType="-$2"; fi
#   aSQL="SELECT min(id), min(seq_id), segment_id, RTRIM(embedding_id, '0123456789'), min(created_at), max(created_at) FROM '${aTable}' group by segment_id, RTRIM(embedding_id, '0123456789') order by min(id);"
    aSQL="SELECT
          embeddings.id as id
        , created_at
        , collections.id as collection_id
        , name
        , segment_id
        , embedding_id as document_path
     FROM collections, embeddings, segments
    WHERE collections.id = segments.collection
      AND segments.id    = embeddings.segment_id
      ${aWhere}
 ORDER BY created_at
"
aAWK='
function sqQQ(a)   { sub( /^"/, "", a); sub( /"$/, "", a); return a }
function strip(a)  { gsub( /[\\\/]/, "/", a ); sub( /.+\/data/, "./data", a ); return a }
function chop(a,n) { n = n - 4; m = (n/2) - 4; a = sqQQ( a ); return (length(a) > n) ? substr( a, 1, (n - m) ) "..." substr( a, length(a) - m ) : a }
function getNo(a)  { sub( /.+?[\/"]/, "", a ); sub( /.+\..../, "", a); return a ? a : "0" }
function midId(a)  { return "..." substr( a, 20, 17 ) }
       { printf "  %5s  %19s  %20s  %-25s  %-20s  %-86s %5d\n", $1, $2, midId( $3 ), $4, midId( $5 ), chop( strip( $6 ), 86 ), getNo( $6 ) }
#      { printf "  %3d  %5d  %86s\n", getNo( $9 ), $7, chop( $6, 86 ) }
'
    echo -e "\n  Table: ${aTable}"
#   echo      "  SQL: ${aSQL}"; exit
    echo      "    id   created_at_begin     collection_id         collection_name            segment_id            document_path                                                                          chunk"
    echo      "  -----  -------------------  --------------------  -------------------------  --------------------  -------------------------------------------------------------------------------------- -----"
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" '{ sub( /^"/, "", $4); sub( /"$/, "", $4); printf "  %5d  %6d  %-36s  %-100s  %-19s  %-19s\n",           $1, $2, $3, (length($4) > 96) ? substr($4,1,52) "..." substr($4,length($4)-44) : $4, $5, $6, $7 }'
#   sqlite3 -separator $'\t'  "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"\t"                                        '{ printf "  %5s  %19s  %20s  %-25s  %36s  %100d  %8d  %-19s\n", $1, $2, $3, $4, $5, (length($6) > 96) ? substr($6,1,52) "..." substr($6,length($4)-44) : $6, $7, $8 }'
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|"                                         '{ printf "  %5s  %19s  %20s  %-25s  %36s  %100d  %8d  %-19s\n", $1, $2, $3, $4, $5, (length($6) > 96) ? substr($6,1,52) "..." substr($6,length($4)-44) : $6, $7, $8 }'
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" "${aAWK}"
#   sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}"

 if [ "${aType}" == "-json" ] || [ "${aType}" == "-line" ]; then
    if [ "${aType}" == "-line" ]; then sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "${aSQL}"; fi
    if [ "${aType}" == "-json" ]; then sqlite3            -json  "${aChroma_SQLite3_DB}" "${aSQL}"; fi
  else
                                       sqlite3                   "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" "${aAWK}"
    fi
    }
# ----------------------------------------------------------------

function shoTable_embedding_metadata() {
    aTable="collections, segments, embeddings, embedding_metadata"
    aWhere=""; aType="-separator \$'\\t'";
    if [  "$1" != ""          ]; then
    if [[ "$1" =~ ^[0-9,.]+$ ]]; then aWhere="AND embeddings.id in ($1)";
    if [  "${1/.}" != "$1"    ]; then aWhere="AND embeddings.id between $( echo $1 | awk '{ sub( /\.+/, " and " ); print }' )"; fi
                                 else aWhere="AND name like '$( cvtApp $1 )%'"; fi; fi
    if [ "$2" != ""           ]; then aType="-$2"; fi

    aTables="collections, segments, embeddings, embedding_metadata
     WHERE collections.id = segments.collection
       AND segments.id    = embeddings.segment_id
       AND embeddings.id  = embedding_metadata.id"
#   aSQL1="SELECT embeddings.id as embedding_id, name as collection_name, key, replace( replace( substr( string_value, 1, 100), char(10), ' '), char(13), ' ') as string_value, int_Value, float_value, bool_value FROM ${aTables} ${aWhere};"
    aSQL1="SELECT embeddings.id as embedding_id, name as collection_name, key, replace( replace( substr( string_value, 1, 150), char(10), ' '), char(13), ' ') as string_value, int_Value, float_value, bool_value FROM ${aTables} ${aWhere};"
#   aSQL2="SELECT embeddings.id as embedding_id, name as collection_name, key, replace( replace( string_value, char(10), ' '), char(13), ' ') as string_value, int_Value, float_value, bool_value FROM ${aTables} ${aIds};"
#   aSQL2="SELECT embeddings.id as embedding_id, name as collection_name, key, string_value, int_Value, float_value, bool_value FROM ${aTables} ${aWhere};"
    aSQL2="SELECT
           embeddings.id as embedding_id
         , name as collection_name
         , key
         , replace( replace( string_value, char(10), ' '), char(13), ' ') as string_value
         , int_Value
         , float_value
         , bool_value
      FROM ${aTables}
       ${aWhere}"

    aSQL3="${aSQL2}
       AND key = 'chroma:document';"

    aWRAP='
function wrap( aStr, nWdt, nInd) {
    result = "";
    indent = substr( "                         ", 1, nInd );
#            gsub( /[\r\n]+/, "<br>", aStr )
#            gsub( / +/,       ".",   aStr )

    effective_width = nWdt  # - (result == "" ? 0 : nInd);

    while (length( aStr ) > effective_width) {
        chunk = substr( aStr, 1, effective_width); a = chunk
#       last_space = match( chunk, /.*[ \t]/ );
        last_space = match( chunk, / [^ ]*$/ );
#       print "    -- last_space : " last_space

    if (last_space) {
        line = substr( chunk, 1,  last_space  - 1 );
        aStr = substr( aStr,      last_space  + 1 );
    } else {
        line = chunk;
        aStr = substr( aStr, effective_width + 1 );
        }
        result = result (result == "" ? "" : "\n" indent) line; # print "    -- result: " result "--" line
        effective_width = nWdt # - nInd;
     } // eof loop
    if (length(aStr) > 0) {
        result = result (result == "" ? "" : "\n" indent) aStr;
        }
 return result;
    }
/string_value/ { aVal = substr( $0, 18); print "   string_value =" wrap( aVal, 130, 18); next }; { print $0 }
'

aAWK='
function sqQQ(a)   { return a } # sub( /^"/, "", a); sub( /"$/, "", a ); return a }
function strip1(a) { if (substr(a,2,1) == ":") { gsub( /[\\\/]/, "/", a ); sub( /.+\/data/, "./data", a ); } return a }
function strip(a)  {                             gsub( /[\\\/]/, "/", a ); sub( /.+\/data/, "./data", a );   return a }
function chop(a,n) { n = n - 4; m = (n/2) - 4; a = sqQQ( a ); return (length(a) > n) ? substr( a, 1, (n - m) ) "..." substr( a, length(a) - m ) : a }
function getNo(a)  { sub( /.+?[\/"]/, "", a ); sub( /.+\..../, "", a); return a ? a : "0" }
function midId(a)  { return "..." substr( a, 20, 17 ) }   #
#      { printf "  %5s  %19s  %20s  %-25s  %-20s  %-86s %3s %5d  %5d  %-19s\n", $1, $2, midId( $3 ), $4, midId( $5 ), chop( strip( $6 ), 86 ), getNo( $10 ), $7, $8, $9 }
       { printf "  %5d  %-25s  %-15s  %-100s  %9d  %11d  %10d\n", $1, $2, $3, chop( strip( $4 ), 100 ), $5, $6, $7 }
'

    echo -e "\n  Table: ${aTable} ${aType}"
#   echo      "  SQL: ${aSQL3}"; exit
    echo      "   id    collection_name            key              string_value                                                                                          int_Value  float_value  bool_value"
    echo      "  -----  -------------------------  ---------------  ----------------------------------------------------------------------------------------------------  ---------  -----------  ----------"
 if [ "${aType}" == "-json" ] || [ "${aType}" == "-line" ]; then
    if [ "${aType}" == "-line" ]; then sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "${aSQL3}" | awk "${aWRAP}"; fi
    if [ "${aType}" == "-json" ]; then sqlite3            -json  "${aChroma_SQLite3_DB}" "${aSQL2}"; fi
  else
#                                      sqlite3 -separator  $'\t' "${aChroma_SQLite3_DB}" "${aSQL1}" | awk -F"\t" '{ printf "  %5d  %-25s  %-15s  %-100s  %9d  %11d  %10d\n", $1, $2, $3, $4, $5, $6, $7 }'
                                       sqlite3 -separator  $'\t' "${aChroma_SQLite3_DB}" "${aSQL1}" | awk -F"\t" "${aAWK}"
#                                      sqlite3 -separator  $'\t' "${aChroma_SQLite3_DB}" "${aSQL1}"
    fi
    }
# ----------------------------------------------------------------

function shoTable_embedding_metadata1() {
    aTable="embedding_metadata"
    aSQL_Table="SELECT id, key, substr(string_value, 1, 48), int_Value, float_value, bool_value FROM ${aTable} WHERE id in (12,13);"
    aSQL_Mode=".mode csv .separator '|'"
    aSQL_Table="SELECT id, key, replace( replace( substr( string_value, 1, 48), char(10), ' '), char(13), ' '), int_Value, float_value, bool_value FROM ${aTable} WHERE id in (12,13);"
    aSQL="${aSQL_Mode} ${aSQL_Table}"
    aSQL="${aSQL_Table}"
    echo -e "\n  Table: ${aTable}"
    echo      "     id  key              string_value                                        int_Value  float_value  bool_value"
    echo      "  -----  ---------------  --------------------------------------------------  ---------  -----------  ----------"
#   sqlite3 -csv -separator "|" "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"|" '{ printf "  %5d  %-15s  %-50s  %9d  %11d  %10d\n", $1, $2, $3, $4, $5, $6 }'
#   sqlite3 -csv -separator $'\t' "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"\t" '{ printf "  %5d  %-15s  %-50s  %9d  %11d  %10d\n", $1, $2, $3, $4, $5, $6 }'
    sqlite3 -separator $'\t' "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"\t" '{ printf "%3d %s\n", NR, $0 }'
    }
# ----------------------------------------------------------------

function  shoTable_embedding_metadata2() {
    aTable="embedding_metadata"
    aSQL_Table="SELECT id, key, string_value, int_Value, float_value, bool_value FROM '${aTable}';"
    aSQL_Table="SELECT id, key, substr(string_value, 1, 50), int_Value, float_value, bool_value FROM ${aTable} WHERE id in (12,13);"
#   aSQL_Table="SELECT id, key, substr(string_value, 1, 48), int_Value, float_value, bool_value FROM ${aTable} WHERE id == 0;"
    echo -e "\n  Table: ${aTable}"
    echo      "     id  key              string_value                                        int_Value  float_value  bool_value"
    echo      "  -----  ---------------  --------------------------------------------------  ---------  -----------  ----------"
    sqlite3  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"|" 'function trim(a) { gsub( / /, ".", a ); return "[" a "]" }; { printf "  %5d  %-15s  %-52s  %9d  %11d  %10d\n", $1, $2, trim($3), $4, $5, $6 }'
#   sqlite3  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"|" '{ printf "  %5d  %s\n", $1, $2 }'
#   sqlite3  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"|" '{ gsub( /[\r\n]/,"<br>", $3); printf "  %5d  %-36s  %s\n", $1, $2, substr($3,1,120) }'
#   sqlite3  "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"|" '{ printf "  %5d  %s\n", $1, $2 }'

    }
# ----------------------------------------------------------------

function  shoTable_embeddings() {
    aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="WHERE id in (${aIds})"; aType="-line"; fi
    aTable="embeddings"
    aSQL="SELECT id, seq_id, embedding_id, created_at FROM ${aTable} ${aIds};"
    aCols="id, seq_id, embedding_id, created_at"
    echo -e "\n  Table: ${aTable}"
    echo      "     id  seq_id  segment_id                            document_id                                                                                           created_at         "
    echo      "  -----  ------  ------------------------------------  ----------------------------------------------------------------------------------------------------  -------------------"
 if [ "${aType}" == "-json" ] || [ "${aType}" == "-line" ]; then
#   echo "aType: ${aType}: aSQL: ${aSQL_Table}"; exit
    aSQL="SELECT ${aCols} FROM ${aTable} ${aIds};"
    if [ "${aType}" == "-line" ]; then sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "${aSQL}"; fi
    if [ "${aType}" == "-json" ]; then sqlite3            -json  "${aChroma_SQLite3_DB}" "${aSQL}"; fi
  else
    sqlite3  "${aChroma_SQLite3_DB}" "${aSQL}" | awk -F"|" '{ printf "  %5d  %6d  %-36s  %-100s  %-19s\n", $1, $2, $3, $4, $5 }'
    fi
    }
# ----------------------------------------------------------------

function  shoTable_embeddings_queue() {
    aTable="embeddings_queue"
    aIds="$1"; aType="-separator \$'\\t'"; if [ "${aIds}" != "" ]; then aIds="WHERE seq_id in (${aIds})"; aType="-line"; fi
#   if [ "$2" != "" ]; then aType="-$2"; fi
    aCols="seq_id, created_at, topic, encoding, metadata, operation, id"
#   aSQL_Table="SELECT seq_id, created_at, topic, replace( replace( substr( metadata, 1, 100), char(10), ' '), char(13), ' ') FROM ${aTable} where seq_id < 11;"
    aSQL_Table="SELECT seq_id, created_at, '...' || substr(topic,49,17), substr(encoding,1,20), replace( replace( substr( metadata, 1, 100), char(10), ' '), char(13), ' ') FROM ${aTable} ${aIds};"
    echo -e "\n  Table: ${aTable}"
#   echo      "  seq_id  created_at           topic                                                              metadata"
#   echo      "  ------  -------------------  -----------------------------------------------------------------  ---------------------  --------------------------------------------------  -------------------"
    echo      " seq_id  created_at           topic                 encoding  metadata"
    echo      " ------  -------------------  --------------------  --------  ----------------------------------------------------------------------------------------------------"
#   sqlite3 -separator $'\t' "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %5d  %6d  %-15s  %-100s  %9d  %11d  %10d\n", $1, $2, $3, $4, $5, $6 }'
#   sqlite3 -separator $'\t' "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %6d  %-65s  %-16s  %-100s\n", $1, $2, $3, $4 }'
#   sqlite3 -separator $'\t' "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %6d  %-15s  %-16s  %-8s  %-100s\n", $1, $2, $3, $4, $5 }'
 if [ "${aType}" == "-json" ] || [ "${aType}" == "-line" ]; then
#   echo "aType: ${aType}: aSQL: ${aSQL_Table}"; exit
    aSQL="SELECT ${aCols} FROM ${aTable} ${aIds};"
    if [ "${aType}" == "-line" ]; then sqlite3 -cmd ".mode line" "${aChroma_SQLite3_DB}" "${aSQL}"; fi
    if [ "${aType}" == "-json" ]; then sqlite3            -json  "${aChroma_SQLite3_DB}" "${aSQL}"; fi
 else
    sqlite3 -separator $'\t' "${aChroma_SQLite3_DB}" "${aSQL_Table}" | awk -F"\t" '{ printf "  %5d  %-19s  %-20s  %-8s  %-100s\n", $1, $2, $3, $4, $5 }'
    fi
    }
# ----------------------------------------------------------------

#  0. seq_id               INTEGER       0  0  1 to 114
#  1. created_at           TIMESTAMP     1  0  2025-04-24 13:12:38
#  2. operation            INTEGER       1  0  always 0
#  3. topic                TEXT          1  0  persistent://default/default/d6593429-4476-4a4a-ab17-a246fe46a665
#  4. id                   TEXT          1  0  always 0
#  5. vector               BLOB          0  0  boolean
#  6. encoding             TEXT          0  0
#  7. metadata             TEXT          0  0

    aCmd="$1"; if [ -z "${aCmd}" ]; then aCmd="count"; fi
#   aCmd="shotables"
#   aCmd="cntTables"

#   echo "  aCmd: '${aCmd}'"

#   aTable="collection_metadata"
#   aTable="embeddings"
#   shoTable_Schema ${aTable}
#   shoTable_Count embeddings; exit

if [ "${aCmd}" = "collection"          ]; then shoTable_collection $2;             fi  # .(50514.03.4)
if [ "${aCmd}" = "collections"         ]; then shoTable_collections $2;            fi  # .(50514.03.5)
if [ "${aCmd}" = "collection_metadata" ]; then shoTable_collection_metadata $2;    fi
if [ "${aCmd}" = "documents"           ]; then shoTable_documents   $2 $3;         fi
if [ "${aCmd}" = "chunks"              ]; then shoTable_chunks      $2 $3;         fi
if [ "${aCmd}" = "embeddings"          ]; then shoTable_embeddings  $2;            fi
if [ "${aCmd}" = "metadata"            ]; then shoTable_embedding_metadata  $2 $3; fi
if [ "${aCmd}" = "queue"               ]; then shoTable_embeddings_queue    $2;    fi

# ----------------------------------------------------------------

if [ "${aCmd}" = "start" ]; then echo ""; startChromaDB  ./my_chroma_data; exit; fi
if [ "${aCmd}" = "stop"  ]; then echo ""; stopChromaDB;  exit; fi                                # .(50505.09.1 RAM Add stop command)
if [ "${aCmd}" = "check" ]; then echo -e "\n  Checking: curl http://localhost:${nPort}/api/v2/heartbeat"
      aPID="$( cat "chroma.pid" )"
if [ "$( checkChromaDB )" == "1" ]; then echo "  Chroma is running on port ${nPort} (PID: ${aPID}).";
                                    else echo "  Chroma is not running."; fi; fi        # .(50511.09.1 RAM Add check command)
#      if [ "${OS:0:3}" != "Win" ]; then echo "ss"; fi                                  ##.(50516.05.4 RAM Add blank line)

# ----------------------------------------------------------------

if [ "${aCmd}" = "tables" ]; then
   shoTable_Schema  migrations
   shoTable_Schema  acquire_write
   shoTable_Schema  collection_metadata
   shoTable_Schema  segment_metadata
   shoTable_Schema  tenants
   shoTable_Schema  databases
   shoTable_Schema  collections
   shoTable_Schema  maintenance_log
   shoTable_Schema  segmentsbash
   shoTable_Schema  embeddings
   shoTable_Schema  embedding_metadata
   shoTable_Schema  max_seq_id
   shoTable_Schema  embedding_fulltext_search
   shoTable_Schema  embedding_fulltext_search_data
   shoTable_Schema  embedding_fulltext_search_idx
   shoTable_Schema  embedding_fulltext_search_content
   shoTable_Schema  embedding_fulltext_search_docsize
   shoTable_Schema  embedding_fulltext_search_config
   shoTable_Schema  embeddings_queue
   shoTable_Schema  embeddings_queue_config
   fi

if [ "${aCmd}" = "counts" ]; then
   echo -e "  Table                                Rows"
   echo    "  ------------------------------------ ----"
   shoTable_Count  migrations
#  shoTable_Count  acquire_write
   shoTable_Count  collection_metadata
   shoTable_Count  segment_metadata
   shoTable_Count  tenants
   shoTable_Count  databases
   shoTable_Count  collections
   shoTable_Count  maintenance_log
   shoTable_Count  segments
   shoTable_Count  embeddings
   shoTable_Count  embedding_metadata
   shoTable_Count  max_seq_id
   shoTable_Count  embedding_fulltext_search
   shoTable_Count  embedding_fulltext_search_data
   shoTable_Count  embedding_fulltext_search_idx
   shoTable_Count  embedding_fulltext_search_content
   shoTable_Count  embedding_fulltext_search_docsize
   shoTable_Count  embedding_fulltext_search_config
   shoTable_Count  embeddings_queue
   shoTable_Count  embeddings_queue_config
   fi

#   0|collection_id|TEXT|0||1
#   1|key|TEXT|1||2
#   2|str_value|TEXT|0||0
#   3|int_value|INTEGER|0||0
#   4|float_value|REAL|0||0
#   5|bool_value|INTEGER|0||0

    if [ "${OS:0:3}" != "Win" ]; then echo ""; fi
