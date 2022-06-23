import mongoose from "mongoose"


const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: [true, 'Please provide status'],

  },

  status: {
    type: String,
    enum: ['TODO', 'IN Progress', 'Under Review', 'Rework', 'Completed'],
    default: 'todo'
  },
  description: {
    type: String,
    default: 'No Description',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },

  startDate: {
    type: Date,
    required: [true, 'please provide start date']
  },

  endDate: {
    type: Date,
    required: [true, 'please provide start date']
  }
})

export default mongoose.model('Task', TaskSchema)