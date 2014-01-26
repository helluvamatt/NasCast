-- NasCast Media Database
-- Schema Version 1

CREATE TABLE nascast_media_containers (
	id bigserial primary key,
	parent biginteger DEFAULT NULL,
	title character varying(255),
	metadata text DEFAULT NULL
);

CREATE TABLE nascast_media_items (
	id bigserial primary key,
	parent biginteger NOT NULL,
	title character varying(255),
	metadata text DEFAULT NULL
);