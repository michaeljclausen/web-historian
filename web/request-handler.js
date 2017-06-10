var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, httpHelper.headers);
    if (req.url === '/' || req.url === '/index.html') {
      url = archive.paths.siteAssets + '/index.html';
    } else {
      url = archive.paths.archivedSites + req.url;
    }
      
    httpHelper.serveAssets(res, url, () => {
      console.log('index.html served');
    }); 

  }
  
  // if (req.method === 'POST') {
  //   req.on('data', (chunk) => {
  //     ({url} = querystring.parse(chunk.toString('utf8')));
  //     if (archive.isUrlArchived(url, () => {})) {
  //       res.writeHead(301, {location: req.url + '/' + url});
  //       console.log(req.headers);
  //       // httpHelper.serveAssets(res, archive.paths.archivedSites + url, () => console.log(url, ' was served'));
  //     }
  //   });
  // }

  //res.end(archive.paths.list);
};
