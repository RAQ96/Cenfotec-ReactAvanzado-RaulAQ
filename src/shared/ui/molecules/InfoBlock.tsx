// Server Component — solo renderiza HTML.
import { Text } from '@/shared/ui/atoms';

type InfoBlockProps = {
  title: string;
  description?: string;
};

export const InfoBlock = ({ title, description }: InfoBlockProps) => {
  return (
    <div>
      <Text className="font-semibold text-lg">{title}</Text>
      {description && <Text className="text-sm text-gray-500">{description}</Text>}
    </div>
  );
};
