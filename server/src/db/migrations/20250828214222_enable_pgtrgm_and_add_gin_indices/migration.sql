-- Enable pg_trgm extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create trigram index on Story.title
CREATE INDEX stories_title_trgm_idx 
ON "Story" USING GIN (title gin_trgm_ops);

-- Create trigram index on User.name
CREATE INDEX users_name_trgm_idx 
ON "User" USING GIN (name gin_trgm_ops);

SET pg_trgm.similarity_threshold = 0.15;
