// Server Component — solo renderiza HTML.
export function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full p-4" data-testid="project-skeleton">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-xl p-4 shadow-sm space-y-3 bg-white animate-pulse flex flex-col"
        >
          {/* InfoBlock: título y descripción */}
          <div>
            <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
          {/* ProgressBarWithLabel */}
          <div className="space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-200 h-2 rounded-full transition-all"
                style={{ width: '60%' }}
              />
            </div>
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
          </div>
          {/* CardActions: botón */}
          <div className="flex justify-end mt-4">
            <div className="h-8 w-24 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
