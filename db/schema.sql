
create database facts_db;
use facts_db;

CREATE TABLE user(
	username varchar(255) NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE facts(
	id int NOT NULL AUTO_INCREMENT,
	fact varchar(255) NOT NULL,
	topic varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE categories(
	id int NOT NULL AUTO_INCREMENT,
	category_name varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

