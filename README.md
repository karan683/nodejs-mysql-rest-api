# nodejs-mysql-rest-api

# Create users_detail database in mysql cli
create database users_detail;

# Create table users

create table users(
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null,
    id int not null auto_increment primary key,
    created_at timestamp default now(),
    updated_at timestamp DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);