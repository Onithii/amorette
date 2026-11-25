-- ==============================================================================
-- AMORETTE SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- 1. Letters Table
create table if not exists public.letters (
  id text primary key,
  token text unique not null,
  sender_name text not null default 'Anonymous',
  recipient_name text not null default 'My Dear',
  envelope_config jsonb not null default '{}'::jsonb,
  stamp_id text not null default 'apple_blossom_24',
  seal_config jsonb not null default '{}'::jsonb,
  paper_config jsonb not null default '{}'::jsonb,
  content jsonb not null default '{}'::jsonb,
  decorations jsonb not null default '[]'::jsonb,
  decorations_html text default null,
  polaroids jsonb not null default '[]'::jsonb,
  open_when_label text default null,
  passcode_hash text default null,
  open_at timestamptz default null,
  expires_at timestamptz default null,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for instant unguessable token lookup
create index if not exists idx_letters_token on public.letters(token);

-- 2. Reactions Table (emoji bursts from recipient)
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  letter_token text not null references public.letters(token) on delete cascade,
  emoji text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_reactions_token on public.reactions(letter_token);

-- 3. Replies Table (letters linking to parent letter)
create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  parent_token text not null references public.letters(token) on delete cascade,
  reply_token text not null references public.letters(token) on delete cascade,
  created_at timestamptz not null default now()
);

-- 4. Drafts Table (optional cloud draft backup)
create table if not exists public.drafts (
  id uuid primary key default gen_random_uuid(),
  user_fingerprint text not null,
  draft_data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 5. Email Deliveries Log (for Resend / Brevo notifications)
create table if not exists public.email_deliveries (
  id uuid primary key default gen_random_uuid(),
  letter_token text not null references public.letters(token) on delete cascade,
  recipient_email text not null,
  status text not null default 'queued', -- queued, sent, failed
  error_message text default null,
  sent_at timestamptz default null,
  created_at timestamptz not null default now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
alter table public.letters enable row level security;
alter table public.reactions enable row level security;
alter table public.replies enable row level security;
alter table public.drafts enable row level security;
alter table public.email_deliveries enable row level security;

-- Letters: Anonymous users may only query letters by exact unguessable token
-- Letters are NEVER listed publicly
create policy "Allow reading letter by token"
  on public.letters
  for select
  to anon, authenticated
  using (revoked = false and (expires_at is null or expires_at > now()));

-- Letters: Anyone can create a sealed letter
create policy "Allow inserting new letters"
  on public.letters
  for insert
  to anon, authenticated
  with check (token is not null and length(token) >= 16);

-- Reactions: Anyone with the token can add an emoji reaction
create policy "Allow inserting reactions"
  on public.reactions
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow reading reactions for token"
  on public.reactions
  for select
  to anon, authenticated
  using (true);

-- Replies: Anyone can link a reply
create policy "Allow inserting replies"
  on public.replies
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow reading replies"
  on public.replies
  for select
  to anon, authenticated
  using (true);
