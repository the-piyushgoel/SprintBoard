import { Card, CardContent } from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

/**
 * TaskCard displays compact information for a single task.
 */
const TaskCard = ({
  task,
  onView,
  onEdit,
  onDelete,
}) => {
  const { title, description, status, priority, category, dueDate, createdAt } = task;

  // Check if overdue
  const isOverdue = (() => {
    if (status === 'Done') return false;
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  })();

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Status badge config
  const statusBadgeVariants = {
    Todo: 'neutral',
    'In Progress': 'warning',
    Done: 'success',
  };

  // Priority badge config
  const priorityBadgeVariants = {
    Low: 'neutral',
    Medium: 'warning',
    High: 'danger',
  };

  return (
    <Card variant="interactive" className="flex flex-col h-full bg-white select-none">
      <CardContent className="flex flex-col gap-4 p-6 flex-1">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Badge variant={statusBadgeVariants[status] || 'neutral'}>{status}</Badge>
            <Badge variant={priorityBadgeVariants[priority] || 'neutral'}>{priority} Priority</Badge>
          </div>
          {category && (
            <span className="text-xs font-medium text-surface-500 bg-surface-50 border border-surface-200 px-2 py-0.5 rounded-md">
              {category}
            </span>
          )}
        </div>

        {/* Title and description */}
        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-base font-bold text-surface-900 line-clamp-1 leading-snug">
            {title}
          </h3>
          {description ? (
            <p className="text-xs text-surface-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          ) : (
            <p className="text-xs text-surface-400 italic">No description provided</p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-150 w-full" />

        {/* Due and Created Dates */}
        <div className="flex flex-col gap-1.5 text-[11px] text-surface-500">
          <div className="flex items-center justify-between">
            <span className="font-medium">Due Date:</span>
            <span
              className={`font-semibold ${
                isOverdue ? 'text-danger-600 font-bold' : 'text-surface-700'
              }`}
            >
              {isOverdue && '⚠️ '}
              {formatDate(dueDate)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Created:</span>
            <span className="text-surface-600">{formatDate(createdAt)}</span>
          </div>
        </div>

        {/* Button Actions */}
        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-surface-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView(task);
            }}
            aria-label={`View details of task ${title}`}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            aria-label={`Edit task ${title}`}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-danger-600 hover:bg-danger-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            aria-label={`Delete task ${title}`}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
