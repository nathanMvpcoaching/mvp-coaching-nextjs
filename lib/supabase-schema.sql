-- ────────────────────────────────────────────────────────────────────────────
-- MVP.COACHING — Schéma Supabase
-- À exécuter dans le SQL editor du dashboard Supabase.
-- ────────────────────────────────────────────────────────────────────────────

-- ── TABLE feedbacks ────────────────────────────────────────────────────────
-- Retours utilisateurs sur les rapports IA générés.
create table if not exists public.feedbacks (
  id             uuid        primary key default gen_random_uuid(),
  user_id        uuid        not null references auth.users(id) on delete cascade,
  note_utilite   smallint    not null check (note_utilite   between 1 and 5),
  note_precision smallint    not null check (note_precision between 1 and 5),
  note_clarte    smallint    not null check (note_clarte    between 1 and 5),
  note_plan      smallint    not null check (note_plan      between 1 and 5),
  commentaire    text,
  created_at     timestamptz not null default now()
);

create index if not exists feedbacks_user_id_idx on public.feedbacks(user_id);

-- ── RLS ────────────────────────────────────────────────────────────────────
alter table public.feedbacks enable row level security;

drop policy if exists "feedbacks_select_own" on public.feedbacks;
create policy "feedbacks_select_own"
  on public.feedbacks for select
  using (auth.uid() = user_id);

drop policy if exists "feedbacks_insert_own" on public.feedbacks;
create policy "feedbacks_insert_own"
  on public.feedbacks for insert
  with check (auth.uid() = user_id);
