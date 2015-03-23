DROP TABLE IF EXISTS NEWS;
DROP TABLE IF EXISTS TAGS;

CREATE TABLE NEWS (
  id integer PRIMARY KEY AUTOINCREMENT,
  title varchar(30) NOT NULL,
  body text NOT NULL,
  author varchar(20),
  creation_date integer NOT NULL
);

CREATE TABLE TAGS (
  name  varchar(30) NOT NULL,
  news_id integer NOT NULL,
  FOREIGN KEY(news_id) REFERENCES NEWS(id),
  PRIMARY KEY(name,news_id)
);
