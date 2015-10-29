var users = require('../../app/controllers/users.server.controller');
var tasks = require('../../app/controllers/task.controller');


module.exports = function(app){
    
    app.route('/users')
        .post(users.create)
        .get(users.list);
    
    app.route('/users/:userId')
        .get(users.read)
        .post(users.update);
    
    app.route('/taskcreate')
       .post(tasks.create);
    
    app.route('/tasklist')
       .get(tasks.list);
    
     app.route('/taskall')
       .get(tasks.all);
    
    app.route('/commentcreate')
       .post(tasks.postComment);
    
    app.route('/TaskStatusCreate')
       .post(tasks.updateStatus);
    
    app.route('/checkexistance')
        .get(users.checkExistance);
    
    app.param('userId', users.userByID);
   // app.param('userEmail', users.checkExistance);
    

    
    
};