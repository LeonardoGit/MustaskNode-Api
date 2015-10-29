var fs = require('fs');



exports.render = function(req, res, next){
    res.render('file', {title: "files"});
}

exports.upload = function(req, res, next){
    console.log(req.files);
        /*fs.upload(req.files.profilePic.path, function (err, data) {
      // ...
      var newPath = __dirname + "/uploads/uploadedFileName";
      fs.writeFile(newPath, data, function (err) {
        res.redirect("back");
      });
    });*/

}
