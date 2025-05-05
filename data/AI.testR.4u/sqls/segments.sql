  SELECT min(created_at) as created_at_begin, '...' || substr(collections.id,20,17) as collection_id, name, segment_id, count() segments, max(created_at) 
    FROM collections, embeddings, segments 
   WHERE collections.id = segments.collection 
     AND segments.id    = embeddings.segment_id 
GROUP BY collections.id, name, segment_id  
ORDER BY min(created_at)