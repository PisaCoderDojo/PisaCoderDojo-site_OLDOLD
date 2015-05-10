DROP TABLE IF EXISTS RESOURCE;
DROP TABLE IF EXISTS CATEGORY;

CREATE TABLE CATEGORY (
  id integer PRIMARY KEY AUTOINCREMENT,
  name  varchar(30) NOT NULL
);

CREATE TABLE RESOURCE (
  id integer PRIMARY KEY AUTOINCREMENT,
  title varchar(30) NOT NULL,
  description text NOT NULL,
  resource text,
  category_id integer NOT NULL,
  creation_date integer NOT NULL,
  FOREIGN KEY(category_id) REFERENCES CATEGORY(id)
);
