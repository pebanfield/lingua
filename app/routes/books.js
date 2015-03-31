'use strict';

var books = require('../controllers/books-controller');
var cors = require('cors');

module.exports = function(app) {

  app.route('/books/:id')
    .get(cors(), books.getBook);
  app.route('/books/:bookId/chapters/:chapterId')
    .get(cors(), books.getChapter);
};