BEGIN;
ALTER TABLE news RENAME TO tmp_news;

CREATE TABLE NEWS (
  id integer PRIMARY KEY AUTOINCREMENT,
  title varchar(30) NOT NULL,
  body text NOT NULL,
  author varchar(20),
  creation_date integer NOT NULL
);

INSERT INTO NEWS(id,title,body,author,creation_date)
SELECT ID,TITLE,BODY,AUTHOR,DATE_CREATE
FROM tmp_news;

DROP TABLE tmp_news;

CREATE TABLE TAGS (
  name  varchar(30) NOT NULL,
  news_id integer NOT NULL,
  FOREIGN KEY(news_id) REFERENCES NEWS(id),
  PRIMARY KEY(name,news_id)
);
COMMIT;
