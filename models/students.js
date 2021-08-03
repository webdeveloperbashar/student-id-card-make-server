const {Schema, model} = require('mongoose')
const StudentSchema = Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        min:0,
        required: true
    },
    section:{
        type: Number,
        required: true,
    },
    presentDay: {
        type: Number,
        required: true
    }
})


const Student = model('Student', StudentSchema )

exports.Student = Student