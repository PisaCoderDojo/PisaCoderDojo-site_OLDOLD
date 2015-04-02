DROP TABLE IF EXISTS news;

CREATE TABLE news (
  ID  integer PRIMARY KEY AUTOINCREMENT,
  TITLE varchar(30),
  BODY  text,
  AUTHOR varchar(20),
  DATE_CREATE integer
);
