-- NasCast Media Database
-- Schema Version 1

CREATE TABLE nascast_media_containers (
	id bigserial primary key,
	parent bigint DEFAULT NULL,
	title character varying(255),
	metadata text DEFAULT NULL
);

CREATE TABLE nascast_media_items (
	id bigserial primary key,
	filepath character varying(65536) NOT NULL,
	parent bigint NOT NULL,
	title character varying(255),
	metadata text DEFAULT NULL
);
CREATE UNIQUE INDEX nascast_media_items_filepath_uidx ON nascast_media_items (filepath);