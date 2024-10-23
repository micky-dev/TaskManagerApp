//?-----External Modules
const mongoose = require('mongoose');
const slugify = require('slugify').default

const taskSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    dueDate: {
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Due date must be in the future'
        }
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    slug: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'archived'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium',
    },
}, {
    timestamps: true 
});

//?-----Pre save
taskSchema.pre('save', function (next){
    this.slug = slugify(this.title,{lower: true, strict:true, trim:true})
    next()
})

module.exports.taskModel = mongoose.model('Task', taskSchema)



