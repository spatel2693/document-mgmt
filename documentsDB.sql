
DROP TABLE IF EXISTS `documents`;

CREATE TABLE `documents_` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);


LOCK TABLES `documents_` WRITE;
INSERT INTO `documents_` VALUES (117,'document2.png',1),(122,'document1.docx',5);
UNLOCK TABLES;


DROP TABLE IF EXISTS `documentType`;

CREATE TABLE `documentType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Name_UNIQUE` (`name`)
);

LOCK TABLES `documentType` WRITE;

INSERT INTO `documentType` VALUES (1,'Appraisal','Sagar Patel Tesing'),(2,'Article of Incorporation','Testing'),(3,'Borrower ID','Sagar'),(4,'Child Tax Credit Confirmation','Document needed for mortgaes'),(5,'Company Financials','Document mortage');

UNLOCK TABLES;
