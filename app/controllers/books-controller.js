'use strict';

var fs = require('fs');
var Q = require('q');
var path = require('path');

var loadBook = function(id){

  var deferred = Q.defer();

  var filePath =
     'books/' + id + '/index.json';
  filePath = path.resolve(filePath);

  fs.readFile(filePath, "utf-8", function (error, text) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(text);
    }
  });

  return deferred.promise;
};

exports.getBook = function(req, res) {

  var id = req.params.id;
  if(id){
    loadBook(id).then(function(result){
        //res.send(200, result);
        res.status(200).send(result);
      },
      function(error){
        //res.send(404, {'book not found': error});
        res.status(404).send({'book not found': error});
      } );
  } else {
    res.send(400);
  }
};

exports.getChapter = function(req, res) {

  var bookId = req.params.bookId;
  var chapterId = req.params.chapterId;

  if(bookId && chapterId){
    loadChapter(bookId, chapterId).then(function(result){
        res.send(200, result);
      },
      function(error){
        res.send(500, {'file read error': error});
      });
  } else {
    res.send(400);
  }

};


var loadChapter = function(bookId, chapterId){

  var deferred = Q.defer();

  var filePath =
    'books/' + bookId + '/' + chapterId + '.json';
  filePath = path.resolve(filePath);

  fs.readFile(filePath, "utf-8", function (error, text) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(text);
    }
  });

  return deferred.promise;
};