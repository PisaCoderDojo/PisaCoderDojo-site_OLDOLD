BEGIN;

ALTER TABLE TAGS RENAME TO tags_old;

CREATE TABLE TAGS (
  name  varchar(30) NOT NULL,
  news_id integer NOT NULL,
  FOREIGN KEY(news_id) REFERENCES NEWS(id) ON DELETE CASCADE,
  PRIMARY KEY(name,news_id)
);

INSERT INTO TAGS(name ,news_id)
SELECT name ,news_id
FROM  tags_old;

DROP TABLE  tags_old;

COMMIT;
