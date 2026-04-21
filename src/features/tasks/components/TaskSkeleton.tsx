// Server Component — solo renderiza HTML.
export function TaskSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full p-4" data-testid="task-skeleton">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 rounded-lg p-4 flex flex-col h-full min-h-[300px] animate-pulse"
        >
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="bg-white rounded shadow p-3 border border-gray-200 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
                <div className="h-4 w-6 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-2 mb-2">
                <div className="h-4 w-16 bg-blue-100 rounded" />
                <div className="h-4 w-20 bg-green-100 rounded" />
                <div className="h-4 w-16 bg-yellow-100 rounded" />
              </div>
              <div className="flex justify-end">
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
