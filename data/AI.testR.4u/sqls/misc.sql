-- select collections.id, seq_id from collections, embeddings where collections.id = seq_id;

select id, name from collections

426f866d-76bf-48d2-8970-b6e9d3625717	buildragwithtypescript
5bd10976-9528-4455-8823-ae519ee08284	s13_search-rag-app
9c9911e1-54a9-453a-8278-31eed99ff5a5	s13a_apple-pages
ee3ee836-82ab-4e67-ad8f-7a9d008897f3	s13b_apple-pdfs

select collection, id as segment_id, scope from segments

426f866d-76bf-48d2-8970-b6e9d3625717	f919c910-accb-4d49-9b8e-18b87dfeab3b	VECTOR
426f866d-76bf-48d2-8970-b6e9d3625717	846d37ab-0c36-478e-8fba-71e6435023c7	METADATA
5bd10976-9528-4455-8823-ae519ee08284	0fc129dd-7d76-4d9d-9cd9-3e29e5af5893	VECTOR
5bd10976-9528-4455-8823-ae519ee08284	e402bc21-0a78-4f82-932b-793256f15d80	METADATA
9c9911e1-54a9-453a-8278-31eed99ff5a5	df85cd7b-b5b6-4cbf-b53b-f7a6500d33a6	VECTOR
9c9911e1-54a9-453a-8278-31eed99ff5a5	2fbc71ff-d184-4f26-9152-c8dc1edf9d8d	METADATA
ee3ee836-82ab-4e67-ad8f-7a9d008897f3	e29f1ae9-b60e-4f96-8006-23346811fa2e	VECTOR
ee3ee836-82ab-4e67-ad8f-7a9d008897f3	84d6f8fa-d2a9-4daf-8912-19356cad2b96	METADATA

select segment_id, seq_id, created_at from embeddings

dae8cbde-ca12-4b65-afd4-b8491449555d	1	2025-04-23 21:53:56
dae8cbde-ca12-4b65-afd4-b8491449555d	2	2025-04-23 21:53:57
dae8cbde-ca12-4b65-afd4-b8491449555d	3	2025-04-23 21:53:57
dae8cbde-ca12-4b65-afd4-b8491449555d	4	2025-04-23 21:53:57
dae8cbde-ca12-4b65-afd4-b8491449555d	5	2025-04-23 21:53:57
dae8cbde-ca12-4b65-afd4-b8491449555d	6	2025-04-23 21:53:58

select collection, scope, count(), min(created_at) from embeddings, segments where segments.id = embeddings.segment_id
select collection, segment_id, seq_id, created_at from collections, embeddings, segments where collections.id = segments.collection and segments.id = embeddings.segment_id
select collections.id as collection_id, name, scope, count(), min(created_at) from collections, embeddings, segments where collections.id = segments.collection and segments.id = embeddings.segment_id
select collections.id as collection_id, name, scope, count(), min(created_at), max(created_at) from collections, embeddings, segments where collections.id = segments.collection and segments.id = embeddings.segment_id group by collections.id, name, scope 

426f866d-76bf-48d2-8970-b6e9d3625717	buildragwithtypescript	METADATA	10	2025-04-25 14:09:29
5bd10976-9528-4455-8823-ae519ee08284	s13_search-rag-app	METADATA	40	2025-04-25 17:06:32
9c9911e1-54a9-453a-8278-31eed99ff5a5	s13a_apple-pages	METADATA	114	2025-04-25 17:33:26
ee3ee836-82ab-4e67-ad8f-7a9d008897f3	s13b_apple-pdfs	METADATA	122	2025-04-25 17:45:09



select collection, segment_id, seq_id, created_at from embeddings, segments where segments.id = embeddings.segment_id



select * from collection_metadata

426f866d-76bf-48d2-8970-b6e9d3625717
5bd10976-9528-4455-8823-ae519ee08284
9c9911e1-54a9-453a-8278-31eed99ff5a5
ee3ee836-82ab-4e67-ad8f-7a9d008897f3
