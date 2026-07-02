/**
 * Loading placeholder matching the TaskCard layout using Tailwind animate-pulse pulse shimmer style.
 */
const TaskSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-surface-200 rounded-lg p-6 bg-white flex flex-col gap-4 shadow-sm"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-16 bg-surface-200 rounded-full animate-pulse" />
            <div className="h-5 w-14 bg-surface-200 rounded-full animate-pulse" />
          </div>

          {/* Title */}
          <div className="h-6 w-3/4 bg-surface-200 rounded animate-pulse mt-1" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-surface-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-surface-100 rounded animate-pulse" />
          </div>

          {/* Divider */}
          <div className="h-px bg-surface-100 w-full" />

          {/* Footer details */}
          <div className="flex items-center justify-between mt-1">
            <div className="h-4 w-24 bg-surface-100 rounded animate-pulse" />
            <div className="h-4 w-20 bg-surface-100 rounded animate-pulse" />
          </div>

          {/* Actions placeholder */}
          <div className="flex justify-end gap-2 mt-2">
            <div className="h-8 w-14 bg-surface-200 rounded animate-pulse" />
            <div className="h-8 w-14 bg-surface-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;
