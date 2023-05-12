/* This file is used to faciliate re-creation of the database */
create database vaea;
use vaea;

/* users table */
/* stores log in credentials and user settings */
CREATE TABLE user_main (
	id BIGINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    gender ENUM('MALE', 'FEMALE') NULL,
    profile_image VARCHAR(200) NULL,
    id_iqama_number VARCHAR(11) NULL,
    settings_language CHAR(2) NULL DEFAULT 'ar',
    user_password VARCHAR(70) NOT NULL,
    account_type ENUM('TENANT', 'LANDLORD', 'ADMIN'),
    PRIMARY KEY(id)
);