var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var commentSchema = new Schema({
    
    Content: {
        type: String,
        required: 'Comment is empty'
    },
    TaskId: String,
    UserId: String,
    IsSeen: {
        type:Boolean,
        default: false
    },
    SeenAt: Date,
    CreatedAt: {
        type: Date,
        default: Date.now
    }   
    
});

var statusSchema = new Schema({
    TaskId : String,
    StatusUpdate: Number,
    CreatedAt: {
        type: Date,
        default: Date.now
    },
     LastUpdatedAt: {
        type: Date,
        default: Date.now
    },
    CreatedBy: String
});

 var TaskSchema = new Schema({
    
   StartDate : {
       type: Date,
       default: Date.now
   },
   EndDate: Date,
   AssignedTo : String,
   IsSeen : {
        type: Boolean,
        default: false
    },
    Title: {
        type: String,
        required: 'Task title is required'
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    Comments: [commentSchema],
    Status: [statusSchema],
    IsReward: Boolean,
    RewardedFor: Number,
    Reward: String,
    UnSeenComments: {
        type: Number,
        default: 0
    },
    CreatedBy: String,
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    LastUpdatedAt: {
        type: Date,
        default: Date.now
    }
    
    
});

mongoose.model('Status', statusSchema);
mongoose.model('Task', TaskSchema);