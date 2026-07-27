-- Akkaverse authentication, private family sync, realtime community wall,
-- and private original-audio storage. Run this once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are publicly readable" on public.profiles;
drop policy if exists "users read their profile" on public.profiles;
create policy "users read their profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "users update their profile" on public.profiles;
create policy "users update their profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.family_archives (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.family_archives enable row level security;

drop policy if exists "users read their family archive" on public.family_archives;
create policy "users read their family archive"
  on public.family_archives for select
  using (auth.uid() = user_id);

drop policy if exists "users create their family archive" on public.family_archives;
create policy "users create their family archive"
  on public.family_archives for insert
  with check (auth.uid() = user_id);

drop policy if exists "users update their family archive" on public.family_archives;
create policy "users update their family archive"
  on public.family_archives for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "users delete their family archive" on public.family_archives;
create policy "users delete their family archive"
  on public.family_archives for delete
  using (auth.uid() = user_id);

create table if not exists public.community_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 80),
  text text not null check (char_length(text) between 1 and 1000),
  category text not null check (category in ('memory', 'proverb', 'song', 'story')),
  district text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.limit_community_memory_rate()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if (
    select count(*)
    from public.community_memories
    where user_id = new.user_id
      and created_at > now() - interval '1 minute'
  ) >= 3 then
    raise exception 'Please wait before publishing another memory.';
  end if;
  return new;
end;
$$;

drop trigger if exists community_memory_rate_limit on public.community_memories;
create trigger community_memory_rate_limit
  before insert on public.community_memories
  for each row execute procedure public.limit_community_memory_rate();

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer set search_path = public, auth
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

create index if not exists community_memories_created_at_idx
  on public.community_memories (created_at desc);

alter table public.community_memories enable row level security;

drop policy if exists "community memories are readable" on public.community_memories;
create policy "community memories are readable"
  on public.community_memories for select
  using (true);

drop policy if exists "authenticated users publish memories" on public.community_memories;
create policy "authenticated users publish memories"
  on public.community_memories for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "authors update memories" on public.community_memories;
create policy "authors update memories"
  on public.community_memories for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "authors delete memories" on public.community_memories;
create policy "authors delete memories"
  on public.community_memories for delete
  to authenticated
  using (auth.uid() = user_id);

alter table public.family_archives replica identity full;
alter table public.community_memories replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'family_archives'
  ) then
    alter publication supabase_realtime add table public.family_archives;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'community_memories'
  ) then
    alter publication supabase_realtime add table public.community_memories;
  end if;
end $$;

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.family_archives to authenticated;
grant select on public.community_memories to anon, authenticated;
grant insert, update, delete on public.community_memories to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'voice-legacies',
  'voice-legacies',
  false,
  15728640,
  array['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm', 'audio/ogg']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "users read their voice recordings" on storage.objects;
create policy "users read their voice recordings"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'voice-legacies'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "users upload their voice recordings" on storage.objects;
create policy "users upload their voice recordings"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'voice-legacies'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "users update their voice recordings" on storage.objects;
create policy "users update their voice recordings"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'voice-legacies'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'voice-legacies'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "users delete their voice recordings" on storage.objects;
create policy "users delete their voice recordings"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'voice-legacies'
    and (storage.foldername(name))[1] = auth.uid()::text
  );