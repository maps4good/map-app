USE master;
GO

-- Drop database if it exists
IF DB_ID('news') IS NOT NULL
BEGIN
	ALTER DATABASE news SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
	DROP DATABASE news;
END
GO

CREATE DATABASE news;
GO

USE news;
GO

CREATE TABLE location
(
  location_id   INT    IDENTITY(1,1) NOT NULL,
  neighborhood VARCHAR(100),
  city         VARCHAR(50) NOT NULL,
  county       VARCHAR(50),
  region       VARCHAR(50) NOT NULL,
  country      VARCHAR(50) NOT NULL,
  CONSTRAINT PK_location PRIMARY KEY (location_id)
)
GO

CREATE TABLE news
(
  news_id        INT      IDENTITY(1,1) NOT NULL,
  location_id    INT      NOT NULL,
  source         VARCHAR(255) NOT NULL,
  time_published DATETIME2 NOT NULL,
  author         VARCHAR(50) NOT NULL,
  title          VARCHAR(255) NOT NULL,
  description    VARCHAR(1000) NOT NULL,
  url            VARCHAR(255),
  url_image      VARCHAR(1000),
  content        VARCHAR(MAX),
  CONSTRAINT PK_news PRIMARY KEY (news_id),
  CONSTRAINT FK_location_id FOREIGN KEY (location_id) REFERENCES location(location_id)
)
GO

CREATE TABLE category
(
  category_id INT     NOT NULL IDENTITY(1,1),
  type        VARCHAR(100) NOT NULL,
  CONSTRAINT PK_category PRIMARY KEY (category_id)
)
GO

CREATE TABLE news_category
(
  news_category_id INT NOT NULL IDENTITY(1,1),
  news_id          INT NOT NULL,
  category_id      INT NOT NULL,
  CONSTRAINT PK_news_category PRIMARY KEY (news_category_id),
  CONSTRAINT FK_news_id FOREIGN KEY (news_id) REFERENCES news(news_id),
  CONSTRAINT FK_category_id FOREIGN KEY (category_id) REFERENCES category(category_id),
  CONSTRAINT CHK_category_id CHECK (category_id > 0)
)
GO

-- we should think about Indexing most used columns for easier access.
