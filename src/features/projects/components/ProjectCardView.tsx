// Server Component — solo renderiza HTML.
import { Button } from '@/shared/ui/atoms';
import { CardActions, InfoBlock, ProgressBarWithLabel } from '@/shared/ui/molecules';
import React from 'react';

type Props = {
  name: string;
  detail: string;
  progress: number;
  taskLabel: string;
  onViewDetail: () => void;
  onDelete?: () => void;
};

export const ProjectCardView = React.memo(function ProjectCardView({
  name,
  detail,
  progress,
  taskLabel,
  onViewDetail,
  onDelete,
}: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm space-y-3 bg-white">
      <InfoBlock title={name} description={detail} />

      <ProgressBarWithLabel value={progress} label={taskLabel} />

      <CardActions>
        <Button variant="primary" onClick={onViewDetail}>
          Ver detalle
        </Button>
        {onDelete && (
          <Button variant="danger" onClick={onDelete} className="ml-2">
            Eliminar
          </Button>
        )}
      </CardActions>
    </div>
  );
});
