  SELECT min(created_at) as created_at_begin, '...' || substr(collections.id,20,17) as collection_id, name, dimension, count() segments, max(created_at) 
    FROM collections, embeddings, segments 
   WHERE collections.id = segments.collection 
     AND segments.id    = embeddings.segment_id 
GROUP BY collections.id, name, dimension 
ORDER BY min(created_at)