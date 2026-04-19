// Server Component — solo renderiza HTML.
import { Button } from '@/shared/ui/atoms';
import { CardActions, InfoBlock, ProgressBarWithLabel } from '@/shared/ui/molecules';

type Props = {
  name: string;
  detail: string;
  progress: number;
  taskLabel: string;
  onViewDetail: () => void;
};

export const ProjectCardView = ({ name, detail, progress, taskLabel, onViewDetail }: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm space-y-3 bg-white">
      <InfoBlock title={name} description={detail} />

      <ProgressBarWithLabel value={progress} label={taskLabel} />

      <CardActions>
        <Button variant="primary" onClick={onViewDetail}>
          Ver detalle
        </Button>
      </CardActions>
    </div>
  );
};
