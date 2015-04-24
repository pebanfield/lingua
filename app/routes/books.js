'use strict';

var books = require('../controllers/books-controller');
var cors = require('cors');

module.exports = function(app) {

  app.route('/books')
    .get(cors(), books.getCatalog);
  app.route('/books/:id')
    .get(cors(), books.getBook);
  app.route('/books/:bookId/trans/:transId')
    .get(cors(), books.getTranslation);
  app.route('/books/:bookId/trans/:transId/chapters/:chapterId')
    .get(cors(), books.getChapter);
};