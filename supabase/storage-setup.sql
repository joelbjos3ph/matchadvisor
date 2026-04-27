-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/rtnmayzfviaggouedmzq/sql

-- Step 1: Create the private storage bucket
insert into storage.buckets (id, name, public)
values ('licence-documents', 'licence-documents', false)
on conflict (id) do nothing;

-- Step 2: Allow anon to upload files (from /join form)
create policy "allow_anon_upload_licence_documents"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'licence-documents');

-- Step 3: Allow anon to read files (for admin signed URL generation)
create policy "allow_anon_read_licence_documents"
  on storage.objects for select
  to anon
  using (bucket_id = 'licence-documents');
