import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';

const taskSchema = (isEdit) =>
  z.object({
    title: z
      .string()
      .min(3, 'Task title must be at least 3 characters')
      .max(100, 'Task title cannot exceed 100 characters'),
    description: z.string().max(500, 'Description cannot exceed 500 characters').optional().or(z.literal('')),
    status: z.enum(['Todo', 'In Progress', 'Done']),
    priority: z.enum(['Low', 'Medium', 'High']),
    category: z.string().max(30, 'Category cannot exceed 30 characters').optional().or(z.literal('')),
    dueDate: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine(
        (val) => {
          if (isEdit || !val) return true;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return new Date(val) >= today;
        },
        {
          message: 'Due date cannot be in the past',
        }
      ),
  });

/**
 * TaskFormModal acts as a reusable create/edit modal form using react-hook-form and Zod schemas.
 */
const TaskFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  task = null,
}) => {
  const isEdit = !!task;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema(isEdit)),
    defaultValues: {
      title: '',
      description: '',
      status: 'Todo',
      priority: 'Medium',
      category: 'General',
      dueDate: '',
    },
  });

  // Reset form states on task changes or opening
  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'Todo',
          priority: task.priority || 'Medium',
          category: task.category || 'General',
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        });
      } else {
        reset({
          title: '',
          description: '',
          status: 'Todo',
          priority: 'Medium',
          category: 'General',
          dueDate: '',
        });
      }
    }
  }, [task, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Coerce empty string values to null or clean strings
      const cleanedData = {
        ...data,
        description: data.description || '',
        category: data.category || 'General',
        dueDate: data.dueDate || null,
      };
      await onSubmit(cleanedData);
      onClose();
    } catch {
      // Errors handled by parent component alerts
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Create Task'}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        {/* Title */}
        <Input
          label="Task Title"
          type="text"
          placeholder="e.g. Implement API"
          error={errors.title?.message}
          disabled={isSubmitting}
          {...register('title')}
        />

        {/* Description */}
        <Textarea
          label="Description"
          placeholder="What needs to be done?"
          error={errors.description?.message}
          disabled={isSubmitting}
          rows={3}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-surface-700">Status</label>
            <select
              disabled={isSubmitting}
              className="w-full text-sm px-3 py-2 rounded-md border border-surface-200 bg-white text-surface-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow"
              {...register('status')}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status?.message && (
              <p className="text-xs text-danger-600 font-medium">{errors.status.message}</p>
            )}
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-surface-700">Priority</label>
            <select
              disabled={isSubmitting}
              className="w-full text-sm px-3 py-2 rounded-md border border-surface-200 bg-white text-surface-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow"
              {...register('priority')}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority?.message && (
              <p className="text-xs text-danger-600 font-medium">{errors.priority.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <Input
            label="Category"
            type="text"
            placeholder="e.g. Design, Dev"
            error={errors.category?.message}
            disabled={isSubmitting}
            {...register('category')}
          />

          {/* Due Date */}
          <Input
            label="Due Date"
            type="date"
            error={errors.dueDate?.message}
            disabled={isSubmitting}
            {...register('dueDate')}
          />
        </div>

        {/* Action row */}
        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-100">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;
