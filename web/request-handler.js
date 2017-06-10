var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var url = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '/index.html') {
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/index.html', () => {
        console.log('/index.html served');
      }); 
    } else {
      archive.isUrlArchived(req.url.slice(1), result => {
        if (result) {
          res.writeHead(200, httpHelper.headers);
          httpHelper.serveAssets(res, archive.paths.archivedSites + req.url, () => {
            console.log(`${req.url} served`);
          }); 
        } else {
          res.writeHead(404, httpHelper.headers);
          res.end();
        }
      });
    }
    // console.log(url);
    //console.log(req.url.slice(1));
    //console.log(archive.isUrlArchived(req.url.slice(1)), 'urlarchived');
    // if (archive.isUrlArchived(req.url.slice(1)) || url === archive.paths.siteAssets + '/index.html') {
    //   res.writeHead(200, httpHelper.headers);
    //   httpHelper.serveAssets(res, url, () => {
    //     console.log('index.html served');
    //   }); 
    // } else {
    //   res.writeHead(404, httpHelper.headers);
    // }    
  }
  
  if (req.method === 'POST') {
    req.on('data', (chunk) => {
      var targetUrl = chunk.toString().split('=')[1];
      archive.isUrlArchived(targetUrl, isFound => {
        if (isFound) {
          console.log('isFound!!!!!!!!!!!!!!!!!!!');
        } else {
          console.log('NotFound!!!!!!!!!!!!!!!!!!!');
          var listUrl = targetUrl.slice(targetUrl.indexOf('.') + 1);
          archive.isUrlInList(listUrl, isListed => {
            if (isListed) {
              
            } else {
              archive.addUrlToList(listUrl, () => {
                //we've added to the list reroute to waiting page
                res.writeHead(302, httpHelper.headers);
                res.end();
              });
            }
          });
        }
      });      
    });
  }

  //res.end(archive.paths.list);
};
