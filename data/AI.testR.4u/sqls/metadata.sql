SELECT name, embeddings.id, key, string_value, int_value, float_value, bool_value 
  FROM collections, segments, embeddings, embedding_metadata  
 WHERE collections.id = segments.collection 
   AND segments.id    = embeddings.segment_id 
   AND embeddings.id  = embedding_metadata.id
   AND embeddings.id in (1390) 
-- AND key = 'chroma:document';