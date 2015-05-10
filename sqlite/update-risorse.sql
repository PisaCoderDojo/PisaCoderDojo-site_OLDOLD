CREATE TABLE RESOURCE (
  id integer PRIMARY KEY AUTOINCREMENT,
  title varchar(30) NOT NULL,
  body text NOT NULL,
  category_id integer NOT NULL,
  creation_date integer NOT NULL,
  FOREIGN KEY(category_id) REFERENCES CATEGORY(id)
);

CREATE TABLE CATEGORY (
  id integer PRIMARY KEY AUTOINCREMENT,
  name  varchar(30) NOT NULL
);
