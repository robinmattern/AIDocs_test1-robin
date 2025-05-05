
SELECT
         embeddings.id as id
       , created_at
       , collections.id as collection_id
       , name
       , segment_id
       , embedding_id as document_path
    FROM collections, embeddings, segments
   WHERE collections.id = segments.collection
     AND segments.id    = embeddings.segment_id
     AND name like 's13\_%' ESCAPE '\'
ORDER BY created_at