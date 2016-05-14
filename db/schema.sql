
create database facts_db;
use facts_db;

create TABLE user(
	username varchar(255) NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL
);

CREATE TABLE facts
(
id int NOT NULL AUTO_INCREMENT,
fact varchar(255) NOT NULL,
topic varchar(255) NOT NULL,
PRIMARY KEY (id)
);