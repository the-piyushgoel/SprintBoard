import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.js';
import useTasks from '../hooks/useTasks.js';
import Button from '../components/ui/Button.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import PageContainer from '../components/ui/PageContainer.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';

// Import task features
import TaskStats from '../components/tasks/TaskStats.jsx';
import TaskFilters from '../components/tasks/TaskFilters.jsx';
import TaskCard from '../components/tasks/TaskCard.jsx';
import TaskSkeleton from '../components/tasks/TaskSkeleton.jsx';
import TaskFormModal from '../components/tasks/TaskFormModal.jsx';
import TaskDetailsModal from '../components/tasks/TaskDetailsModal.jsx';
import DeleteConfirmModal from '../components/tasks/DeleteConfirmModal.jsx';

/**
 * Dashboard page coordinating tasks list, stats calculations, query parameters filters, pagination metadata, and dialog CRUD modals.
 */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const {
    tasks,
    loading,
    stats,
    filters,
    pagination,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Modal open states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Handle Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully.');
    } catch {
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Open Create Form Modal
  const handleOpenCreate = useCallback(() => {
    setSelectedTask(null);
    setIsFormOpen(true);
  }, []);

  // Open Edit Form Modal
  const handleOpenEdit = useCallback((task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  }, []);

  // Open Details Modal
  const handleOpenDetails = useCallback((task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  }, []);

  // Open Delete Confirm Modal
  const handleOpenDelete = useCallback((task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  }, []);

  // Submit task (handles both Create and Edit)
  const handleFormSubmit = async (data) => {
    if (selectedTask) {
      // Edit mode
      await updateTask(selectedTask._id, data);
    } else {
      // Create mode
      await createTask(data);
    }
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask._id);
      setIsDeleteOpen(false);
    }
  };

  // Handle Page navigation
  const handlePageChange = (newPage) => {
    setFilters({ page: newPage });
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col font-sans selection:bg-primary-200">
      {/* Header navbar */}
      <header className="border-b border-surface-200 bg-white sticky top-0 z-40">
        <PageContainer maxWidth="lg" className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-surface-900">SprintBoard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden sm:inline text-sm font-semibold text-surface-700">
                {user?.name}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              loading={isLoggingOut}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </PageContainer>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-10">
        <PageContainer maxWidth="lg" className="flex flex-col gap-8">
          {/* Section Header */}
          <SectionHeading
            title="Project Dashboard"
            description="Manage, search, sort, and organize your development tasks."
            actions={
              <Button variant="primary" size="md" onClick={handleOpenCreate}>
                Create Task
              </Button>
            }
            divider
          />

          {/* Stats Bar */}
          <TaskStats stats={stats} />

          {/* Filters Bar */}
          <TaskFilters filters={filters} onFilterChange={setFilters} />

          {/* Tasks Grid */}
          <div className="flex flex-col gap-6">
            {loading && tasks.length === 0 ? (
              <TaskSkeleton count={6} />
            ) : !loading && tasks.length === 0 ? (
              <EmptyState
                title="No tasks found"
                description="Create a task or reset filters to see results."
                icon="📋"
                action={
                  <Button variant="primary" size="sm" onClick={handleOpenCreate}>
                    Create Task
                  </Button>
                }
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasks.map((task) => (
                    <div key={task._id} className="h-full">
                      <TaskCard
                        task={task}
                        onView={handleOpenDetails}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                  <div className="flex items-center justify-between border-t border-surface-200 pt-6 mt-4 select-none">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!pagination.hasPrev}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      Previous
                    </Button>
                    <span className="text-xs font-semibold text-surface-550">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!pagination.hasNext}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </PageContainer>
      </main>

      {/* Form Dialog Modal (Create & Edit) */}
      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={selectedTask}
      />

      {/* Details View Modal */}
      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={selectedTask}
      />

      {/* Delete Consent Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedTask?.title || ''}
      />
    </div>
  );
};

export default Dashboard;
