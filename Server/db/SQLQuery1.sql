--SELECT n.news_id, n.title, n.source, n.time_published, n.author, 
--       n.description, l.city, l.country
--FROM news n
--JOIN location l ON n.location_id = l.location_id;

--SELECT n.title, c.type AS category, n.source, n.time_published
--FROM news n
--JOIN news_category nc ON n.news_id = nc.news_id
--JOIN category c ON nc.category_id = c.category_id
--WHERE c.type = 'Weather';

--SELECT title, source, time_published 
--FROM news 
--WHERE location_id = (SELECT location_id FROM location WHERE city = 'New York');

