import { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import * as taskService from '../services/taskService.js';

const initialFilters = {
  search: '',
  status: '',
  priority: '',
  category: '',
  sort: 'createdAt:desc',
  page: 1,
  limit: 10,
};

const initialPagination = {
  page: 1,
  limit: 10,
  pages: 1,
  total: 0,
  hasNext: false,
  hasPrev: false,
};

/**
 * Reusable hook responsible for task CRUD operations, pagination, query filtering, and optimistic state rollbacks.
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFiltersState] = useState(initialFilters);
  const [pagination, setPagination] = useState(initialPagination);

  // Fetch tasks matching current filters
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getTasks(filters);
      if (response?.success && response?.data) {
        setTasks(response.data.tasks || []);
        setPagination(response.data.pagination || initialPagination);
      } else {
        throw response;
      }
    } catch (err) {
      const msg = err?.message || 'Failed to retrieve tasks';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Trigger automatic refetch when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  // Merge new filters (resets page to 1 unless only changing pagination pages)
  const setFilters = useCallback((newFilters) => {
    setFiltersState((prev) => {
      const updated = typeof newFilters === 'function' ? newFilters(prev) : newFilters;
      // Reset page to 1 if filter fields change (search, status, priority, category)
      const resetPage =
        updated.search !== undefined && updated.search !== prev.search ||
        updated.status !== undefined && updated.status !== prev.status ||
        updated.priority !== undefined && updated.priority !== prev.priority ||
        updated.category !== undefined && updated.category !== prev.category;

      return {
        ...prev,
        ...updated,
        page: resetPage ? 1 : updated.page || prev.page,
      };
    });
  }, []);

  // Force manual refresh
  const refresh = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Optimistic task creation
  const createTask = async (taskData) => {
    const backupTasks = [...tasks];
    const tempId = `temp-id-${Date.now()}`;
    const placeholderTask = {
      _id: tempId,
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isOptimisticPlaceholder: true,
    };

    // Pre-emptively append to list
    setTasks((prev) => [placeholderTask, ...prev]);

    try {
      const response = await taskService.createTask(taskData);
      if (response?.success && response?.data?.task) {
        // Swap placeholder with actual server-saved task
        setTasks((prev) =>
          prev.map((t) => (t._id === tempId ? response.data.task : t))
        );
        toast.success(response.message || 'Task created successfully');
        // Refetch to align pagination count and actual sorting in the database
        fetchTasks();
        return response.data.task;
      }
      throw response;
    } catch (err) {
      // Rollback to original tasks list on failure
      setTasks(backupTasks);
      const msg = err?.message || 'Failed to create task';
      toast.error(msg);
      throw err;
    }
  };

  // Optimistic task updates
  const updateTask = async (taskId, updateData) => {
    const backupTasks = [...tasks];

    // Pre-emptively apply updates to local task
    setTasks((prev) =>
      prev.map((t) => {
        if (t._id === taskId) {
          const updatedTask = { ...t, ...updateData };
          // Simulate backend pre-save hook for status change to Done
          if (updateData.status !== undefined) {
            if (updateData.status === 'Done') {
              updatedTask.completedAt = new Date().toISOString();
            } else {
              updatedTask.completedAt = null;
            }
          }
          return updatedTask;
        }
        return t;
      })
    );

    try {
      const response = await taskService.updateTask(taskId, updateData);
      if (response?.success && response?.data?.task) {
        // Guarantee synchronization with final server fields
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? response.data.task : t))
        );
        toast.success(response.message || 'Task updated successfully');
        return response.data.task;
      }
      throw response;
    } catch (err) {
      // Rollback to backup copy on failure
      setTasks(backupTasks);
      const msg = err?.message || 'Failed to update task';
      toast.error(msg);
      throw err;
    }
  };

  // Optimistic task soft delete
  const deleteTask = async (taskId) => {
    const backupTasks = [...tasks];

    // Pre-emptively filter out task from UI
    setTasks((prev) => prev.filter((t) => t._id !== taskId));

    try {
      const response = await taskService.deleteTask(taskId);
      if (response?.success) {
        toast.success(response.message || 'Task deleted successfully');
        // Refetch to pull next page items if pagination shifts
        fetchTasks();
      } else {
        throw response;
      }
    } catch (err) {
      // Revert to backup copy on failure
      setTasks(backupTasks);
      const msg = err?.message || 'Failed to delete task';
      toast.error(msg);
      throw err;
    }
  };

  // Memoized stats calculation
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Done').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    const pending = tasks.filter((t) => t.status === 'Todo').length;

    // Overdue check: status is not Done, has dueDate, and dueDate is past today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const overdue = tasks.filter((t) => {
      if (t.status === 'Done') return false;
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < todayStart;
    }).length;

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      inProgress,
      overdue,
      completionPercentage,
    };
  }, [tasks]);

  return {
    tasks,
    loading,
    error,
    filters,
    pagination,
    stats,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    refresh,
    setFilters,
  };
};

export default useTasks;
