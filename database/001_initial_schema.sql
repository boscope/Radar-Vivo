create extension if not exists pgcrypto;

create table if not exists companies (

id uuid primary key default gen_random_uuid(),

name text not null,

website text,

segment text,

city text,

state text,

score integer default 0,

priority text default 'BAIXA',

created_at timestamptz default now()

);

create table if not exists opportunities (

id uuid primary key default gen_random_uuid(),

company_id uuid references companies(id) on delete cascade,

title text,

description text,

score integer,

status text default 'ABERTA',

created_at timestamptz default now()

);

create table if not exists reports (

id uuid primary key default gen_random_uuid(),

company_id uuid references companies(id) on delete cascade,

summary text,

score integer,

created_at timestamptz default now()

);

create table if not exists notifications (

id uuid primary key default gen_random_uuid(),

title text,

message text,

type text,

read boolean default false,

created_at timestamptz default now()

);
