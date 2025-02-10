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

INSERT INTO location (neighborhood, city, county, region, country)
VALUES 
('Downtown', 'New York', 'New York County', 'Northeast', 'USA'),
('SoHo', 'London', 'Greater London', 'England', 'UK'),
('Shibuya', 'Tokyo', 'Tokyo Metropolis', 'Kanto', 'Japan'),
('La Defense', 'Paris', 'Hauts-de-Seine', 'Île-de-France', 'France'),
('Centro', 'Madrid', 'Madrid', 'Community of Madrid', 'Spain'),
('Southbank', 'Melbourne', 'Victoria', 'Australia', 'Australia');

INSERT INTO news (location_id, source, time_published, author, title, description, url, url_image, content)
VALUES 
(1, 'CNN', '2024-02-01 10:30:00', 'John Doe', 'Breaking: Major Snowstorm Hits NYC', 
 'New York faces heavy snowfall as temperatures drop below freezing.', 
 'https://cnn.com/major-snowstorm', 'https://cnn.com/snowstorm.jpg', 
 'A record-breaking snowstorm is affecting millions in New York...'),

(2, 'BBC News', '2024-02-02 12:00:00', 'Jane Smith', 'London Underground Faces Strikes', 
 'Transport disruptions expected as workers protest pay cuts.', 
 'https://bbc.com/london-strike', 'https://bbc.com/strike.jpg', 
 'Commuters in London are bracing for major delays due to strikes...'),

(3, 'The Japan Times', '2024-02-03 09:15:00', 'Taro Yamada', 'Shibuya Halloween Street Party Cancelled', 
 'Authorities cancel annual event over safety concerns.', 
 'https://japantimes.co.jp/shibuya-halloween', 'https://japantimes.co.jp/halloween.jpg', 
 'The popular Shibuya Halloween street party has been officially cancelled...'),

(4, 'Le Monde', '2024-02-04 15:45:00', 'Marie Dubois', 'Paris Fashion Week Begins', 
 'The biggest names in fashion gather for a spectacular event.', 
 'https://lemonde.fr/paris-fashion-week', 'https://lemonde.fr/fashion.jpg', 
 'Paris Fashion Week 2024 kicks off with a mix of tradition and innovation...'),

(5, 'El País', '2024-02-05 18:30:00', 'Carlos Fernández', 'Madrid Hosts International Tech Summit', 
 'Tech leaders discuss the future of AI and innovation.', 
 'https://elpais.com/madrid-tech', 'https://elpais.com/tech.jpg', 
 'Madrid’s International Tech Summit attracted thousands of professionals...'),

(6, 'The Age', '2024-02-06 08:00:00', 'Olivia Brown', 'Wildfires Spread Near Melbourne', 
 'Authorities issue warnings as bushfires approach residential areas.', 
 'https://theage.com.au/melbourne-fires', 'https://theage.com.au/fires.jpg', 
 'Firefighters are battling intense wildfires near Melbourne...')

 INSERT INTO category (type)
VALUES 
('Politics'),
('Business'),
('Technology'),
('Health'),
('Entertainment'),
('Sports'),
('Weather'),
('Local News');

INSERT INTO news_category (news_id, category_id)
VALUES 
(1, 7), -- Snowstorm (Weather)
(2, 8), -- London Strike (Local News)
(3, 6), -- Shibuya Halloween (Entertainment)
(4, 5), -- Paris Fashion Week (Entertainment)
(5, 3), -- Madrid Tech Summit (Technology)
(6, 7); -- Melbourne Wildfires (Weather)

-- we should think about Indexing most used columns for easier access.
