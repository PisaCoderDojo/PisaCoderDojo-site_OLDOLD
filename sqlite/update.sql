CREATE TABLE IF NOT EXISTS  tag (
  name  varchar(30) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS rel_TagNews (
  news integer NOT NULL,
  tag varchar(30) NOT NULL,
  FOREIGN KEY(news) REFERENCES news(id),
  FOREIGN KEY(tag) REFERENCES tag(name),
  PRIMARY KEY(news,tag)
);
