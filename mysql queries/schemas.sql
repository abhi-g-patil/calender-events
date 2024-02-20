drop database event;
create database event;
use event;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root123';

flush privileges;

drop table events;
CREATE TABLE events (
    id int auto_increment primary key,
    title varchar(200) not null,
   --  description text not null,
    start datetime not null,
    end datetime not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp
);



