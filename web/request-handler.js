var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.writeHead(200, httpHelper.headers);
  if (req.method === 'GET') {
    httpHelper.serveAssets(res, archive.paths.siteAssets + '/index.html', () => {
      console.log('index.html served');
    }); 
  }

  //res.end(archive.paths.list);
};
