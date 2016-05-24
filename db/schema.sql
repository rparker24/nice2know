CREATE DATABASE facts_db;
USE facts_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NULL,
	phone varchar(255) NOT NULL,
	countrycode int NOT NULL,
	PRIMARY KEY(id)
);


CREATE TABLE facts
(
	id int NOT NULL AUTO_INCREMENT,
	fact varchar(255) NOT NULL,
	topic varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE categories
(
	id int NOT NULL AUTO_INCREMENT,
	category_name varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

-- CREATE TABLE subscriptions
-- (
-- 	id int NOT NULL,
-- 	user_id int NOT NULL,
-- 	category_id int NOT NULL,
-- 	PRIMARY KEY(id)
-- );


