const WIDTH_CLASSES = ["w-full", "w-5/6", "w-2/3", "w-1/2"]; // varying line widths for realism

export default function SkeletonLoader({ lines = 3 }) {
  const lineCount = Math.max(0, Math.min(4, Math.floor(lines)));

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading content"
      className="max-w-sm w-full rounded-2xl p-4 shadow-sm border border-transparent"
    >
      {/* container that pulses */}
      <div className="animate-pulse">
        {/* image placeholder */}
        <div className="h-48 w-full rounded-lg color-base-300 color-base-content mb-4" />

        {/* text placeholders */}
        <div className="space-y-3">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className={`h-4 rounded color-base-300 color-base-content 
                ${WIDTH_CLASSES[i] ?? "w-3/4"}`}
            />
          ))}
        </div>
      </div>

      {/* accessible hidden text for screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
