-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/rtnmayzfviaggouedmzq/sql
-- Adds read + update access so the /admin dashboard can fetch and verify professionals

-- Allow anon to read professionals (admin dashboard)
create policy "allow_select_professionals"
  on professionals for select to anon using (true);

-- Allow anon to read consumer_leads (admin dashboard)
create policy "allow_select_consumer_leads"
  on consumer_leads for select to anon using (true);

-- Allow anon to update professionals (Verify button)
create policy "allow_update_professionals"
  on professionals for update to anon using (true) with check (true);
