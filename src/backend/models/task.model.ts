import mongoose, { Schema, Document } from 'mongoose';

export interface ISubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  completed: boolean;
  subtasks?: ISubtask[];
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubtaskSchema = new Schema<ISubtask>(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  // Disable automatic _id generation for subtasks since we use a custom 'id' field
  { _id: false }
);

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be one of: low, medium, high',
      },
      default: 'medium',
    },
    tags: {
      type: [String],
      default: [],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    subtasks: {
      type: [SubtaskSchema],
      default: [],
    },
    projectId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for common queries
TaskSchema.index({ projectId: 1 });
TaskSchema.index({ completed: 1 });
TaskSchema.index({ dueDate: 1 });

export const Task = mongoose.model<ITask>('Task', TaskSchema);
