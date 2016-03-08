var _ = require('lodash');
var path = require('path');
var fs = require('fs');

fs.readdirSync('./content-template')
  .filter(function(page) { return page.match(/\.md$/); })
  .forEach(function(page) {
    fs.writeFileSync(path.join('./content/', page),
      _.template(fs.readFileSync(path.join('./content-template/', page), 'utf8'))({
        partial: function(name) {
          return fs.readFileSync(path.join('./content-template/', name), 'utf8');
        }
      }));
});
