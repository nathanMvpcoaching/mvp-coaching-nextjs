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

-- ── TABLE suggestions ──────────────────────────────────────────────────────
-- Idées / bugs / améliorations remontés depuis le bouton "💡 Suggérer".
create table if not exists public.suggestions (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  titre       text        not null check (char_length(titre) between 1 and 200),
  description text        not null check (char_length(description) between 1 and 4000),
  categorie   text        not null check (categorie in ('fonctionnalite', 'amelioration', 'bug', 'autre')),
  created_at  timestamptz not null default now()
);

create index if not exists suggestions_user_id_idx    on public.suggestions(user_id);
create index if not exists suggestions_created_at_idx on public.suggestions(created_at desc);

alter table public.suggestions enable row level security;

drop policy if exists "suggestions_select_own" on public.suggestions;
create policy "suggestions_select_own"
  on public.suggestions for select
  using (auth.uid() = user_id);

drop policy if exists "suggestions_insert_own" on public.suggestions;
create policy "suggestions_insert_own"
  on public.suggestions for insert
  with check (auth.uid() = user_id);
