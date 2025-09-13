-- Drop the unused New_Join table to eliminate security risk
-- This table is no longer used after moving to frontend-only authentication
DROP TABLE IF EXISTS public."New_Join";