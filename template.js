var _ = require('lodash');
var path = require('path');
var fs = require('fs');

/**
 * This is an example of how you'd integrate external content into your REST
 * API documentation, in case you want to use separate .js files or have
 * some other kind of system.
 *
 * The gist is that we should do this ahead of time, rather as part of Docbox.
 * This ensures that the content in content.md is _exactly_ what users see.
 * It should be literal, predictable, simple. The transformation happens
 * ahead of time: in this case by writing docs in content-template and using
 * lodash templating to integrate external examples and putting the result
 * in content/
 */
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
