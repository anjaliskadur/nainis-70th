-- Usha's 70th — Supabase schema
-- Run this in the Supabase SQL Editor for a fresh project.
-- If memories already exists, run migration-memory-edit.sql instead.

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  author text not null default '',
  message text not null,
  photo_url text,
  video_url text,
  edit_token uuid not null default gen_random_uuid(),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.performance_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  act text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists memories_created_at_idx on public.memories (created_at desc);
create index if not exists performance_signups_created_at_idx on public.performance_signups (created_at desc);

alter table public.memories enable row level security;
alter table public.performance_signups enable row level security;

drop policy if exists "Public read approved memories" on public.memories;
create policy "Public read approved memories"
  on public.memories for select
  using (approved = true);

drop policy if exists "Public insert memories" on public.memories;
create policy "Public insert memories"
  on public.memories for insert
  with check (true);

drop policy if exists "Public insert performance signups" on public.performance_signups;
create policy "Public insert performance signups"
  on public.performance_signups for insert
  with check (true);

-- Guests can read + insert only. Edit/delete go through RPCs below.
grant select, insert on table public.memories to anon, authenticated;
revoke update, delete on table public.memories from anon, authenticated;

create or replace function public.edit_memory(
  p_id uuid,
  p_token uuid,
  p_author text,
  p_message text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count int;
begin
  if trim(coalesce(p_message, '')) = '' then
    raise exception 'Message cannot be empty';
  end if;

  update public.memories
  set
    author = coalesce(nullif(trim(coalesce(p_author, '')), ''), 'Guest'),
    message = trim(p_message)
  where id = p_id
    and edit_token = p_token;

  get diagnostics updated_count = row_count;
  return updated_count > 0;
end;
$$;

create or replace function public.delete_memory(
  p_id uuid,
  p_token uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count int;
begin
  delete from public.memories
  where id = p_id
    and edit_token = p_token;

  get diagnostics deleted_count = row_count;
  return deleted_count > 0;
end;
$$;

revoke all on function public.edit_memory(uuid, uuid, text, text) from public;
revoke all on function public.delete_memory(uuid, uuid) from public;
grant execute on function public.edit_memory(uuid, uuid, text, text) to anon, authenticated;
grant execute on function public.delete_memory(uuid, uuid) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('memory-media', 'memory-media', true)
on conflict (id) do nothing;

drop policy if exists "Public read memory-media" on storage.objects;
create policy "Public read memory-media"
  on storage.objects for select
  using (bucket_id = 'memory-media');

drop policy if exists "Public upload memory-media" on storage.objects;
create policy "Public upload memory-media"
  on storage.objects for insert
  with check (bucket_id = 'memory-media');

notify pgrst, 'reload schema';
