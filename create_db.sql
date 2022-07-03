CREATE DATABASE IOT;
#show databases;
use IOT;

CREATE TABLE devices (id INT AUTO_INCREMENT, name VARCHAR(30) NOT NULL, type VARCHAR(20) NOT NULL,
 on_off VARCHAR(6), open_locked VARCHAR(6), open_closed VARCHAR(6),
 volume INT, temperature INT, PRIMARY KEY(id));