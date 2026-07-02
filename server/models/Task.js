import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Task title must be at least 3 characters'],
      maxlength: [100, 'Task title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['Todo', 'In Progress', 'Done'],
        message: '{VALUE} is not a valid task status',
      },
      default: 'Todo',
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a valid task priority',
      },
      default: 'Medium',
    },
    dueDate: {
      type: Date,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    completedAt: {
      type: Date,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task creator is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TaskSchema.index({ createdBy: 1, isArchived: 1, status: 1, priority: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ createdAt: -1 });

// Pre-save hook to handle status transitions for completedAt
TaskSchema.pre('save', async function () {
  if (this.isModified('status')) {
    if (this.status === 'Done') {
      if (!this.completedAt) {
        this.completedAt = new Date();
      }
    } else {
      this.completedAt = null;
    }
  }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
