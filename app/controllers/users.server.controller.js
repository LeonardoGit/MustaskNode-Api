var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
    
    var user = new User(req.body);
    
    user.save(function(err){
        if(err){
            return next(err);
        } else {
            res.json(user);
        }
    });
}

exports.list = function(req, res, next){
    User.find({}, 'username email lastname', function(err, users){
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });
};

exports.read = function(req, res){
    res.json(req.user);
};

exports.userByID = function(req, res, next, id){
    User.findOne({
        _id: id
    }, function(err, user){
        if(err){
            return next(err);
        }else{
            req.user = user;
            next();
        }
    });
};

exports.update = function(req, res, next){
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if(err){
            return next(err);
        }else {
            res.json(user);
        }
    });
};

exports.checkExistance = function(req, res, next){
    console.log(req.query);
    User.findOne({
        email: req.query.email
    },function(err, user){
        if(err){
            return next(err);
        }else {
            res.json(user);
        
        }
    });
};