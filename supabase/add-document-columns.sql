-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/rtnmayzfviaggouedmzq/sql

ALTER TABLE professionals ADD COLUMN IF NOT EXISTS licence_document_url text;
ALTER TABLE professionals ADD COLUMN IF NOT EXISTS selfie_url text;
