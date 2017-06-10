var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback = () => {}) {
  fs.readFile(this.paths.list, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback = () => {}) {
  this.readListOfUrls((listAry) => {
    callback(listAry.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url, callback = () => {}) {
  this.isUrlInList(url, (isInList) => {
    if (!isInList) {
      fs.appendFile(this.paths.list, url, 'utf8', (err) => {
        if (err) {
          console.log(err);
        } else {
          callback(url);
        }
      });
    }
  });
};

exports.isUrlArchived = function(url, callback = () => {}) {
  fs.access(this.paths.archivedSites + '/' + url, (err) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
};
