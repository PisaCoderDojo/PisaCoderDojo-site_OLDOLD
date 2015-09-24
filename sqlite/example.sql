BEGIN;
INSERT INTO NEWS(id,title,body,creation_date)
VALUES (1,'test1','TEST1 body---asdasòdlk',3192323812);

INSERT INTO TAGS(name,news_id)
VALUES ('tag1',1);
INSERT INTO TAGS(name,news_id)
VALUES ('tag2',1);

INSERT INTO NEWS(id,title,body,author,creation_date)
VALUES (2,'test2','TEST2 b543gfdodasddfffasòdlk','marco',324555);
INSERT INTO TAGS(name,news_id)
VALUES ('tag1',2);

INSERT INTO NEWS(id,title,body,author,creation_date)
VALUES (3,'test3','TEST3 body---òòdfgògg','gianni',777566555);
INSERT INTO TAGS(name,news_id)
VALUES ('tag2',3);

INSERT INTO NEWS(id,title,body,author,creation_date)
VALUES (4,'test4','TEST4 body---fhghgfghfdasòdlk','carlo',76763333);
INSERT INTO TAGS(name,news_id)
VALUES ('tag2',4);

INSERT INTO NEWS(id,title,body,author,creation_date)
VALUES (5,'test5','TEST5 body---òòdfgògg','carlo',777566555);
INSERT INTO TAGS(name,news_id)
VALUES ('tag3',5);

COMMIT;
