DROP TABLE IF EXISTS NEWS;
DROP TABLE IF EXISTS TAGS;
DROP TABLE IF EXISTS RESOURCE;
DROP TABLE IF EXISTS CATEGORY;

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

CREATE TABLE CATEGORY (
  id integer PRIMARY KEY AUTOINCREMENT,
  name  varchar(30) NOT NULL
);

CREATE TABLE RESOURCE (
  id integer PRIMARY KEY AUTOINCREMENT,
  title varchar(30) NOT NULL,
  description text NOT NULL,
  links text,
  category_id integer NOT NULL,
  creation_date integer NOT NULL,
  FOREIGN KEY(category_id) REFERENCES CATEGORY(id)
);
