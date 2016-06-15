'use strict';

var books = require('../controllers/books-controller');
var cors = require('cors');

module.exports = function(app) {

  app.route('/catalog')
    .get(cors(), books.getCatalog);
  app.route('/catalog/books/:id')
    .get(cors(), books.getBook);
  app.route('/catalog/books/:bookId/volumes/:volumeId')
    .get(cors(), books.getVolume);
  app.route('/catalog/books/:bookId/volumes/:volumeId/chapters/:chapterId')
    .get(cors(), books.getChapter);
};
