-- ============================================
-- Migration Script: Normalize actors from movies.stars
-- ============================================
-- This script migrates comma-separated actor names from movies.stars
-- to normalized actors and movie_actors tables
-- 
-- Run this AFTER schema.sql and sample_data.sql
-- ============================================

USE happenin_db;

-- Step 1: Extract and insert unique actors from movies.stars
-- This handles comma-separated actor names
INSERT INTO actors (actor_name)
SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(m.stars, ',', numbers.n), ',', -1)) AS actor_name
FROM movies m
CROSS JOIN (
    SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
) numbers
WHERE m.stars IS NOT NULL 
  AND m.stars != ''
  AND CHAR_LENGTH(m.stars) - CHAR_LENGTH(REPLACE(m.stars, ',', '')) >= numbers.n - 1
  AND TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(m.stars, ',', numbers.n), ',', -1)) != ''
ON DUPLICATE KEY UPDATE actor_name = actor_name;

-- Step 2: Create movie_actors relationships
-- Link movies to actors based on stars column
INSERT INTO movie_actors (movie_id, actor_id, is_lead)
SELECT 
    m.movie_id,
    a.actor_id,
    CASE 
        WHEN numbers.n = 1 THEN TRUE  -- First actor is usually lead
        ELSE FALSE
    END AS is_lead
FROM movies m
CROSS JOIN (
    SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
) numbers
INNER JOIN actors a ON a.actor_name = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(m.stars, ',', numbers.n), ',', -1))
WHERE m.stars IS NOT NULL 
  AND m.stars != ''
  AND CHAR_LENGTH(m.stars) - CHAR_LENGTH(REPLACE(m.stars, ',', '')) >= numbers.n - 1
  AND TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(m.stars, ',', numbers.n), ',', -1)) != ''
ON DUPLICATE KEY UPDATE movie_actor_id = movie_actor_id;

-- Verification queries
-- Check actor count
SELECT COUNT(*) AS total_actors FROM actors;

-- Check movie-actor relationships
SELECT COUNT(*) AS total_movie_actor_relationships FROM movie_actors;

-- View sample normalized data
SELECT 
    m.title,
    GROUP_CONCAT(a.actor_name ORDER BY ma.is_lead DESC, a.actor_name SEPARATOR ', ') AS actors
FROM movies m
LEFT JOIN movie_actors ma ON m.movie_id = ma.movie_id
LEFT JOIN actors a ON ma.actor_id = a.actor_id
GROUP BY m.movie_id, m.title
LIMIT 10;

