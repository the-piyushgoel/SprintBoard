import { Card, CardContent } from '../ui/Card.jsx';

/**
 * TaskStats renders stats counts for dashboard tracking: Total, Completed, In Progress, Pending, Overdue, and progress completion bar.
 */
const TaskStats = ({ stats }) => {
  const { total, completed, pending, inProgress, overdue, completionPercentage } = stats;

  const statItems = [
    {
      title: 'Total Tasks',
      value: total,
      bg: 'bg-surface-50',
      text: 'text-surface-900',
      border: 'border-surface-200',
      icon: '📋',
    },
    {
      title: 'Completed',
      value: completed,
      bg: 'bg-success-50/50',
      text: 'text-success-700',
      border: 'border-success-100',
      icon: '✅',
    },
    {
      title: 'In Progress',
      value: inProgress,
      bg: 'bg-primary-50/40',
      text: 'text-primary-700',
      border: 'border-primary-100',
      icon: '⚡',
    },
    {
      title: 'Pending',
      value: pending,
      bg: 'bg-warning-50/40',
      text: 'text-warning-700',
      border: 'border-warning-100',
      icon: '⏳',
    },
    {
      title: 'Overdue',
      value: overdue,
      bg: overdue > 0 ? 'bg-danger-50' : 'bg-surface-50',
      text: overdue > 0 ? 'text-danger-700 font-bold' : 'text-surface-500',
      border: overdue > 0 ? 'border-danger-100' : 'border-surface-200',
      icon: '⚠️',
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((item, index) => (
          <Card
            key={index}
            className={`border ${item.border} ${item.bg} ${
              index === 4 && overdue > 0 ? 'animate-pulse' : ''
            }`}
          >
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-wider">
                  {item.title}
                </span>
                <span className={`text-xl font-bold ${item.text}`}>
                  {item.value}
                </span>
              </div>
              <span className="text-2xl shrink-0">{item.icon}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Percentage Progress Bar */}
      <Card className="border border-surface-200">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-surface-700">Sprint Progress</span>
            <span className="font-bold text-primary-600">{completionPercentage}% Completed</span>
          </div>
          <div className="w-full bg-surface-100 h-3 rounded-full overflow-hidden border border-surface-200">
            <div
              className="bg-primary-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
