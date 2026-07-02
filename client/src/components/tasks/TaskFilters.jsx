import { useState, useEffect } from 'react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

/**
 * TaskFilters holds inputs for searching, filtering by priority/status/category, sorting, and reset handlers.
 */
const TaskFilters = ({
  filters,
  onFilterChange,
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // Synchronize local search value when filters reset
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localSearch !== (filters.search || '')) {
        onFilterChange({ search: localSearch });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearch, onFilterChange, filters.search]);

  // Handle select/input values
  const handleChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  // Reset filters to defaults
  const handleReset = () => {
    setLocalSearch('');
    onFilterChange({
      search: '',
      status: '',
      priority: '',
      category: '',
      sort: 'createdAt:desc',
      page: 1,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-surface-200 flex flex-col gap-4 select-none">
      {/* Search and Filters grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
        {/* Search */}
        <Input
          label="Search Tasks"
          type="text"
          placeholder="Title, desc, category..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        {/* Status */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-surface-700">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-surface-200 bg-white text-surface-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow"
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-surface-700">Priority</label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-surface-200 bg-white text-surface-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Category */}
        <Input
          label="Category"
          type="text"
          placeholder="e.g. Design, API"
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
        />

        {/* Sort */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-surface-700">Sort By</label>
          <select
            value={filters.sort || 'createdAt:desc'}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-surface-200 bg-white text-surface-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-shadow"
          >
            <option value="createdAt:desc">Newest Created</option>
            <option value="createdAt:asc">Oldest Created</option>
            <option value="dueDate:asc">Due Date (Asc)</option>
            <option value="dueDate:desc">Due Date (Desc)</option>
            <option value="title:asc">Title (A-Z)</option>
            <option value="title:desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Reset options row */}
      <div className="flex justify-end mt-1">
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default TaskFilters;
