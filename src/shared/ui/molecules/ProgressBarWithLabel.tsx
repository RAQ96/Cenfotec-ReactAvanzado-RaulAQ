// Server Component — solo renderiza HTML.
import { ProgressBar, Text } from '@/shared/ui/atoms';

type Props = {
  value: number;
  label: string;
};

export const ProgressBarWithLabel = ({ value, label }: Props) => {
  return (
    <div className="space-y-1">
      <ProgressBar value={value} />
      <Text className="text-xs text-gray-500">{label}</Text>
    </div>
  );
};
