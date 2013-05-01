var browserify =  require('browserify')
  , path       =  require('path')
  , fs         =  require('fs')
  , mold       =  require('mold-source-map')
  ;


var bundle = module.exports = function () {
  var bundle = browserify() 
    .require(require.resolve('./js/main'), { entry: true })
    .bundle({ debug: true })
    .pipe(mold.transformSourcesRelativeTo(path.join(__dirname, '..', '..')))
    ;

  return bundle;
};

if (!module.parent)
  bundle().pipe(fs.createWriteStream(__dirname + '/bundle.js'));
