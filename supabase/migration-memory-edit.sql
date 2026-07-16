-- Memory Wall: edit / delete support
-- Safe to re-run in the Supabase SQL Editor.

-- 1) Token column (lets only the poster change their message)
alter table public.memories
  add column if not exists edit_token uuid;

update public.memories
set edit_token = gen_random_uuid()
where edit_token is null;

alter table public.memories
  alter column edit_token set default gen_random_uuid();

alter table public.memories
  alter column edit_token set not null;

-- 2) Normal table grants (avoid fragile column-level privileges)
grant select, insert on table public.memories to anon, authenticated;
revoke update, delete on table public.memories from anon, authenticated;

-- 3) Edit RPC — checks id + edit_token
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

-- 4) Delete RPC — checks id + edit_token
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

-- 5) Allow guests to call the RPCs
revoke all on function public.edit_memory(uuid, uuid, text, text) from public;
revoke all on function public.delete_memory(uuid, uuid) from public;
grant execute on function public.edit_memory(uuid, uuid, text, text) to anon, authenticated;
grant execute on function public.delete_memory(uuid, uuid) to anon, authenticated;

-- 6) Make sure PostgREST sees the new functions immediately
notify pgrst, 'reload schema';
