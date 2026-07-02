import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

/**
 * DeleteConfirmModal checks user consent before deleting a task.
 */
const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = '',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Task Deletion" size="sm">
      <div className="flex flex-col gap-4 select-none">
        <p className="text-sm text-surface-600 leading-normal">
          Are you sure you want to delete task <strong className="text-surface-900 font-bold">{title}</strong>? This action is permanent and cannot be undone.
        </p>

        {/* Action Row */}
        <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-surface-100">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
