// src/models/newsModel.js
class News {
  constructor({ news_id, source, time_published, author, title, description, url, url_image, content, location_id }) {
    this.news_id = news_id;
    this.source = source;
    this.time_published = time_published;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.url_image = url_image;
    this.content = content;
    this.location_id = location_id;
  }
}

module.exports = News;
