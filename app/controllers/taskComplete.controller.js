var Mustask = require('mongoose').model('Task'),
    StatusUpdate = require('mongoose').model('Status'),
    events = require('events'),
    EventEmitter = events.EventEmitter;


exports.updateStatus = function(req, res, next){
    
    var taskStatus;
    
    if(req.body.StatusUpdate == 1 || req.body.StatusUpdate == 2){
        
        taskStatus = false;
    }else {
        
        taskStatus = true;
    }
    
    var dbQuery = new EventEmitter();
    
   
    dbQuery.on('start', function(statusObj){
        
        // update the status of the task
         Mustask.findOneAndUpdate(
                    {_id:statusObj.TaskId},
                    { $set: {
                        IsActive: taskStatus
                      },
                     $push:{Status: statusObj},
                     $currentDate: {LastUpdatedAt: true}
                    },
                    {safe: true, upsert: true},
                    function(err, task){
                        if(err){
                            next(err);
                        }else{
                            if(task.Reward == null){
                                res.json(task)
                            }else{
                                if(req.StatusUpdate == 1){
                                    
                                    dbQuery.emit('openReward', task);
                                    
                                }else{
                                    
                                    dbQuery.emit('closeReward', task);
                                }
                                
                            }
                        }
                    }
             );
        
    }); // End of db query 
    
    dbQuery.on('openReward', function(mainTask){
        // check if there was an existing reward
        
        Mustask.find(
           {RewardedFor: req.body.TaskId},
           {},
           {limit: 1},
           function(err, reward){
              if(err){
                  next(err);
              }else{
                if(reward == null){
                    
                    dbQuery.emit('saveReward', mainTask);
                }
              }
           });
               
        
    }); // End of openReward query
    
    dbQuery.on('saveReward', function(mainTask){
        
        var rewardObj = {
            EndDate: Date.now,
            Title: mainTask.Title,
            IsReward: true,
            RewardedFor: mainTask._id
        }
        
        var rewardModel = new Mustask(rewardObj);
        
        rewardModel.save(function(err){
                                                
            if(err){
               return next(err);
            }else{

               res.json(mainTask);
            }
                                            
        });
    }); // End of saveReward query
     
    dbQuery.emit('start', req.body);
    
   
};

