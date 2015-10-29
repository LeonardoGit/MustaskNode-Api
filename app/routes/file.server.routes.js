var file = require('../../app/controllers/file.server.controller');
var multer  = require('multer');

module.exports = function(app){
    var upload = multer({ dest: 'uploads/' });
    app.route('/fileup').get(file.render);

   // app.route('/fileup/uploadfile')
    //    .post(file.upload);
    
    //app.post('/fileup/uploadfile', function(req, res, next)
             app.post('/fileup/uploadfile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
                 next();
});
}


/*module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/file.server.controller');

	// Mount the 'index' controller's 'render' method
	app.get('/files', index.render);
};*/