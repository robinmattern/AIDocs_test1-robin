  SELECT min(embeddings.id) as id
       , min(created_at) as created_at_begin
	   , '...' || substr(collections.id,20,17) as collection_id
	   , name
	   , segment_id
	   , rtrim(embedding_id, '0123456789') as document_path
	   , count() as chunks
	   , max(created_at) 
	   , max(embedding_id) as embedding_id
    FROM collections, embeddings, segments 
   WHERE collections.id = segments.collection 
     AND segments.id    = embeddings.segment_id 
GROUP BY collections.id, name, RTRIM(embedding_id, '0123456789'), segment_id  
ORDER BY min(created_at)

SELECT
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
     AND name like 's13d%'
GROUP BY collections.id, name, RTRIM(embedding_id, '0123456789'), segment_id
ORDER BY min(embeddings.id)

 