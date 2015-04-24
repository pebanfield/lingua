'use strict';

var fs = require('fs');
var Q = require('q');
var path = require('path');

var loadCatalog = function(){

  var deferred = Q.defer();

  var filePath =
    'books/catalog.json';
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

exports.getCatalog = function(req, res) {

  loadCatalog().then(function(result){
      res.status(200).send(result);
    },
    function(error){
      res.status(404).send({'file not found': error});
    } );
};

var loadBook = function(id){

  var deferred = Q.defer();

  var filePath =
     'books/' + id + '/' + id + '.index.json';
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
        res.status(404).send({'file not found': error});
      } );
  } else {
    res.send(400);
  }
};

var loadTranslation = function(bookId, transId){

  var deferred = Q.defer();

  var filePath =
    'books/' + bookId + '/' + transId + '/toc.json';
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

exports.getTranslation = function(req, res) {

  var bookId = req.params.bookId;
  var transId = req.params.transId;

  if(bookId && transId){
    loadTranslation(bookId, transId).then(function(result){
        res.send(200, result);
      },
      function(error){
        res.send(404, {'file not found': error});
      });
  } else {
    res.send(400);
  }

};

var loadChapter = function(bookId, transId, chapterId){

  var deferred = Q.defer();

  var filePath =
    'books/' + bookId + '/' + transId + '/' + chapterId + '.json';
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

exports.getChapter = function(req, res) {

  var bookId = req.params.bookId;
  var transId = req.params.transId;
  var chapterId = req.params.chapterId;

  if(bookId && transId && chapterId){
    loadChapter(bookId, transId, chapterId).then(function(result){
        res.send(200, result);
      },
      function(error){
        res.send(404, {'file not found': error});
      });
  } else {
    res.send(400);
  }

};


