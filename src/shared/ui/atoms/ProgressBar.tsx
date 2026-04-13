import type { HTMLAttributes } from "react";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  color?: string; // tailwind color class, e.g. 'bg-blue-500'
  className?: string;
}

export function ProgressBar({ value, color = "bg-blue-500", className = "", ...props }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`} {...props}>
      <div
        className={`${color} h-2 rounded-full transition-all`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
