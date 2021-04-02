create schema eletronics_navas;

create extension if not exists "uuid-ossp";

create table if not exists eletronics_navas.client (
	id uuid default uuid_generate_v4(),
	name varchar(80),
	email varchar(80),
	password varchar(150),
	primary key (id)
);