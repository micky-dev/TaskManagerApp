//?-----Task Route Controllers

module.exports.default = (req, res, next) => {
    res.render('index',{renderSearch:false,authenticated:req.isAuthenticated()})
}

module.exports.createTask = async (req, res, next) => {
    try{
        const userId = req.user._id
        const {title, dueDate, description, priority} = req.body
        const task = await (require('../models/taskModel').taskModel.create({
            userId: userId,
            title: title,
            dueDate: dueDate,
            description: description,
            priority: priority[1]
        }))
        res.redirect('/')
    }catch(err){
        next(err)
    }

    }
module.exports.getAll = async (req, res, next) => {
    try{
        const tasks = await require('../models/taskModel').taskModel.find({userId:(req.user._id).toString()})
        const authanticated = req.isAuthenticated() ? req.isAuthenticated : false
        res.render('tasks',{renderSearch:true,locals: tasks,authenticated:req.isAuthenticated()})
    }catch(err){
        next(err)
    }
}
module.exports.getSearch = async (req, res, next) =>{
    console.log(req.body)
    const tasks = await (require('../models/taskModel').taskModel.find({userId:(req.user._id).toString(),
        $or: [
            { title: { $regex:req.body.query, $options: 'i' } },
            { description: { $regex:req.body.query, $options: 'i' } },
            { priority: { $regex:req.body.query, $options: 'i' } },
          ]
    }))
    res.render('tasks',{renderSearch:true,locals: tasks,authenticated:req.isAuthenticated()})
}