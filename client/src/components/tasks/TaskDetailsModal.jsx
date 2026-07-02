import Badge from '../ui/Badge.jsx';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

/**
 * TaskDetailsModal lists full details about a specific task, including status timestamps.
 */
const TaskDetailsModal = ({
  isOpen,
  onClose,
  task,
}) => {
  if (!task) return null;

  const {
    title,
    description,
    status,
    priority,
    category,
    dueDate,
    createdAt,
    updatedAt,
    completedAt,
  } = task;

  // Format date helper
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusBadgeVariants = {
    Todo: 'neutral',
    'In Progress': 'warning',
    Done: 'success',
  };

  const priorityBadgeVariants = {
    Low: 'neutral',
    Medium: 'warning',
    High: 'danger',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="md">
      <div className="flex flex-col gap-5 select-none">
        {/* Title & Category Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={statusBadgeVariants[status] || 'neutral'}>{status}</Badge>
            <Badge variant={priorityBadgeVariants[priority] || 'neutral'}>{priority} Priority</Badge>
            {category && <Badge variant="neutral">{category}</Badge>}
          </div>
          <h2 className="text-xl font-bold text-surface-900 leading-snug">{title}</h2>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">
            Description
          </span>
          <div className="bg-surface-50 p-4 rounded-md border border-surface-200 text-sm text-surface-700 leading-relaxed whitespace-pre-line">
            {description || <span className="italic text-surface-450">No description provided</span>}
          </div>
        </div>

        {/* Detail properties grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-surface-400 uppercase tracking-wider">Created</span>
            <span className="text-surface-750 font-semibold">{formatDateTime(createdAt)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-surface-400 uppercase tracking-wider">Last Updated</span>
            <span className="text-surface-750 font-semibold">{formatDateTime(updatedAt)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-surface-400 uppercase tracking-wider">Due Date</span>
            <span className="text-surface-750 font-semibold">{formatDateTime(dueDate)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-surface-400 uppercase tracking-wider">Completed At</span>
            <span className="text-surface-750 font-semibold">{formatDateTime(completedAt)}</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-end mt-4 pt-4 border-t border-surface-100">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
